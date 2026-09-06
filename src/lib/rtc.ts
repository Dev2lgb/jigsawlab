// 내 사진 방 — WebRTC 데이터 채널로 사진(webp Blob)을 브라우저끼리 직접 전송. 서버(DO)는 sdp/ice 신호만 중계
// 채널 프로토콜: 첫 메시지 JSON 헤더 {size,type} → 16KB 바이너리 조각들 → 받는 쪽이 'ok' 문자열
const ICE: RTCConfiguration = { iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }] };
export type Sig = (d: any) => void;
export interface Peer { onSig: (d: any) => void; close: () => void }
const CHUNK = 16 * 1024;

function wire(pc: RTCPeerConnection, sig: Sig) {
  pc.onicecandidate = (e) => { if (e.candidate) sig({ ice: e.candidate.toJSON() }); };
  const pending: RTCIceCandidateInit[] = []; let remoteSet = false;
  return async (d: any) => {
    try {
      if (d.sdp) { await pc.setRemoteDescription(d.sdp); remoteSet = true; for (const c of pending.splice(0)) await pc.addIceCandidate(c).catch(() => {}); if (d.sdp.type === 'offer') { const a = await pc.createAnswer(); await pc.setLocalDescription(a); sig({ sdp: pc.localDescription!.toJSON() }); } }
      else if (d.ice) { if (remoteSet) await pc.addIceCandidate(d.ice).catch(() => {}); else pending.push(d.ice); }
    } catch {}
  };
}

/** 보내는 쪽(사진을 가진 사람): offer 를 만들어 보내고, 채널이 열리면 blob 을 흘려보냄 */
export function sendBlob(blob: Blob, sig: Sig, onEnd: () => void): Peer {
  const pc = new RTCPeerConnection(ICE); const dc = pc.createDataChannel('photo', { ordered: true }); dc.binaryType = 'arraybuffer';
  let ended = false; const end = () => { if (ended) return; ended = true; try { pc.close(); } catch {} onEnd(); };
  dc.onopen = async () => {
    try {
      dc.send(JSON.stringify({ size: blob.size, type: blob.type || 'image/webp' })); const buf = await blob.arrayBuffer(); dc.bufferedAmountLowThreshold = 256 * 1024;
      for (let o = 0; o < buf.byteLength; o += CHUNK) { if (dc.readyState !== 'open') return end(); if (dc.bufferedAmount > 1024 * 1024) await new Promise<void>((r) => { dc.onbufferedamountlow = () => { dc.onbufferedamountlow = null; r(); }; }); dc.send(buf.slice(o, o + CHUNK)); }
    } catch { end(); }
  };
  dc.onmessage = (e) => { if (e.data === 'ok') setTimeout(end, 500); };
  dc.onclose = end; pc.onconnectionstatechange = () => { if (pc.connectionState === 'failed' || pc.connectionState === 'closed') end(); };
  const onSig = wire(pc, sig);
  pc.createOffer().then(async (o) => { await pc.setLocalDescription(o); sig({ sdp: pc.localDescription!.toJSON() }); }).catch(end);
  setTimeout(end, 90_000);
  return { onSig, close: end };
}

/** 받는 쪽: offer 가 오면 answer 하고 조각을 모아 Blob 으로. 실패·타임아웃이면 reject */
export function recvBlob(sig: Sig, timeoutMs = 30_000, onProgress?: (got: number, size: number) => void): Peer & { blob: Promise<Blob> } {
  const pc = new RTCPeerConnection(ICE); let done = false;
  let resolve!: (b: Blob) => void, reject!: (e: unknown) => void; const blob = new Promise<Blob>((res, rej) => { resolve = res; reject = rej; });
  const fail = (why: string) => { if (done) return; done = true; try { pc.close(); } catch {} reject(new Error(why)); };
  const timer = setTimeout(() => fail('timeout'), timeoutMs);
  pc.ondatachannel = (ev) => {
    const dc = ev.channel; dc.binaryType = 'arraybuffer'; let size = 0, type = 'image/webp', got = 0; const parts: ArrayBuffer[] = [];
    dc.onmessage = (e) => {
      if (typeof e.data === 'string') { try { const h = JSON.parse(e.data); size = Number(h.size) || 0; type = String(h.type || type); } catch {} return; }
      parts.push(e.data); got += (e.data as ArrayBuffer).byteLength; onProgress?.(got, size);
      if (size && got >= size) { done = true; clearTimeout(timer); try { dc.send('ok'); } catch {} resolve(new Blob(parts, { type })); setTimeout(() => { try { pc.close(); } catch {} }, 1000); }
    };
    dc.onclose = () => { if (!done) fail('closed'); };
  };
  pc.onconnectionstatechange = () => { if (pc.connectionState === 'failed') fail('ice'); };
  const onSig = wire(pc, sig);
  return { onSig, close: () => fail('cancel'), blob };
}

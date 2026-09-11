// ja — 판·고르는 화면 문구 + SEO 본문. 모양은 ko.ts 의 JigsawStrings 를 따른다
import type { JigsawStrings } from './ko';
export const JA: JigsawStrings = {
  title: '何を組みましょう？', sub: '今日のパズル、自分の写真、それとも下から一つ。',
  seoTitle: '無料オンラインジグソーパズル423点', boardTitle: 'パズルを組む', seoDesc: '登録なしですぐ遊べる無料ジグソーパズル。名画・韓国絵画・宇宙写真423点と自分の写真で、48ピースから1000ピースまで。リンク一つで友だちと一緒に。',
  pick: '写真を選ぶ', drop: 'ここに写真をドロップ、またはタップして選択', daily: '今日のパズル', dailyCap: (title: string, n: number) => `${title} · ${n}ピース`, pieces: 'ピース数', custom: '自分で入力', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n}ピース`, noImg: 'まず写真か名画を選んでください', chosen: '選んだ絵', myPhoto: '自分の写真',
  start: 'スタート', privacy: '写真は端末の外に出ません', loading: 'ピースを作っています…', opening: 'パズルを開いています…', saveGone: '保存したパズルがありません',
  moves: '置いた回数', left: (n: number) => `残り${n}ピース`, edgeOnly: '外周ピースのみ', hint: '下絵', original: '元の絵を見る', trayHint: '下のピースを上に引き上げてはめてください。2本指で拡大・移動',
  done: '完成！', resTime: 'タイム', resPieces: 'ピース', resMoves: '置いた回数', best: (s: string) => `自己ベスト ${s}`, newBest: '新記録！', retry: '同じ写真でもう一度', another: '別のパズル', toTitle: 'はじめに戻る',
  share: '結果を共有', shareTitle: (n: number, t: string) => `ジグソー${n}ピースを${t}で完成！🧩`, shareText: '次はあなたの番 🧩', shareDaily: (n: number, t: string, title: string) => `今日のパズル「${title}」${n}ピースを${t}で完成！🧩 あなたは？`,
  imgFail: '画像を開けませんでした。JPG・PNG・HEICの写真か確認してください', paintingBy: (t: string, a: string, y: string) => `${t} — ${a}、${y}`,
};

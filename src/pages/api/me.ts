// 내 계정: GET → { user: {id, nick} | null, auth: 설정 여부 } / POST {nick} → 닉네임 변경
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUser, configured, cleanNick } from '../../lib/auth';
import { json, readJson } from '../../lib/api';
export const prerender = false;
export const GET: APIRoute = async ({ request }) => json({ user: await getUser(request), auth: configured() });
export const POST: APIRoute = async ({ request }) => {
  const u = await getUser(request); if (!u) return json({ error: 'auth' }, 401);
  const b = await readJson(request); if (!b) return json({ error: 'bad json' }, 400);
  const nick = cleanNick(b.nick); if (!nick) return json({ error: 'nick' }, 400);
  await env.DB.prepare('UPDATE users SET nick = ?, seen_at = unixepoch() WHERE id = ?').bind(nick, u.id).run();
  return json({ user: { id: u.id, nick } });
};

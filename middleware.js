// Vercel Routing Middleware: solo en "/". Redirige a /en/ a visitantes no hispanohablantes en su primera visita.
export const config = { matcher: '/' };
const ES_COUNTRIES = new Set(['MX','ES','AR','CO','CL','PE','VE','EC','GT','CU','BO','DO','HN','PY','SV','NI','CR','PA','UY','PR','GQ']);
const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|whatsapp|telegram|discord|slack|linkedin|twitter|preview|lighthouse|headless|gptbot|claude|perplexity|google-|bytespider|ahrefs|semrush|duckduck|yandex|baidu/i;
export default function middleware(req) {
  const ua = req.headers.get('user-agent') || '';
  if (!ua || BOT.test(ua)) return;
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|;\s*)lang=(es|en)/);
  if (m) return m[1] === 'en' ? Response.redirect(new URL('/en/', req.url), 302) : undefined;
  const primary = (req.headers.get('accept-language') || '').split(',')[0].trim().toLowerCase().slice(0, 2);
  if (primary === 'es') return;
  if (primary === 'en') return Response.redirect(new URL('/en/', req.url), 302);
  const country = (req.headers.get('x-vercel-ip-country') || '').toUpperCase();
  if (ES_COUNTRIES.has(country)) return;
  return Response.redirect(new URL('/en/', req.url), 302);
}

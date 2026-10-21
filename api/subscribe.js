// Vercel serverless function: agrega un contacto al segmento de Resend. No envía correos.
const RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Método no permitido' });
  let body = req.body || {};
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  if (body.website) return res.status(200).json({ ok: true }); // honeypot
  const email = String(body.email || '').trim().toLowerCase();
  if (!RE.test(email) || email.length > 254) return res.status(400).json({ ok: false, error: 'Correo no válido' });
  const key = process.env.RESEND_API_KEY, seg = process.env.RESEND_SEGMENT_ID;
  if (!key || !seg) return res.status(500).json({ ok: false, error: 'Servicio no configurado' });
  try {
    const r = await fetch('https://api.resend.com/contacts', { method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false, segments: [{ id: seg }] }) });
    if (r.ok) return res.status(200).json({ ok: true });
    const d = await r.json().catch(() => ({}));
    if (r.status === 409 || /already exists/i.test(d.message || '')) return res.status(200).json({ ok: true, duplicate: true });
    console.error('Resend error', r.status, d.name);
    return res.status(502).json({ ok: false, error: 'No pudimos registrarte, intenta más tarde' });
  } catch (e) { return res.status(502).json({ ok: false, error: 'No pudimos registrarte, intenta más tarde' }); }
}

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
export function createApp({siteKey = process.env.RECAPTCHA_SITE_KEY, secret = process.env.RECAPTCHA_SECRET_KEY, hosts = (process.env.RECAPTCHA_HOSTNAMES || 'kbox5.com,www.kbox5.com,localhost').split(','), verify = verifyGoogle} = {}) {
  const configured = Boolean(siteKey && secret);
  return http.createServer(async (req, res) => {
    const json = (status, body) => { res.writeHead(status, {'Content-Type':'application/json', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'}); res.end(JSON.stringify(body)); };
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === '/api/contact-config' && req.method === 'GET') return json(200, {siteKey: configured ? siteKey : null});
      if (url.pathname === '/api/contact-email') {
        if (req.method !== 'POST') return json(405, {error:'Method not allowed.'});
        if (!configured) return json(503, {error:'Email verification is not configured yet.'});
        if (!req.headers['content-type']?.startsWith('application/json')) return json(415, {error:'JSON required.'});
        let body = '';
        for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 8192) return json(413, {error:'Request too large.'}); }
        let token;
        try { token = JSON.parse(body).token; } catch { return json(400, {error:'Invalid request.'}); }
        if (typeof token !== 'string' || !token.trim() || token.length > 4096) return json(400, {error:'Please complete the verification.'});
        const result = await verify(secret, token);
        if (result.success !== true || !hosts.includes(result.hostname)) return json(403, {error:'Verification failed or expired. Please try again.'});
        return json(200, {email:'pete@kbox5.com'});
      }
      if (!['GET','HEAD'].includes(req.method)) return json(405, {error:'Method not allowed.'});
      const relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
      const filename = path.resolve(root, '.' + relative);
      if (!filename.startsWith(root + path.sep) || relative.split('/').some(part => part.startsWith('.'))) return json(404, {error:'Not found.'});
      const data = await readFile(filename);
      const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpeg':'image/jpeg','.png':'image/png'};
      res.writeHead(200, {'Content-Type':types[path.extname(filename)] || 'application/octet-stream', 'X-Content-Type-Options':'nosniff', 'Cache-Control':'no-cache'});
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch (error) {
      json(error.code === 'ENOENT' || error.code === 'EISDIR' ? 404 : 502, {error:'Unable to complete this request. Please try again.'});
    }
  });
}
async function verifyGoogle(secret, token) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {method:'POST', body:new URLSearchParams({secret,response:token}), signal:AbortSignal.timeout(10000)});
  if (!response.ok) throw new Error('Verification unavailable');
  return response.json();
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  createApp().listen(port, '127.0.0.1', () => console.log(`KBOX5: http://127.0.0.1:${port}`));
}

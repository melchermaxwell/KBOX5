import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './server.mjs';
async function withApp(config, run) {
  const app = createApp(config);
  await new Promise(resolve => app.listen(0,'127.0.0.1',resolve));
  try { await run(`http://127.0.0.1:${app.address().port}`); } finally { await new Promise(resolve => app.close(resolve)); }
}
const post = (base, token) => fetch(base+'/api/contact-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});
test('unconfigured API never reveals the email; server source is inaccessible', async () => withApp({siteKey:'',secret:''},async base => {
  assert.equal((await post(base,'anything')).status,503);
  assert.deepEqual(await (await fetch(base+'/api/contact-config')).json(),{siteKey:null});
  assert.equal((await fetch(base+'/server.mjs')).status,404);
  assert.equal((await fetch(base+'/.env')).status,404);
  for (const asset of ['/','/app.js','/style.css','/assets/kbox5-logo.svg']) {
    const response = await fetch(base+asset); assert.equal(response.status,200); const text = await response.text(); if (asset === '/') assert.ok(text.includes('mailto:pete@kbox5.com')); else assert.ok(!text.includes('pete@kbox5.com'));
  }
}));
test('missing, failed, and wrong-host tokens are rejected; verified token reveals address without caching',async () => {
  for (const [result, expected] of [[{success:false},403],[{success:true,hostname:'wrong.example'},403],[{success:true,hostname:'kbox5.com'},200]]) {
    await withApp({siteKey:'site',secret:'secret',verify:async()=>result},async base => {
      assert.equal((await post(base,'')).status,400);
      assert.equal((await fetch(base+'/api/contact-email')).status,405);
      const response = await post(base,'test-token'); assert.equal(response.status,expected);
      assert.equal(response.headers.get('cache-control'),'no-store');
      const data = await response.json(); assert.equal(Boolean(data.email),expected===200);
    });
  }
});
test('verification service failures never reveal the address',async () => withApp({siteKey:'site',secret:'secret',verify:async()=>{throw new Error('offline')}},async base=>{
  const response=await post(base,'test-token');assert.equal(response.status,502);assert.ok(!(await response.text()).includes('pete@'));
}));

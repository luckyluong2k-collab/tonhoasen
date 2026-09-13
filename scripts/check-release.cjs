const fs = require('node:fs');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const context = {self:{}};
vm.runInNewContext(fs.readFileSync('app-version.js','utf8'), context);
assert.match(context.self.APP_VERSION, /^\d+\.\d+(?:\.\d+)?$/);
for (const page of ['index.html','dossier-editor.html','bien-phap-thi-cong.html','nhat-ky-cong-trinh.html']) {
  const html = fs.readFileSync(page,'utf8');
  assert(html.includes('src="app-version.js"'), `${page}: missing version source`);
  assert(html.includes('src="app-release.js"'), `${page}: missing release manager`);
  assert(!/(?:src|href)="(?!https?:)[^"]+\?v=\d/.test(html), `${page}: hardcoded asset version`);
  assert(!/v9\.8|Phiên bản \d/.test(html), `${page}: hardcoded display version`);
}
const sw = fs.readFileSync('sw.js','utf8');
assert(sw.includes("importScripts('./app-version.js')"));
assert(sw.includes('${self.APP_VERSION}'));
console.log(`Release source verified: HSH Phủ Lý v${context.self.APP_VERSION}`);

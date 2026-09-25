const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const start = source.indexOf('window.hshOpenQuickSearch = function()');
const end = source.indexOf('// AI Assistant', start);
assert.ok(start >= 0 && end > start, 'Quick-search implementation must be present');

function setup({ boq = [], qaqc = [], dossier = [] } = {}) {
  const calls = [];
  const modal = { classList: { active: true, add() { this.active = true; }, remove() { this.active = false; }, contains() { return this.active; } } };
  const input = { value: '', focus() {} };
  const list = { innerHTML: '' };
  const elements = { quickSearchModal: modal, quickSearchModalInput: input, quickSearchResultsList: list };
  const window = {
    hshOpenBoqSource: row => calls.push(['boq', row]),
    hshOpenQaQcSource: code => calls.push(['qaqc', code]),
    hshOpenDossierSource: id => calls.push(['dossier', id])
  };
  const context = {
    window,
    document: { getElementById: id => elements[id], querySelectorAll: () => [], activeElement: null },
    db: { boq: { toArray: async () => boq }, qaqc: { toArray: async () => qaqc } },
    CONTRACT_LOOKUP_ITEMS: [], DOSSIER_ITEMS: dossier, COMPLETE_DRAWINGS: [],
    RAW_BOQ: boq, INITIAL_QAQC: qaqc,
    aiNormalize: value => String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd'),
    escapeHtml: value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])),
    fmtNumber: value => String(value ?? 0), fmtCurrency: value => String(value ?? 0),
    console
  };
  vm.runInNewContext(source.slice(start, end), context);
  return { window, input, list, calls };
}

test('finds and opens a BOQ item beyond the first 100 rows', async () => {
  const boq = Array.from({ length: 328 }, (_, index) => ({
    row: index + 1, stt: String(index + 1), content: index === 327 ? 'Vật tư cuối dự toán' : `Công tác ${index + 1}`,
    code: '', brand: '', note: '', sec: '', subsec: '', price_total: 0, total_amt: 0
  }));
  const { window, input, list, calls } = setup({ boq });
  input.value = 'vat tu cuoi';
  await window.hshExecuteQuickSearch();
  assert.match(list.innerHTML, /Vật tư cuối dự toán/);
  assert.equal(window._lastSearchResults.length, 1);
  window.hshExecuteSearchAction(0);
  assert.deepEqual(calls, [['boq', 328]]);
});

test('finds a QA/QC code and opens its exact card', async () => {
  const { window, input, calls } = setup({ qaqc: [{ code: 'QC-16', title: 'Nghiệm thu sơn', std: 'TCVN 8789:2011', inspector: 'TVGS' }] });
  input.value = 'QC-16';
  await window.hshExecuteQuickSearch();
  assert.equal(window._lastSearchResults[0].type, 'QA/QC');
  window.hshExecuteSearchAction(0);
  assert.deepEqual(calls, [['qaqc', 'QC-16']]);
});

test('opens the exact dossier item and escapes result markup', async () => {
  const { window, input, list, calls } = setup({ dossier: [{ id: 17, title: 'Hồ sơ <img onerror=alert(1)>', category: 'Nghiệm thu', output: 'Biên bản' }] });
  input.value = 'img';
  await window.hshExecuteQuickSearch();
  assert.match(list.innerHTML, /&lt;img onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(list.innerHTML, /<img onerror=/);
  window.hshExecuteSearchAction(0);
  assert.deepEqual(calls, [['dossier', 17]]);
});

test('filters global search to BOQ without mixing drawing or contract matches', async () => {
  const boq = [{ row: 7, stt: '1', content: 'Bê tông móng', code: '', brand: '', note: '', sec: '', subsec: '', price_total: 0, total_amt: 0 }];
  const { window, input, list } = setup({ boq });
  input.value = 'móng';
  window.hshSetQuickSearchType('BOQ Dự toán');
  await window.hshExecuteQuickSearch();
  assert.equal(window._lastSearchResults.length, 1);
  assert.equal(window._lastSearchResults[0].type, 'BOQ Dự toán');
  assert.match(list.innerHTML, /Bê tông móng/);
  window.hshSetQuickSearchType('Bản vẽ');
  await window.hshExecuteQuickSearch();
  assert.equal(window._lastSearchResults.length, 0);
  assert.match(list.innerHTML, /Không tìm thấy kết quả/);
});

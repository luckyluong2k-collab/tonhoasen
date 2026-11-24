const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'nang-cap.js'), 'utf8');
const context = { window: {}, document: {}, setInterval() {}, console };
vm.runInNewContext(source, context);
const timeline = context.window.hshContractTimeline;

test('day 1 is the contract start date', () => {
  const t = timeline(new Date(2026, 8, 10));
  assert.equal(t.state, 'running');
  assert.equal(t.total, 60);
  assert.equal(t.current, 1);
  assert.equal(t.remaining, 60);
});

test('the contract end date is the last day before overdue', () => {
  const t = timeline(new Date(2026, 10, 9));
  assert.equal(t.state, 'running');
  assert.equal(t.remaining, 0);
  assert.equal(Math.round(t.planRate), 100);
});

test('days after the end date count as overdue', () => {
  const t = timeline(new Date(2026, 10, 24, 19, 30));
  assert.equal(t.state, 'overdue');
  assert.equal(t.overdue, 15);
  assert.equal(t.current, 76);
});

test('before the start date nothing has elapsed', () => {
  const t = timeline(new Date(2026, 8, 1));
  assert.equal(t.state, 'before');
  assert.equal(t.planRate, 0);
});

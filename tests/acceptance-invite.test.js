const { test } = require('node:test');
const assert = require('node:assert/strict');
const { formatInviteDateTime, buildInviteMessage } = require('../loi-moi-nghiem-thu.js');

const example = {
  recipients: 'anh @Cường và các bộ phận liên quan @Bình @Việt Trần - Cửa hàng trưởng Tôn Hoa Sen',
  inspectionAt: '2026-09-25T16:30',
  scope: 'Gia công, lắp dựng cốt thép và ván khuôn đài móng, đế bể tự hoại trước khi đổ bê tông.',
  pourAt: '2026-09-26T07:00',
  pourItems: '7 đài móng M1, M5, M7 và đế bể tự hoại',
  quantity: '5', grade: 'M250', note: ''
};

test('formats local inspection time without shifting the date', () => {
  assert.equal(formatInviteDateTime('2026-09-25T16:30'), '16h30 ngày 25/9/2026');
  assert.equal(formatInviteDateTime('2026-09-26T07:00'), '7h00 ngày 26/9/2026');
  assert.equal(formatInviteDateTime('2026-02-30T07:00'), '');
  assert.equal(formatInviteDateTime('2026-09-25T25:00'), '');
});

test('builds the supplied foundation invitation with concrete plan', () => {
  const message = buildInviteMessage(example);
  assert.match(message, /@Cường/);
  assert.match(message, /16h30 ngày 25\/9\/2026/);
  assert.match(message, /7 đài móng M1, M5, M7/);
  assert.match(message, /7h00 ngày 26\/9\/2026/);
  assert.match(message, /5 m³ mác M250/);
  assert.match(message, /Trân trọng cảm ơn!/);
  assert.doesNotMatch(message, /\.\./);
});

test('allows an invitation without a concrete pour and includes added notes', () => {
  const message = buildInviteMessage({ ...example, pourAt: '', pourItems: '', quantity: '', grade: '', note: 'Tập trung tại khu nhà nhân viên' });
  assert.doesNotMatch(message, /Kế hoạch đổ bê tông/);
  assert.match(message, /Lưu ý: Tập trung tại khu nhà nhân viên\./);
  assert.equal(buildInviteMessage({ ...example, recipients: '' }), '');
});

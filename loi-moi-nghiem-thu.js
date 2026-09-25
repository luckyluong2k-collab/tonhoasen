const INVITE_DRAFT_KEY = 'hsh_acceptance_invite_draft_v1';

function formatInviteDateTime(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value || '');
  if (!match) return '';
  const [, year, month, day, hour, minute] = match;
  if (Number(hour) > 23 || Number(minute) > 59) return '';
  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  if (date.getFullYear() !== Number(year) || date.getMonth() !== Number(month) - 1 || date.getDate() !== Number(day)) return '';
  return `${Number(hour)}h${minute} ngày ${Number(day)}/${Number(month)}/${year}`;
}

function buildInviteMessage(fields) {
  const recipients = String(fields.recipients || '').trim();
  const inspectionAt = formatInviteDateTime(fields.inspectionAt);
  const scope = String(fields.scope || '').trim().replace(/[.\s]+$/, '');
  if (!recipients || !inspectionAt || !scope) return '';

  const lines = [
    `Nhà thầu kính mời ${recipients} tham gia nghiệm thu lúc ${inspectionAt}:`,
    `- ${scope}.`
  ];

  const pourAt = formatInviteDateTime(fields.pourAt);
  const pourItems = String(fields.pourItems || '').trim().replace(/[.\s]+$/, '');
  if (pourAt && pourItems) {
    let pourLine = `- Kế hoạch đổ bê tông lúc ${pourAt}: ${pourItems}`;
    const quantity = Number(fields.quantity);
    const hasQuantity = String(fields.quantity ?? '').trim() !== '' && Number.isFinite(quantity) && quantity > 0;
    const grade = String(fields.grade || '').trim();
    if (hasQuantity || grade) pourLine += `; dự kiến ${hasQuantity ? `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(quantity)} m³` : 'bê tông'}${grade ? ` mác ${grade}` : ''}`;
    lines.push(`${pourLine}.`);
  }

  const note = String(fields.note || '').trim();
  if (note) lines.push(`- Lưu ý: ${note.replace(/[.\s]+$/, '')}.`);
  lines.push('', 'Trân trọng cảm ơn!');
  return lines.join('\n');
}

function initInviteComposer() {
  const form = document.getElementById('inviteForm');
  if (!form) return;
  const message = document.getElementById('inviteMessage');
  const status = document.getElementById('inviteStatus');
  const copy = document.getElementById('inviteCopy');
  const share = document.getElementById('inviteShare');
  const fields = ['recipients', 'inspectionAt', 'scope', 'pourAt', 'pourItems', 'quantity', 'grade', 'note'];

  try {
    const saved = JSON.parse(localStorage.getItem(INVITE_DRAFT_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      fields.forEach(name => {
        if (typeof saved[name] === 'string') form.elements[name].value = saved[name];
      });
    }
  } catch (_) { /* Browsers with disabled storage can still compose a message. */ }

  function setStatus(text, error = false) {
    status.textContent = text;
    status.classList.toggle('error', error);
  }

  function update() {
    const values = Object.fromEntries(fields.map(name => [name, form.elements[name].value]));
    try { localStorage.setItem(INVITE_DRAFT_KEY, JSON.stringify(values)); } catch (_) {}
    const incompletePour = Boolean(values.pourAt) !== Boolean(values.pourItems.trim());
    const invalidQuantity = values.quantity !== '' && (!Number.isFinite(Number(values.quantity)) || Number(values.quantity) <= 0);
    const pastInspection = Boolean(values.inspectionAt) && new Date(values.inspectionAt).getTime() <= Date.now();
    const text = !incompletePour && !invalidQuantity && !pastInspection ? buildInviteMessage(values) : '';
    message.value = text;
    copy.disabled = share.disabled = !text;
    const missingMessage = pastInspection
      ? 'Giờ nghiệm thu đã qua. Hãy cập nhật ngày giờ trước khi sao chép hoặc chia sẻ.'
      : 'Điền đủ người mời, thời gian, nội dung nghiệm thu; nếu có kế hoạch đổ bê tông, hãy điền cả thời gian và hạng mục.';
    setStatus(text ? 'Đã cập nhật bản nháp trên thiết bị này. Chưa gửi tin.' : missingMessage, !text);
  }

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => event.preventDefault());

  copy.addEventListener('click', async () => {
    if (!message.value) return;
    try {
      await navigator.clipboard.writeText(message.value);
      setStatus('Đã sao chép. Hãy mở đúng nhóm Zalo, dán tin, gắn thẻ người nhận và tự bấm gửi.');
    } catch (_) {
      message.focus();
      message.select();
      setStatus('Không tự sao chép được; nội dung đã được chọn. Hãy dùng lệnh Sao chép của thiết bị.', true);
    }
  });

  share.addEventListener('click', async () => {
    if (!message.value) return;
    if (typeof navigator.share !== 'function') {
      setStatus('Trình duyệt này chưa hỗ trợ chia sẻ trực tiếp. Hãy dùng Sao chép tin rồi mở Zalo Web.', true);
      return;
    }
    try {
      await navigator.share({ text: message.value });
      setStatus('Đã mở chức năng chia sẻ. Hãy kiểm tra đúng nhóm và bấm gửi trong Zalo; trang này không xác nhận tin đã gửi.');
    } catch (error) {
      if (error?.name !== 'AbortError') setStatus('Chưa chia sẻ được. Hãy sao chép tin rồi dán vào Zalo.', true);
    }
  });

  update();
}

if (typeof document !== 'undefined') initInviteComposer();
if (typeof module !== 'undefined') module.exports = { formatInviteDateTime, buildInviteMessage };

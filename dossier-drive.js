(() => {
  "use strict";
  const clientId = "205763163202-bjketnf7ajl4pdsoq1peadjhufbrjh0p.apps.googleusercontent.com";
  const folderId = "1yfO7aow3oukxMdtkHiG1J6ytW9r3QlFY";
  let tokenClient, accessToken = "", authReject;
  function ready() {
    if (!window.google?.accounts?.oauth2) throw Error("Google Drive chưa sẵn sàng. Hãy tải lại trang.");
    tokenClient ??= google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive",
      error_callback: () => { authReject?.(Error('Cửa sổ kết nối Drive bị đóng hoặc chặn. Bấm Kết nối Google Drive để thử lại.')); },
      callback: (response) => { accessToken = response.access_token; },
    });
  }
  async function waitForGoogle() {
    for (let attempt = 0; attempt < 20; attempt++) {
      if (window.google?.accounts?.oauth2) return;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    throw Error("Google Drive chưa sẵn sàng. Hãy tải lại trang.");
  }
  async function connect() {
    return new Promise((resolve, reject) => {
      authReject=reject;
      waitForGoogle().then(() => {
        ready();
        tokenClient.callback = (response) => response.error ? reject(Error("Chưa được cấp quyền Google Drive.")) : (accessToken = response.access_token, resolve());
        tokenClient.requestAccessToken({ prompt: "select_account consent", login_hint: "luckyluong2k@gmail.com" });
      }).catch(reject);
    });
  }
  async function reconnectSilently() {
    return new Promise((resolve, reject) => {
      authReject=reject;
      waitForGoogle().then(() => {
        ready();
        tokenClient.callback = (response) => response.error ? reject(Error("Cần cấp lại quyền Google Drive.")) : (accessToken = response.access_token, resolve());
        tokenClient.requestAccessToken({ prompt: "", login_hint: "luckyluong2k@gmail.com" });
      }).catch(reject);
    });
  }
  async function save(blob, name, retry = false) {
    const status=document.getElementById('driveConnection');
    if(status)status.textContent='Đang kết nối và tải file lên Google Drive…';
    if (!accessToken) {
      throw Error("Hãy bấm Kết nối Google Drive rồi lưu lại file trong lịch sử.");
    }
    const metadata = { name, parents: [folderId], mimeType: blob.type || "application/octet-stream" };
    const boundary = "hsh_drive_boundary";
    const body = new Blob([
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
      `--${boundary}\r\nContent-Type: ${metadata.mimeType}\r\n\r\n`, blob, `\r\n--${boundary}--`,
    ], { type: `multipart/related; boundary=${boundary}` });
    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink", {
      signal: AbortSignal.timeout(60000), method: "POST", headers: { Authorization: `Bearer ${accessToken}` }, body,
    });
    if (response.status === 401 && !retry) {
      accessToken = "";
      throw Error("Phiên Drive hết hạn. Bấm Kết nối Google Drive rồi lưu lại từ lịch sử.");
    }
    if (!response.ok) throw Error("Google Drive không nhận được file (" + response.status + ").");
    const file = await response.json();
    if (!file.id) throw Error('Drive chưa trả về mã file đã lưu.');
    if(document.getElementById('driveConnection'))document.getElementById('driveConnection').textContent='Drive đã nhận file: '+file.name;
    return file;
  }
  async function remove(fileId) {
    if (!fileId) return;
    if (!accessToken) await connect();
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}`, { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } });
    if (!response.ok && response.status !== 404) throw Error("Không xóa được file trên Google Drive (" + response.status + ").");
  }
  async function verify(fileId, expectedHash) {
    if (!accessToken) await connect();
    const r = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?fields=id,name,trashed,size,sha256Checksum,webViewLink,createdTime`, {headers:{Authorization:`Bearer ${accessToken}`},cache:'no-store'});
    if (r.status === 401) { accessToken=''; throw Error('Phiên Drive hết hạn. Kết nối lại rồi kiểm tra.'); }
    if (!r.ok) throw Error('Chưa xác minh được file trên Drive ('+r.status+').');
    const file=await r.json();
    if(file.trashed) throw Error('File đang nằm trong thùng rác Drive.');
    if(!file.sha256Checksum || file.sha256Checksum!==expectedHash) throw Error('Nội dung trên Drive chưa xác nhận khớp bản xuất.');
    return file;
  }
  window.HSHDrive = { get connected() { return !!accessToken; }, connect, save, remove, verify };
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("driveConnect");
    if (!button) return;
    button.onclick = async () => {
      try { await connect(); document.getElementById("driveConnection").textContent = "Đã kết nối Google Drive. Các lần xuất mới sẽ tự lưu vào thư mục nhật ký."; }
      catch (error) { document.getElementById("driveConnection").textContent = error.message; }
    };
  });
})();

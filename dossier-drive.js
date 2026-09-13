(() => {
  "use strict";
  const clientId = "205763163202-bjketnf7ajl4pdsoq1peadjhufbrjh0p.apps.googleusercontent.com";
  const folderId = "1yfO7aow3oukxMdtkHiG1J6ytW9r3QlFY";
  let tokenClient, accessToken = "";
  function ready() {
    if (!window.google?.accounts?.oauth2) throw Error("Google Drive chưa sẵn sàng. Hãy tải lại trang.");
    tokenClient ??= google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive",
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
      waitForGoogle().then(() => {
        ready();
        tokenClient.callback = (response) => response.error ? reject(Error("Chưa được cấp quyền Google Drive.")) : (accessToken = response.access_token, resolve());
        tokenClient.requestAccessToken({ prompt: "select_account consent", login_hint: "luckyluong2k@gmail.com" });
      }).catch(reject);
    });
  }
  async function save(blob, name) {
    if (!accessToken) await connect();
    const metadata = { name, parents: [folderId], mimeType: blob.type || "application/octet-stream" };
    const boundary = "hsh_drive_boundary";
    const body = new Blob([
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
      `--${boundary}\r\nContent-Type: ${metadata.mimeType}\r\n\r\n`, blob, `\r\n--${boundary}--`,
    ], { type: `multipart/related; boundary=${boundary}` });
    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink", {
      method: "POST", headers: { Authorization: `Bearer ${accessToken}` }, body,
    });
    if (!response.ok) throw Error("Google Drive không nhận được file (" + response.status + ").");
    return response.json();
  }
  async function remove(fileId) {
    if (!fileId) return;
    if (!accessToken) await connect();
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}`, { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } });
    if (!response.ok && response.status !== 404) throw Error("Không xóa được file trên Google Drive (" + response.status + ").");
  }
  window.HSHDrive = { get connected() { return !!accessToken; }, connect, save, remove };
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("driveConnect");
    if (!button) return;
    button.onclick = async () => {
      try { await connect(); document.getElementById("driveConnection").textContent = "Đã kết nối Google Drive. Các lần xuất mới sẽ tự lưu vào thư mục nhật ký."; }
      catch (error) { document.getElementById("driveConnection").textContent = error.message; }
    };
  });
})();

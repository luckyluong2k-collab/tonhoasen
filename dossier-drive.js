(() => {
  "use strict";
  const clientId = "205763163202-bjketnf7ajl4pdsoq1peadjhufbrjh0p.apps.googleusercontent.com";
  const folderId = "1yfO7aow3oukxMdtkHiG1J6ytW9r3QlFY";
  let tokenClient, accessToken = "";
  function ready() {
    if (!window.google?.accounts?.oauth2) throw Error("Google Drive chưa sẵn sàng. Hãy tải lại trang.");
    tokenClient ??= google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (response) => { accessToken = response.access_token; },
    });
  }
  function connect() {
    return new Promise((resolve, reject) => {
      try {
        ready();
        tokenClient.callback = (response) => response.error ? reject(Error("Chưa được cấp quyền Google Drive.")) : (accessToken = response.access_token, resolve());
        tokenClient.requestAccessToken({ prompt: "consent" });
      } catch (error) { reject(error); }
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
  window.HSHDrive = { get connected() { return !!accessToken; }, connect, save };
})();

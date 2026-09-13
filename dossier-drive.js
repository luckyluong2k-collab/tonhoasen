(() => {
'use strict';
const clientId='205763163202-bjketnf7ajl4pdsoq1peadjhufbrjh0p.apps.googleusercontent.com',folderId='1yfO7aow3oukxMdtkHiG1J6ytW9r3QlFY',sessionKey='hsh-drive-session-v1';
let tokenClient,session={token:'',expires:0},connecting;
try{const saved=JSON.parse(sessionStorage.getItem(sessionKey));if(saved?.expires>Date.now()+60000)session=saved;}catch(_){}
const connected=()=>!!session.token&&session.expires>Date.now()+60000;
function status(text){const el=document.getElementById('driveConnection');if(el)el.textContent=text;}
function forget(){session={token:'',expires:0};try{sessionStorage.removeItem(sessionKey);}catch(_){}status('Cần kết nối lại Drive. File chờ vẫn được giữ trên thiết bị.');}
function connect(){
 if(connected())return Promise.resolve();
 if(connecting)return connecting;
 if(!window.google?.accounts?.oauth2)return Promise.reject(Error('Google chưa tải xong. Kiểm tra mạng rồi bấm kết nối lại.'));
 connecting=new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(Error('Chưa hoàn tất kết nối. Bấm Kết nối Drive để thử lại.')),90000);
  const fail=message=>{clearTimeout(timer);reject(Error(message));};
  tokenClient=google.accounts.oauth2.initTokenClient({client_id:clientId,scope:'https://www.googleapis.com/auth/drive',
   error_callback:()=>fail('Cửa sổ Google bị đóng hoặc chặn. Hãy bấm kết nối lại.'),
   callback:r=>{if(r.error||!r.access_token)return fail('Chưa được cấp quyền Drive.');clearTimeout(timer);session={token:r.access_token,expires:Date.now()+Number(r.expires_in||3600)*1000};try{sessionStorage.setItem(sessionKey,JSON.stringify(session));}catch(_){}status('Đã kết nối Drive. Đang gửi các file chờ.');resolve();window.dispatchEvent(new Event('hsh-drive-connected'));}
  });
  tokenClient.requestAccessToken({prompt:''});
 }).finally(()=>{connecting=null;});return connecting;
}
async function request(url,options={}){
 if(!connected()){forget();throw Error('Phiên Drive hết hạn. Bấm Kết nối Drive & gửi file chờ.');}
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),60000);
 try{const r=await fetch(url,{...options,signal:controller.signal,headers:{...options.headers,Authorization:'Bearer '+session.token},cache:'no-store'});if(r.status===401){forget();throw Error('Phiên Drive hết hạn. Kết nối lại để gửi tiếp file chờ.');}return r;}finally{clearTimeout(timer);}
}
async function reserveId(){const r=await request('https://www.googleapis.com/drive/v3/files/generateIds?count=1&space=drive&type=files');if(!r.ok)throw Error('Chưa chuẩn bị được file trên Drive ('+r.status+').');const result=await r.json();if(!result.ids?.[0])throw Error('Drive chưa cấp mã file.');return result.ids[0];}
async function findExisting(name,sha){const escape=s=>s.replaceAll('\\','\\\\').replaceAll("'","\\'");const q="'"+folderId+"' in parents and trashed = false and name = '"+escape(name)+"'";const r=await request('https://www.googleapis.com/drive/v3/files?'+new URLSearchParams({q,fields:'files(id,name,sha256Checksum)',pageSize:'100'}));if(!r.ok)throw Error('Chưa kiểm tra được file đã có trên Drive ('+r.status+').');return (await r.json()).files?.find(f=>f.sha256Checksum===sha);}
async function save(blob,name,exportId,fileId){
 const metadata={name,parents:[folderId],mimeType:blob.type||'application/octet-stream',...(fileId?{id:fileId}:{}),...(exportId?{appProperties:{hshExportId:exportId}}:{})};
 const boundary='hsh_drive_'+crypto.randomUUID();
 const body=new Blob([`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,`--${boundary}\r\nContent-Type: ${metadata.mimeType}\r\n\r\n`,blob,`\r\n--${boundary}--`],{type:`multipart/related; boundary=${boundary}`});
 const r=await request('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',{method:'POST',body});
 if(r.status===409&&fileId)return {id:fileId,name};
 if(!r.ok)throw Error('Drive chưa nhận file ('+r.status+'). File được giữ lại để gửi tiếp.');
 const file=await r.json();if(!file.id)throw Error('Drive chưa xác nhận mã file.');return file;
}
async function verify(id,sha){const r=await request('https://www.googleapis.com/drive/v3/files/'+encodeURIComponent(id)+'?fields=id,name,trashed,sha256Checksum,webViewLink');if(!r.ok)throw Error('Chưa kiểm tra được file Drive ('+r.status+').');const file=await r.json();if(file.trashed||file.sha256Checksum!==sha)throw Error('File trên Drive chưa khớp nội dung bản xuất.');return file;}
window.HSHDrive={get connected(){return connected();},connect,reserveId,findExisting,save,verify};
document.addEventListener('DOMContentLoaded',()=>{status(connected()?'Đã kết nối Drive trong phiên này.':'Chưa kết nối Drive. File xuất sẽ chờ gửi trên thiết bị.');document.getElementById('driveConnect').onclick=async()=>{try{await connect();await window.HSHArchive?.syncPending();}catch(e){status(e.message);}};});
})();

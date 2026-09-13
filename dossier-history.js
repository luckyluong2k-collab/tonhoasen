(() => {
'use strict';
const dbName='hsh-export-archive-v1',dbVersion=3,summariesStorage='hsh-export-summaries-v1',schema='hsh-export-v1',types=['diary','acceptance','defect'];
let dbPromise,folder=null,entries=[],restoreEditor,exportingBackup=false;
const $=id=>document.getElementById(id),message=t=>{$('archiveStatus').textContent=t;};
function database(){if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{const q=indexedDB.open(dbName,dbVersion);q.onupgradeneeded=()=>{const db=q.result;if(!db.objectStoreNames.contains('exports'))db.createObjectStore('exports',{keyPath:'id'});if(!db.objectStoreNames.contains('settings'))db.createObjectStore('settings');if(!db.objectStoreNames.contains('summaries'))db.createObjectStore('summaries',{keyPath:'id'});};q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);q.onblocked=()=>reject(Error('Kho đang mở ở phiên khác.'));});return dbPromise;}
async function transaction(store,mode,action){const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);let result;const q=action(tx.objectStore(store));q.onsuccess=()=>result=q.result;tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Không lưu được dữ liệu.'));});}
const hash=async blob=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer()))).map(b=>b.toString(16).padStart(2,'0')).join('');
const cleanName=name=>typeof name==='string'&&/^[a-zA-Z0-9_.-]+$/.test(name)&&!name.includes('..');
function validSnapshot(s){const r=s?.record;return r&&types.includes(r.type)&&typeof r.id==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&Number.isInteger(r.count)&&r.count>0&&r.count<=1000&&r.fields&&typeof r.fields==='object'&&!Array.isArray(r.fields)&&Object.values(r.fields).every(v=>typeof v==='string')&&r.photos&&typeof r.photos==='object'&&Object.values(r.photos).every(v=>typeof v==='string'&&/^data:image\/(png|jpeg|webp);base64,/.test(v))&&s.project&&typeof s.project==='object'&&!Array.isArray(s.project)&&Object.values(s.project).every(v=>typeof v==='string');}
function valid(meta){return validSnapshot(meta?.snapshot)&&meta.type===meta.snapshot.record.type&& meta?.schema===schema&&/^EXP-[a-zA-Z0-9-]+$/.test(meta.id)&&types.includes(meta.type)&&['pdf','png'].includes(meta.format)&&cleanName(meta.filename)&&/^[a-f0-9]{64}$/.test(meta.sha256)&&meta.snapshot?.record&&meta.snapshot?.project&&typeof meta.exportedAt==='string';}
async function permission(){try{return !!folder&&(await folder.queryPermission({mode:'readwrite'}))==='granted';}catch(e){return false;}}
async function writeFile(dir,name,data){const h=await dir.getFileHandle(name,{create:true});const stream=await h.createWritable();await stream.write(data);await stream.close();}
function metaOnly(entry){const {blob,...meta}=entry;return meta;}
function summary(entry){const {blob,snapshot,...meta}=entry;return meta;}
function saveSummariesBackup(){try{localStorage.setItem(summariesStorage,JSON.stringify(entries.slice(0,100)));}catch(e){}}
function loadSummariesBackup(){try{const raw=localStorage.getItem(summariesStorage);if(raw){const p=JSON.parse(raw);if(Array.isArray(p))return p;}}catch(e){}return [];}
async function cacheEntry(entry,add=false){
  try{
    const db=await database();
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(['exports','summaries'],'readwrite');
      try{tx.objectStore('exports')[add?'add':'put'](entry);}catch(e){}
      tx.objectStore('summaries')[add?'add':'put'](summary(entry));
      tx.oncomplete=()=>resolve();
      tx.onerror=()=>reject(tx.error);
      tx.onabort=()=>reject(tx.error||Error('Không lưu được bộ nhớ tạm.'));
    });
  }catch(err){
    try{
      const db=await database();
      if(db.objectStoreNames.contains('summaries')){
        await new Promise((res,rej)=>{
          const tx=db.transaction('summaries','readwrite');
          tx.objectStore('summaries').put(summary(entry));
          tx.oncomplete=()=>res();
          tx.onerror=()=>rej();
        });
      }
    }catch(e){}
  }
}
async function putFolder(entry){if(!await permission())throw Error('Chưa có quyền ghi vào thư mục.');const dir=await folder.getDirectoryHandle(entry.id,{create:true});await writeFile(dir,entry.filename,entry.blob);await writeFile(dir,'record.json',JSON.stringify(metaOnly(entry),null,2));return true;}
async function fromFolder(id){if(!await permission())throw Error('Hãy kết nối lại thư mục lưu.');const dir=await folder.getDirectoryHandle(id);const file=await dir.getFileHandle('record.json');const data=await file.getFile();if(data.size>25000000)throw Error('Thông tin lịch sử quá lớn.');const meta=JSON.parse(await data.text());if(!valid(meta)||meta.id!==id)throw Error('Thông tin lịch sử không hợp lệ.');const blob=await(await dir.getFileHandle(meta.filename)).getFile();if(await hash(blob)!==meta.sha256)throw Error('File không khớp bản đã lưu. Hãy dùng bản sao khác.');return {...meta,blob,folderSaved:true};}
async function loadEntry(id){let entry;try{entry=await transaction('exports','readonly',s=>s.get(id));}catch(e){}if(!entry?.blob){try{entry=await fromFolder(id);}catch(e){entry=await HSHGitHub.read(id);}}if(!valid(entry)||await hash(entry.blob)!==entry.sha256)throw Error('File lưu trữ không khớp. Không tải bản bị thay đổi.');return entry;}
async function scanFolder(){let imported=0,failed=0;if(!await permission())return {imported,failed};for await(const [id,h]of folder.entries()){if(h.kind!=='directory'||!/^EXP-[a-zA-Z0-9-]+$/.test(id))continue;try{const entry=await fromFolder(id);try{await cacheEntry(entry);}catch(e){}const index=entries.findIndex(x=>x.id===id);if(index<0)entries.push(summary(entry));else entries[index]=summary(entry);imported++;}catch(e){failed++;}}return {imported,failed};}
function downloadName(record,format,fallback){
if(record?.type!=='diary'||!/^\d{4}-\d{2}-\d{2}$/.test(record.date||''))return fallback;
return `Nhật ký thi công-${record.date.split('-').reverse().join('.')}.${format==='pdf'?'pdf':'zip'}`;
}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);}
async function refresh(isManual=false){
  try{
    const idbEntries=await transaction('summaries','readonly',s=>s.getAll());
    if(Array.isArray(idbEntries)&&idbEntries.length){entries=idbEntries;}
    else{const backup=loadSummariesBackup();if(backup.length)entries=backup;}
  }catch(e){
    const backup=loadSummariesBackup();if(backup.length)entries=backup;
    else if(isManual)message('Không mở được bộ nhớ tạm. Hãy dùng thư mục lưu và bản sao ZIP.');
  }
  if(await permission())await scanFolder();
  try{
    const remote=await HSHGitHub.list();
    for(const item of remote.entries){
      const i=entries.findIndex(e=>e.id===item.id);
      if(i<0)entries.push({...item,githubSaved:true});
      else if(entries[i].sha256===item.sha256)entries[i].githubSaved=true;
    }
  }catch(e){
    if(isManual||HSHGitHub.connected)message('Chưa đọc được lịch sử GitHub: '+e.message);
  }
  saveSummariesBackup();
  render();
}
function button(label,fn){const b=document.createElement('button');b.textContent=label;b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){message(e.message);}finally{b.disabled=false;}};return b;}
function render(highlightId=null){
  const search=$('archiveSearch').value.toLocaleLowerCase('vi'),type=$('archiveType').value,body=$('archiveList');
  body.replaceChildren();
  const filtered=entries.filter(e=>(!type||e.type===type)&&`${e.projectName} ${e.number||''} ${e.id} ${e.recordDate}`.toLocaleLowerCase('vi').includes(search)).sort((a,b)=>b.exportedAt.localeCompare(a.exportedAt));
  $('showHistory').textContent=`Lịch sử (${entries.length})`;
  $('archiveCount').textContent=`${filtered.length} / ${entries.length} lần xuất`;
  if(!filtered.length){const p=document.createElement('p');p.textContent=entries.length?'Không tìm thấy hồ sơ phù hợp.':'Chưa có lần xuất nào được lưu. Các file đã xuất trước bản cập nhật này không tự xuất hiện.';body.append(p);return;}
  for(const e of filtered){
    const row=document.createElement('article');
    row.className='archive-entry'+(e.id===highlightId?' archive-entry-highlight':'');
    const title=document.createElement('strong');
    title.textContent=`${({diary:'Nhật ký',acceptance:'Nghiệm thu',defect:'Defect List'})[e.type]}${e.number?' · '+e.number:''} · ${e.format==='pdf'?'PDF':'PNG (ZIP)'}`;
    const details=document.createElement('p');
    details.textContent=`${e.projectName} · Ngày lập ${e.recordDate} · Xuất ${new Date(e.exportedAt).toLocaleString('vi-VN')} · ${e.pages} trang`;
    const badge=document.createElement('p');
    badge.className='archive-protection';
    badge.textContent=e.githubSaved?'Đã lưu công khai trên GitHub':e.folderSaved?'Đã ghi bản sao vào thư mục tại thời điểm lưu':'Chưa có bản sao thư mục — hãy sao lưu lịch sử';
    const note=document.createElement('small');
    note.textContent=`${e.id} · File xuất để kiểm tra / trình ký; không tự xác nhận đã ký hoặc nghiệm thu đạt.`;
    const actions=document.createElement('div');
    actions.className='archive-actions';
    actions.append(button('Tải lại đúng file',async()=>{const x=await loadEntry(e.id);download(x.blob,downloadName(x.snapshot.record,x.format,x.filename));message('Đã gửi bản lưu gốc đến trình duyệt để tải.');}),button('Tạo bản sao để sửa',async()=>{const x=await loadEntry(e.id);await restoreEditor(structuredClone(x.snapshot),x.id);message('Đã mở bản sao để sửa; file lịch sử được giữ nguyên.');}));
    if(!e.githubSaved)actions.append(button('Lưu lên GitHub',async()=>{const x=await loadEntry(e.id);await HSHGitHub.save(x);x.githubSaved=true;try{await cacheEntry(x);}catch(e){}await refresh();message('Đã lưu công khai trên GitHub.');}));
    if(!e.folderSaved)actions.append(button('Ghi vào thư mục',async()=>{const x=await loadEntry(e.id);await putFolder(x);x.folderSaved=true;await cacheEntry(x);await refresh();message('Đã ghi bản sao vào thư mục.');}));
    row.append(title,details,badge,note,actions);
    body.append(row);
  }
}
async function capture(blob,context){
  if(!HSHGitHub.connected)throw Error('Hãy kết nối GitHub trước khi xuất để lưu file lịch sử an toàn.');
  const now=new Date(),id='EXP-'+now.toISOString().replace(/[^0-9]/g,'').slice(0,17)+'-'+crypto.randomUUID().slice(0,8);
  const entry={schema,id,exportedAt:now.toISOString(),sourceRecordId:context.snapshot.record.originRecordId||context.snapshot.record.id,type:context.snapshot.record.type,recordDate:context.snapshot.record.date,projectName:context.snapshot.project.name,number:context.snapshot.record.fields.number||context.snapshot.record.fields.volume||'',format:context.format,pages:context.pages,templateVersion:'word-original-v2',snapshot:structuredClone(context.snapshot),sha256:await hash(blob),filename:`${id}.${context.format==='pdf'?'pdf':'zip'}`,blob,folderSaved:false};
  let cached=false,folderError='';
  if(await permission()){try{await putFolder(entry);entry.folderSaved=true;}catch(e){folderError=e.message;}}
  if(HSHGitHub.connected){try{await HSHGitHub.save(entry);entry.githubSaved=true;}catch(e){folderError+=' '+e.message;}}
  try{await cacheEntry(entry,true);cached=true;}catch(e){}
  const item=summary(entry);
  if(entry.folderSaved)item.folderSaved=true;
  if(entry.githubSaved)item.githubSaved=true;
  const existingIdx=entries.findIndex(x=>x.id===item.id);
  if(existingIdx>=0)entries[existingIdx]={...entries[existingIdx],...item};
  else entries.unshift(item);
  saveSummariesBackup();
  render(item.id);
  const result=entry.githubSaved?'Đã lưu lịch sử công khai trên GitHub.':entry.folderSaved?'Đã lưu lịch sử và bản sao thư mục.':cached?'Đã lưu lịch sử tạm trên trình duyệt; cần sao lưu ra thư mục hoặc ZIP.':'Đã lưu lịch sử trên phiên làm việc. Hãy tải file và sao lưu ZIP.';
  message(result+(folderError?' Lỗi thư mục: '+folderError:''));
  return {entry,saved:true,folderSaved:entry.folderSaved,message:result+(folderError?' Chưa lưu đầy đủ: '+folderError:'')};
}
async function connect(){if(!window.showDirectoryPicker){message('Trình duyệt này chưa hỗ trợ chọn thư mục. Dùng “Sao lưu lịch sử ZIP”, hoặc mở bằng Chrome/Edge trên máy tính.');return;}try{folder=await showDirectoryPicker({id:'hsh-export-archive',mode:'readwrite'});await transaction('settings','readwrite',s=>s.put(folder,'folder'));const count=await scanFolder();$('archiveFolder').textContent='Thư mục lưu: '+folder.name;render();message(`Đã kết nối thư mục. Đọc được ${count.imported} bản lưu${count.failed?`; ${count.failed} mục lỗi cần kiểm tra`:''}. Các lần xuất tiếp theo sẽ tự ghi vào đây.`);}catch(e){if(e.name!=='AbortError')message('Chưa kết nối được thư mục: '+e.message);}}
async function reconnect(){if(!folder)return connect();try{if(await folder.requestPermission({mode:'readwrite'})!=='granted'){message('Chưa được cấp quyền thư mục.');return;}await refresh();$('archiveFolder').textContent='Thư mục lưu: '+folder.name;message('Đã kết nối lại và đọc lịch sử trong thư mục.');}catch(e){message('Hãy chọn lại thư mục lưu.');}}
async function backup(){if(exportingBackup)return;exportingBackup=true;try{await refresh(true);if(!entries.length){message('Chưa có lịch sử để sao lưu.');return;}const zip={},index=[];for(const meta of entries){const e=await loadEntry(meta.id);zip[`${e.id}/${e.filename}`]=new Uint8Array(await e.blob.arrayBuffer());zip[`${e.id}/record.json`]=fflate.strToU8(JSON.stringify(metaOnly(e)));index.push(e.id);}zip['archive.json']=fflate.strToU8(JSON.stringify({schema:'hsh-archive-v1',createdAt:new Date().toISOString(),ids:index}));download(new Blob([fflate.zipSync(zip,{level:0})],{type:'application/zip'}),`lich-su-ho-so-${new Date().toISOString().slice(0,10)}.zip`);message(`Đã tạo bản sao ${entries.length} lần xuất. Hãy lưu ZIP ngoài trình duyệt, chẳng hạn thư mục đồng bộ Drive/OneDrive.`);}catch(e){message('Chưa sao lưu được đầy đủ: '+e.message);}finally{exportingBackup=false;}}
async function importZip(file){if(!file)return;try{if(file.size>250000000)throw Error('Bản sao vượt 250 MB. Hãy khôi phục từ thư mục.');let total=0;const zip=fflate.unzipSync(new Uint8Array(await file.arrayBuffer()),{filter:f=>{total+=f.originalSize;if(total>300000000)throw Error('Dữ liệu giải nén vượt giới hạn 300 MB.');return true;}});const index=JSON.parse(fflate.strFromU8(zip['archive.json']));if(index.schema!=='hsh-archive-v1'||!Array.isArray(index.ids)||index.ids.length>1000)throw Error('Không đúng file sao lưu lịch sử.');const incoming=[];
for(const id of index.ids){if(!/^EXP-[a-zA-Z0-9-]+$/.test(id))throw Error('Mã lịch sử không hợp lệ.');const meta=JSON.parse(fflate.strFromU8(zip[`${id}/record.json`]));if(!valid(meta)||meta.id!==id)throw Error('Thông tin bản sao không hợp lệ.');const bytes=zip[`${id}/${meta.filename}`];if(!bytes)throw Error('Bản sao thiếu file xuất.');const blob=new Blob([bytes],{type:meta.format==='pdf'?'application/pdf':'application/zip'});if(await hash(blob)!==meta.sha256)throw Error('File trong bản sao đã thay đổi hoặc hỏng.');incoming.push({...meta,blob,folderSaved:false});}
let imported=0;for(const e of incoming){const existing=await transaction('exports','readonly',s=>s.get(e.id));if(existing){if(existing.sha256!==e.sha256)throw Error('Trùng mã nhưng khác nội dung. Bản đang có được giữ nguyên.');continue;}if(await permission()){await putFolder(e);e.folderSaved=true;}await cacheEntry(e,true);imported++;}await refresh(true);message(`Đã khôi phục ${imported} bản; không ghi đè bản đã có.`);
}catch(e){message('Chưa khôi phục xong: '+e.message);}finally{$('archiveImportFile').value='';}}
async function init(onRestore){restoreEditor=onRestore;$('githubConnect').onclick=async()=>{const input=$('githubToken'),value=input.value;input.value='';try{await HSHGitHub.connect(value);$('githubConnection').textContent='Đã kết nối. Các lần xuất mới tự lưu công khai lên GitHub trong phiên này.';}catch(e){$('githubConnection').textContent=e.message;}};$('githubDisconnect').onclick=()=>{HSHGitHub.disconnect();$('githubConnection').textContent='Đã ngắt kết nối ghi. Vẫn xem và tải lịch sử công khai được.';};$('githubRefresh').onclick=()=>refresh(true);$('showHistory').onclick=()=>$('exportArchive').scrollIntoView({behavior:'smooth',block:'start'});$('archiveSearch').oninput=()=>render();$('archiveType').onchange=()=>render();$('archiveConnect').onclick=connect;$('archiveReconnect').onclick=reconnect;$('archiveBackup').onclick=backup;$('archiveImport').onclick=()=>$('archiveImportFile').click();$('archiveImportFile').onchange=e=>importZip(e.target.files[0]);try{folder=await transaction('settings','readonly',s=>s.get('folder'));if(folder)$('archiveFolder').textContent='Thư mục đã chọn: '+folder.name+(await permission()?'':' — cần kết nối lại');}catch(e){}await refresh();}
window.HSHArchive={init,capture,refresh,downloadName,setType(type){$('archiveType').value=type;render();}};
})();


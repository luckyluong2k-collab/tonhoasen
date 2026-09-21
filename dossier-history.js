(() => {
'use strict';
const dbName='hsh-export-archive-v1',dbVersion=3,summariesStorage='hsh-export-summaries-v1',schema='hsh-export-v1',types=['diary','acceptance','defect'];
let dbPromise,folder=null,entries=[],restoreEditor,exportingBackup=false;
const $=id=>document.getElementById(id),message=t=>{$('archiveStatus').textContent=t;};
function database(){if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{const q=indexedDB.open(dbName,dbVersion);q.onupgradeneeded=()=>{const db=q.result;if(!db.objectStoreNames.contains('exports'))db.createObjectStore('exports',{keyPath:'id'});if(!db.objectStoreNames.contains('settings'))db.createObjectStore('settings');if(!db.objectStoreNames.contains('summaries'))db.createObjectStore('summaries',{keyPath:'id'});};q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);q.onblocked=()=>reject(Error('Kho đang mở ở phiên khác.'));});return dbPromise;}
async function transaction(store,mode,action){const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);let result;const q=action(tx.objectStore(store));q.onsuccess=()=>result=q.result;tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Không lưu được dữ liệu.'));});}
const hash=async blob=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer()))).map(b=>b.toString(16).padStart(2,'0')).join('');
const cleanName=name=>typeof name==='string'&&name.length>0&&!/[\\/:*?"<>|\u0000-\u001f]/.test(name)&&!name.includes('..');
function validSnapshot(s){const r=s?.record;return r&&types.includes(r.type)&&typeof r.id==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&Number.isInteger(r.count)&&r.count>0&&r.count<=1000&&r.fields&&typeof r.fields==='object'&&!Array.isArray(r.fields)&&Object.values(r.fields).every(v=>typeof v==='string')&&r.photos&&typeof r.photos==='object'&&Object.values(r.photos).every(v=>typeof v==='string'&&/^data:image\/(png|jpeg|webp);base64,/.test(v))&&s.project&&typeof s.project==='object'&&!Array.isArray(s.project)&&Object.values(s.project).every(v=>typeof v==='string');}
function valid(meta){return validSnapshot(meta?.snapshot)&&meta.type===meta.snapshot.record.type&& meta?.schema===schema&&/^EXP-[a-zA-Z0-9-]+$/.test(meta.id)&&types.includes(meta.type)&&['pdf','png','zip'].includes(meta.format)&&cleanName(meta.filename)&&/^[a-f0-9]{64}$/.test(meta.sha256)&&meta.snapshot?.record&&meta.snapshot?.project&&typeof meta.exportedAt==='string';}
async function permission(){try{return !!folder&&(await folder.queryPermission({mode:'readwrite'}))==='granted';}catch(e){return false;}}
async function writeFile(dir,name,data){const h=await dir.getFileHandle(name,{create:true});const stream=await h.createWritable();await stream.write(data);await stream.close();}
function metaOnly(entry){const {blob,...meta}=entry;return meta;}
function summary(entry){const {blob,snapshot,...meta}=entry;return meta;}
function saveSummariesBackup(){try{localStorage.setItem(summariesStorage,JSON.stringify(entries));}catch(e){}}
function loadSummariesBackup(){try{const raw=localStorage.getItem(summariesStorage);if(raw){const p=JSON.parse(raw);if(Array.isArray(p))return p;}}catch(e){}return [];}
async function cacheEntry(entry,add=false){
 const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction(['exports','summaries'],'readwrite');tx.objectStore('exports')[add?'add':'put'](entry);tx.objectStore('summaries')[add?'add':'put'](summary(entry));tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Chưa lưu được dữ liệu trên thiết bị.'));});
}
async function putFolder(entry){if(!await permission())throw Error('Chưa có quyền ghi vào thư mục.');const dir=await folder.getDirectoryHandle(entry.id,{create:true});await writeFile(dir,entry.filename,entry.blob);await writeFile(dir,'record.json',JSON.stringify(metaOnly(entry),null,2));return true;}
async function fromFolder(id){if(!await permission())throw Error('Hãy kết nối lại thư mục lưu.');const dir=await folder.getDirectoryHandle(id);const file=await dir.getFileHandle('record.json');const data=await file.getFile();if(data.size>25000000)throw Error('Thông tin lịch sử quá lớn.');const meta=JSON.parse(await data.text());if(!valid(meta)||meta.id!==id)throw Error('Thông tin lịch sử không hợp lệ.');const blob=await(await dir.getFileHandle(meta.filename)).getFile();if(await hash(blob)!==meta.sha256)throw Error('File không khớp bản đã lưu. Hãy dùng bản sao khác.');return {...meta,blob,folderSaved:true};}
async function loadEntry(id){let entry;try{entry=await transaction('exports','readonly',s=>s.get(id));}catch(e){}if(!entry?.blob){try{entry=await fromFolder(id);}catch(e){throw Error('Không có bản gốc trên thiết bị. Hãy mở file trên Drive hoặc khôi phục bản sao.');}}if(!valid(entry)||await hash(entry.blob)!==entry.sha256)throw Error('File lưu trữ không khớp. Không tải bản bị thay đổi.');return entry;}
async function scanFolder(){let imported=0,failed=0;if(!await permission())return {imported,failed};for await(const [id,h]of folder.entries()){if(h.kind!=='directory'||!/^EXP-[a-zA-Z0-9-]+$/.test(id))continue;try{const entry=await fromFolder(id);try{await cacheEntry(entry);}catch(e){}const index=entries.findIndex(x=>x.id===id);if(index<0)entries.push(summary(entry));else entries[index]=summary(entry);imported++;}catch(e){failed++;}}return {imported,failed};}
function downloadName(record,format,fallback){
if(fallback && !fallback.startsWith('EXP-'))return fallback;
if(record?.type!=='diary'||!/^\d{4}-\d{2}-\d{2}$/.test(record.date||''))return fallback;
if(typeof fallback==='string'&&fallback.startsWith('Bìa nhật ký thi công-'))return fallback;
return `Nhật ký thi công-${record.date.split('-').reverse().join('.')}.${format==='pdf'?'pdf':'zip'}`;
}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);}
async function refreshDrive(){
 if(!HSHDrive.connected)return;
 const files=await HSHDrive.list(),seen=new Set(files.map(f=>f.id));
 // Remove obsolete remote-only rows from the index, never delete locally stored exports.
 for(const old of entries.filter(e=>e.remoteOnly&&!seen.has(e.driveFileId)))await transaction('summaries','readwrite',store=>store.delete(old.id));
 entries=entries.filter(e=>!e.remoteOnly||seen.has(e.driveFileId));
 for(const file of files){
  const props=file.appProperties||{};
  const existing=entries.find(e=>e.driveFileId===file.id)||entries.find(e=>e.id===props.hshExportId&&e.sha256===file.sha256Checksum)||entries.find(e=>e.filename===file.name&&e.sha256&&e.sha256===file.sha256Checksum);
  const type=types.includes(props.hshType)?props.hshType:(existing?.type||'diary');
  const date=/^\d{4}-\d{2}-\d{2}$/.test(props.hshRecordDate||'')?props.hshRecordDate:existing?.recordDate||'';
  const exportedAt=Number.isFinite(Date.parse(props.hshExportedAt))?props.hshExportedAt:existing?.exportedAt||file.createdTime;
  const row={...existing,id:existing?.id||'DRIVE-'+file.id,type,filename:file.name,format:file.mimeType==='application/pdf'?'pdf':(existing?.format||'zip'),recordDate:date,exportedAt,pages:props.hshPages||existing?.pages||'',sha256:existing?.sha256||file.sha256Checksum,driveFileId:file.id,driveSaved:true,remoteOnly:existing?.remoteOnly??!existing,driveError:'',projectName:existing?.projectName||'',timeFromDrive:!props.hshExportedAt&&!existing?.exportedAt};
  if(!existing?.remoteOnly&&existing?.sha256&&existing.sha256===file.sha256Checksum)row.driveVerifiedAt=new Date().toISOString();
  else if(existing?.sha256&&existing.sha256!==file.sha256Checksum){row.driveVerifiedAt=null;row.driveError='Nội dung Drive khác bản gốc trên máy này.';}
  const index=entries.findIndex(e=>e.id===row.id);if(index<0)entries.push(row);else entries[index]=row;
  await transaction('summaries','readwrite',store=>store.put(row));
 }
 saveSummariesBackup();render();
 $('sharedHistoryStatus').textContent='Lịch sử chung: '+files.length+' file trên Drive · cập nhật '+new Date().toLocaleTimeString('vi-VN');
}
async function refresh(isManual=false){
  try{
    const idbEntries=await transaction('summaries','readonly',s=>s.getAll());
    if(Array.isArray(idbEntries)&&idbEntries.length){entries=[...new Map([...loadSummariesBackup(),...entries,...idbEntries].map(e=>[e.id,e])).values()];}
    else{const backup=loadSummariesBackup();if(backup.length)entries=backup;}
  }catch(e){
    const backup=loadSummariesBackup();if(backup.length)entries=backup;
    else if(isManual)message('Không mở được bộ nhớ tạm. Hãy dùng thư mục lưu và bản sao ZIP.');
  }
  if(await permission())await scanFolder();
  if(HSHDrive.connected){try{await refreshDrive();}catch(error){message(error.message);}}
  saveSummariesBackup();
  render();
}
function button(label,fn){const b=document.createElement('button');b.textContent=label;b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){message(e.message);}finally{b.disabled=false;}};return b;}
function render(highlightId=null){
  const search=$('archiveSearch').value.toLocaleLowerCase('vi'),type=$('archiveType').value,body=$('archiveList');
  body.replaceChildren();
  const latestAcceptance=entries.filter(e=>e.type==='acceptance').sort((a,b)=>b.exportedAt.localeCompare(a.exportedAt))[0]?.id;
  const visibleEntries=entries.filter(e=>e.type!=='acceptance'||e.id===latestAcceptance);
  const filtered=visibleEntries.filter(e=>(!type||e.type===type)&&`${e.projectName} ${e.number||''} ${e.id} ${e.recordDate} ${e.filename||''} ${e.exportedAt}`.toLocaleLowerCase('vi').includes(search)).sort((a,b)=>b.exportedAt.localeCompare(a.exportedAt));
  $('showHistory').textContent=`Lịch sử (${visibleEntries.length})`;
  $('archiveCount').textContent=`${filtered.length} / ${visibleEntries.length} lần xuất`;
  if(!filtered.length){const p=document.createElement('p');p.textContent=entries.length?'Không tìm thấy hồ sơ phù hợp.':'Chưa có lần xuất nào được lưu. Các file đã xuất trước bản cập nhật này không tự xuất hiện.';body.append(p);return;}
  for(const e of filtered){
    const row=document.createElement('article');
    row.className='archive-entry'+(e.id===highlightId?' archive-entry-highlight':'');
    const title=document.createElement('strong');
    title.textContent=`${({diary:'Nhật ký',acceptance:'Nghiệm thu',defect:'Defect List'})[e.type]}${e.number?' · '+e.number:''} · ${e.format==='pdf'?'PDF':e.format==='zip'?'PDF từng ngày (ZIP)':'PNG (ZIP)'}`;
    const fileName=document.createElement('h3');fileName.className='archive-filename';fileName.textContent=e.filename||'Chưa ghi nhận tên file';
    const time=document.createElement('p');time.className='archive-export-time';time.textContent=(e.timeFromDrive?'Lưu Drive lúc ':'Xuất lúc ')+new Date(e.exportedAt).toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',hour12:false})+' (giờ Việt Nam)';
    const details=document.createElement('p');
    details.textContent=[e.recordDate?'Ngày nhật ký: '+e.recordDate.split('-').reverse().join('/'):'',e.pages?e.pages+' trang':''].filter(Boolean).join(' · ');
    const badge=document.createElement('p');
    badge.className='archive-protection';
    badge.dataset.state=e.driveVerifiedAt?'verified':e.driveSaved?'uploaded':'pending';badge.textContent=e.driveVerifiedAt?'Drive: nội dung khớp bản xuất · kiểm tra '+new Date(e.driveVerifiedAt).toLocaleString('vi-VN'):e.driveSaved?'Drive: đã nhận file; chưa kiểm tra nội dung':'Chờ gửi lên Drive';if(e.driveError)badge.textContent+=' · '+e.driveError;
    const note=document.createElement('small');
    note.textContent=`${e.id} · File xuất để kiểm tra / trình ký; không tự xác nhận đã ký hoặc nghiệm thu đạt.`;
    const actions=document.createElement('div');
    actions.className='archive-actions';
    actions.append(button('Tải file',async()=>{
      if(e.remoteOnly){await HSHDrive.connect();const blob=await HSHDrive.download(e.driveFileId);if(e.sha256&&await hash(blob)!==e.sha256)throw Error('File trên Drive đã thay đổi. Cập nhật lịch sử trước khi tải.');download(blob,e.filename);}
      else{const x=await loadEntry(e.id);download(x.blob,e.filename||x.filename);}
      message('Đã gửi file đến trình duyệt để tải.');
    }));
    if(!e.remoteOnly&&e.templateVersion!=='sheet-diary')actions.append(button('Sửa bản sao',async()=>{const x=await loadEntry(e.id);await restoreEditor(structuredClone(x.snapshot),x.id);message('Đã mở bản sao để sửa.');}));

    if(e.driveFileId && e.driveSaved){
      const open=document.createElement('a');open.href='https://drive.google.com/file/d/'+encodeURIComponent(e.driveFileId)+'/view';open.target='_blank';open.rel='noopener';open.textContent='Mở file trên Drive';actions.append(open);

    }
    if(!e.remoteOnly&&!e.driveVerifiedAt)actions.append(button(e.driveSaved?'Kiểm tra lại':'Gửi lên Drive',async()=>{await HSHDrive.connect();const x=await loadEntry(e.id);await cacheEntry(x);await syncPending();}));
    const info=document.createElement('div');info.className='archive-file-info';info.append(fileName,details);
    row.append(info,time,badge,actions);
    body.append(row);
  }
}
async function capture(blob,context){
  const now=new Date(),id='EXP-'+now.toISOString().replace(/[^0-9]/g,'').slice(0,17)+'-'+crypto.randomUUID().slice(0,8);
  const entry={schema,id,exportedAt:now.toISOString(),sourceRecordId:context.snapshot.record.originRecordId||context.snapshot.record.id,type:context.snapshot.record.type,recordDate:context.snapshot.record.date,projectName:context.snapshot.project.name,number:context.snapshot.record.fields.number||context.snapshot.record.fields.volume||'',format:context.format,pages:context.pages,templateVersion:context.snapshot.source==='sheet-diary'?'sheet-diary':'word-original-v2',snapshot:structuredClone(context.snapshot),sha256:await hash(blob),filename:context.filename||`${id}.${context.format==='pdf'?'pdf':'zip'}`,blob,folderSaved:false};
  const stamp=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now).replaceAll('/','.').replace(', ','_').replaceAll(':','-');
  if(entry.type==='diary')entry.filename=(entry.filename.startsWith('Bìa ')?'Bìa nhật ký thi công-':'Nhật ký thi công-')+stamp.split('_')[0]+'.'+(entry.format==='pdf'?'pdf':'zip');
  entry.filename=entry.filename.replace(/\.(pdf|zip)$/i,`-xuất-${stamp}.${String(now.getMilliseconds()).padStart(3,'0')}.$1`);
  let cached=false,folderError='';
  try{await cacheEntry(entry,true);cached=true;}catch(e){folderError='Chưa lưu trên thiết bị: '+e.message;}

  const initial=summary(entry);
  entries.unshift(initial);saveSummariesBackup();render(initial.id);
  setTimeout(() => syncPending().catch(error=>message(error.message)),0);

  const result=cached?'Đã lưu file trên thiết bị. '+(HSHDrive.connected?'Đang gửi lên Drive.':'Bấm Kết nối Drive & gửi file chờ để sao lưu.'):'Chưa lưu được lịch sử trên thiết bị. Hãy tải file xuống ngay.';
  message(result+(folderError?' '+folderError:''));
  return {entry,saved:cached,message:result};
}
let syncing=null;
async function syncPending(){
 if(syncing)return syncing;
 if(!HSHDrive.connected)return;
 const run=async()=>{
  // Only local files belong to the automatic upload queue; legacy remote-only rows remain readable.
  const local=await transaction('exports','readonly',store=>store.getAll());
  const pending=local.filter(e=>e.blob&&(!e.driveVerifiedAt||!e.driveMetadataShared)).sort((a,b)=>b.exportedAt.localeCompare(a.exportedAt));
  let done=0;
  for(const item of pending){
   if(!HSHDrive.connected||navigator.onLine===false)break;
   let x=await loadEntry(item.id);
   if(x.driveVerifiedAt&&x.driveMetadataShared)continue;
   message('Đang gửi / kiểm tra Drive: '+x.filename);
   try{
    if(!x.driveFileId){
     const existing=await HSHDrive.findExisting(x.filename,x.sha256);
     if(existing){x.driveFileId=existing.id;x.driveSaved=true;}
     else x.driveFileId=await HSHDrive.reserveId();
     // Persist the same Drive ID before upload, so a timeout never creates another copy.
     await cacheEntry(x);
    }
    if(!x.driveSaved){await HSHDrive.save(x.blob,x.filename,x.id,x.driveFileId);x.driveSaved=true;x.driveUploadedAt=new Date().toISOString();await cacheEntry(x);}
    const file=await HSHDrive.verify(x.driveFileId,x.sha256);
    x.driveVerifiedAt=new Date().toISOString();x.driveName=file.name;x.driveError='';
    await HSHDrive.describe(x);x.driveMetadataShared=true;done++;
   }catch(error){x.driveError=error.name==='AbortError'?'Mạng chậm; file đang chờ gửi lại.':error.message;}
   await cacheEntry(x);
   const index=entries.findIndex(e=>e.id===x.id);if(index<0)entries.unshift(summary(x));else entries[index]=summary(x);
   saveSummariesBackup();render();
  }
  await refreshDrive();
  const remaining=entries.filter(e=>!e.remoteOnly&&!e.driveVerifiedAt).length;
  message(done+' file đã xác minh trên Drive.'+(remaining?' Còn '+remaining+' file chưa xác minh; xem trạng thái từng dòng.':' Đã cập nhật lịch sử chung từ Drive.'));
 };
 syncing=(navigator.locks?navigator.locks.request('hsh-drive-upload',run):run()).finally(()=>{syncing=null;});
 return syncing;
}
async function init(onRestore){
 restoreEditor=onRestore;
 try{folder=await transaction('settings','readonly',store=>store.get('folder'));}catch(_){}
 $('showHistory').onclick=()=>$('exportArchive').scrollIntoView({behavior:'smooth',block:'start'});
 $('driveRefresh').onclick=async()=>{try{await HSHDrive.connect();await syncPending();await refreshDrive();}catch(error){message(error.message);}};
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&HSHDrive.connected)refreshDrive().catch(error=>message(error.message));});
 $('archiveSearch').oninput=()=>render();$('archiveType').onchange=()=>render();
 await refresh();
 window.addEventListener('hsh-drive-connected',()=>syncPending().catch(e=>message(e.message)));
 window.addEventListener('online',()=>syncPending().catch(e=>message(e.message)));
 setInterval(()=>{if(HSHDrive.connected&&navigator.onLine)syncPending().catch(e=>message(e.message));},60000);
 await syncPending();
}
window.HSHArchive={init,capture,refresh,downloadName,syncPending,setType(type){$('archiveType').value=type;render();}};
})();


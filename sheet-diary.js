(()=>{'use strict';
const SHEET_ID='1QfMS1lw68LlCQCmaR0weB5WHq9DjfRg4HKrbTjRQ_3Y';
const CLIENT_ID='205763163202-bjketnf7ajl4pdsoq1peadjhufbrjh0p.apps.googleusercontent.com';
const TAB='NHẬT KÝ DỮ LIỆU';
let weather=['Nắng','Nắng nhẹ','Nắng nóng','Nhiều mây','Âm u','Mưa nhỏ','Mưa rào','Mưa lớn','Giông','Khô ráo'];
const states=['Nháp','Đã nhập','Đã kiểm tra','Đã chốt'];
const suggestion={env:'Thu gom phế thải, vệ sinh khu vực thi công cuối ca; đảm bảo lối đi thông thoáng.',safe:'Kiểm tra PPE và điều kiện an toàn trước khi thi công; nhắc nhở công nhân tuân thủ biện pháp an toàn.'};
let token='',tokenClient=null,data=[],meta=[],config={},saving=false;
const draftKey='hsh-sheet-diary-draft-v1';
try{const saved=JSON.parse(localStorage.getItem(draftKey)||'null');if(saved){data=saved.data;meta=saved.meta;config=saved.config||{};}}catch(_){}
function persist(){try{localStorage.setItem(draftKey,JSON.stringify({data,meta,config}));}catch(e){setProg('Không lưu được bản nháp trên máy: '+e.message);throw e;}}
function collect(){document.querySelectorAll('#rows tr[data-i]').forEach(tr=>{if(!tr.querySelector('[data-k]'))return;const i=Number(tr.dataset.i);const row=readRow(tr);if(JSON.stringify(row)!==JSON.stringify(data[i])){data[i]=row;meta[i].dirty=true;}});persist();}
const normalize=r=>Array.from({length:14},(_,i)=>String(r?.[i]??''));
function applyConfig(){suggestion.env=config['Gợi ý vệ sinh môi trường']||suggestion.env;suggestion.safe=config['Gợi ý an toàn lao động']||suggestion.safe;if(config['Danh sách thời tiết'])weather=config['Danh sách thời tiết'].split('|').map(s=>s.trim()).filter(Boolean);}
applyConfig();

const $=id=>document.getElementById(id); const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setStatus(s){$('status').textContent=s;const b=$('connect');b.classList.toggle('connected',!!token);b.textContent=token?'✓ Đã kết nối Google':'Kết nối Google';} function setProg(s){$('progress').textContent=s||''}
function isoToVi(v){if(!v)return ''; if(/^\d{4}-\d{2}-\d{2}$/.test(v)){const [y,m,d]=v.split('-');return `${d}/${m}/${y}`}return v}
function viToIso(v){const m=String(v||'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);return m?`${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`:(/^\d{4}-\d{2}-\d{2}$/.test(v)?v:'')}
function opts(list,val){return list.map(x=>`<option ${x===val?'selected':''}>${esc(x)}</option>`).join('')}
const columns=[[0,'Ngày','date'],[1,'Thời tiết sáng','weather'],[2,'Thời tiết chiều','weather'],[5,'Số công nhân','number'],[13,'Cán bộ quản lý','text'],[7,'Thiết bị thi công','textarea'],[3,'Nội dung công việc','textarea'],[11,'Ý kiến đơn vị thi công','textarea'],[10,'Nhận xét chủ đầu tư','textarea']];
function render(){const body=$('rows');body.innerHTML='';if(!meta.some(m=>m.dirty||!m.row||m.editing)){data.push([new Date().toLocaleDateString('en-GB',{timeZone:'Asia/Ho_Chi_Minh'}),...Array(13).fill('')]);meta.push({row:null,dirty:true,base:null});persist();}const indices=data.map((_,i)=>i);const drafts=indices.filter(i=>meta[i].dirty||!meta[i].row||meta[i].editing);const saved=indices.filter(i=>!drafts.includes(i)).sort((a,b)=>viToIso(data[b][0]).localeCompare(viToIso(data[a][0])));let divider=false;[...drafts,...saved].forEach(i=>{const r=data[i],isSaved=saved.includes(i);if(isSaved&&!divider){const heading=document.createElement('tr');heading.className='diary-history-heading';heading.innerHTML='<td colspan="10">Đã lưu trên Google Sheet · '+saved.length+' ngày</td>';body.append(heading);divider=true;}const tr=document.createElement('tr');tr.dataset.i=i;tr.className=isSaved?'diary-saved-row':'diary-entry-row';if(isSaved){tr.innerHTML=columns.map(([k,label])=>`<td data-label="${label}">${esc(r[k])}</td>`).join('')+'<td><button class="mini save" data-act="edit">Sửa</button></td>';body.append(tr);return;}tr.innerHTML=columns.map(([k,label,type])=>`<td data-label="${label}">${type==='weather'?`<select aria-label="${label}" data-k="${k}"><option value=""></option>${opts([...new Set([...weather,...(r[k]?[r[k]]:[])])],r[k])}</select>`:type==='textarea'?`<textarea aria-label="${label}" data-k="${k}">${esc(r[k])}</textarea>`:`<input aria-label="${label}" type="${type}" ${type==='number'?'min="0"':''} data-k="${k}" value="${esc(k===0?viToIso(r[k]):r[k])}">`}</td>`).join('')+`<td><div class="row-actions"><button class="mini save" data-act="save">Lưu</button><button class="mini delete" data-act="delete">Xóa</button></div></td>`;body.append(tr);});if(!data.length)addLocalRow();}
function readRow(tr){const a=normalize(data[Number(tr.dataset.i)]);tr.querySelectorAll('[data-k]').forEach(el=>{const k=+el.dataset.k;a[k]=k===0?isoToVi(el.value):el.value});return a}
function addLocalRow(src){collect();meta.push({row:null,dirty:true,base:null});const today=new Date();const iso=today.toISOString().slice(0,10);const r=src?[...src]:[isoToVi(iso),'','','','','','','','','','','','',''];data.push(r);persist();render();requestAnimationFrame(()=>{const t=$('rows').lastElementChild;t?.scrollIntoView({block:'center'});t?.querySelector('input')?.focus()})}
async function auth(){if(token)return token;if(!window.google?.accounts?.oauth2)throw Error('Google chưa tải xong. Hãy thử lại sau vài giây.');return new Promise((resolve,reject)=>{tokenClient=google.accounts.oauth2.initTokenClient({client_id:CLIENT_ID,scope:'https://www.googleapis.com/auth/spreadsheets',callback:r=>{if(r.error)return reject(Error(r.error));token=r.access_token;setTimeout(()=>{token='';setStatus('Phiên Google hết hạn. Bấm kết nối lại.');},Math.max(1,Number(r.expires_in||3600)-60)*1000);setStatus('Đã kết nối Google Sheet');resolve(token)},error_callback:()=>reject(Error('Cửa sổ đăng nhập Google bị đóng hoặc chặn.'))});tokenClient.requestAccessToken({prompt:''})})}
async function api(url,opt={},retry=true){
 try{await auth();}catch(e){e.notWritten=true;throw e;}
 const r=await fetch(url,{...opt,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json',...(opt.headers||{})}});
 if(r.status===401){token='';setStatus('Cần kết nối lại Google');if(retry)return api(url,opt,false);const e=Error('Phiên Google hết hạn. Bấm Kết nối Google để tiếp tục.');e.notWritten=true;throw e;}
 if(!r.ok){let body={};try{body=await r.json();}catch(_){}const disabled=body.error?.details?.some(d=>d.reason==='SERVICE_DISABLED');
 const e=Error(disabled?'Google Sheets API chưa được bật cho dự án 205763163202. Chủ dự án cần bật API, sau đó bấm Lưu lại. Bản nháp vẫn được giữ trên máy.':r.status===403?'Google từ chối quyền sửa bảng tính. Kiểm tra tài khoản Google và quyền chỉnh sửa Sheet; bản nháp vẫn được giữ.':r.status===429?'Google đang giới hạn lượt truy cập. Đợi một lát rồi bấm Lưu lại.':`Chưa lưu được lên Sheet (lỗi ${r.status}). Bản nháp vẫn được giữ trên máy.`);
 e.notWritten=r.status>=400&&r.status<500&&r.status!==408;throw e;
 }return r.status===204?null:r.json();
}
async function resolvePending(m,row){
 const result=await api(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'${TAB}'!A2:N`)}`);
 const attempted=normalize(m.attempt||row);
 const matches=(result.values||[]).map((r,i)=>({row:i+2,values:normalize(r)})).filter(x=>JSON.stringify(x.values)===JSON.stringify(attempted));
 if(matches.length>1)throw Error('Có nhiều dòng trùng nội dung trên Sheet. Hãy đối chiếu trước khi lưu để tránh ghi nhầm.');
 if(matches.length===1){m.row=matches[0].row;m.base=matches[0].values;}
 m.uncertain=false;delete m.attempt;persist();
}
async function load(){if(saving)return;collect();setProg('Đang tải…');try{
 const range=encodeURIComponent(`'${TAB}'!A2:N`);
 const j=await api(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}`);
 const pending=data.map((r,i)=>({r,m:meta[i]})).filter(x=>x.m.dirty&&rowHasContent(x.r));
 for(const x of pending.filter(x=>x.m.uncertain)){
 const matches=(j.values||[]).map((r,i)=>({r:normalize(r),row:i+2})).filter(v=>JSON.stringify(v.r)===JSON.stringify(x.r));
 if(matches.length===1){x.m.row=matches[0].row;x.m.base=matches[0].r;x.m.dirty=false;x.m.uncertain=false;}
 else if(matches.length===0)x.m.uncertain=false;
 }
 const next=[],maps=[];
 (j.values||[]).forEach((r,i)=>{if(!r.some(v=>String(v||'').trim()))return;const row=i+2,local=pending.find(x=>x.m.row===row);next.push(local?local.r:normalize(r));maps.push(local?local.m:{row,base:normalize(r),dirty:false});});
 for(const x of pending)if(!x.m.row||!maps.some(m=>m.row===x.m.row)){next.push(x.r);maps.push(x.m);}
 data=next;meta=maps;
 let configMessage='';try{const c=await api(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent("'CẤU HÌNH'!A1:B100")}`);config=Object.fromEntries((c.values||[]).filter(r=>r[0]&&r[1]).map(r=>[r[0].trim(),r[1]]));applyConfig();}catch(e){configMessage=' · Chưa tải cấu hình: '+e.message;}
 persist();render();setProg(`${data.length} ngày · Giữ các bản nháp chưa lưu`+configMessage);
 const ds=data.map(r=>viToIso(r[0])).filter(Boolean).sort();if(ds.length){$('fromDate').value=ds[0];$('toDate').value=ds.at(-1);}
 }catch(e){setProg(e.message);}}
async function checkUnchanged(m){const j=await api(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'${TAB}'!A${m.row}:N${m.row}`)}`);if(JSON.stringify(normalize(j.values?.[0]))!==JSON.stringify(normalize(m.base)))throw Error('Dòng trên Sheet đã thay đổi hoặc di chuyển. Bản nháp được giữ; hãy đối chiếu Sheet trước khi lưu.');}
async function saveIndex(i){if(saving)return;collect();const row=[...data[i]],m=meta[i];if(!row[0])return alert('Hãy chọn ngày.');saving=true;setProg('Đang lưu…');try{
 if(m.uncertain){setProg('Đang kiểm tra lần lưu trước trên Sheet…');await resolvePending(m,row);}
 if(m.row){await checkUnchanged(m);await api(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'${TAB}'!A${m.row}:N${m.row}`)}?valueInputOption=RAW`,{method:'PUT',body:JSON.stringify({values:[row]})});}
 else {await auth();m.attempt=[...row];m.uncertain=true;persist();const result=await api(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'${TAB}'!A:N`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,{method:'POST',body:JSON.stringify({values:[row]})});const match=result.updates?.updatedRange?.match(/!A(\d+):/);if(!match)throw Error('Chưa xác nhận vị trí dòng mới.');m.row=Number(match[1]);m.uncertain=false;delete m.attempt;}
 m.base=row;m.dirty=JSON.stringify(data[i])!==JSON.stringify(row);m.editing=false;persist();render();setProg('Đã lưu đúng dòng '+m.row+' trên Sheet.');
 }catch(e){if(e.notWritten&&!m.row){m.uncertain=false;delete m.attempt;persist();}setProg(e.message);}finally{saving=false;}}
async function deleteIndex(i){if(saving||!confirm('Xóa dòng này khỏi bảng dữ liệu?'))return;collect();saving=true;try{const m=meta[i];if(m.uncertain)throw Error('Kiểm tra lần thêm chưa xác nhận trên Sheet trước khi xóa bản nháp.');if(m.row){await checkUnchanged(m);await api(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'${TAB}'!A${m.row}:N${m.row}`)}:clear`,{method:'POST',body:'{}'});}data.splice(i,1);meta.splice(i,1);persist();render();setProg('Đã xóa đúng dòng.');}catch(e){setProg(e.message);}finally{saving=false;}}
function rowHasContent(r){return [1,2,3,5,7,10,11,13].some(k=>String(r[k]||'').trim());}
let templateImage;
async function renderCanvas(r){
 const L=HSH_TEMPLATE_LAYOUT;
 if(!templateImage)templateImage=new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('Không tải được mẫu nhật ký trang 4.'));im.src='assets/hoa-sen/templates/03-4.svg';});
 await document.fonts.load('12px "HSH Serif"');
 const canvas=document.createElement('canvas');canvas.width=Math.round(L.width*3);canvas.height=Math.round(L.height*3);const c=canvas.getContext('2d');c.scale(3,3);c.fillStyle='white';c.fillRect(0,0,L.width,L.height);c.drawImage(await templateImage,0,0,L.width,L.height);
 const iso=viToIso(r[0]);const values={day:iso?`ngày ${iso.slice(8)} tháng ${iso.slice(5,7)} năm ${iso.slice(0,4)}`:r[0],weather:r[1],afternoon:r[2],workers:r[5],managers:r[13],equipment:r[7],work:r[3],opinion:r[11],review:r[10]};
 function wrap(text,w){const lines=[];for(const paragraph of String(text).split('\n')){let line='';for(const word of paragraph.split(/\s+/)){const next=line?line+' '+word:word;if(c.measureText(next).width>w&&line){lines.push(line);line=word;}else line=next;}lines.push(line);}return lines;}
 for(const f of L.diary[3].fields){const text=values[f.key];if(!text)continue;const h=f.key==='equipment'?40:f.h;let size=f.size,lines;
 do{c.font=`${size}px "HSH Serif"`;lines=wrap(text,f.w);if(lines.length*size*1.15<=h&&lines.every(line=>c.measureText(line).width<=f.w))break;size-=0.5;}while(size>=9);
 if(size<9)throw Error(`Ngày ${r[0]}: ${f.label} quá dài cho ô mẫu trang 4. Hãy rút gọn trước khi xuất.`);
 c.fillStyle='white';c.fillRect(f.x,f.y,f.w,h);c.fillStyle='black';c.textBaseline='alphabetic';lines.forEach((line,i)=>c.fillText(line,f.x,f.y+size*.891+i*size*1.15));
 }
 return canvas;
}
function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
async function exportBatch(){collect();const from=$('fromDate').value,to=$('toDate').value;if(!from||!to)return alert('Chọn khoảng ngày cần xuất.');const selected=structuredClone(data).map((r,i)=>({r,i,d:viToIso(r[0])})).filter(x=>x.d&&x.d>=from&&x.d<=to&&rowHasContent(x.r)).sort((a,b)=>a.d.localeCompare(b.d));if(!selected.length)return alert('Không có ngày có dữ liệu trong khoảng đã chọn.');if(!$('combined').checked&&!$('individual').checked)return alert('Chọn PDF hoặc ZIP.');const btn=$('exportNow');btn.disabled=true;const zip={};let combined=null;try{const {jsPDF}=window.jspdf;if($('combined').checked)combined=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true});for(let n=0;n<selected.length;n++){const {r,d}=selected[n];setProg(`Đang xuất ${n+1}/${selected.length}: ${r[0]}`);const canvas=await renderCanvas(r);const img=canvas.toDataURL('image/jpeg',.92);if(combined){if(n)combined.addPage();combined.addImage(img,'JPEG',0,0,210,297,undefined,'FAST')}if($('individual').checked){const single=new jsPDF({orientation:'p',unit:'mm',format:'a4',compress:true});single.addImage(img,'JPEG',0,0,210,297,undefined,'FAST');zip[`NK_${d}_${n+1}.pdf`]=new Uint8Array(single.output('arraybuffer'))}}
if(combined){await archiveAndDownload(combined.output('blob'),`Nhật ký thi công-${from}-${to}-xuất-${stamp()}.pdf`,'pdf',selected)}if($('individual').checked){const bytes=fflate.zipSync(zip,{level:6});await archiveAndDownload(new Blob([bytes],{type:'application/zip'}),`Nhật ký thi công-${from}-${to}-xuất-${stamp()}.zip`,'zip',selected)}setProg(`Đã xuất ${selected.length} ngày ✓`)}catch(e){alert('Xuất PDF lỗi: '+e.message);setProg('')}finally{btn.disabled=false}}
$('connect').onclick=()=>auth().then(load).catch(e=>alert(e.message));$('refresh').onclick=load;$('add').onclick=()=>addLocalRow();$('copyYesterday').onclick=()=>{collect();const last=data.filter(rowHasContent).slice().sort((a,b)=>viToIso(a[0]).localeCompare(viToIso(b[0]))).at(-1);if(!last)return addLocalRow();const c=[...last];const d=viToIso(c[0]);if(d){const x=new Date(d+'T12:00:00');x.setDate(x.getDate()+1);c[0]=isoToVi(x.toISOString().slice(0,10))}c[10]='';c[11]='';addLocalRow(c)};$('toggleExport').onclick=()=>$('exportPanel').classList.toggle('open');$('exportNow').onclick=exportBatch;
$('rows').onclick=e=>{const b=e.target.closest('[data-act]');if(!b)return;const tr=b.closest('tr'),i=+tr.dataset.i;if(b.dataset.act==='edit'){collect();meta[i].editing=true;render();$('rows').querySelector(`[data-i="${i}"]`)?.scrollIntoView({block:'center'});}if(b.dataset.act==='save')saveIndex(i);if(b.dataset.act==='delete')deleteIndex(i)};
$('rows').addEventListener('input',collect);$('rows').addEventListener('change',collect);
window.addEventListener('beforeunload',e=>{if(saving){e.preventDefault();e.returnValue='';}});
const stamp=()=>new Date().toLocaleString('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'}).replace(/[ :]/g,'-')+'-'+String(Date.now()).slice(-3);
async function archiveAndDownload(blob,name,format,selected){
 const snapshot={source:'sheet-diary',project:{name:config['Tên công trình']||'Hoa Sen Home Phủ Lý'},record:{id:crypto.randomUUID(),type:'diary',date:selected[0].d,count:selected.length,fields:{sheetRows:JSON.stringify(selected.map(x=>x.r)),config:JSON.stringify(config)},photos:{}}};
 const archived=await HSHArchive.capture(blob,{snapshot,format,pages:selected.length,filename:name});download(blob,archived.entry.filename);
}
HSHArchive.init(async()=>{throw Error('Bản xuất bảng tính được giữ nguyên. Sửa nhật ký trong bảng phía trên rồi xuất bản mới.');}).catch(e=>setProg(e.message));
setTimeout(()=>{if(!token&&window.google?.accounts?.oauth2)setStatus('Sẵn sàng kết nối Google Sheet')},1200);render();
})();

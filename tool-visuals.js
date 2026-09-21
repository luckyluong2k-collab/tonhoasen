/* Geometry illustrations only. Quantity calculations remain in app.js. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const value = (id, fallback) => $(id)?.value || fallback;
  const num = (id, fallback = 0) => {
    const raw = $(id)?.value;
    const n = Number(raw === undefined || raw === '' ? fallback : raw);
    return Number.isFinite(n) ? Math.max(0, n) : fallback;
  };
  const fmt = n => Number(n).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
  const esc = str => String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const colors = { concrete: '#b4c7d4', top: '#e0e9ed', side: '#829eaf', steel: '#526d82', brick: '#cc7855', mortar: '#f1dfcc', water: '#218ba7', orange: '#d78330', red: '#b63645', green: '#1c7b69' };
  const line = (x1, y1, x2, y2, color = '#527086', extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" ${extra}/>`;
  const poly = (points, fill = colors.concrete, extra = '') => `<polygon points="${points}" fill="${fill}" stroke="#526d82" stroke-width="1.2" stroke-linejoin="round" ${extra}/>`;
  const text = (x, y, label, extra = '') => `<text x="${x}" y="${y}" class="viz-text" ${extra}>${esc(label)}</text>`;
  function tag(x, y, label, field = '', color = '#21475c') {
    const w = Math.max(52, label.length * 7.4 + 20);
    return `<g ${field ? `class="viz-hotspot" role="button" tabindex="0" data-viz-field="${field}" aria-label="Nhập ${esc(label)}"` : ''}><rect x="${x - w / 2}" y="${y - 16}" width="${w}" height="29" rx="8" fill="#fff" stroke="${field ? '#aac7d6' : '#e0e8eb'}"/>${text(x, y + 3, label, `text-anchor="middle" style="fill:${color}"`)}</g>`;
  }
  function dim(x1, y1, x2, y2, label, field) {
    const dx = x2 - x1, dy = y2 - y1, length = Math.hypot(dx, dy) || 1;
    const px = -dy / length * 4, py = dx / length * 4;
    return line(x1, y1, x2, y2, '#597f95') + line(x1 - px, y1 - py, x1 + px, y1 + py) + line(x2 - px, y2 - py, x2 + px, y2 + py) + tag((x1 + x2) / 2, (y1 + y2) / 2, label, field);
  }
  function box(x, y, w, h, dx = 48, dy = -30, front = colors.concrete, top = colors.top, side = colors.side) {
    return poly(`${x},${y} ${x + dx},${y + dy} ${x + w + dx},${y + dy} ${x + w},${y}`, top)
      + poly(`${x + w},${y} ${x + w + dx},${y + dy} ${x + w + dx},${y + h + dy} ${x + w},${y + h}`, side)
      + poly(`${x},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h}`, front);
  }
  const ground = () => `<ellipse cx="239" cy="245" rx="172" ry="15" fill="#d4e2e8" opacity=".55"/>`;
  const meta = (title, subtitle, drawing, formula, legend, note = 'Hình minh họa nguyên lý.') => ({ title, subtitle, drawing, formula, legend, note });

  function concrete() {
    const type = value('t1_struct', 'footing'), l = num('t1_len', 2.2), b = num('t1_wid', 2), h = num('t1_hgt', .7), n = num('t1_qty', 8);
    const labels = { footing: 'Móng đơn vát', strip_footing: 'Móng băng', beam: 'Dầm / đà kiềng', column: 'Cột bê tông', slab: 'Sàn bê tông' };
    let drawing = ground();
    let legend = [['Bê tông', colors.concrete], ['Mặt trên', colors.top]];
    let formula = 'V = L × B × H × số cấu kiện';
    if (type === 'footing') {
      const base = num('t1_base_h', .15), taper = num('t1_taper_h', .2), neck = num('t1_neck_h', .35);
      const tl = num('t1_top_len', .6), tb = num('t1_top_wid', .6);
      const total = base + taper + neck;
      const basePx = clamp(base / (total || 1) * 150, 12, 50);
      const taperPx = clamp(taper / (total || 1) * 150, 16, 65);
      const neckPx = clamp(neck / (total || 1) * 150, 24, 95);
      const topY = 223 - basePx, shoulderY = topY - taperPx;
      const neckW = clamp(tl / (l || 1) * 208, 28, 160), nx = 120 + (208 - neckW) / 2;
      drawing += box(120, topY, 208, basePx, 44, -24);
      drawing += poly(`120,${topY} 164,${topY - 24} ${nx + 44},${shoulderY - 24} ${nx},${shoulderY}`, '#dce6eb');
      drawing += poly(`328,${topY} 372,${topY - 24} ${nx + neckW + 44},${shoulderY - 24} ${nx + neckW},${shoulderY}`, '#8aa6b5');
      drawing += poly(`120,${topY} ${nx},${shoulderY} ${nx + neckW},${shoulderY} 328,${topY}`, '#b6cfdb');
      drawing += box(nx, shoulderY - neckPx, neckW, neckPx, 44, -24, '#77b3be', '#c6e6e8', '#4d8d9e');
      drawing += dim(120, 256, 328, 256, `L ${fmt(l)} m`, 't1_len');
      drawing += dim(353, 241, 397, 215, `B ${fmt(b)} m`, 't1_wid');
      drawing += dim(71, shoulderY - neckPx, 71, 223, `H ${fmt(total)} m`);
      drawing += tag(260, 30, `Cổ ${fmt(tl)} × ${fmt(tb)} m`, 't1_top_len');
      formula = 'V móng = V đế phẳng + V phần vát + V cổ cột';
      legend = [[`Đế ${fmt(base)} m`, colors.concrete], [`Vát ${fmt(taper)} m`, '#b6cfdb'], [`Cổ ${fmt(neck)} m`, '#77b3be']];
    } else {
      const isColumn = type === 'column', isSlab = type === 'slab';
      const w = isColumn ? clamp(l / (b || 1) * 76, 48, 150) : 244;
      const hp = isColumn ? 155 : isSlab ? clamp(h * 50, 9, 28) : clamp(h / (l || 1) * 244, 24, 92);
      const x = isColumn ? 193 : 86, y = isColumn ? 72 : 165 - hp / 2;
      const dx = isSlab ? 80 : 46, dy = isSlab ? -70 : -27;
      drawing += box(x, y, w, hp, dx, dy);
      if (type === 'strip_footing') {
        for (const offset of [35, 115, 195]) drawing += box(x + offset, y - 28, 22, 28, 24, -15, '#77b3be', '#c6e6e8', '#4d8d9e');
      }
      if (type === 'beam') {
        for (let i = 20; i < 235; i += 32) drawing += line(x + i, y + 6, x + i, y + hp - 6, '#648595', 'stroke-dasharray="3 3"');
      }
      drawing += dim(x, 257, x + w, 257, `${isColumn ? 'a' : 'L'} ${fmt(l)} m`, 't1_len');
      drawing += dim(52, y, 52, y + hp, `H ${fmt(h)} m`, 't1_hgt');
      drawing += tag(359, 224, `${isColumn ? 'b' : 'B'} ${fmt(b)} m`, 't1_wid');
    }
    return meta(labels[type] || labels.footing, `${fmt(n)} cấu kiện · ${value('t1_grade', 'M250')}`, drawing, formula, legend, 'Phối cảnh quy ước. Số đo lấy từ ô nhập; đà kiềng tính riêng.');
  }

  function steel() {
    const type = value('t2_type', 'rebar'), d = num('t2_dia', 16), l = num('t2_len', 11.7), n = num('t2_qty', 48);
    let drawing = ground(), title, legend;
    if (type === 'rebar') {
      const r = clamp(d * .62, 5, 22);
      drawing += `<path d="M110 ${174 - r} L358 ${104 - r} Q${375 + r} 104 358 ${104 + r} L110 ${174 + r} Z" fill="#7c93a4" stroke="#425d73" stroke-width="2"/>`;
      drawing += `<ellipse cx="110" cy="174" rx="${r * .55}" ry="${r}" fill="#c4d4dd" stroke="#425d73" stroke-width="2"/>`;
      if (d > 8) for (let i = 0; i < 12; i++) drawing += line(131 + i * 18, 166 - i * 5 - r, 134 + i * 18, 166 - i * 5 + r, '#425d73');
      drawing += `<circle cx="374" cy="192" r="27" fill="#c4d4dd" stroke="#425d73" stroke-width="2"/>` + dim(342, 238, 406, 238, `Ø${fmt(d)} mm`, 't2_dia');
      drawing += dim(112, 226, 300, 172, `l ${fmt(l)} m`, 't2_len');
      drawing += text(370, 147, 'MẶT CẮT', 'text-anchor="middle"');
      title = d <= 8 ? 'Thép tròn trơn' : 'Thép thanh vằn';
      legend = [['Thân thép', '#7c93a4'], ['Tiết diện tròn', '#c4d4dd']];
    } else {
      // Extrude the actual open/closed section, including the return lips of C sections.
      const profiles = {
        i_beam: [[95,140],[165,140],[165,151],[137,151],[137,218],[165,218],[165,229],[95,229],[95,218],[123,218],[123,151],[95,151]],
        c_purlin: [[95,140],[165,140],[165,165],[157,165],[157,148],[103,148],[103,221],[157,221],[157,204],[165,204],[165,229],[95,229]],
        box_tube: [[95,140],[155,140],[155,229],[95,229]]
      };
      const profile = profiles[type] || profiles.i_beam;
      const dx = 192, dy = -84;
      drawing += poly(profile.map(([x,y]) => `${x+dx},${y+dy}`).join(' '), '#b8cbd5');
      profile.forEach(([x,y], i) => {
        const [xx,yy] = profile[(i+1)%profile.length];
        drawing += poly(`${x},${y} ${xx},${yy} ${xx+dx},${yy+dy} ${x+dx},${y+dy}`, i%2 ? '#7e98aa' : '#b8cbd5');
      });
      drawing += poly(profile.map(p => p.join(',')).join(' '), '#d1dfe6');
      if (type === 'box_tube') drawing += `<rect x="103" y="148" width="44" height="73" fill="#526b7c"/><path d="M103 221L140 199V148" fill="none" stroke="#92acbb"/>`;
      drawing += dim(169, 253, 361, 169, `l ${fmt(l)} m`, 't2_len');
      drawing += dim(58, 140, 58, 229, type === 'i_beam' ? '350 mm' : type === 'c_purlin' ? '125 mm' : '100 mm');
      title = { i_beam: 'Thép hình I-350 × 175 × 7 × 11', c_purlin: 'Xà gồ C125 × 50 × 20 × 2', box_tube: 'Thép hộp 50 × 100 × 2' }[type];
      legend = [['Tiết diện', '#d1dfe6'], ['Chiều dài thanh', '#7e98aa']];
    }
    return meta(title, `${fmt(n)} thanh · ${fmt(l)} m/thanh`, drawing, type === 'rebar' ? 'P = (d² / 162) × chiều dài × số thanh' : 'P = khối lượng mỗi mét × chiều dài × số thanh', legend, 'Chiều dày và gân thép được phóng đại để dễ nhìn.');
  }

  function grout() {
    if (value('t3_mode', 'sika') === 'sika') {
      const h = num('t3_thick', 50), gap = clamp(h * .42, 10, 40);
      let drawing = ground() + box(109, 189, 220, 46, 48, -27);
      drawing += box(136, 189-gap, 158, gap, 48, -27, '#e2ac56', '#f7dca8', '#b5843f');
      drawing += box(129, 181-gap, 176, 8, 48, -27, '#667d90', '#a4b8c7', '#3a586e');
      drawing += box(207, 61, 35, 120-gap, 29, -18, '#6f8fa3', '#d3e0e7', '#486a80');
      for (const x of [148,280]) drawing += `<rect x="${x}" y="${167-gap}" width="7" height="${55+gap}" rx="2" fill="#536877"/><ellipse cx="${x+3}" cy="${178-gap}" rx="10" ry="4" fill="#bdcbd2" stroke="#536877"/>`;
      drawing += dim(136, 260, 304, 260, `${value('t3_baseplate','450x300')} mm`, 't3_baseplate');
      drawing += dim(390, 189-gap, 390, 189, `h ${fmt(h)} mm`, 't3_thick');
      return meta('Rót vữa dưới bản mã chân cột', `${fmt(num('t3_col_qty',8))} vị trí · mặt cắt phối cảnh`, drawing, 'V grout = dài bản mã × rộng bản mã × khe hở × số vị trí', [['Bản mã thép', '#667d90'], ['Vữa grout', '#e2ac56'], ['Bệ bê tông', colors.concrete]], 'Màu vàng là thể tích khe vữa được tính. Bu lông minh họa.');
    }
    const d = value('t3_rebar_size','16'), hole = {16:20,18:22,20:25}[d] || 20, depth = {16:160,18:180,20:200}[d] || 160;
    let drawing = ground() + box(123,104,203,126,42,-24);
    drawing += `<rect x="196" y="105" width="38" height="111" rx="6" fill="#e2ac56" stroke="#bb7a28"/><rect x="206" y="40" width="18" height="167" rx="4" fill="#718897" stroke="#425d73"/>`;
    for (let y=46;y<205;y+=13) drawing += line(206,y,224,y+6,'#425d73');
    drawing += dim(344,105,344,216,`${depth} mm`,'t3_rebar_size') + tag(141,72,`Lỗ Ø${hole}`,'t3_rebar_size') + tag(288,35,`Thép D${d}`,'t3_rebar_size');
    return meta('Lỗ khoan cấy thép • mặt cắt', `${fmt(num('t3_hole_qty',32))} lỗ khoan`, drawing, 'Keo nằm trong khe giữa thép và thành lỗ khoan', [['Bê tông',colors.concrete],['Keo cấy','#e2ac56'],['Thép','#718897']], 'Hình thể hiện thông số lựa chọn trong công cụ; chiều sâu neo theo hồ sơ thiết kế.');
  }

  function brick() {
    const double = value('t4_wall_type','wall200') === 'wall200', l = num('t4_len',28.5), h = num('t4_hgt',3.6), opening = num('t4_minus',12);
    const area = l*h, faceH = clamp(h / (l || 1) * 850, 95, 153), y = 218-faceH;
    let drawing = ground() + box(90,y,263,faceH,double?35:18,-20,colors.brick,'#edb895','#a6593b');
    for (let row=0; row<Math.floor(faceH/15); row++) {
      const yy=y+row*15;
      drawing += line(90,yy,353,yy,colors.mortar,'stroke-width="2"');
      for (let xx=90+(row%2?19:0);xx<353;xx+=38) drawing += line(xx,yy,xx,Math.min(yy+15,218),colors.mortar,'stroke-width="2"');
    }
    if (opening>0) {
      const size = Math.sqrt(clamp(opening/(area||1),.03,.65));
      const ow=263*size, oh=faceH*size, ox=215-ow/2, oy=y+(faceH-oh)/2;
      drawing += `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" fill="#f1f7f8" stroke="#813c27" stroke-width="3"/>`;
      drawing += line(ox,oy+oh,ox+ow,oy,'#a0b4be','stroke-dasharray="4 4"');
    }
    drawing += dim(90,254,353,254,`L ${fmt(l)} m`,'t4_len') + dim(51,y,51,218,`H ${fmt(h)} m`,'t4_hgt');
    drawing += tag(273,34,`Trừ cửa ${fmt(opening)} m²`,'t4_minus') + tag(369,83,`t ${double?200:100} mm`,'t4_wall_type');
    return meta(`Tường gạch ${double?200:100} mm`, `Gạch 8 × 8 × 19 cm · ${value('t4_mortar_grade','M75')}`, drawing, 'Diện tích xây = dài × cao − tổng diện tích lỗ mở', [['Gạch xây',colors.brick],['Mạch vữa',colors.mortar],['Lỗ mở','#f1f7f8']], 'Lỗ mở gộp để minh họa. Tường 200 quy ước 2 lớp gạch; chưa gồm vữa trát.');
  }

  function tile() {
    const size=value('t5_tile_size','600x600'), dims=size.split('x').map(Number), area=num('t5_area',185), waste=num('t5_waste',5);
    let drawing=ground() + box(85,164,245,20,76,-80,'#aebfc6','#e8edf0','#8198a6');
    const cols=4, rows=dims[0]===dims[1]?4:6, cellW=245/cols, sx=76/rows, sy=80/rows;
    for(let row=0;row<rows;row++) for(let col=0;col<cols;col++) {
      const x=85+col*cellW+row*sx, y=164-row*sy;
      drawing += poly(`${x+2},${y-2} ${x+cellW-2},${y-2} ${x+cellW+sx-2},${y-sy+2} ${x+sx+2},${y-sy+2}`, (row+col)%2?'#bbd3db':'#e5eff0');
    }
    drawing+=tag(255,39,`A ${fmt(area)} m²`,'t5_area')+tag(208,225,`${size.replace('x',' × ')} mm`,'t5_tile_size');
    return meta('Lát nền • phối cảnh chia viên', `Hao hụt cắt ${fmt(waste)}%`,drawing,'Diện tích mua = diện tích lát × (1 + hao hụt / 100)',[['Gạch nguyên','#e5eff0'],['Gạch lát','#bbd3db'],['Lớp nền','#aebfc6']], 'Các hàng gạch minh họa quy cách, không biểu diễn tổng số viên của toàn bộ diện tích.');
  }

  function paint() {
    const type=value('t6_paint_type','wall_ext'), floor=type==='floor_epoxy', steel=type==='steel_alkyd';
    const layerNames=steel?['Nền thép','Chống rỉ','Sơn phủ']:floor?['Nền bê tông','Sơn lót','Phủ lớp 1','Phủ lớp 2']:['Tường / bả','Sơn lót','Phủ lớp 1','Phủ lớp 2'];
    const fills=['#aebfc6','#efc786','#8bbbbb','#397f8a'];
    let drawing=ground();
    layerNames.forEach((name,i)=>{
      if(floor) drawing+=box(105,205-i*38,205,i===0?19:6,74,-32,fills[i],fills[i],fills[i]);
      else drawing+=box(102+i*69,93,16,126,36,-24,fills[i],fills[i],fills[i]);
      drawing+=text(floor?390:125+i*69,floor?205-i*38:246,name,`text-anchor="middle" style="font-size:11px"`);
    });
    drawing+=tag(246,30,`A ${fmt(num('t6_area',450))} m²`,'t6_area');
    return meta(floor?'Sàn epoxy • tách lớp':steel?'Sơn kết cấu thép • tách lớp':`Sơn ${type==='wall_int'?'nội':'ngoại'} thất • tách lớp`,'Nền → xử lý → lót → phủ',drawing,'Lượng sơn phụ thuộc diện tích, số lớp và độ phủ',layerNames.map((name,i)=>[name,fills[i]]),'Các lớp được tách và phóng đại chiều dày để nhìn rõ thứ tự thi công.');
  }

  function roof() {
    const slope=num('t7_slope',15), area=num('t7_roof_area',380), pipe=value('t7_pipe_dia','110');
    const rise=clamp(slope*1.25,4,93), top=119-rise;
    let drawing=ground();
    drawing+=box(95,158,239,67,57,-29,'#dce5e9','#ecf2f4','#c0cfd7');
    drawing+=poly(`79,157 136,128 263,${top} 206,${top+29}`,'#78a9b6');
    drawing+=poly(`206,${top+29} 263,${top} 405,132 348,161`,'#adcbd3');
    for(let i=1;i<10;i++) {
      const x=206+(348-206)*i/10, yy=top+29+(161-top-29)*i/10;
      drawing+=line(x,yy,x+57,yy-29,'#658f9e');
    }
    drawing+=`<path d="M347 166L401 136L403 222Q403 235 385 235" fill="none" stroke="#218ba7" stroke-width="8" stroke-linecap="round"/>`;
    drawing+=`<path d="M274 119L318 146M318 146L305 144M318 146L313 133" fill="none" stroke="#19778e" stroke-width="3"/>`;
    drawing+=tag(191,36,`Dốc ${fmt(slope)}%`,'t7_slope')+tag(218,254,`A chiếu ${fmt(area)} m²`,'t7_roof_area')+tag(390,80,`D${pipe}`,'t7_pipe_dia');
    return meta('Mái tôn, máng xối & ống đứng',`Mưa ${fmt(num('t7_rain_intensity',420))} mm/h`,drawing,'A mái = A chiếu / cos(arctan(i / 100)) · Q = mưa × A chiếu / 3.600',[['Tôn mái','#adcbd3'],['Dòng nước / ống','#218ba7']],'Mũi tên chỉ hướng nước từ mái về máng. Góc nhìn và cao độ là minh họa.');
  }

  function roomScene(pccc=false) {
    let drawing=poly('93,160 277,104 398,173 214,235','#e1ebee');
    drawing+=poly('93,160 93,69 277,23 277,104','#d2e1e7');
    drawing+=poly('277,23 398,88 398,173 277,104','#bdcfd8');
    if(pccc) {
      for(const [x,y] of [[171,66],[283,88],[238,116]]) {
        drawing+=`<ellipse cx="${x}" cy="${y+87}" rx="46" ry="17" fill="#f7d99c" opacity=".36" stroke="#d8a041" stroke-dasharray="4 4"/>`;
        drawing+=`<ellipse cx="${x}" cy="${y}" rx="12" ry="6" fill="#fff" stroke="#688194"/><path d="M${x-9} ${y+2}Q${x} ${y+14} ${x+9} ${y+2}" fill="#dce7ec" stroke="#688194"/><circle cx="${x}" cy="${y+4}" r="2" fill="#b63645"/>`;
      }
      drawing+=`<rect x="337" y="136" width="20" height="43" rx="7" fill="#b63645" stroke="#76232e"/><rect x="343" y="128" width="7" height="11" fill="#425d73"/><path d="M344 129H359V150" fill="none" stroke="#425d73" stroke-width="3"/><rect x="340" y="148" width="14" height="13" fill="#fff"/>`;
    } else {
      for(const [x,y] of [[163,72],[218,59],[280,84],[224,99],[337,116],[280,132]]) {
        drawing+=poly(`${x-10},${y+2} ${x+10},${y+2} ${x+35},${y+72} ${x-35},${y+72}`,'#f7d479','opacity=".16" stroke="none"');
        drawing+=`<ellipse cx="${x}" cy="${y+72}" rx="36" ry="14" fill="#f7d479" opacity=".25"/>`;
        drawing+=poly(`${x-12},${y} ${x},${y-5} ${x+12},${y} ${x},${y+5}`,'#fff4cc');
      }
    }
    return drawing;
  }
  function lighting() {
    const room=value('t8_room_type','showroom'), area=num('t8_area',320), lux=room==='showroom'?500:room==='office'?300:150;
    const drawing=roomScene()+tag(233,262,`A ${fmt(area)} m²`,'t8_area')+tag(92,34,`${lux} lux`,'t8_room_type')+tag(338,36,`${fmt(num('t8_total_kw',35))} kW`,'t8_total_kw');
    return meta('Chiếu sáng không gian',room==='showroom'?'Showroom':room==='office'?'Văn phòng':'Kho / xưởng',drawing,'Số đèn = độ rọi × diện tích / (quang thông × UF × MF)',[['Đèn','#fff4cc'],['Vùng chiếu minh họa','#f7d479']],'Vị trí và số đèn trong hình chỉ mô tả không gian; số lượng tính toán xem bên dưới.');
  }
  function pccc() {
    const drawing=roomScene(true)+tag(230,262,`A ${fmt(num('t9_area',650))} m²`,'t9_area')+dim(60,69,60,160,`H ${fmt(num('t9_ceiling_hgt',4.5))} m`,'t9_ceiling_hgt');
    return meta('Đầu báo & bình chữa cháy','Mặt cắt không gian',drawing,'Đối chiếu diện tích bảo vệ, chiều cao trần và vị trí thiết bị',[['Đầu báo','#dce7ec'],['Vùng minh họa','#f7d99c'],['Bình chữa cháy','#b63645']],'Vùng màu là minh họa nguyên lý, không phải bán kính bảo vệ hoặc phương án bố trí được duyệt.');
  }
  function gate(data={}) {
    const names=['Bản vẽ','Vật liệu','Thi công','Hồ sơ'];
    let drawing=line(89,114,388,114,'#b8cbd5','stroke-width="5"');
    names.forEach((name,i)=>{
      const x=87+i*100;
      drawing+=`<rect x="${x-29}" y="82" width="58" height="65" rx="13" fill="#e2eef1" stroke="#83a5b7"/>`;
      drawing+=text(x,124,String(i+1),'text-anchor="middle" style="font-size:26px;fill:#236575"')+text(x,177,name,'text-anchor="middle"');
    });
    drawing+=tag(236,233,`${data.done||0} / ${data.total||0} điều kiện đã kiểm tra`);
    return meta('Trước khi nghiệm thu',data.title||'Kiểm tra tại hiện trường',drawing,'Đối chiếu bản vẽ → vật liệu → thi công → hồ sơ',[['4 nhóm đối chiếu','#83a5b7']],'Tiến độ bên dưới lấy từ các điều kiện anh đã đánh dấu.');
  }

  const renderers={1:concrete,2:steel,3:grout,4:brick,5:tile,6:paint,7:roof,8:lighting,9:pccc,10:gate};
  const snapshots=new Map();
  let dialog, opener, savedOverflow;
  function illustration(data) {
    return `<svg class="viz-drawing" viewBox="0 0 480 290" role="group" aria-label="${esc(data.title)}"><title>${esc(data.title)}</title><desc>${esc(data.note)}</desc>${data.drawing}</svg>
      <div class="viz-legend">${data.legend.map(([name,color])=>`<span><i style="background:${color}" aria-hidden="true"></i>${esc(name)}</span>`).join('')}</div>
      <div class="viz-formula">${esc(data.formula)}</div><p class="viz-note">${esc(data.note)}</p>`;
  }
  function render(id,data) {
    const target=$(`t${id}_geometry`);
    if(!target || !renderers[id]) return;
    const model=renderers[id](data);
    snapshots.set(id,model);
    target.classList.add('tool-visual');
    target.innerHTML=`<div class="viz-heading"><div><strong>${esc(model.title)}</strong><small>${esc(model.subtitle)}</small></div><button class="viz-expand" type="button" data-viz-open="${id}" aria-label="Phóng to: ${esc(model.title)}"><span aria-hidden="true">⛶</span> Phóng to</button></div>${illustration(model)}`;
    if(dialog?.open && Number(dialog.dataset.tool)===id) renderDialog(model);
  }
  function renderDialog(model) {
    $('viz-dialog-title').textContent=model.title;
    $('viz-dialog-content').innerHTML=illustration(model);
  }
  function open(id,button) {
    if(!snapshots.has(id)) return;
    if(!dialog) {
      dialog=document.createElement('dialog');
      dialog.className='viz-dialog';
      dialog.setAttribute('aria-labelledby','viz-dialog-title');
      dialog.innerHTML='<div class="viz-dialog-head"><h2 id="viz-dialog-title"></h2><button type="button" class="viz-close" aria-label="Đóng hình phóng to">Đóng ×</button></div><div id="viz-dialog-content"></div><p class="viz-dialog-tip">Bấm kích thước để quay về ô nhập tương ứng.</p>';
      document.body.appendChild(dialog);
      dialog.querySelector('.viz-close').addEventListener('click',()=>dialog.close());
      dialog.addEventListener('click',e=>{ if(e.target===dialog) dialog.close(); });
      dialog.addEventListener('close',()=>{
        document.body.style.overflow=savedOverflow;
        opener?.focus({preventScroll:true});
      });
    }
    opener=button;
    dialog.dataset.tool=id;
    renderDialog(snapshots.get(id));
    savedOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    dialog.showModal();
    dialog.querySelector('.viz-close').focus();
  }
  function focusField(field) {
    const input=$(field);
    if(!input) return;
    if(dialog?.open) dialog.close();
    // close event restores the trigger first; focus the requested input afterwards.
    requestAnimationFrame(()=>{
      input.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
      input.focus({preventScroll:true});
      document.querySelectorAll('.viz-input-active').forEach(el=>el.classList.remove('viz-input-active'));
      input.classList.add('viz-input-active');
      input.addEventListener('blur',()=>input.classList.remove('viz-input-active'),{once:true});
    });
  }
  function init() {
    const root=$('tab-tools');
    if(!root) return;
    const cards=[...root.querySelectorAll('.tool-card')];
    const groups=['structure','structure','structure','finish','finish','finish','mep','mep','mep','inspection'];
    cards.forEach((card,i)=>{
      card.dataset.toolGroup=groups[i];
      card.id=`field-tool-${i+1}`;
      card.querySelectorAll('.form-group').forEach(group=>{
        const label=group.querySelector('label'), input=group.querySelector('input,select');
        if(label && input?.id) label.htmlFor=input.id;
      });
    });
    root.querySelectorAll('[data-tool-filter]').forEach(button=>button.addEventListener('click',()=>{
      root.querySelectorAll('[data-tool-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
      let shown=0;
      cards.forEach(card=>{card.hidden=button.dataset.toolFilter!=='all' && card.dataset.toolGroup!==button.dataset.toolFilter; if(!card.hidden) shown++;});
      $('tools-filter-status').textContent=`Đang hiển thị ${shown} công cụ`;
    }));
    document.addEventListener('click',e=>{
      const expand=e.target.closest('[data-viz-open]'), field=e.target.closest('[data-viz-field]');
      if(expand) open(Number(expand.dataset.vizOpen),expand);
      if(field) focusField(field.dataset.vizField);
    });
    document.addEventListener('keydown',e=>{
      const field=e.target.closest('[data-viz-field]');
      if(field && (e.key==='Enter'||e.key===' ')) {e.preventDefault();focusField(field.dataset.vizField);}
    });
  }
  window.HshToolVisuals={render};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

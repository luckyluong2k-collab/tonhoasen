/**
 * HOA SEN HOME PHỦ LÝ - FIELD CONTROL V9.8 PRO
 * Dự án: Cải tạo & Xây mới Cửa Hàng Hoa Sen Home Phủ Lý - Hà Nam
 * Hợp đồng: 01/2026/HĐXD/HSG-HG (Giá trị HĐ: 3.854.146.466 VNĐ - Không tính VAT)
 * Ngày khởi công: 10/09/2026 (Hôm nay - Ngày 01/60)
 */

// ==========================================================================
// 1. UNIFIED PROJECT CONFIGURATION (Single Source of Truth)
// ==========================================================================
const PROJECT_CONFIG = {
  projectName: "CẢI TẠO & XÂY MỚI HOA SEN HOME PHỦ LÝ",
  contractNo: "01/2026/HĐXD/HSG-HG",
  employer: "TẬP ĐOÀN HOA SEN (HSG)",
  employerRep: "Ban Quản Lý Dự Án Đại Diện Hoa Sen Home",
  contractor: "CÔNG TY TNHH TM HOÀNG GIANG",
  contractorRep: "Bà Ngô Thị Hồng Giang - Giám Đốc",
  hotline: "0961284289",
  totalDays: 60,
  startDate: "2026-09-10",
  endDate: "2026-11-09",
  currentDay: 1, // Ngày 01 / 60 (Bắt đầu từ hôm nay 10/09/2026)
  plannedProgress: 1.5,
  actualProgress: 0.0,
  delayDelta: 0.0,
  contractValue: 3854146466, // Giá trị HĐ chuẩn không tính VAT
  contractValuePreVAT: 3854146466,
  vatRate: 0.0, // Không tính VAT
  contractValueVAT: 3854146466,
  zones: [
    { id: "Z1", name: "1. Nhà Nhân Viên (D30)", progress: 0, status: "Khởi động", badgeClass: "badge-blue", detail: "Đang định vị giác móng M5-M6, chuẩn bị đào đất." },
    { id: "Z2", name: "2. Khung Thép & Canopy", progress: 0, status: "Chuẩn bị", badgeClass: "badge-secondary", detail: "Gia công bu lông neo J M20 và đặt thép hình I-350." },
    { id: "Z3", name: "3. Khối Nhà Hoa Sen Home", progress: 0, status: "Chuẩn bị", badgeClass: "badge-secondary", detail: "Khảo sát mặt bằng, chuẩn bị đục phá sàn và mương ngầm." },
    { id: "Z4", name: "4. Hệ thống MEP & PCCC", progress: 0, status: "Chuẩn bị", badgeClass: "badge-secondary", detail: "Thẩm duyệt hồ sơ PCCC Asenware và đặt cáp Cadivi." }
  ]
};

// ==========================================================================
// 2. DATASETS INJECTION
// ==========================================================================
const RAW_BOQ = [{"id": 1, "row": 6, "stt": "A", "content": "CÔNG TÁC BAN ĐẦU", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "Bao gồm chi phí Điện - Nước thi công", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "A. CÔNG TÁC BAN ĐẦU", "subsec": ""}, {"id": 2, "row": 7, "stt": "1", "content": "Chi phí giấy phép xây dựng (bao gồm các chi phí làm việc với cơ quan chức năng, chi phí xin phép, chuyển đổi mục đích sử dụng đất (nếu có), chi phí xin phép đổ sân trước ra mép đường, đảm bảo tính pháp lí để công trình đưa vào sử dụng).", "dvt": "trọn gói", "qty": 1.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 50000000.0, "price_total": 50000000.0, "total_amt": 50000000.0, "vendor_note": "- Nhà thầu đảm bảo các thủ tục pháp lý để được triển khai thi công và công trình được đưa vào sử dụng theo quy định.", "sec": "A. CÔNG TÁC BAN ĐẦU", "subsec": ""}, {"id": 3, "row": 8, "stt": "2", "content": "Chi phí xin phép, thiết kế, nghiệm thu PCCC", "dvt": "trọn gói", "qty": 1.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 100000000.0, "price_total": 100000000.0, "total_amt": 100000000.0, "vendor_note": "- Nhà thầu đảm bảo các thủ tục pháp lý để công trình được Đơn vị PCCC địa phương chấp thuận đưa vào sử dụng theo quy định.", "sec": "A. CÔNG TÁC BAN ĐẦU", "subsec": ""}, {"id": 4, "row": 9, "stt": "3", "content": "Chi phí tháo dỡ \n- Cửa pano, cửa cuốn\n- Cầu thang thép\n….. các hạng mục khác thể hiện trong hồ sơ thiết kế và các hạng mục khác để phục vụ thi công các hạng mục theo Hợp đồng.", "dvt": "trọn gói", "qty": 1.0, "code": "", "brand": "", "origin": "", "note": "Phế liệu tháo dỡ bàn giao lại cho Cửa hàng", "price_mat": 0.0, "price_labor": 100000000.0, "price_total": 100000000.0, "total_amt": 100000000.0, "vendor_note": "", "sec": "A. CÔNG TÁC BAN ĐẦU", "subsec": ""}, {"id": 5, "row": 10, "stt": "4", "content": "Vệ sinh công nghiệp toàn bộ (Bao gồm tất cả các hạng mục thi công..). Vận chuyển xà bần, rác thi công xây dựng ra khỏi công trình và nội bộ công trình, vệ sinh sạch sẽ toàn bộ trước khi nghiệm thu đưa vào sử dụng", "dvt": "trọn gói", "qty": 1.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 50000000.0, "price_total": 50000000.0, "total_amt": 50000000.0, "vendor_note": "", "sec": "A. CÔNG TÁC BAN ĐẦU", "subsec": ""}, {"id": 6, "row": 11, "stt": "B", "content": "VĂN PHÒNG + NHÀ XƯỞNG", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": ""}, {"id": 7, "row": 12, "stt": "I", "content": "PHẦN KẾT CẤU TỔNG THỂ", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 8, "row": 13, "stt": "1", "content": "Đào đất hố móng, đà kiềng, bể tự hoại", "dvt": "m3", "qty": 71.8948, "code": "", "brand": "", "origin": "", "note": "Khối chặt", "price_mat": 0.0, "price_labor": 70000.0, "price_total": 70000.0, "total_amt": 5032636.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 9, "row": 14, "stt": "2", "content": "Đầm chặt đất  K=0,95, dày 200mm", "dvt": "m3", "qty": 13.3424, "code": "", "brand": "", "origin": "", "note": "Khối chặt, Thí nghiệm đầm chặt", "price_mat": 0.0, "price_labor": 90399.99999999999, "price_total": 90399.99999999999, "total_amt": 1206152.9599999997, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 10, "row": 15, "stt": "3", "content": "GCLD ván khuôn bê tông lót", "dvt": "m2", "qty": 26.032, "code": "", "brand": "", "origin": "", "note": "Ván phủ phim", "price_mat": 100000.0, "price_labor": 112999.99999999999, "price_total": 213000.0, "total_amt": 5544816.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 11, "row": 16, "stt": "4", "content": "Bê tông lót đáy móng, đà kiềng SX bằng máy trộn, đổ bằng thủ công, chiều rộng >250cm, M100, đá 1x2, PCB40", "dvt": "m3", "qty": 6.3352, "code": "", "brand": "", "origin": "", "note": "BT trộn tay", "price_mat": 1417500.0, "price_labor": 338999.99999999994, "price_total": 1756500.0, "total_amt": 11127778.8, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 12, "row": 17, "stt": "5", "content": "GCLD ván khuôn phủ phim", "dvt": "m2", "qty": 192.9858, "code": "", "brand": "", "origin": "", "note": "Ván phủ phim", "price_mat": 100000.0, "price_labor": 112999.99999999999, "price_total": 213000.0, "total_amt": 41105975.400000006, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 13, "row": 18, "stt": "6", "content": "GCLD cốt thép CB300V, CB240T", "dvt": "kg", "qty": 2309.8136, "code": "D>=10, CB-300V, D<10, CB-240T", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 17500.0, "price_labor": 5650.0, "price_total": 23150.0, "total_amt": 53472184.839999996, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 14, "row": 19, "stt": "7", "content": "Bê tông đá 1x2 M250 PCB40 Móng, cổ cột, đà kiềng", "dvt": "m3", "qty": 24.3178, "code": "", "brand": "", "origin": "", "note": "BT Thương Phẩm", "price_mat": 1785000.0, "price_labor": 451999.99999999994, "price_total": 2237000.0, "total_amt": 54398918.599999994, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 15, "row": 20, "stt": "8", "content": "Bê tông đá 1x2 M250 PCB40 cột", "dvt": "m3", "qty": 2.36, "code": "", "brand": "", "origin": "", "note": "BT Thương Phẩm", "price_mat": 1785000.0, "price_labor": 451999.99999999994, "price_total": 2237000.0, "total_amt": 5279320.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 16, "row": 21, "stt": "9", "content": "Bê tông đá 1x2 M200 PCB40", "dvt": "m3", "qty": 3.6822, "code": "", "brand": "", "origin": "", "note": "BT trộn tay", "price_mat": 1732500.0, "price_labor": 451999.99999999994, "price_total": 2184500.0, "total_amt": 8043765.899999999, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 17, "row": 22, "stt": "10", "content": "Sika Grout đá 1x2 M250 PCB40", "dvt": "m3", "qty": 0.0735, "code": "Sikagrout 214 11 - VN", "brand": "Sika", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 10000000.0, "price_labor": 22599999.999999996, "price_total": 32599999.999999996, "total_amt": 2396099.9999999995, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 18, "row": 23, "stt": "11", "content": "GCLD bu lông mạ kẽm điện phân cường độ cao (8.8) neo J, M20; L=600mm", "dvt": "bộ", "qty": 40.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 131000.0, "price_labor": 40000.0, "price_total": 171000.0, "total_amt": 6840000.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 19, "row": 24, "stt": "12", "content": "San lấp đất đến cao độ thiết kế", "dvt": "m3", "qty": 33.497, "code": "", "brand": "", "origin": "", "note": "Khối chặt", "price_mat": 350000.0, "price_labor": 158199.99999999997, "price_total": 508200.0, "total_amt": 17023175.4, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 20, "row": 25, "stt": "13", "content": "Công tác tôn nền bằng đá 0x4 đầm chặt, K=0,95", "dvt": "m3", "qty": 51.2788, "code": "", "brand": "", "origin": "", "note": "Khối chặt, Thí nghiệm đầm chặt", "price_mat": 420000.0, "price_labor": 211874.99999999997, "price_total": 631875.0, "total_amt": 32401791.749999996, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 21, "row": 26, "stt": "14", "content": "GCLD ván khuôn nền cải tạo", "dvt": "m2", "qty": 11.8794, "code": "", "brand": "", "origin": "", "note": "Ván phủ phim", "price_mat": 100000.0, "price_labor": 112999.99999999999, "price_total": 213000.0, "total_amt": 2530312.2, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 22, "row": 27, "stt": "15", "content": "Công tác trải nilong chống mất nước dày 0.15mm chồng mí 100mm", "dvt": "m2", "qty": 374.706, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 7000.0, "price_labor": 7909.999999999999, "price_total": 14910.0, "total_amt": 5586866.46, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 23, "row": 28, "stt": "16", "content": "Công tác gia công lắp đặt cốt thép nền d8a200", "dvt": "kg", "qty": 1204.4487, "code": "D>=10, CB-300V, D<10, CB-240T", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 17500.0, "price_labor": 5649.999999999999, "price_total": 23150.0, "total_amt": 27882987.404999997, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 24, "row": 29, "stt": "17", "content": "Bê tông nền đá 1x2, M250, PCB40", "dvt": "m3", "qty": 29.9765, "code": "", "brand": "", "origin": "", "note": "BT Thương Phẩm", "price_mat": 1785000.0, "price_labor": 451999.99999999994, "price_total": 2237000.0, "total_amt": 67057430.5, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 25, "row": 30, "stt": "18", "content": "Bê tông bệ bếp đá 1x2, M150, PCB40", "dvt": "m3", "qty": 0.312, "code": "", "brand": "", "origin": "", "note": "BT trộn tay", "price_mat": 1527500.0, "price_labor": 451999.99999999994, "price_total": 1979500.0, "total_amt": 617604.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 26, "row": 31, "stt": "19", "content": "Xây gạch đặc 4x8x18cm, xây tường thẳng chiều dày 20cm, vữa XM M75, XM PCB40", "dvt": "m3", "qty": 5.274, "code": "", "brand": "Gạch Tuynel", "origin": "", "note": "", "price_mat": 1050000.0, "price_labor": 1242999.9999999998, "price_total": 2293000.0, "total_amt": 12093282.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 27, "row": 32, "stt": "20", "content": "Xây gạch 8x8x19cm, xây tường thẳng chiều dày 10cm, vữa XM M100, XM PCB40", "dvt": "m3", "qty": 9.0224, "code": "", "brand": "Gạch Tuynel", "origin": "", "note": "", "price_mat": 1050000.0, "price_labor": 1242999.9999999998, "price_total": 2293000.0, "total_amt": 20688363.2, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 28, "row": 33, "stt": "21", "content": "Xây gạch 8x8x19cm, xây tường thẳng chiều dày 20cm, vữa XM M100, XM PCB40", "dvt": "m3", "qty": 31.4705, "code": "", "brand": "Gạch Tuynel", "origin": "", "note": "", "price_mat": 1050000.0, "price_labor": 1242999.9999999998, "price_total": 2293000.0, "total_amt": 72161856.5, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 29, "row": 34, "stt": "22", "content": "Công tác trát tường bể tự hoại dày 1.5cm 2 lớp XM M75 PC40", "dvt": "m2", "qty": 50.98, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 50000.0, "price_labor": 101699.99999999999, "price_total": 151700.0, "total_amt": 7733665.999999999, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 30, "row": 35, "stt": "23", "content": "Công tác trát tường trong và ngoài dày 1.5cm XM M75 PC40", "dvt": "m2", "qty": 536.2918, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 50000.0, "price_labor": 101699.99999999999, "price_total": 151700.0, "total_amt": 81355466.05999999, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 31, "row": 36, "stt": "24", "content": "CCLD bản mã liên kết chân cột (280x200x16mm; 230x200x16mm; 280x220x14mm; 160x160x6mm)", "dvt": "kg", "qty": 76.3271, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 27000.0, "price_labor": 11299.999999999998, "price_total": 38300.0, "total_amt": 2923327.93, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 32, "row": 37, "stt": "25", "content": "CCLD Cột thép hình SS400", "dvt": "kg", "qty": 1165.904, "code": "", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 25000.0, "price_labor": 11299.999999999998, "price_total": 36300.0, "total_amt": 42322315.2, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 33, "row": 38, "stt": "26", "content": "CCLD thép hộp mạ kẽm 100x100x1.8mm", "dvt": "kg", "qty": 259.59, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 27000.0, "price_labor": 11299.999999999998, "price_total": 38300.0, "total_amt": 9942296.999999998, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 34, "row": 39, "stt": "27", "content": "CCLD Bu lông nở M12, L=150mm", "dvt": "bộ", "qty": 36.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 94500.0, "price_labor": 22599.999999999996, "price_total": 117100.0, "total_amt": 4215600.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 35, "row": 40, "stt": "28", "content": "CCLD Vì kèo thép hình SS400", "dvt": "kg", "qty": 2943.414, "code": "", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 25000.0, "price_labor": 11299.999999999998, "price_total": 36300.0, "total_amt": 106845928.2, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 36, "row": 41, "stt": "29", "content": "CCLD bản mã liên kết, sườn gia cường", "dvt": "kg", "qty": 106.446, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 25000.0, "price_labor": 11299.999999999998, "price_total": 36300.0, "total_amt": 3863989.8, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 37, "row": 42, "stt": "30", "content": "CCLD bu long liên kết M20 (8.8)", "dvt": "bộ", "qty": 56.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 450000.0, "price_labor": 45199.99999999999, "price_total": 495200.0, "total_amt": 27731200.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 38, "row": 43, "stt": "31", "content": "CCLD Xà gồ thép hộp mạ kẽm 50x100x1.4mm", "dvt": "kg", "qty": 1584.4, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 52760520.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 39, "row": 44, "stt": "32", "content": "CCLD Xà gồ C mạ kẽm 250x50x10x2mm", "dvt": "kg", "qty": 22.7713, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 758284.29, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 40, "row": 45, "stt": "33", "content": "CCLD Xà gồ thép hộp mạ kẽm 30x60x1.4mm", "dvt": "kg", "qty": 328.71, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 10946043.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 41, "row": 46, "stt": "34", "content": "GCLD khung treo trần thép hộp50x100x1.4mm mạ kẽm", "dvt": "kg", "qty": 503.61, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 16770213.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 42, "row": 47, "stt": "35", "content": "GCLD khung treo trần thép hộp50x50x1.4mm mạ kẽm", "dvt": "kg", "qty": 181.07, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 6029631.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 43, "row": 48, "stt": "36", "content": "GCLD khung treo trần thép hộp 30x60x1.4mm mạ kẽm", "dvt": "kg", "qty": 73.94, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 2462202.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 44, "row": 49, "stt": "37", "content": "GCLD khung treo trần thép hộp 30x30x1.4mm mạ kẽm", "dvt": "kg", "qty": 31.38, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 1044954.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 45, "row": 50, "stt": "38", "content": "GCLD ống thép d42x2mm liên kết khung treo trần", "dvt": "kg", "qty": 16.47, "code": "", "brand": "Hoa Sen", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 548451.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 46, "row": 51, "stt": "39", "content": "GCLD bản mã liên kết khung treo trần G1", "dvt": "kg", "qty": 12.0576, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 401518.08, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 47, "row": 52, "stt": "40", "content": "CCLD bu long neo mạ kẽm điện phân M20 (8.8) liên kết khung treo trần G1", "dvt": "bộ", "qty": 10.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 37200.0, "price_labor": 16950.0, "price_total": 54150.0, "total_amt": 541500.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 48, "row": 53, "stt": "41", "content": "GCLD xà gồ mái thép hộp 50x100x1.4mm mạ kẽm", "dvt": "kg", "qty": 840.89, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 28001637.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 49, "row": 54, "stt": "42", "content": "GCLD khung thép hộp mã kẽm 20x20x1.2mm định hình", "dvt": "kg", "qty": 322.55, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 10740915.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 50, "row": 55, "stt": "43", "content": "GCLD khung thép hộp mã kẽm 50x100x1.8mm ốp tôn", "dvt": "kg", "qty": 445.32, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 14829156.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 51, "row": 56, "stt": "44", "content": "GCLD khung thép hộp mã kẽm 20x20x1.2mm ốp tôn", "dvt": "kg", "qty": 105.76, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 3521808.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 52, "row": 57, "stt": "45", "content": "GCLD khung thép hộp mã kẽm 20x40x1.2mm ốp tôn", "dvt": "kg", "qty": 73.36, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 2442888.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 53, "row": 58, "stt": "46", "content": "GCLD khung thép hộp mã kẽm 40x40x1.4mm ốp tôn", "dvt": "kg", "qty": 1111.78, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 37022274.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 54, "row": 59, "stt": "47", "content": "Sơn bề mặt kim loại, 1 lớp lót, 2 lớp phủ bằng sơn chuyên dụng", "dvt": "m2", "qty": 124.439, "code": "Sơn lót chống gỉ Sơn Toa con vịt màu xám", "brand": "Sơn Toa", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 50000.0, "price_labor": 50000.0, "price_total": 100000.0, "total_amt": 12443900.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "I. PHẦN KẾT CẤU TỔNG THỂ"}, {"id": 55, "row": 60, "stt": "II", "content": "PHẦN HOÀN THIỆN", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 56, "row": 61, "stt": "48", "content": "Công tác ốp gạch tường granit 300x600 vữa XM M100 PCB40 dày 25mm", "dvt": "m2", "qty": 56.0085, "code": "Bao gồm vữa ốp gạch", "brand": "Lustile", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 260000.0, "price_labor": 169499.99999999997, "price_total": 429500.0, "total_amt": 24055650.75, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 57, "row": 62, "stt": "49", "content": "Công tác lát gạch gian home granit 800x800 vữa XM M100 PCB40 dày 40mm", "dvt": "m2", "qty": 274.7905, "code": "Bao gồm vữa lát gạch \n(cuốn nền)", "brand": "Lustra", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 275000.0, "price_labor": 169499.99999999997, "price_total": 444500.0, "total_amt": 122144377.25, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 58, "row": 63, "stt": "50", "content": "Công tác lát gạch nhà nhân viên granit 600x600 bóng mặt vữa XM M100 PCB40 dày 40mm", "dvt": "m2", "qty": 40.985, "code": "Bao gồm vữa lát gạch \n(cuốn nền)", "brand": "Lustile", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 275000.0, "price_labor": 169499.99999999997, "price_total": 444500.0, "total_amt": 18217832.5, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 59, "row": 64, "stt": "51", "content": "Công tác lát gạch chống trơn trượt nhà vệ sinh granit 300x600 bóng mặt vữa XM M100 PCB40 dày 40mm", "dvt": "m2", "qty": 6.3788, "code": "Bao gồm vữa lát gạch \n(cuốn nền)", "brand": "Lustra", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 265000.0, "price_labor": 169499.99999999997, "price_total": 434500.0, "total_amt": 2771588.6, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 60, "row": 65, "stt": "52", "content": "Công tác bả bột vào tường trong và ngoài", "dvt": "m2", "qty": 184.516, "code": "", "brand": "Maxilite", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 28000.0, "price_labor": 22000.0, "price_total": 50000.0, "total_amt": 9225800.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 61, "row": 66, "stt": "53", "content": "Công tác sơn hoàn thiện 1 lớp lót 2 lớp phủ", "dvt": "m2", "qty": 189.556, "code": "Toa Nanosheild", "brand": "Toa", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 60000.0, "price_labor": 45000.0, "price_total": 105000.0, "total_amt": 19903380.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 62, "row": 67, "stt": "54", "content": "Ốp đá granite bậc tam cấp, đá đỏ Bình Định dày 10-20mm vữa XM M75 PCB40 (bao gồm chỉ đá ốp dưới mũi bậc cấp - nửa hình bán nguyệt) dày 25mm", "dvt": "m2", "qty": 10.6408, "code": "Bao gồm vữa ốp gạch", "brand": "Đá Granite đỏ Ấn độ", "origin": "", "note": "", "price_mat": 1300000.0, "price_labor": 338999.99999999994, "price_total": 1639000.0, "total_amt": 17440271.2, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 63, "row": 68, "stt": "55", "content": "Công tác ốp đá Granit tự nhiên màu đen dày 10-20mm, vữa XM M75 PCB40 dày 25mm", "dvt": "m2", "qty": 1.408, "code": "Bao gồm vữa ốp gạch", "brand": "Đá Granite Bình Định", "origin": "", "note": "", "price_mat": 1300000.0, "price_labor": 338999.99999999994, "price_total": 1639000.0, "total_amt": 2307712.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 64, "row": 69, "stt": "56", "content": "GCLD tấm Aluminium composite ALCOREST EV3010 - màu bạc ngoài trời ốp cột, mái canopy - độ dày nhôm 0.21mm, độ dày tấm 3mm", "dvt": "m2", "qty": 108.5019, "code": "ALCOREST EV3010", "brand": "Alu Alcorest", "origin": "", "note": "", "price_mat": 500000.0, "price_labor": 330000.0, "price_total": 830000.0, "total_amt": 90056577.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 65, "row": 70, "stt": "57", "content": "GCLD tấm Aluminium composite ALCOREST EV3001-màu đỏ ngoài trời ốp cột - độ dày nhôm 0.21mm, độ dày tấm 3mm", "dvt": "m2", "qty": 282.4066, "code": "ALCOREST EV3001", "brand": "Alu Alcorest", "origin": "", "note": "", "price_mat": 500000.0, "price_labor": 330000.0, "price_total": 830000.0, "total_amt": 234397478.00000003, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 66, "row": 71, "stt": "58", "content": "Công tác Ốp tôn vách 13 sóng màu trắng sữa, chồng 1 sóng dày 0.45mm + phụ kiện đồng bộ", "dvt": "m2", "qty": 167.112, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 180000.0, "price_labor": 65000.0, "price_total": 245000.0, "total_amt": 40942440.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 67, "row": 72, "stt": "59", "content": "Công tác Ốp tôn vách 13 sóng màu đỏ chồng 1 sóng dày 0.45mm + phụ kiện đồng bộ", "dvt": "m2", "qty": 8.95, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 180000.0, "price_labor": 65000.0, "price_total": 245000.0, "total_amt": 2192750.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 68, "row": 73, "stt": "60", "content": "CCLD nẹp nhôm 15x30 chân vách ốp tôn", "dvt": "m", "qty": 103.4, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 85000.0, "price_labor": 65000.0, "price_total": 150000.0, "total_amt": 15510000.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 69, "row": 74, "stt": "61", "content": "CCLD cửa cuốn tôn sơn tĩnh điện màu trắng, dày 0.8mm. Đồng bộ thân cửa, ray trục, giá đỡ, in LOGO Hoa Sen Home xám mờ.", "dvt": "m2", "qty": 18.853, "code": "", "brand": "Fucodoor", "origin": "", "note": "", "price_mat": 1200000.0, "price_labor": 390000.0, "price_total": 1590000.0, "total_amt": 29976270.000000004, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 70, "row": 75, "stt": "62", "content": "Công tác sơn mới cửa cuốn tôn tĩnh điện màu trắng, in LOGO Hoa Sen Home xám mờ.", "dvt": "m2", "qty": 112.662, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 45000.0, "price_labor": 100000.0, "price_total": 145000.0, "total_amt": 16335990.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 71, "row": 76, "stt": "63", "content": "CCLD motor cửa, remot cửa cuốn (Hoyoka 600kg)", "dvt": "bộ", "qty": 2.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 4800000.0, "price_labor": 280000.0, "price_total": 5080000.0, "total_amt": 10160000.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 72, "row": 77, "stt": "64", "content": "CCLD bộ tích điện cửa cuốn, công suất 800w", "dvt": "Bộ", "qty": 2.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 5900000.0, "price_labor": 280000.0, "price_total": 6180000.0, "total_amt": 12360000.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 73, "row": 78, "stt": "65", "content": "CCLD cửa đi KT 1800x2400, nhôm hệ 55 dày 1.4mm, kính cường lực 10mm, tay đẩy hơi dừng 90 độ Hafele sơn tĩnh điện màu đen sần, phụ kiện đồng bộ", "dvt": "m2", "qty": 4.32, "code": "", "brand": "Kính cường lực Bình Dương, nhôm Xingfa Việt Nam", "origin": "", "note": "", "price_mat": 1700000.0, "price_labor": 840000.0, "price_total": 2540000.0, "total_amt": 10972800.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 74, "row": 79, "stt": "66", "content": "CCLD cửa đi nhôm hệ 55 dày 1.4mm. kính cường lực 8mm sơn tĩnh điện màu đen sần, phụ kiện đồng bộ", "dvt": "m2", "qty": 9.14, "code": "", "brand": "Kính cường lực Bình Dương, nhôm Xingfa Việt Nam", "origin": "", "note": "", "price_mat": 1600000.0, "price_labor": 840000.0, "price_total": 2440000.0, "total_amt": 22301600.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 75, "row": 80, "stt": "67", "content": "CCLD tay nắm tròn khóa cửa", "dvt": "Bộ", "qty": 5.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 250000.0, "price_labor": 160000.0, "price_total": 410000.0, "total_amt": 2050000.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 76, "row": 81, "stt": "68", "content": "CCLD cửa sổ nhôm hệ 55 dày 1.4mm. kính cường lực 10mm,  tay đẩy hơi dừng 90 độ Hafele sơn tĩnh điện màu đen sần, phụ kiện đồng bộ", "dvt": "m2", "qty": 13.68, "code": "", "brand": "Kính cường lực Bình Dương, nhôm Xingfa Việt Nam", "origin": "", "note": "", "price_mat": 1600000.0, "price_labor": 840000.0, "price_total": 2440000.0, "total_amt": 33379200.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 77, "row": 82, "stt": "69", "content": "CCLD cửa tủ bếp nhôm thường sơn tĩnh điện màu đen sần, phụ kiện đồng bộ", "dvt": "m2", "qty": 2.34, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 1700000.0, "price_labor": 840000.0, "price_total": 2540000.0, "total_amt": 5943600.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 78, "row": 83, "stt": "70", "content": "CCLD VK1 khung nhôm Xingfa, hệ 65mm, dày 2mm kính cường lực 12mm", "dvt": "m2", "qty": 51.0042, "code": "", "brand": "Kính cường lực Bình Dương, nhôm Xingfa Việt Nam", "origin": "", "note": "", "price_mat": 1600000.0, "price_labor": 840000.0, "price_total": 2440000.0, "total_amt": 124450248.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 79, "row": 84, "stt": "71", "content": "CCLD VK2 khung nhôm Xingfa, hệ 55mm, dày 1,4mm, sơn tĩnh điện màu đen sần kính cường lực 10mm", "dvt": "m2", "qty": 26.418, "code": "", "brand": "Kính cường lực Bình Dương, nhôm Xingfa Việt Nam", "origin": "", "note": "", "price_mat": 1600000.0, "price_labor": 840000.0, "price_total": 2440000.0, "total_amt": 64459920.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 80, "row": 85, "stt": "72", "content": "CCLD Cửa đi bản lề sàn, kính cường lực 10mm", "dvt": "m2", "qty": 4.32, "code": "", "brand": "Kính cường lực Bình Dương", "origin": "", "note": "", "price_mat": 1600000.0, "price_labor": 840000.0, "price_total": 2440000.0, "total_amt": 10540800.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 81, "row": 86, "stt": "73", "content": "CCLD Cửa đi bản lề sàn, kính cường lực 12mm", "dvt": "m2", "qty": 5.2, "code": "", "brand": "Kính cường lực Bình Dương", "origin": "", "note": "", "price_mat": 1600000.0, "price_labor": 840000.0, "price_total": 2440000.0, "total_amt": 12688000.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 82, "row": 87, "stt": "74", "content": "Cung cấp và lắp đặt tấm trần nhựa PIMA PC-24 \n- Kích thước tấm 603x603x8 (mm) \n- Khung trần nổi ArTEK \n- Hệ khung 610x610mm", "dvt": "m2", "qty": 293.4181, "code": "", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 130000.0, "price_labor": 112999.99999999999, "price_total": 243000.0, "total_amt": 71300598.3, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 83, "row": 88, "stt": "75", "content": "Ốp tôn vách 11 sóng màu vàng đồng sữa chồng 1 sóng, dày 0.5mm + phụ kiện đồng bộ", "dvt": "m2", "qty": 244.6519, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 170000.0, "price_labor": 79099.99999999999, "price_total": 249100.0, "total_amt": 60942788.29000001, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 84, "row": 89, "stt": "76", "content": "CCLD máng xối tôn dày 0.5mm + phụ kiện đồng bộ", "dvt": "m", "qty": 50.8, "code": "", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 550000.0, "price_labor": 225999.99999999997, "price_total": 776000.0, "total_amt": 39420800.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 85, "row": 90, "stt": "77", "content": "Ốp tôn vách 11 sóng màu trắng sữa, chồng 1 sóng, dày 0.45mm + phụ kiện đồng bộ", "dvt": "m2", "qty": 203.4, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 170000.0, "price_labor": 79099.99999999999, "price_total": 249100.0, "total_amt": 50666940.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 86, "row": 91, "stt": "78", "content": "GCLD khung cửa sắt 13x26x1.1mm", "dvt": "kg", "qty": 34.61, "code": "", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 19000.0, "price_labor": 11299.999999999998, "price_total": 30300.0, "total_amt": 1048683.0, "vendor_note": "", "sec": "B. VĂN PHÒNG + NHÀ XƯỞNG", "subsec": "II. PHẦN HOÀN THIỆN"}, {"id": 87, "row": 92, "stt": "C", "content": "BẬC CẤP + BỒN HOA", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 88, "row": 93, "stt": "79", "content": "Công tác đào đất", "dvt": "m3", "qty": 4.17, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 70000.0, "price_total": 70000.0, "total_amt": 291900.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 89, "row": 94, "stt": "80", "content": "GCLD ván khuôn bê tông", "dvt": "m2", "qty": 8.1792, "code": "", "brand": "", "origin": "", "note": "Ván phủ phim", "price_mat": 100000.0, "price_labor": 112999.99999999999, "price_total": 213000.0, "total_amt": 1742169.5999999999, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 90, "row": 95, "stt": "81", "content": "Công tác bê tông lót đá 1x2 M100 PCB40", "dvt": "m3", "qty": 0.8254, "code": "", "brand": "", "origin": "", "note": "BT trộn tay", "price_mat": 1417500.0, "price_labor": 338999.99999999994, "price_total": 1756500.0, "total_amt": 1449815.1, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 91, "row": 96, "stt": "82", "content": "Công tác gạch 8x8x18cm, vữa XM M100 PCB40 tường dày 100", "dvt": "m3", "qty": 1.161, "code": "", "brand": "Gạch Tuynel", "origin": "", "note": "", "price_mat": 1050000.0, "price_labor": 1242999.9999999998, "price_total": 2293000.0, "total_amt": 2662173.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 92, "row": 97, "stt": "83", "content": "Công tác gạch 8x8x18cm, vữa XM M100 PCB40 tường dày 200", "dvt": "m3", "qty": 1.872, "code": "", "brand": "Gạch Tuynel", "origin": "", "note": "", "price_mat": 1050000.0, "price_labor": 1242999.9999999998, "price_total": 2293000.0, "total_amt": 4292496.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 93, "row": 98, "stt": "84", "content": "Công tác trát tường vữa XM M100, PCB40", "dvt": "m2", "qty": 23.2192, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 63000.0, "price_labor": 157125.0, "price_total": 220125.0, "total_amt": 5111126.4, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 94, "row": 99, "stt": "85", "content": "Công tác bê tông giằng tường đá 1x2 M200 PCB 40", "dvt": "m3", "qty": 0.1451, "code": "", "brand": "", "origin": "", "note": "BT trộn tay", "price_mat": 1732500.0, "price_labor": 706249.9999999999, "price_total": 2438750.0, "total_amt": 353862.625, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 95, "row": 100, "stt": "86", "content": "Ốp đá granite bậc tam cấp, đá đỏ Bình Định dày 10-20mm, vữa XM M100 PCB40 dày 25mm (bao gồm chỉ đá ốp dưới mũi bậc cấp - nửa hình bán nguyệt)", "dvt": "m2", "qty": 0.102, "code": "Bao gồm vữa ốp gạch", "brand": "Đá Granite Bình Định", "origin": "", "note": "", "price_mat": 1300000.0, "price_labor": 338999.99999999994, "price_total": 1639000.0, "total_amt": 167178.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 96, "row": 101, "stt": "87", "content": "Ốp gạch 300x660, màu đen xám vân đá, GD366404TT, vữa XM M100 PCB40 dày 25mm", "dvt": "m2", "qty": 11.6096, "code": "Bao gồm vữa ốp gạch", "brand": "", "origin": "", "note": "Mua hàng Hoa Sen Home", "price_mat": 265000.0, "price_labor": 229500.0, "price_total": 494500.0, "total_amt": 5740947.2, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 97, "row": 102, "stt": "88", "content": "Đổ đất hữu cơ vào bồn hoa (đất đen 0.02m3/bao)", "dvt": "m3", "qty": 6.9658, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 500000.0, "price_labor": 100000.0, "price_total": 600000.0, "total_amt": 4179480.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 98, "row": 103, "stt": "89", "content": "Trồng cây viền chuỗi ngọc", "dvt": "cây", "qty": 8.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 500000.0, "price_labor": 400000.0, "price_total": 900000.0, "total_amt": 7200000.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 99, "row": 104, "stt": "90", "content": "Trồng cây lá trắng", "dvt": "cây", "qty": 8.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 500000.0, "price_labor": 400000.0, "price_total": 900000.0, "total_amt": 7200000.0, "vendor_note": "", "sec": "C. BẬC CẤP + BỒN HOA", "subsec": ""}, {"id": 100, "row": 105, "stt": "D", "content": "BẢNG HIỆU - QUẢNG CÁO", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": ""}, {"id": 101, "row": 106, "stt": "I", "content": "CÔNG TÁC BAN ĐẦU", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "I. CÔNG TÁC BAN ĐẦU"}, {"id": 102, "row": 107, "stt": "91", "content": "Chi phí xin giấy phép bảng hiệu\n(Đơn vị thi công phải cam kết đảm bảo được thi công và đảm bảo bảng hiệu luôn tồn tại trong suốt thời gian hiệu lực giấy phép)\nKích thước trên giấy tờ sẽ thể hiện diện tích quảng cáo < 20m2\nGia hạn giấy phép trong 1 năm tiếp theo\n(Giá áp dụng luôn cho 3 năm kế tiếp nữa)", "dvt": "trọn gói", "qty": 1.0, "code": "", "brand": "", "origin": "", "note": "Đảm bảo có giấy phép của Sở Văn hóa - Thông tin cấp", "price_mat": 0.0, "price_labor": 28249999.999999996, "price_total": 28249999.999999996, "total_amt": 28249999.999999996, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "I. CÔNG TÁC BAN ĐẦU"}, {"id": 103, "row": 108, "stt": "92", "content": "Bảo trì định kỳ 6 tháng/ lần\nVệ sinh bảng, bộ chữ, kiểm tra hệ thống điện (theo yêu cầu của HS)", "dvt": "trọn gói", "qty": 1.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 13559999.999999998, "price_total": 13559999.999999998, "total_amt": 13559999.999999998, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "I. CÔNG TÁC BAN ĐẦU"}, {"id": 104, "row": 109, "stt": "II", "content": "KẾT CẤU KHUNG VÀ MẶT BẰNG", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 105, "row": 110, "stt": "", "content": "QUY CÁCH KHUNG: DÀI (19.695m) x CAO (5m) \nKT BẢNG CHÍNH: \n1. Phần khung chính của bảng gồm 2 lớp.\n+ Lớp sau sử dụng xà gồ mạ kẽm liên kết bu lông vào các cột bảng hiệu.\n+ Lớp trước sử dụng thép hộp mạ kẽm khoảng cách từ 1000-1250mm theo phương đứng liên kết hàn vào xà gồ C.\n+ Phần viền xanh tạo gờ nổi 120mm so với nền tôn đỏ tạo hình bằng thép hộp mạ kẽm khoảng cách từ 1000-1250mm theo phương đứng\n2. Mặt bảng được ốp tôn 11 sóng Hoa Sen màu đỏ và màu xanh \n3.Mặt sau bảng được ốp tôn sóng dày 3 dem có diềm tại vị trí tiếp giáp tôn mái nhà xưởng.\n4. Giật cấp nẹp Z30x120x30 và góc nối tôn nẹp V30x30 tôn xanh  HOA SEN, đáy bảng hiệu có diềm chống dột vào nhà xưởng\n* Tôn 11 sóng ngang, nẹp V tôn màu xanh dương tím theo quy cách của Hoa Sen", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 106, "row": 111, "stt": "", "content": "BẢNG HIỆU CHÍNH", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 107, "row": 112, "stt": "93", "content": "GCLD khung xương thép hộp 40x40x1.4mm", "dvt": "kg", "qty": 503.36, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 22000.0, "price_labor": 11299.999999999998, "price_total": 33300.0, "total_amt": 16761888.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 108, "row": 113, "stt": "94", "content": "Ốp tôn 11 sóng Hoa Sen màu xanh MBL01-HPC AZ100 35/10 dày 0.50mm G550", "dvt": "m2", "qty": 67.06, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 220000.0, "price_labor": 100000.0, "price_total": 320000.0, "total_amt": 21459200.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 109, "row": 114, "stt": "95", "content": "Ốp tôn 11 sóng Hoa Sen màu đỏ BRL33-HPC AZ100 35/10 dày 0.50mm G550", "dvt": "m2", "qty": 82.94, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 220000.0, "price_labor": 100000.0, "price_total": 320000.0, "total_amt": 26540800.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 110, "row": 115, "stt": "96", "content": "Ốp tôn sóng dày 0.5 mm có diềm tại vị trí tiếp giáp tôn mái nhà xưởng", "dvt": "m2", "qty": 60.0, "code": "", "brand": "Hoa Sen Mag Shield", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 220000.0, "price_labor": 100000.0, "price_total": 320000.0, "total_amt": 19200000.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 111, "row": 116, "stt": "97", "content": "GCLD Diềm chân tôn", "dvt": "m", "qty": 138.8, "code": "", "brand": "Hoa Sen", "origin": "", "note": "Mua hàng Hoa Sen bán", "price_mat": 160000.0, "price_labor": 100000.0, "price_total": 260000.0, "total_amt": 36088000.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 112, "row": 117, "stt": "", "content": "\"Logo Hoa Sen, chữ nổi - Logo & chữ làm bằng tole dày 1,2mm (hông tole  dày 1mm cho chữ lớn, dày 0.8mm cho chữ < 30cm) - Sơn tĩnh điện 2 mặt trong ngoài, mặt ngoài sơn màu vàng theo mẫu, sơn phủ bóng 2K chống bay màu\"", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 113, "row": 118, "stt": "98", "content": "Chữ \"TÔN HOA SEN\"  - hông nổi 6cm tính theo diện tích cụm chữ \"TÔN HOA SEN\", lấy chiều cao x chiều ngang cụm (không tính dấu)", "dvt": "m2", "qty": 1.4178, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 2250000.0, "price_labor": 1700000.0, "price_total": 3950000.0, "total_amt": 5600310.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 114, "row": 119, "stt": "99", "content": "Chữ \"wwwhoasengroupvn\" - hông nổi 6cm tính theo diện tích cụm chữ, lấy chiều ngang x chiều cao cụm (không tính dấu)", "dvt": "m2", "qty": 0.6, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 2250000.0, "price_labor": 1700000.0, "price_total": 3950000.0, "total_amt": 2370000.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 115, "row": 120, "stt": "100", "content": "ĐT: \"@ 02633 797 798\" - hông nổi 6cm (tính theo diện tích logo - ngang x cao)", "dvt": "m2", "qty": 0.528, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 2250000.0, "price_labor": 1700000.0, "price_total": 3950000.0, "total_amt": 2085600.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 116, "row": 121, "stt": "101", "content": "Icon logo - hông nổi 10cm (tính theo diện tích logo - ngang x cao)", "dvt": "m2", "qty": 7.72, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 2250000.0, "price_labor": 1700000.0, "price_total": 3950000.0, "total_amt": 30494000.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 117, "row": 122, "stt": "102", "content": "\"HOA SEN HOME\" BẢNG CHÍNH KT: Chữ HOA (822x2802) + Chữ SEN (822x2506) + Chữ HOME (822x4215) - hông nổi 10 cm tính theo tổng diện tích từng chữ cái (cao x ngang)", "dvt": "m2", "qty": 12.9885, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 2250000.0, "price_labor": 1700000.0, "price_total": 3950000.0, "total_amt": 51304575.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 118, "row": 123, "stt": "103", "content": "\"HỆ THỐNG SIÊU THỊ VẬT LIỆU XÂY DỰNG & NỘI THẤT\" hông nổi 6cm tính theo diện tích cụm chữ, lấy chiều ngang x chiều cao cụm (không tính dấu)", "dvt": "m2", "qty": 2.775, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 2250000.0, "price_labor": 1700000.0, "price_total": 3950000.0, "total_amt": 10961250.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 119, "row": 124, "stt": "104", "content": "Hộp đèn nắp bật không viền bằng nhôm profile dày 8cm, đáy alu 3mm trắng gắn led modul 3 bóng XQD injection 2835 góc chiếu 160, IP67,120 modul/m2, căng bạt AVERY USA, logo thương hiệu in UV lên film 3M IJ 15-114 cán màng chống bay màu 3M USA 8519", "dvt": "cái", "qty": 14.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 3200000.0, "price_labor": 800000.0, "price_total": 4000000.0, "total_amt": 56000000.0, "vendor_note": "", "sec": "D. BẢNG HIỆU - QUẢNG CÁO", "subsec": "II. KẾT CẤU KHUNG VÀ MẶT BẰNG"}, {"id": 120, "row": 125, "stt": "F", "content": "PHẦN MEP", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": ""}, {"id": 121, "row": 126, "stt": "I", "content": "NHÀ XƯỞNG", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 122, "row": 127, "stt": "", "content": "Phần Tủ điện", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 123, "row": 128, "stt": "1", "content": "MCCB-3P-100A-25kA", "dvt": "Cái", "qty": 1.0, "code": "ABN103c", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 1350000.0, "price_labor": 330000.0, "price_total": 1680000.0, "total_amt": 1680000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 124, "row": 129, "stt": "2", "content": "Đèn báo pha (R, Y, B)", "dvt": "Cái", "qty": 3.0, "code": "YW1P-1EQM3(R,Y,B)", "brand": "Idec", "origin": "Japan", "note": "", "price_mat": 135000.0, "price_labor": 38000.0, "price_total": 173000.0, "total_amt": 519000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 125, "row": 130, "stt": "3", "content": "Cầu chì 2A", "dvt": "Cái", "qty": 6.0, "code": "OFL10x38-2A + OMG-FS32X", "brand": "Omega", "origin": "VN", "note": "", "price_mat": 82000.0, "price_labor": 33000.0, "price_total": 115000.0, "total_amt": 690000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 126, "row": 131, "stt": "4", "content": "Cầu chì 100A", "dvt": "Cái", "qty": 4.0, "code": "CDFB00-1-160 + CDFL0100", "brand": "C&S", "origin": "India", "note": "", "price_mat": 0.0, "price_labor": 150000.0, "price_total": 150000.0, "total_amt": 600000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 127, "row": 132, "stt": "5", "content": "PCT 100/5A", "dvt": "Cái", "qty": 4.0, "code": "KBJ", "brand": "LightStar", "origin": "Korea", "note": "", "price_mat": 920000.0, "price_labor": 300000.0, "price_total": 1220000.0, "total_amt": 4880000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 128, "row": 133, "stt": "6", "content": "MCT 100/5A", "dvt": "Cái", "qty": 3.0, "code": "KBF", "brand": "LightStar", "origin": "Korea", "note": "", "price_mat": 590000.0, "price_labor": 90000.0, "price_total": 680000.0, "total_amt": 2040000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 129, "row": 134, "stt": "7", "content": "Shuntrip cho MCCB-3P-100A-25kA", "dvt": "Cái", "qty": 1.0, "code": "ABN103c", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 1650000.0, "price_labor": 500000.0, "price_total": 2150000.0, "total_amt": 2150000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 130, "row": 135, "stt": "8", "content": "Đồng hồ đo và hiển thị điện năng", "dvt": "Bộ", "qty": 1.0, "code": "EM306-A", "brand": "Selec", "origin": "India", "note": "", "price_mat": 1300000.0, "price_labor": 120000.0, "price_total": 1420000.0, "total_amt": 1420000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 131, "row": 136, "stt": "9", "content": "Rơle bảo vệ pha, chỉnh cao thấp áp và thời gian trễ", "dvt": "Bộ", "qty": 1.0, "code": "MX200A –380V", "brand": "Mikro", "origin": "Malaysia", "note": "", "price_mat": 1100000.0, "price_labor": 250000.0, "price_total": 1350000.0, "total_amt": 1350000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 132, "row": 137, "stt": "10", "content": "Rơle bảo vệ chạm đất, chỉnh dòng rò 0.1-2A", "dvt": "Bộ", "qty": 1.0, "code": "MK201A", "brand": "Mikro", "origin": "Malaysia", "note": "", "price_mat": 2150000.0, "price_labor": 250000.0, "price_total": 2400000.0, "total_amt": 2400000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 133, "row": 138, "stt": "11", "content": "Rơle bảo vệ quá dòng, chỉnh dòng và thời gian", "dvt": "Bộ", "qty": 1.0, "code": "MK204A", "brand": "Mikro", "origin": "Malaysia", "note": "", "price_mat": 2569000.0, "price_labor": 250000.0, "price_total": 2819000.0, "total_amt": 2819000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 134, "row": 139, "stt": "12", "content": "MCCB-3P-50A-22kA", "dvt": "Cái", "qty": 2.0, "code": "ABN103c", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 1350000.0, "price_labor": 250000.0, "price_total": 1600000.0, "total_amt": 3200000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 135, "row": 140, "stt": "13", "content": "MCCB-3P-25A-6kA", "dvt": "Cái", "qty": 4.0, "code": "BKJ63N 25A 3P 6kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 850000.0, "price_labor": 250000.0, "price_total": 1100000.0, "total_amt": 4400000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 136, "row": 141, "stt": "14", "content": "MCB-1P-40A-10kA", "dvt": "Cái", "qty": 3.0, "code": "BKN-b 40A 1P 10kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 100120.0, "price_labor": 25000.0, "price_total": 125120.0, "total_amt": 375360.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 137, "row": 142, "stt": "15", "content": "MCB-1P-16A-6kA", "dvt": "Cái", "qty": 2.0, "code": "BKN-b 16A 1P 6kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 88000.0, "price_labor": 21000.0, "price_total": 109000.0, "total_amt": 218000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 138, "row": 143, "stt": "16", "content": "MCB-1P-10A-6kA", "dvt": "Cái", "qty": 1.0, "code": "BKN-b 10A 1P 6kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 88000.0, "price_labor": 21000.0, "price_total": 109000.0, "total_amt": 109000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 139, "row": 144, "stt": "17", "content": "Surge Arrester 40KA", "dvt": "Cái", "qty": 1.0, "code": "BK20S-T2 4P", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 2100000.0, "price_labor": 0.0, "price_total": 2100000.0, "total_amt": 2100000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 140, "row": 145, "stt": "18", "content": "Vỏ tủ điện form 2A, thanh cái 125A 3P+N+E & Phụ kiện", "dvt": "Lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 5000000.0, "price_labor": 1000000.0, "price_total": 6000000.0, "total_amt": 6000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 141, "row": 146, "stt": "", "content": "Phần Chiếu sáng", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 142, "row": 147, "stt": "1", "content": "Công tắc đôi 1 chiều 10A", "dvt": "cái", "qty": 1.0, "code": "", "brand": "MPE", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 235000.0, "price_labor": 100000.0, "price_total": 335000.0, "total_amt": 335000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 143, "row": 148, "stt": "2", "content": "Ống điện mềm D20", "dvt": "m", "qty": 11.520000000000001, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 6000.0, "price_labor": 4000.0, "price_total": 10000.0, "total_amt": 115200.00000000001, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 144, "row": 149, "stt": "3", "content": "Ống Điện D20", "dvt": "m", "qty": 82.8, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 22570.0, "price_labor": 7500.0, "price_total": 30070.0, "total_amt": 2489796.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 145, "row": 150, "stt": "4", "content": "Cu/PVC 2.5mm2", "dvt": "m", "qty": 282.96, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 25200.0, "price_labor": 10000.0, "price_total": 35200.0, "total_amt": 9960192.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 146, "row": 151, "stt": "", "content": "Phần Cấp điện", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 147, "row": 152, "stt": "1", "content": "Ống Điện D32", "dvt": "m", "qty": 82.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 25000.0, "price_labor": 15000.0, "price_total": 40000.0, "total_amt": 3280000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 148, "row": 153, "stt": "2", "content": "Ống nhựa xoắn HDPE D65/50", "dvt": "m", "qty": 30.0, "code": "", "brand": "Santo", "origin": "VN", "note": "", "price_mat": 30000.0, "price_labor": 15000.0, "price_total": 45000.0, "total_amt": 1350000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 149, "row": 154, "stt": "3", "content": "Cu/PVC 6mm2", "dvt": "m", "qty": 20.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 22000.0, "price_labor": 15000.0, "price_total": 37000.0, "total_amt": 740000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 150, "row": 155, "stt": "4", "content": "Cu/PVC 10mm2", "dvt": "m", "qty": 62.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 35000.0, "price_labor": 15000.0, "price_total": 50000.0, "total_amt": 3100000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 151, "row": 156, "stt": "5", "content": "Cu/PVC 16mm2", "dvt": "m", "qty": 30.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 50120.0, "price_labor": 15000.0, "price_total": 65120.0, "total_amt": 1953600.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 152, "row": 157, "stt": "6", "content": "2x1C-6mm2 Cu/XLPE/PVC", "dvt": "m", "qty": 41.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 31500.0, "price_labor": 25000.0, "price_total": 56500.0, "total_amt": 2316500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 153, "row": 158, "stt": "7", "content": "4x1C-10mm2 Cu/XLPE/PVC", "dvt": "m", "qty": 245.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 180000.0, "price_labor": 32000.0, "price_total": 212000.0, "total_amt": 51940000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 154, "row": 159, "stt": "8", "content": "4x1C-35mm2 Cu/XLPE/PVC", "dvt": "m", "qty": 137.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 450000.0, "price_labor": 32000.0, "price_total": 482000.0, "total_amt": 66034000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 155, "row": 160, "stt": "9", "content": "Cọc tiếp đất D16, L2.4m", "dvt": "cọc", "qty": 2.0, "code": "", "brand": "", "origin": "VN", "note": "Cọc mạ đồng", "price_mat": 350000.0, "price_labor": 100000.0, "price_total": 450000.0, "total_amt": 900000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 156, "row": 161, "stt": "10", "content": "Mối hàn hoá nhiệt", "dvt": "mối", "qty": 2.0, "code": "", "brand": "Cadweld", "origin": "Mỹ", "note": "", "price_mat": 605000.0, "price_labor": 145000.0, "price_total": 750000.0, "total_amt": 1500000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 157, "row": 162, "stt": "11", "content": "Giếng khoan tiếp địa 20-30m", "dvt": "cái", "qty": 2.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 0.0, "price_labor": 5000000.0, "price_total": 5000000.0, "total_amt": 10000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 158, "row": 163, "stt": "12", "content": "Dây đồng trần 70mm2", "dvt": "m", "qty": 60.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 355000.0, "price_labor": 45000.0, "price_total": 400000.0, "total_amt": 24000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 159, "row": 164, "stt": "13", "content": "Phụ kiện hệ thống điện nhẹ (Hộp nối dây, co, tê, nối, tyren …)", "dvt": "lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 4000000.0, "price_labor": 1000000.0, "price_total": 5000000.0, "total_amt": 5000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 160, "row": 165, "stt": "", "content": "Phần điện nhẹ", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 161, "row": 166, "stt": "1", "content": "Cáp mạng Cat 6A FTP", "dvt": "m", "qty": 300.0, "code": "", "brand": "Commscope", "origin": "Mỹ", "note": "", "price_mat": 16900.0, "price_labor": 10000.0, "price_total": 26900.0, "total_amt": 8070000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 162, "row": 167, "stt": "2", "content": "Ổ cắm mạng", "dvt": "Cái", "qty": 9.0, "code": "A6RJ88", "brand": "MPE", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 157300.0, "price_labor": 120000.0, "price_total": 277300.0, "total_amt": 2495700.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 163, "row": 168, "stt": "3", "content": "Ống Điện D20", "dvt": "m", "qty": 245.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 22570.0, "price_labor": 7500.0, "price_total": 30070.0, "total_amt": 7367150.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "I. NHÀ XƯỞNG"}, {"id": 164, "row": 169, "stt": "II", "content": "HOA SEN HOME", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 165, "row": 170, "stt": "", "content": "Phần tủ điện", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 166, "row": 171, "stt": "", "content": "Tủ điện DB-HSH", "dvt": "Tủ", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 167, "row": 172, "stt": "1", "content": "MCCB-3P-50A-18kA", "dvt": "Cái", "qty": 1.0, "code": "ABN53c 50A 3P 18kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 1150000.0, "price_labor": 330000.0, "price_total": 1480000.0, "total_amt": 1480000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 168, "row": 173, "stt": "2", "content": "Đèn báo pha (R, Y, B)", "dvt": "Cái", "qty": 1.0, "code": "YW1P-1EQM3(R,Y,B)", "brand": "Idec", "origin": "Japan", "note": "", "price_mat": 135000.0, "price_labor": 38000.0, "price_total": 173000.0, "total_amt": 173000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 169, "row": 174, "stt": "3", "content": "Cầu chì 2A", "dvt": "Cái", "qty": 6.0, "code": "OFL10×38-2A + OMG-FS32X", "brand": "Omega", "origin": "VN", "note": "", "price_mat": 82000.0, "price_labor": 33000.0, "price_total": 115000.0, "total_amt": 690000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 170, "row": 175, "stt": "4", "content": "MCT 50/5A", "dvt": "Cái", "qty": 1.0, "code": "KBF", "brand": "LightStar", "origin": "Hàn Quốc", "note": "", "price_mat": 498000.0, "price_labor": 90000.0, "price_total": 588000.0, "total_amt": 588000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 171, "row": 176, "stt": "5", "content": "Đồng hồ Volt + Switch chuyển", "dvt": "Bộ", "qty": 1.0, "code": "BE-96", "brand": "Bew", "origin": "Taiwan", "note": "", "price_mat": 625000.0, "price_labor": 0.0, "price_total": 625000.0, "total_amt": 625000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 172, "row": 177, "stt": "6", "content": "Đồng hồ Ampe + Switch chuyển", "dvt": "Bộ", "qty": 1.0, "code": "BE-96", "brand": "Bew", "origin": "Taiwan", "note": "", "price_mat": 495000.0, "price_labor": 0.0, "price_total": 495000.0, "total_amt": 495000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 173, "row": 178, "stt": "7", "content": "MCB-3P-25A-6kA", "dvt": "Cái", "qty": 4.0, "code": "BKN 25A 3P 6kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 350000.0, "price_labor": 30000.0, "price_total": 380000.0, "total_amt": 1520000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 174, "row": 179, "stt": "8", "content": "RCBO-1P-32A-4.5kA-30mA", "dvt": "Cái", "qty": 2.0, "code": "RKP 1P+N 32A", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 450000.0, "price_labor": 30000.0, "price_total": 480000.0, "total_amt": 960000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 175, "row": 180, "stt": "9", "content": "MCB-1P-25A-6kA", "dvt": "Cái", "qty": 2.0, "code": "BKJ63 1P 25A 10kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 120000.0, "price_labor": 30000.0, "price_total": 150000.0, "total_amt": 300000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 176, "row": 181, "stt": "10", "content": "MCB-1P-16A-6kA", "dvt": "Cái", "qty": 1.0, "code": "BKN-b 1P 16A 6kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 88000.0, "price_labor": 21000.0, "price_total": 109000.0, "total_amt": 109000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 177, "row": 182, "stt": "11", "content": "MCB-1P-10A-6kA", "dvt": "Cái", "qty": 3.0, "code": "BKN 1P – 10A – 6kA", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 88000.0, "price_labor": 21000.0, "price_total": 109000.0, "total_amt": 327000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 178, "row": 183, "stt": "12", "content": "Vỏ tủ điện-Form 2A, thanh cái 50A 3P+N+E & Phụ kiện", "dvt": "Lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 5000000.0, "price_labor": 1200000.0, "price_total": 6200000.0, "total_amt": 6200000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 179, "row": 184, "stt": "", "content": "Phần Chiếu sáng", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 180, "row": 185, "stt": "1", "content": "Đèn led panel 50w 600x600", "dvt": "Bộ", "qty": 37.0, "code": "DP06 SS-KPK RĐ 60x60/50W", "brand": "Rạng Đông", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 950000.0, "price_labor": 226000.0, "price_total": 1176000.0, "total_amt": 43512000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 181, "row": 186, "stt": "2", "content": "Đèn chiếu khẩn 2w", "dvt": "Bộ", "qty": 3.0, "code": "ALEM648B", "brand": "AC", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 1005000.0, "price_labor": 100000.0, "price_total": 1105000.0, "total_amt": 3315000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 182, "row": 187, "stt": "3", "content": "Đèn thoát hiểm 3w", "dvt": "Bộ", "qty": 2.0, "code": "AEX01C203", "brand": "AC", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 885000.0, "price_labor": 100000.0, "price_total": 985000.0, "total_amt": 1970000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 183, "row": 188, "stt": "5", "content": "Cu/PVC 1.5mm2", "dvt": "m", "qty": 731.16, "code": "Đỏ, Vàng, Xanh sọc lá", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 11000.0, "price_labor": 10000.0, "price_total": 21000.0, "total_amt": 15354360.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 184, "row": 189, "stt": "6", "content": "Ống điện D20", "dvt": "m", "qty": 201.59999999999997, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 22570.0, "price_labor": 7500.0, "price_total": 30070.0, "total_amt": 6062111.999999999, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 185, "row": 190, "stt": "7", "content": "Ống Điện mềm D20", "dvt": "m", "qty": 42.12, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 6000.0, "price_labor": 4000.0, "price_total": 10000.0, "total_amt": 421200.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 186, "row": 191, "stt": "", "content": "Phần Cấp điện", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 187, "row": 192, "stt": "1", "content": "Ổ cắm đôi 3 chấu 16A-220Vac", "dvt": "Bộ", "qty": 18.0, "code": "", "brand": "Luscom", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 120000.0, "price_labor": 100000.0, "price_total": 220000.0, "total_amt": 3960000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 188, "row": 193, "stt": "2", "content": "Ống Điện D20", "dvt": "m", "qty": 125.27999999999999, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 22570.0, "price_labor": 7500.0, "price_total": 30070.0, "total_amt": 3767169.5999999996, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 189, "row": 194, "stt": "3", "content": "Cu/PVC 3x1C-2.5mm2", "dvt": "m", "qty": 120.24, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 100000.0, "price_labor": 28000.0, "price_total": 128000.0, "total_amt": 15390720.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 190, "row": 195, "stt": "4", "content": "Cu/PVC 4mm2", "dvt": "m", "qty": 256.67999999999995, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 32200.0, "price_labor": 10000.0, "price_total": 42200.0, "total_amt": 10831895.999999998, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 191, "row": 196, "stt": "", "content": "Hệ thống điều hòa không khí", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 192, "row": 197, "stt": "1", "content": "Máy lạnh âm trần 5HP inverter kèm bơm nước ngưng", "dvt": "cái", "qty": 4.0, "code": "GCC42S6I/\nGMC42S6I", "brand": "Gree", "origin": "Trung Quốc", "note": "", "price_mat": 39900000.0, "price_labor": 1250000.0, "price_total": 41150000.0, "total_amt": 164600000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 193, "row": 198, "stt": "2", "content": "Ống ga Þ9,5 + Gen cách nhiệt 13mm", "dvt": "m", "qty": 112.464, "code": "", "brand": "Toàn Phát + Superlon", "origin": "Việt Nam/ Malaysia", "note": "", "price_mat": 135000.0, "price_labor": 89000.0, "price_total": 224000.0, "total_amt": 25191936.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 194, "row": 199, "stt": "3", "content": "Ống ga Þ15,9 + Gen cách nhiệt 13mm", "dvt": "m", "qty": 112.464, "code": "", "brand": "Toàn Phát + Superlon", "origin": "Việt Nam/ Malaysia", "note": "", "price_mat": 260000.0, "price_labor": 145000.0, "price_total": 405000.0, "total_amt": 45547920.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 195, "row": 200, "stt": "4", "content": "Ống thoát máy lạnh uPVC D27 + Gen cách nhiệt 10mm", "dvt": "m", "qty": 19.2, "code": "", "brand": "Hoa Sen + Superlon", "origin": "Việt Nam/ Malaysia", "note": "Ống nước: Mua hàng Hoa Sen bán", "price_mat": 88000.0, "price_labor": 50000.0, "price_total": 138000.0, "total_amt": 2649600.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 196, "row": 201, "stt": "5", "content": "Ống thoát máy lạnh uPVC D34 + Gen cách nhiệt 10mm", "dvt": "m", "qty": 24.0, "code": "", "brand": "Hoa Sen + Superlon", "origin": "Việt Nam/ Malaysia", "note": "Ống nước: Mua hàng Hoa Sen bán", "price_mat": 135334.0, "price_labor": 50000.0, "price_total": 185334.0, "total_amt": 4448016.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 197, "row": 202, "stt": "6", "content": "Cu/PVC 4mm2", "dvt": "m", "qty": 862.3199999999999, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 25200.0, "price_labor": 10000.0, "price_total": 35200.0, "total_amt": 30353663.999999996, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 198, "row": 203, "stt": "7", "content": "Dây điều khiển máy lạnh  Cu/PVC-1Cx1.5mm2", "dvt": "m", "qty": 499.12799999999993, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 11000.0, "price_labor": 10000.0, "price_total": 21000.0, "total_amt": 10481687.999999998, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 199, "row": 204, "stt": "8", "content": "Ống Điện D25", "dvt": "m", "qty": 112.464, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 29000.0, "price_labor": 12000.0, "price_total": 41000.0, "total_amt": 4611024.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 200, "row": 205, "stt": "9", "content": "Phụ kiện hệ thống điều hòa không khí (ty ren, co, tê….).", "dvt": "lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 6500000.0, "price_labor": 1000000.0, "price_total": 7500000.0, "total_amt": 7500000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. HOA SEN HOME"}, {"id": 201, "row": 206, "stt": "II", "content": "KHU NHÀ NHÂN VIÊN", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 202, "row": 207, "stt": "", "content": "Phần tủ điện", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 203, "row": 208, "stt": "1", "content": "MCB-2P-40A-6kA", "dvt": "Cái", "qty": 1.0, "code": "BKN 2P 40A", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 245000.0, "price_labor": 30000.0, "price_total": 275000.0, "total_amt": 275000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 204, "row": 209, "stt": "2", "content": "RCBO-1P-32A-4.5kA-30mA", "dvt": "Cái", "qty": 1.0, "code": "RKP 1P+N 32A", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 395000.0, "price_labor": 90000.0, "price_total": 485000.0, "total_amt": 485000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 205, "row": 210, "stt": "3", "content": "MCB-1P-10A-6kA", "dvt": "Cái", "qty": 3.0, "code": "BKN 1P 16A", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 88000.0, "price_labor": 21000.0, "price_total": 109000.0, "total_amt": 327000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 206, "row": 211, "stt": "4", "content": "Vỏ tủ điện, thanh cái 40A P+N+E & Phụ kiện Form 1A", "dvt": "Lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 5000000.0, "price_labor": 1000000.0, "price_total": 6000000.0, "total_amt": 6000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 207, "row": 212, "stt": "", "content": "Phần Chiếu sáng", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 208, "row": 213, "stt": "1", "content": "Đèn led downlight âm trần  12w", "dvt": "Bộ", "qty": 2.0, "code": "D PT04L 135/12W\nSRPL-12T\nAD17C0123/4/6 12W", "brand": "Rạng Đông\nMPE\nAC", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 235000.0, "price_labor": 100000.0, "price_total": 335000.0, "total_amt": 670000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 209, "row": 214, "stt": "2", "content": "Đèn led huỳnh quang 1x20w", "dvt": "Bộ", "qty": 5.0, "code": "T8 TT01 M11/20Wx1", "brand": "Rạng Đông", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 100000.0, "price_labor": 165000.0, "price_total": 265000.0, "total_amt": 1325000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 210, "row": 215, "stt": "3", "content": "Đèn led huỳnh quang 2x20w", "dvt": "Bộ", "qty": 2.0, "code": "M38", "brand": "Rạng Đông", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 350000.0, "price_labor": 165000.0, "price_total": 515000.0, "total_amt": 1030000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 211, "row": 216, "stt": "4", "content": "Công tắc đôi 1 chiều 10A", "dvt": "Cái", "qty": 4.0, "code": "", "brand": "MPE", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 235000.0, "price_labor": 100000.0, "price_total": 335000.0, "total_amt": 1340000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 212, "row": 217, "stt": "5", "content": "Công tắc đơn 1 chiều 10A", "dvt": "Cái", "qty": 1.0, "code": "", "brand": "MPE", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 80000.0, "price_labor": 42000.0, "price_total": 122000.0, "total_amt": 122000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 213, "row": 218, "stt": "6", "content": "Cu/PVC 1.5mm2", "dvt": "m", "qty": 263.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 11000.0, "price_labor": 10000.0, "price_total": 21000.0, "total_amt": 5523000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 214, "row": 219, "stt": "7", "content": "Ống điện mềm D20", "dvt": "m", "qty": 4.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 6000.0, "price_labor": 4000.0, "price_total": 10000.0, "total_amt": 40000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 215, "row": 220, "stt": "8", "content": "Ống Điện D20", "dvt": "m", "qty": 96.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 22570.0, "price_labor": 7500.0, "price_total": 30070.0, "total_amt": 2886720.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 216, "row": 221, "stt": "", "content": "Phần Cấp điện", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 217, "row": 222, "stt": "1", "content": "Ổ cắm đôi 3 chấu 16A-220Vac", "dvt": "Bộ", "qty": 6.0, "code": "", "brand": "Luscom", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 120000.0, "price_labor": 100000.0, "price_total": 220000.0, "total_amt": 1320000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 218, "row": 223, "stt": "2", "content": "Ống Điện D20", "dvt": "m", "qty": 33.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 22570.0, "price_labor": 7500.0, "price_total": 30070.0, "total_amt": 992310.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 219, "row": 224, "stt": "3", "content": "Cu/PVC 4mm2", "dvt": "m", "qty": 97.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 25200.0, "price_labor": 10000.0, "price_total": 35200.0, "total_amt": 3414400.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 220, "row": 225, "stt": "", "content": "Phần điều hòa không khí", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 221, "row": 226, "stt": "1", "content": "Quạt hút âm trần", "dvt": "cái", "qty": 2.0, "code": "FV-15TGU5", "brand": "Panasonic", "origin": "Nhật Bản", "note": "", "price_mat": 1650000.0, "price_labor": 550000.0, "price_total": 2200000.0, "total_amt": 4400000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 222, "row": 227, "stt": "2", "content": "Cu/PVC 1.5mm2", "dvt": "m", "qty": 33.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 11000.0, "price_labor": 10000.0, "price_total": 21000.0, "total_amt": 693000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 223, "row": 228, "stt": "", "content": "Phần Thiết bị vệ sinh", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 224, "row": 229, "stt": "1", "content": "Lắp đặt xí bệt + vòi xịt vệ sinh + bộ chia 2", "dvt": "bộ", "qty": 2.0, "code": "T006 + A026 + COCVT0001", "brand": "Tuslo", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 3850000.0, "price_labor": 400000.0, "price_total": 4250000.0, "total_amt": 8500000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 225, "row": 230, "stt": "2", "content": "Lắp đặt lavabo + bộ xả + vòi rửa", "dvt": "bộ", "qty": 2.0, "code": "L003 + A050+F011", "brand": "Tuslo", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 2015000.0, "price_labor": 400000.0, "price_total": 2415000.0, "total_amt": 4830000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 226, "row": 231, "stt": "3", "content": "Lắp đặt gương soi", "dvt": "bộ", "qty": 2.0, "code": "M001", "brand": "Tuslo", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 400000.0, "price_labor": 250000.0, "price_total": 650000.0, "total_amt": 1300000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 227, "row": 232, "stt": "4", "content": "Vòi nước + vòi sen tắm", "dvt": "Cái", "qty": 2.0, "code": "S014", "brand": "Tuslo", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 1850000.0, "price_labor": 400000.0, "price_total": 2250000.0, "total_amt": 4500000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 228, "row": 233, "stt": "5", "content": "Lắp đặt phiễu thu sàn 100x100  inox 304", "dvt": "cái", "qty": 2.0, "code": "A043", "brand": "Tuslo", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 350000.0, "price_labor": 50000.0, "price_total": 400000.0, "total_amt": 800000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 229, "row": 234, "stt": "6", "content": "Chậu rửa chén + bộ xả + vòi", "dvt": "Bộ", "qty": 1.0, "code": "D006 + K009", "brand": "Lushine", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 3950000.0, "price_labor": 400000.0, "price_total": 4350000.0, "total_amt": 4350000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 230, "row": 235, "stt": "", "content": "Phần thoát nước mưa", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 231, "row": 236, "stt": "1", "content": "Ống uPVC D168 4.3mm", "dvt": "m", "qty": 80.52, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 289000.0, "price_labor": 200000.0, "price_total": 489000.0, "total_amt": 39374280.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 232, "row": 237, "stt": "2", "content": "Ống uPVC D114 4.3mm", "dvt": "m", "qty": 19.8, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 121000.0, "price_labor": 80000.0, "price_total": 201000.0, "total_amt": 3979800.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 233, "row": 238, "stt": "3", "content": "Lơi D168 dày", "dvt": "Cái", "qty": 4.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 383000.0, "price_labor": 150000.0, "price_total": 533000.0, "total_amt": 2132000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 234, "row": 239, "stt": "4", "content": "Lơi D114 dày", "dvt": "Cái", "qty": 22.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 100000.0, "price_labor": 56000.0, "price_total": 156000.0, "total_amt": 3432000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 235, "row": 240, "stt": "5", "content": "Co D168 dày", "dvt": "Cái", "qty": 2.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 520000.0, "price_labor": 150000.0, "price_total": 670000.0, "total_amt": 1340000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 236, "row": 241, "stt": "6", "content": "Y168 dày", "dvt": "Cái", "qty": 2.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 525000.0, "price_labor": 56000.0, "price_total": 581000.0, "total_amt": 1162000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 237, "row": 242, "stt": "7", "content": "Y168/114 dày", "dvt": "Cái", "qty": 11.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 546000.0, "price_labor": 150000.0, "price_total": 696000.0, "total_amt": 7656000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 238, "row": 243, "stt": "8", "content": "Phụ kiện hệ thống thoát nước (ty treo, giá đỡ, keo dán….)", "dvt": "lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 3500000.0, "price_labor": 0.0, "price_total": 3500000.0, "total_amt": 3500000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 239, "row": 244, "stt": "", "content": "Phần thoát nước", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 240, "row": 245, "stt": "1", "content": "Ống uPVC D114 3.2mm", "dvt": "m", "qty": 13.2, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 125000.0, "price_labor": 81000.0, "price_total": 206000.0, "total_amt": 2719200.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 241, "row": 246, "stt": "2", "content": "Ống uPVC D60 2.0mm", "dvt": "m", "qty": 18.72, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 50000.0, "price_labor": 37500.0, "price_total": 87500.0, "total_amt": 1638000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 242, "row": 247, "stt": "3", "content": "Ống uPVC D49 2.4mm", "dvt": "m", "qty": 18.72, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 45000.0, "price_labor": 37500.0, "price_total": 82500.0, "total_amt": 1544400.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 243, "row": 248, "stt": "4", "content": "Lơi D114 dày", "dvt": "Cái", "qty": 6.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 100000.0, "price_labor": 50000.0, "price_total": 150000.0, "total_amt": 900000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 244, "row": 249, "stt": "5", "content": "Lơi D60 dày", "dvt": "Cái", "qty": 4.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 43000.0, "price_labor": 19000.0, "price_total": 62000.0, "total_amt": 248000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 245, "row": 250, "stt": "6", "content": "Co D114 dày", "dvt": "Cái", "qty": 6.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 231000.0, "price_labor": 60000.0, "price_total": 291000.0, "total_amt": 1746000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 246, "row": 251, "stt": "7", "content": "Co D60 dày", "dvt": "Cái", "qty": 4.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 47000.0, "price_labor": 30000.0, "price_total": 77000.0, "total_amt": 308000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 247, "row": 252, "stt": "8", "content": "Co D49 dày", "dvt": "Cái", "qty": 3.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 126000.0, "price_labor": 100000.0, "price_total": 226000.0, "total_amt": 678000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 248, "row": 253, "stt": "9", "content": "Y D114 dày", "dvt": "Cái", "qty": 2.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 142000.0, "price_labor": 65000.0, "price_total": 207000.0, "total_amt": 414000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 249, "row": 254, "stt": "10", "content": "Y D60 dày", "dvt": "Cái", "qty": 3.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 54600.0, "price_labor": 35000.0, "price_total": 89600.0, "total_amt": 268800.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 250, "row": 255, "stt": "11", "content": "Phụ kiện hệ thống thoát nước (ty treo, giá đỡ, keo dán….)", "dvt": "lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 4000000.0, "price_labor": 0.0, "price_total": 4000000.0, "total_amt": 4000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 251, "row": 256, "stt": "", "content": "Phần Cấp nước", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 252, "row": 257, "stt": "1", "content": "Bồn nước Inox 304 1000 lít", "dvt": "cái", "qty": 1.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 3675000.0, "price_labor": 625000.0, "price_total": 4300000.0, "total_amt": 4300000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 253, "row": 258, "stt": "2", "content": "Bơm cấp nước Q=2m3/h, H=20m", "dvt": "cái", "qty": 1.0, "code": "GP-200JXK-SV5", "brand": "Panasonic", "origin": "VN", "note": "", "price_mat": 1680000.0, "price_labor": 375000.0, "price_total": 2055000.0, "total_amt": 2055000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 254, "row": 259, "stt": "3", "content": "Van khóa D34", "dvt": "Cái", "qty": 3.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 73500.0, "price_labor": 24000.0, "price_total": 97500.0, "total_amt": 292500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 255, "row": 260, "stt": "4", "content": "Van 1 chiều D34", "dvt": "Cái", "qty": 1.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 220500.0, "price_labor": 24000.0, "price_total": 244500.0, "total_amt": 244500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 256, "row": 261, "stt": "5", "content": "Racco D34", "dvt": "Cái", "qty": 2.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 31500.0, "price_labor": 24000.0, "price_total": 55500.0, "total_amt": 111000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 257, "row": 262, "stt": "6", "content": "Van phao D34", "dvt": "Cái", "qty": 1.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 294000.0, "price_labor": 24000.0, "price_total": 318000.0, "total_amt": 318000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 258, "row": 263, "stt": "7", "content": "Phao điện", "dvt": "Cái", "qty": 1.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 126000.0, "price_labor": 24000.0, "price_total": 150000.0, "total_amt": 150000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 259, "row": 264, "stt": "8", "content": "Ống uPVC D34 1.6mm", "dvt": "m", "qty": 48.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 16000.0, "price_labor": 20000.0, "price_total": 36000.0, "total_amt": 1728000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 260, "row": 265, "stt": "9", "content": "Ống uPVC D27 1.3mm", "dvt": "m", "qty": 12.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 10500.0, "price_labor": 20000.0, "price_total": 30500.0, "total_amt": 366000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 261, "row": 266, "stt": "10", "content": "Ống uPVC D21 1.2mm", "dvt": "m", "qty": 40.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 8400.0, "price_labor": 20000.0, "price_total": 28400.0, "total_amt": 1136000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 262, "row": 267, "stt": "11", "content": "Tê D27 dày", "dvt": "Cái", "qty": 6.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 8400.0, "price_labor": 25000.0, "price_total": 33400.0, "total_amt": 200400.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 263, "row": 268, "stt": "12", "content": "Tê giảm D27-D21 dày", "dvt": "Cái", "qty": 6.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 8400.0, "price_labor": 25000.0, "price_total": 33400.0, "total_amt": 200400.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 264, "row": 269, "stt": "13", "content": "Nối giảm D34-D27 dày", "dvt": "Cái", "qty": 2.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 7300.0, "price_labor": 25000.0, "price_total": 32300.0, "total_amt": 64600.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 265, "row": 270, "stt": "14", "content": "Nối giảm D27-D21 dày", "dvt": "Cái", "qty": 2.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 6300.0, "price_labor": 25000.0, "price_total": 31300.0, "total_amt": 62600.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 266, "row": 271, "stt": "15", "content": "Co D34 dày", "dvt": "Cái", "qty": 9.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 7300.0, "price_labor": 25000.0, "price_total": 32300.0, "total_amt": 290700.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 267, "row": 272, "stt": "16", "content": "Co D27 dày", "dvt": "Cái", "qty": 9.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 6300.0, "price_labor": 25000.0, "price_total": 31300.0, "total_amt": 281700.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 268, "row": 273, "stt": "17", "content": "Co D21 dày", "dvt": "Cái", "qty": 10.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 5200.0, "price_labor": 25000.0, "price_total": 30200.0, "total_amt": 302000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 269, "row": 274, "stt": "18", "content": "Co răng trong D21", "dvt": "Cái", "qty": 6.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 6300.0, "price_labor": 25000.0, "price_total": 31300.0, "total_amt": 187800.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 270, "row": 275, "stt": "19", "content": "Nối 2 đầu răng D21", "dvt": "Cái", "qty": 6.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 4200.0, "price_labor": 25000.0, "price_total": 29200.0, "total_amt": 175200.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 271, "row": 276, "stt": "20", "content": "Phụ kiện hệ thống cấp nước (ty treo, giá đỡ, keo dán….)", "dvt": "lô", "qty": 1.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 3500000.0, "price_labor": 1500000.0, "price_total": 5000000.0, "total_amt": 5000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. KHU NHÀ NHÂN VIÊN"}, {"id": 272, "row": 277, "stt": "IV", "content": "PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 273, "row": 278, "stt": "1", "content": "Lắp đặt kim thu sét bán kính bảo vệ 20m, H=5m", "dvt": "Cái", "qty": 1.0, "code": "", "brand": "Liva", "origin": "Thỗ Nhỹ kỳ", "note": "", "price_mat": 18000000.0, "price_labor": 0.0, "price_total": 18000000.0, "total_amt": 18000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 274, "row": 279, "stt": "2", "content": "Cọc tiếp đất D16, L2.4m", "dvt": "cọc", "qty": 4.0, "code": "", "brand": "", "origin": "VN", "note": "Cọc mạ đồng", "price_mat": 472500.0, "price_labor": 112000.0, "price_total": 584500.0, "total_amt": 2338000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 275, "row": 280, "stt": "3", "content": "Mối hàn hoá nhiệt", "dvt": "mối", "qty": 4.0, "code": "", "brand": "Cadwell", "origin": "Mỹ", "note": "", "price_mat": 635250.0, "price_labor": 135000.0, "price_total": 770250.0, "total_amt": 3081000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 276, "row": 281, "stt": "4", "content": "Giếng khoan tiếp địa 20-30m", "dvt": "cái", "qty": 4.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 0.0, "price_labor": 4600000.0, "price_total": 4600000.0, "total_amt": 18400000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 277, "row": 282, "stt": "5", "content": "Trụ đỡ kim thu sét STK D60", "dvt": "bộ", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 3675000.0, "price_labor": 0.0, "price_total": 3675000.0, "total_amt": 3675000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 278, "row": 283, "stt": "6", "content": "Dây đồng trần 70mm2", "dvt": "m", "qty": 134.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 386400.0, "price_labor": 60000.0, "price_total": 446400.0, "total_amt": 59817600.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 279, "row": 284, "stt": "7", "content": "Hộp kiểm tra điện trở đất inox 304 200x200", "dvt": "hộp", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 432500.0, "price_labor": 120000.0, "price_total": 552500.0, "total_amt": 552500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 280, "row": 285, "stt": "8", "content": "Ống PVC D32", "dvt": "m", "qty": 48.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 84000.0, "price_labor": 15000.0, "price_total": 99000.0, "total_amt": 4752000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 281, "row": 286, "stt": "9", "content": "Bình chữa cháy CO2 5kg", "dvt": "cái", "qty": 2.0, "code": "CO2/MT5", "brand": "83MEC", "origin": "VN", "note": "", "price_mat": 829500.0, "price_labor": 0.0, "price_total": 829500.0, "total_amt": 1659000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 282, "row": 287, "stt": "10", "content": "Bình bột BC 8kg", "dvt": "cái", "qty": 2.0, "code": "ABC/8KG", "brand": "83MEC", "origin": "VN", "note": "", "price_mat": 493130.0, "price_labor": 0.0, "price_total": 493130.0, "total_amt": 986260.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 283, "row": 288, "stt": "11", "content": "Bảng nội quy PCCC + Tiêu lệnh PCCC", "dvt": "bộ", "qty": 2.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 472500.0, "price_labor": 187200.0, "price_total": 659700.0, "total_amt": 1319400.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 284, "row": 289, "stt": "12", "content": "Phụ kiện hệ thống chống sét và tiếp địa ( Bao gồm mối hàn hóa nhiệt).", "dvt": "lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 4000000.0, "price_labor": 1000000.0, "price_total": 5000000.0, "total_amt": 5000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "IV. PHẦN CHỐNG SÉT VÀ TIẾP ĐỊA"}, {"id": 285, "row": 290, "stt": "V", "content": "PHẦN BÁO CHÁY", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 286, "row": 291, "stt": "1", "content": "Trung tâm báo cháy 24V- 4 Zone đã bao gồm Acquy\nTủ trung tâm báo cháy loại thường 4 kênh", "dvt": "Tủ", "qty": 1.0, "code": "AW-CFP2166-4C", "brand": "Asenware", "origin": "TQ", "note": "", "price_mat": 17037500.0, "price_labor": 0.0, "price_total": 17037500.0, "total_amt": 17037500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 287, "row": 292, "stt": "2", "content": "Bộ truyền tín hiệu tới đơn vị PCCC", "dvt": "Bộ", "qty": 1.0, "code": "G6", "brand": "GSAFE", "origin": "VN", "note": "", "price_mat": 7500000.0, "price_labor": 2100000.0, "price_total": 9600000.0, "total_amt": 9600000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 288, "row": 293, "stt": "3", "content": "Chuông + đèn + nút nhấn 24V", "dvt": "bộ", "qty": 2.0, "code": "AW-D316\nAW-D315C", "brand": "Asenware", "origin": "TQ", "note": "", "price_mat": 1627500.0, "price_labor": 585000.0, "price_total": 2212500.0, "total_amt": 4425000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 289, "row": 294, "stt": "4", "content": "Đầu báo khói", "dvt": "cái", "qty": 9.0, "code": "AW-CSD381", "brand": "Asenware", "origin": "TQ", "note": "", "price_mat": 756000.0, "price_labor": 168480.0, "price_total": 924480.0, "total_amt": 8320320.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 290, "row": 295, "stt": "5", "content": "Đầu báo khói dạng tia - đầu phát", "dvt": "cái", "qty": 1.0, "code": "AW-D130C", "brand": "Asenware", "origin": "TQ", "note": "", "price_mat": 9591750.0, "price_labor": 702000.0, "price_total": 10293750.0, "total_amt": 10293750.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 291, "row": 296, "stt": "6", "content": "Đầu báo khói dạng tia -  đầu thu", "dvt": "cái", "qty": 1.0, "code": "AW-D130C", "brand": "Asenware", "origin": "TQ", "note": "", "price_mat": 12757500.0, "price_labor": 702000.0, "price_total": 13459500.0, "total_amt": 13459500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 292, "row": 297, "stt": "7", "content": "Cáp điện Cu/PVC 2x1C-1.5mm2", "dvt": "m", "qty": 334.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 8400.0, "price_labor": 7488.0, "price_total": 15888.0, "total_amt": 5306592.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 293, "row": 298, "stt": "8", "content": "Ống điện D20", "dvt": "m", "qty": 150.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 23698.5, "price_labor": 7020.0, "price_total": 30718.5, "total_amt": 4607775.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 294, "row": 299, "stt": "9", "content": "Ống điện mềm D20", "dvt": "m", "qty": 10.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 6300.0, "price_labor": 3744.0, "price_total": 10044.0, "total_amt": 100440.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 295, "row": 300, "stt": "10", "content": "Phụ kiện hệ thống báo cháy", "dvt": "Lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 3000000.0, "price_labor": 0.0, "price_total": 3000000.0, "total_amt": 3000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "V. PHẦN BÁO CHÁY"}, {"id": 296, "row": 301, "stt": "VI", "content": "PHẦN CHIẾU SÁNG BẢNG HIỆU", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 297, "row": 302, "stt": "1", "content": "Đèn Pha LED 200W IP65", "dvt": "Bộ", "qty": 9.0, "code": "D CP06L 200W\n NEPTUNE 200\nAFL01C02003/46", "brand": "Rạng Đông\nĐiện Quang\nAC", "origin": "VN", "note": "Ánh sáng vàng ấm\nMua hàng Hoa Sen Home", "price_mat": 4000500.0, "price_labor": 450000.0, "price_total": 4450500.0, "total_amt": 40054500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 298, "row": 303, "stt": "2", "content": "Đèn led downlight gắn nổi 24w", "dvt": "Bộ", "qty": 12.0, "code": "AD08C0243 225mm/24W", "brand": "AC", "origin": "VN", "note": "Ánh sáng vàng ấm\nMua hàng Hoa Sen Home", "price_mat": 400250.0, "price_labor": 121000.0, "price_total": 521250.0, "total_amt": 6255000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 299, "row": 304, "stt": "3", "content": "Dây điện 1Cx2.5mm2", "dvt": "m", "qty": 560.0, "code": "", "brand": "Daphaco Lion", "origin": "VN", "note": "Mua hàng Hoa Sen Home", "price_mat": 13000.0, "price_labor": 7488.0, "price_total": 20488.0, "total_amt": 11473280.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 300, "row": 305, "stt": "4", "content": "Ống điện D20", "dvt": "m", "qty": 190.0, "code": "", "brand": "Hoa Sen", "origin": "VN", "note": "Mua hàng Hoa Sen bán", "price_mat": 23698.5, "price_labor": 7020.0, "price_total": 30718.5, "total_amt": 5836515.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 301, "row": 306, "stt": "5", "content": "Tủ điện DB-BH", "dvt": "tủ", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 302, "row": 307, "stt": "5.0999999999999996", "content": "MCB-2P-40A-6kA", "dvt": "Cái", "qty": 1.0, "code": "BKN 2P 40A", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 257250.0, "price_labor": 28080.0, "price_total": 285330.0, "total_amt": 285330.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 303, "row": 308, "stt": "5.2", "content": "MCB-1P-16A-6kA", "dvt": "Cái", "qty": 4.0, "code": "BKN 1P 16A", "brand": "LS", "origin": "Korea", "note": "", "price_mat": 92400.0, "price_labor": 19656.0, "price_total": 112056.0, "total_amt": 448224.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 304, "row": 309, "stt": "5.3", "content": "Contactor 2P-40A + timer", "dvt": "Bộ", "qty": 1.0, "code": "LS 25A- 24vdc + DH48S-2Z 220V", "brand": "LS + Panasonic", "origin": "Hàn Quốc + Nhật Bản", "note": "", "price_mat": 1312500.0, "price_labor": 234000.0, "price_total": 1546500.0, "total_amt": 1546500.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 305, "row": 310, "stt": "5.4", "content": "Vỏ tủ điện, thanh cái 40A P+N+E & Phụ kiện Form 1A", "dvt": "Lô", "qty": 1.0, "code": "", "brand": "Long Phú\nHawee\nĐạt Vĩnh Tiến", "origin": "VN", "note": "", "price_mat": 0.0, "price_labor": 5630498.0, "price_total": 5630498.0, "total_amt": 5630498.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 306, "row": 311, "stt": "6", "content": "Phụ kiện hệ thống biển hiệu (gia công giá đõ đèn Pha LED theo yêu cầu của CĐT)", "dvt": "Lô", "qty": 1.0, "code": "", "brand": "", "origin": "VN", "note": "", "price_mat": 0.0, "price_labor": 4000000.0, "price_total": 4000000.0, "total_amt": 4000000.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 307, "row": 312, "stt": "TỔNG CỘNG (VNĐ - CHƯA VAT)", "content": "", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 3854146465.8899994, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 308, "row": 313, "stt": "I.", "content": "GHI CHÚ", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 309, "row": 314, "stt": "1", "content": "YÊU CẦU CÁC NCC KHẢO SÁT HIỆN TRẠNG TRƯỚC KHI BÁO GIÁ.", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 310, "row": 315, "stt": "2", "content": "NCC TÍNH LẠI KHỐI LƯỢNG, NẾU CÓ PHÁT SINH NGOÀI CÁC ĐẦU MỤC BOQ, ĐƠN VỊ THI CÔNG VUI LÒNG GỬI VỀ CHO HOA SEN RÀ SOÁT LẠI", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 311, "row": 316, "stt": "3", "content": "NCC PHẢI SỬ DỤNG CÁC SẢN PHẨM THƯƠNG MẠI QUA KÊNH HOA SEN HOME (NẾU NẰM TRONG ĐẦU MỤC CÓ KINH DOANH PHÂN PHỐI)", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 312, "row": 317, "stt": "4", "content": "NHÀ THẦU BỔ SUNG MÃ HIỆU, NHÃN HIỆU, XUẤT XỨ ( NẾU CÓ ), GHI RÕ THÔNG SỐ KỸ THUẬT CHO CHỦNG LOẠI VẬT TƯ", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 313, "row": 318, "stt": "5", "content": "MUA HÀNG HOA SEN BÁN VÀ HOA SEN THƯƠNG MẠI: TẠI NHÀ MÁY HOA SEN SẢN XUẤT VÀ CỬA HÀNG HOA SEN HOME.", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "VI. PHẦN CHIẾU SÁNG BẢNG HIỆU"}, {"id": 314, "row": 319, "stt": "II", "content": "VỀ NĂNG LỰC KỸ THUẬT", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. VỀ NĂNG LỰC KỸ THUẬT"}, {"id": 315, "row": 320, "stt": "1", "content": "MỜI CÁC NCC HỌP KỸ THUẬT TRƯỚC KHI CHÀO GIÁ", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. VỀ NĂNG LỰC KỸ THUẬT"}, {"id": 316, "row": 321, "stt": "2", "content": "NCC PHẢI CÓ KINH NGHIỆM THI CÔNG CÁC CÔNG TRÌNH CÓ QUY MÔ TƯƠNG TỰ TỪ 02 CÔNG TRÌNH TRỞ LÊN", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "II. VỀ NĂNG LỰC KỸ THUẬT"}, {"id": 317, "row": 322, "stt": "III", "content": "VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 318, "row": 323, "stt": "1", "content": "NCC PHẢI CÓ ĐỦ NĂNG LỰC VỀ TÀI CHÍNH, ĐẢM BẢO NĂNG LỰC NHÂN SỰ THỰC HIỆN, PHÙ HỢP VỚI QUY MÔ CÔNG TRÌNH", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 319, "row": 324, "stt": "ĐIỀU KHOẢN THƯƠNG MẠI", "content": "", "dvt": "HOA SEN ĐỀ XUẤT", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 320, "row": 325, "stt": "Địa điểm", "content": "", "dvt": "Cửa Hàng Hoa Sen Home Phủ Lý - Ninh Bình", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 321, "row": 326, "stt": "Thời gian thực hiện", "content": "", "dvt": "Trong vòng…….. ngày kể từ ngày ký hợp đồng, duyệt bản vẽ thi công và bàn giao mặt bằng.", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 322, "row": 327, "stt": "Thanh toán", "content": "", "dvt": "- Đợt 1: Tạm ứng 30% tổng giá trị HĐ ngay sau khi ký HĐ (Nhà thầu cấp bảo lãnh tiền tạm ứng vô điều kiện, không hủy ngang, tương ứng 30%, Hiệu lực bảo lãnh = Thời hạn HĐ + 10 ngày).\n- Đợt 2,3,...: Cứ sau 30 ngày thi công, thanh toán đến 85% giá trị khối lượng hoàn thành (đã bao gồm 30% giá trị đã tạm ứng của phần khối lượng đó) kể từ ngày Chủ đầu tư nhận đúng và đầy đủ hồ sơ thanh toán từ Nhà thầu\n- Đợt cuối: Thanh toán phần còn lại theo giá trị quyết toán (khối lượng nghiệm thu thực tế) sau khi chủ đầu tư nhận được đầy đủ hồ sơ quyết toán theo quy định và nhận được thư bảo lãnh bảo hành vô điều kiện không hủy ngang trị giá 5% giá trị hoàn thành (Hiệu lực bảo lãnh = Thời gian bảo hành 1 năm + 5 ngày)", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 323, "row": 328, "stt": "Bảo hành", "content": "", "dvt": "- Thời hạn bảo hành: Bảo hành toàn hệ thống trong vòng 12 tháng kể từ ngày ký Biên bản nghiệm thu bàn giao.", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 324, "row": 329, "stt": "CO, CQ, CNXX", "content": "", "dvt": "- Sẽ trình trước khi đưa vật tư vào công trình.", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 325, "row": 330, "stt": "Hiệu lực báo giá", "content": "", "dvt": "30/07/2026", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 326, "row": 331, "stt": "Khác", "content": "", "dvt": "- Giá dự thầu là giá do nhà thầu ghi trong hồ sơ dự thầu sau khi đã trừ phần giảm giá (nếu có) và phải được đưa về đơn giá tổng hợp sau thuế trọn gói bao gồm tất cả các chi phí để thi công hoàn thành công trình, chi phí bảo hành, chi phí vận hành chạy thử, bảo hiểm xã hội, con người, vật tư, nhân công, thiết bị, thí nghiệm vật tư, lán trại, điện nước phục vụ thi công, làm đường tạm, biện pháp thi công, bốc xếp, bảo vệ, phí phòng ngừa rủi ro,  thuế (VAT, thuế thu nhập doanh nghiệp, thuế hải quan vv...), đào tạo huấn luyện công nhân về an toàn lao động, phòng chống cháy nổ, chi phí và lệ phí (nếu có) để cơ quan có thẩm quyền của nhà nước nghiệm thu hoàn thành công trình để đưa vào sử dụng.... \n- Giá dự thầu được chào trên cơ sở cho một đơn vị tính (m2, m3, kg . . .).\n- Giá dự thầu đã bao gồm các chi phí hao hụt, vật tư phụ, quản lý và các chi phí khác (nếu có)\n- Trường hợp nhà thầu phát hiện khối lượng trong bản tiên lượng hồ sơ mời thầu tính thiếu so với thiết kế hoặc cần bổ sung khối lượng thiết kế để đảm bảo yêu cầu kỹ thuật thi công của công trình thì nhà thầu phải lập thành bản chào riêng, không cộng vào giá chào thầu, trình chủ đầu tư phê duyệt.\n- Phải sử dụng các sản phẩm thương mại qua kênh HSH (Nếu nằm trong đầu mục có kinh doanh của HSH)\n- Loại hợp đồng: đơn giá cố định, nghiệm thu thực tế.", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 327, "row": 332, "stt": "", "content": "", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}, {"id": 328, "row": 333, "stt": "", "content": "", "dvt": "", "qty": 0.0, "code": "", "brand": "", "origin": "", "note": "", "price_mat": 0.0, "price_labor": 0.0, "price_total": 0.0, "total_amt": 0.0, "vendor_note": "", "sec": "F. PHẦN MEP", "subsec": "III. VỀ NĂNG LỰC NHÂN SỰ, TÀI CHÍNH"}];
const DRAWINGS = [{"id": "foundation-1", "category": "foundation", "categoryName": "Kết Cấu Móng & Đà Kiềng", "pageNumber": 1, "title": "Mặt bằng Móng Nâng Cấp (TL 1/100)", "file": "./assets/hoa-sen/foundation-page-1.png", "desc": "Lưới trục 1-4 (20m: 6.7m + 6.6m + 6.7m), mở rộng 17.2m, trục A-E (25m - 30.08m), cao độ sân BT -0.150.", "tags": ["Mặt bằng móng", "Lưới trục 1-4", "KC-PS p.1", "Cao độ -0.150"], "revision": "Rev 01 (10/09/2026)", "scale": "1/100"}, {"id": "foundation-2", "category": "foundation", "categoryName": "Kết Cấu Móng & Đà Kiềng", "pageNumber": 2, "title": "Chi tiết Móng M1, M2, M3 (TL 1/25)", "file": "./assets/hoa-sen/foundation-page-2.png", "desc": "M1-M2 (1200x1200x350, h=1500, đáy -1.500, đài Φ12a150 2 lớp, 8Φ16 cổ cột, đai Φ8a150, Sika Grout 214-11); M3 (1000x900x300, 6Φ14, 3 lưới Φ8).", "tags": ["Móng M1", "Móng M2", "Móng M3", "Sika Grout", "Đài Φ12a150"], "revision": "Rev 01 (10/09/2026)", "scale": "1/25"}, {"id": "foundation-3", "category": "foundation", "categoryName": "Kết Cấu Móng & Đà Kiềng", "pageNumber": 3, "title": "Chi tiết Móng M4, M5, M6 (TL 1/25)", "file": "./assets/hoa-sen/foundation-page-3.png", "desc": "M4 lệch tâm (1000x1000x300, 6Φ14); M5-M6 khu NV (1200x1200x200, đáy -1.000, 4Φ14, đai Φ6a150).", "tags": ["Móng M4 lệch tâm", "Móng M5", "Móng M6", "Nhà NV", "Đáy -1.000"], "revision": "Rev 01 (10/09/2026)", "scale": "1/25"}, {"id": "foundation-4", "category": "foundation", "categoryName": "Kết Cấu Móng & Đà Kiềng", "pageNumber": 4, "title": "Chi tiết Móng M7, M8 & Xử lý Hàm Ếch Thực Tế (TL 1/25)", "file": "./assets/hoa-sen/foundation-page-4.png", "desc": "M7 (1200x1200x200); M8 phát sinh (1400x1400x250, 8Φ16) giáp dầm hiện hữu, đổ bù bê tông lót M100 đá 1x2 phần hở hàm ếch.", "tags": ["Móng M7", "Móng M8 phát sinh", "Hàm ếch thi công", "BT lót M100"], "revision": "Rev 01 (10/09/2026)", "scale": "1/25"}, {"id": "foundation-5", "category": "foundation", "categoryName": "Kết Cấu Móng & Đà Kiềng", "pageNumber": 5, "title": "Chi tiết Đà Kiềng ĐK1, ĐK2, ĐK3, ĐK4, ĐK5 (TL 1/25)", "file": "./assets/hoa-sen/foundation-page-5.png", "desc": "ĐK1-ĐK2 (200x500, 4Φ16+2Φ14); ĐK3-ĐK4-ĐK5 (200x350, 4Φ14, đai Φ6a150/200), khoan cấy thép neo vào BTCT hiện hữu bằng keo Ramset/Hilti.", "tags": ["Đà kiềng ĐK1-ĐK5", "Thép dầm 4Φ16", "Khoan cấy thép Ramset"], "revision": "Rev 01 (10/09/2026)", "scale": "1/25"}, {"id": "foundation-6", "category": "foundation", "categoryName": "Kết Cấu Móng & Đà Kiềng", "pageNumber": 6, "title": "Chi tiết Bể Tự Hoại KC-49 & Mương Thoát Nước (TL 1/25)", "file": "./assets/hoa-sen/foundation-page-6.png", "desc": "Bể tự hoại 3900x1900x1900 3 ngăn (Chứa - Lắng - Lọc), đáy bê tông dày 150mm thép Φ12a200 2 lớp, thành gạch 200 trát vữa M75 chống thấm Sika.", "tags": ["Bể tự hoại KC-49", "3 ngăn Chứa Lắng Lọc", "Chống thấm Sika"], "revision": "Rev 01 (10/09/2026)", "scale": "1/25"}, {"id": "design-1", "category": "arch", "categoryName": "Kiến Trúc & Nhà Nhân Viên", "pageNumber": 1, "title": "Bìa Hồ Sơ Thiết Kế Thi Công (TKTC)", "file": "./assets/hoa-sen/design-page-1.png", "desc": "Hồ sơ chính thức CĐT Tập đoàn Hoa Sen - Gói thầu Xây lắp & MEP Phủ Lý. Hợp đồng 01/2026/HĐXD/HSG-HG.", "tags": ["Bìa hồ sơ TKTC", "Tập đoàn Hoa Sen", "Hợp đồng 01/2026"], "revision": "Phát hành chính thức (10/09/2026)", "scale": "N/A"}, {"id": "design-4", "category": "arch", "categoryName": "Kiến Trúc & Nhà Nhân Viên", "pageNumber": 4, "title": "Mặt bằng Cải tạo Tổng thể & Định vị Tim trục (TL 1/100)", "file": "./assets/hoa-sen/design-page-4.png", "desc": "Khu trưng bày Showroom Hoa Sen Home, khu nhà xưởng Canopy, văn phòng nhà NV 30m2, sân bãi giao nhận tôn thép.", "tags": ["Mặt bằng cải tạo", "Showroom Hoa Sen Home", "Khu nhà NV"], "revision": "Rev 00 (10/09/2026)", "scale": "1/100"}, {"id": "design-5", "category": "arch", "categoryName": "Kiến Trúc & Nhà Nhân Viên", "pageNumber": 5, "title": "Mặt bằng Mái Tôn & Máng Xối Nước Mưa (TL 1/100)", "file": "./assets/hoa-sen/design-page-5.png", "desc": "Hệ thống mái tôn Hoa Sen Mag Shield dày 0.50mm, độ dốc i=15%, máng xối Inox 304 và 4 ống thoát đứng D110 PVC.", "tags": ["Mái tôn Mag Shield 0.50mm", "Máng xối Inox 304", "Độ dốc i=15%"], "revision": "Rev 00 (10/09/2026)", "scale": "1/100"}, {"id": "design-7", "category": "arch", "categoryName": "Kiến Trúc & Nhà Nhân Viên", "pageNumber": 7, "title": "Mặt đứng Chính & Chi tiết Ốp Alu Mặt tiền (TL 1/50)", "file": "./assets/hoa-sen/design-page-7.png", "desc": "Tấm ốp hợp kim nhôm nhựa Alcorest EV3001 màu đỏ Hoa Sen và EV3010 màu bạc, chữ nổi tôn sơn 2K có đèn LED chiếu hắt.", "tags": ["Mặt đứng chính", "Alu Alcorest đỏ EV3001", "Alu bạc EV3010"], "revision": "Rev 00 (10/09/2026)", "scale": "1/50"}, {"id": "design-16", "category": "arch", "categoryName": "Kiến Trúc & Nhà Nhân Viên", "pageNumber": 16, "title": "Chi tiết Nhà Nhân Viên & Vệ Sinh D30 (TL 1/25)", "file": "./assets/hoa-sen/design-page-16.png", "desc": "Mặt bằng, mặt cắt khu văn phòng NV 30m2, trần nhựa PIMA PC-24, nền lát gạch Granite Lustile 600x600, tường sơn KCC GA01250.", "tags": ["Nhà nhân viên D30", "Gạch lát 600x600", "Trần PIMA PC-24"], "revision": "Rev 00 (10/09/2026)", "scale": "1/25"}, {"id": "design-30", "category": "arch", "categoryName": "Kiến Trúc & Nhà Nhân Viên", "pageNumber": 30, "title": "Chi tiết Cửa Nhôm Kính Xingfa & Cửa Cuốn (TL 1/20)", "file": "./assets/hoa-sen/design-page-30.png", "desc": "Cửa nhôm kính Xingfa hệ 55/65 kính cường lực 10-12mm, cửa cuốn Fucodoor sơn tĩnh điện xám mờ in logo Hoa Sen Home.", "tags": ["Cửa Xingfa hệ 55/65", "Kính cường lực 12mm", "Cửa cuốn Fucodoor"], "revision": "Rev 00 (10/09/2026)", "scale": "1/20"}, {"id": "design-24", "category": "canopy", "categoryName": "KCT Thép & Canopy", "pageNumber": 24, "title": "Chi tiết Kèo Thép & Mái Canopy (TL 1/25)", "file": "./assets/hoa-sen/design-page-24.png", "desc": "Kèo thép I-(350~250)x200x6x8, dầm canopy I-250x200x6x8, bu lông neo J M20 (8.8) mạ kẽm điện phân L=600mm.", "tags": ["Kèo thép I-350", "Dầm I-250", "Bu lông J M20 (8.8)"], "revision": "Rev 00 (10/09/2026)", "scale": "1/25"}, {"id": "design-35", "category": "canopy", "categoryName": "KCT Thép & Canopy", "pageNumber": 35, "title": "Chi tiết Khung Xà Gồ C125 & Ốp Tôn Vách (TL 1/20)", "file": "./assets/hoa-sen/design-page-35.png", "desc": "Tôn vách 11 sóng Hoa Sen Mag Shield dày 0.50mm, xà gồ C125x50x15x1.8 và thép hộp mạ kẽm 50x100x1.4mm.", "tags": ["Tôn Mag Shield 0.50mm", "Xà gồ C125x50x15", "Hộp 50x100x1.4"], "revision": "Rev 00 (10/09/2026)", "scale": "1/20"}, {"id": "design-52", "category": "mep", "categoryName": "MEP & PCCC TCVN", "pageNumber": 52, "title": "Sơ đồ Cung Cấp Điện & Chiếu Sáng (Sơ đồ)", "file": "./assets/hoa-sen/design-page-52.png", "desc": "Tủ điện DB-HSH, MCCB LS Hàn Quốc, 37 bộ đèn LED Panel Rạng Đông 50W 600x600, 9 bộ pha LED 200W IP65 chiếu sáng ngoài trời.", "tags": ["Tủ điện DB-HSH", "Panel Rạng Đông 50W", "Pha LED 200W"], "revision": "Rev 00 (10/09/2026)", "scale": "Sơ đồ nguyên lý"}, {"id": "design-68", "category": "mep", "categoryName": "MEP & PCCC TCVN", "pageNumber": 68, "title": "Hệ thống Báo Cháy Tự Động & PCCC (TL 1/100)", "file": "./assets/hoa-sen/design-page-68.png", "desc": "Tủ trung tâm báo cháy Asenware 4-Zone AW-CFP2166-4C, bộ truyền tin GSAFE G6, đầu báo khói dạng tia AW-D130C, TCVN 5738:2024.", "tags": ["Tủ Asenware 4-Zone", "Báo khói tia AW-D130C", "TCVN 5738:2024"], "revision": "Rev 00 (10/09/2026)", "scale": "1/100"}];
const INITIAL_QAQC = [{"id": 1, "code": "QC-01", "title": "Nghiệm thu hố móng và cao độ đáy móng M1-M8 (-1.500m)", "std": "TCVN 4453:1995", "status": "pending", "date": "10/09/2026", "inspector": "Kỹ sư KS Đỗ Văn Thành"}, {"id": 2, "code": "QC-02", "title": "Nghiệm thu ván khuôn và cốt thép đài móng M1-M8", "std": "TCVN 5574:2018", "status": "pending", "date": "12/09/2026", "inspector": "Kỹ sư KS Đỗ Văn Thành"}, {"id": 3, "code": "QC-03", "title": "Nghiệm thu lấy mẫu và độ sụt bê tông móng M250 PCB40", "std": "TCVN 3105:2022", "status": "pending", "date": "14/09/2026", "inspector": "TVGS Tập đoàn HSG"}, {"id": 4, "code": "QC-04", "title": "Xử lý hàm ếch móng M8 giáp hố gas (bơm bù BT lót M100)", "std": "Biên bản hiện trường", "status": "pending", "date": "15/09/2026", "inspector": "Chỉ huy trưởng"}, {"id": 5, "code": "QC-05", "title": "Nghiệm thu lắp đặt bu lông neo J M20 (8.8) chân cột", "std": "TCVN 5575:2012", "status": "pending", "date": "18/09/2026", "inspector": "Kỹ sư Kết cấu"}, {"id": 6, "code": "QC-06", "title": "Nghiệm thu cốt thép đà kiềng ĐK1-ĐK5 và cấy thép Ramset", "std": "TCVN 4453:1995", "status": "pending", "date": "20/09/2026", "inspector": "TVGS Tập đoàn HSG"}, {"id": 7, "code": "QC-07", "title": "Nghiệm thu chống thấm bể tự hoại KC-49 & mương thoát nước", "std": "TCVN 4519:1988", "status": "pending", "date": "22/09/2026", "inspector": "Kỹ sư Cấp thoát nước"}, {"id": 8, "code": "QC-08", "title": "Nghiệm thu gia công kèo thép I-350 & đường hàn tại xưởng", "std": "TCVN 8789:2011", "status": "pending", "date": "25/09/2026", "inspector": "KCS Xưởng & TVGS"}, {"id": 9, "code": "QC-09", "title": "Nghiệm thu lắp dựng khung kèo Canopy & siết lực bu lông M20", "std": "TCVN 5575:2012", "status": "pending", "date": "28/09/2026", "inspector": "Chỉ huy trưởng"}, {"id": 10, "code": "QC-10", "title": "Rót vữa Sika Grout 214-11 chèn kín chân cột", "std": "Quy trình Sika", "status": "pending", "date": "30/09/2026", "inspector": "Kỹ sư Hiện trường"}, {"id": 11, "code": "QC-11", "title": "Nghiệm thu xây tường 200/100 gạch Tuynel vữa M75 Nhà NV", "std": "TCVN 4085:2011", "status": "pending", "date": "05/10/2026", "inspector": "Kỹ sư Kiến trúc"}, {"id": 12, "code": "QC-12", "title": "Nghiệm thu lợp tôn Mag Shield 0.50mm và độ dốc máng xối", "std": "TCVN 4474:1987", "status": "pending", "date": "12/10/2026", "inspector": "TVGS Tập đoàn HSG"}, {"id": 13, "code": "QC-13", "title": "Nghiệm thu ốp tấm Alu Alcorest EV3001/EV3010 mặt tiền", "std": "Quy chuẩn HSG", "status": "pending", "date": "18/10/2026", "inspector": "Kỹ sư Kiến trúc"}, {"id": 14, "code": "QC-14", "title": "Nghiệm thu đo điện trở tiếp địa hệ thống điện (< 4 Ohm)", "std": "TCVN 9358:2012", "status": "pending", "date": "22/10/2026", "inspector": "Kỹ sư MEP"}, {"id": 15, "code": "QC-15", "title": "Nghiệm thu thử liên động tủ báo cháy Asenware 4-Zone", "std": "TCVN 5738:2024", "status": "pending", "date": "28/10/2026", "inspector": "Đơn vị PCCC Hà Nam"}, {"id": 16, "code": "QC-16", "title": "Nghiệm thu sơn KCC Purist Grey GA01250 và bàn giao", "std": "TCVN 8789:2011", "status": "pending", "date": "05/11/2026", "inspector": "Hội đồng Nghiệm thu HSG"}];
const INITIAL_LOGS = [{"id": 1, "date": "2026-09-10", "dateDisplay": "10/09/2026 (Ngày 01/60)", "weather": "Nắng ráo, nhiệt độ 31°C, độ ẩm 68%", "workers": 18, "equipment": "01 Máy xúc Kobelco 0.3m³, 01 máy kinh vĩ định vị, 02 xe tải chở vật tư", "workContent": "KHỞI CÔNG DỰ ÁN: Bàn giao mặt bằng từ Ban QLDA Tập đoàn Hoa Sen; Định vị tim trục móng M1-M8; Lắp dựng hàng rào tôn bảo vệ an toàn công trường; Tập kết máy móc, lán trại điều hành.", "issues": "Mặt bằng tiếp giáp đường Quốc lộ 1A có mật độ giao thông cao, đã bố trí biển cảnh báo và cử người trực điều tiết giao thông."}];

const DOSSIER_ITEMS = [
  { id: 1, category: "Pháp lý & thiết kế", title: "Hợp đồng thi công và phụ lục", output: "Hợp đồng đã ký, phụ lục/phát sinh được phê duyệt", priority: "critical" },
  { id: 2, category: "Pháp lý & thiết kế", title: "Hồ sơ thiết kế thi công được duyệt", output: "Bản vẽ TKTC, chỉ dẫn kỹ thuật, danh mục bản vẽ", priority: "critical" },
  { id: 3, category: "Pháp lý & thiết kế", title: "Giấy phép và bàn giao mặt bằng", output: "Giấy phép xây dựng/PCCC nếu áp dụng, biên bản bàn giao", priority: "critical" },
  { id: 4, category: "Biện pháp & vật liệu", title: "Biện pháp thi công và tổ chức công trường", output: "Biện pháp, tiến độ, sơ đồ tổ chức, an toàn và môi trường", priority: "critical" },
  { id: 5, category: "Biện pháp & vật liệu", title: "Kế hoạch kiểm tra và nghiệm thu ITP", output: "Điểm dừng kiểm tra, checklist, người phụ trách", priority: "high" },
  { id: 6, category: "Biện pháp & vật liệu", title: "Trình duyệt tôn, thép và vật liệu hoàn thiện", output: "Mẫu, catalogue, thông số kỹ thuật, phê duyệt vật liệu", priority: "critical" },
  { id: 7, category: "Biện pháp & vật liệu", title: "Nghiệm thu vật liệu đầu vào", output: "CO/CQ/CNXX, hóa đơn, phiếu giao hàng, biên bản và ảnh", priority: "critical" },
  { id: 8, category: "Nhật ký & hiện trường", title: "Nhật ký công trình và báo cáo ngày", output: "Nhật ký, nhân lực, thiết bị, thời tiết, công việc, vướng mắc", priority: "high" },
  { id: 9, category: "Nhật ký & hiện trường", title: "Ảnh hiện trường theo giai đoạn", output: "Ảnh trước, trong và sau thi công có ngày/vị trí", priority: "high" },
  { id: 10, category: "Nghiệm thu QA/QC", title: "Móng, đà kiềng, cốt thép và bê tông", output: "Nghiệm thu hố móng, cốt thép, ván khuôn, độ sụt/mẫu bê tông", priority: "critical" },
  { id: 11, category: "Nghiệm thu QA/QC", title: "Khung thép, bu lông và mối hàn", output: "Nghiệm thu gia công/lắp dựng, kích thước, liên kết, sơn bảo vệ", priority: "critical" },
  { id: 12, category: "Nghiệm thu QA/QC", title: "Mái, vách tôn và máng xối Hoa Sen", output: "Độ dày/màu/sóng, vít/ron, chồng mí, diềm, độ dốc, thử chống dột", priority: "critical" },
  { id: 13, category: "Nghiệm thu QA/QC", title: "Bảng hiệu, alu, cửa và hoàn thiện", output: "Nghiệm thu kích thước, màu sắc, liên kết, điện chiếu sáng bảng hiệu", priority: "high" },
  { id: 14, category: "Nghiệm thu QA/QC", title: "MEP: điện, nước, điều hòa và chống sét", output: "Nghiệm thu âm tường, thử điện, thử kín, thoát nước, tiếp địa", priority: "critical" },
  { id: 15, category: "Nghiệm thu QA/QC", title: "PCCC và chạy thử liên động", output: "Biên bản thử hệ thống, hồ sơ PCCC và văn bản chấp thuận nếu áp dụng", priority: "critical" },
  { id: 16, category: "Nhật ký & hiện trường", title: "Defect list và đóng lỗi", output: "Danh sách tồn tại, ảnh khắc phục, xác nhận đóng lỗi", priority: "high" },
  { id: 17, category: "Thanh toán & hoàn công", title: "Đo bóc và xác nhận khối lượng thực tế", output: "Bảng đo bóc, bản vẽ/biên bản xác nhận khối lượng", priority: "critical" },
  { id: 18, category: "Thanh toán & hoàn công", title: "Hồ sơ thanh toán từng đợt", output: "Đề nghị thanh toán, biên bản nghiệm thu, bảng giá trị, hóa đơn", priority: "critical" },
  { id: 19, category: "Thanh toán & hoàn công", title: "Bản vẽ hoàn công và hồ sơ hoàn thành", output: "Bản vẽ hoàn công, kết quả thí nghiệm, tài liệu kỹ thuật", priority: "critical" },
  { id: 20, category: "Thanh toán & hoàn công", title: "Bàn giao, bảo hành và quyết toán", output: "Biên bản bàn giao, bảo hành, hướng dẫn vận hành, quyết toán A-B", priority: "critical" }
];

// Contract lookup is intentionally a curated navigation index. The signed PDF is a scan,
// so the UI searches this structured summary and always links back to the source page.
const CONTRACT_LOOKUP_ITEMS = [
  { id: "overview", filter: "overview", group: "Thông tin chung", page: 1, title: "Số hợp đồng, các bên và tên gói thầu", summary: "Hợp đồng 01/2026/HĐXD/HSG-HG giữa Tập đoàn Hoa Sen và Công ty TNHH TM Hoàng Giang cho gói cải tạo, xây mới Hoa Sen Home Phủ Lý.", keywords: "hợp đồng số bên chủ đầu tư nhà thầu gói thầu phủ lý" },
  { id: "scope", filter: "delivery", group: "Phạm vi & tiến độ", page: 3, title: "Phạm vi công việc và hồ sơ kèm theo", summary: "Tra cứu phần việc xây dựng, cải tạo và MEP/PCCC; khi có thay đổi phạm vi, đối chiếu phụ lục, bản vẽ được duyệt và xác nhận phát sinh.", keywords: "phạm vi công việc phụ lục bản vẽ mep pccc phát sinh" },
  { id: "quality", filter: "quality", group: "Chất lượng", page: 4, title: "Yêu cầu chất lượng và căn cứ nghiệm thu", summary: "Công việc phải bám thiết kế, chỉ dẫn kỹ thuật, tiêu chuẩn áp dụng và hồ sơ kiểm tra chất lượng trước khi chuyển bước.", keywords: "chất lượng nghiệm thu tiêu chuẩn thiết kế chỉ dẫn kỹ thuật" },
  { id: "schedule", filter: "delivery", group: "Phạm vi & tiến độ", page: 5, title: "Thời gian thực hiện và mốc hoàn thành", summary: "Thời hạn thực hiện của gói thầu là 60 ngày, từ 10/09/2026 đến 09/11/2026; dùng mục này để đối chiếu tiến độ và các mốc bàn giao.", keywords: "thời gian tiến độ 60 ngày khởi công hoàn thành bàn giao" },
  { id: "value", filter: "money", group: "Giá trị & thanh toán", page: 5, title: "Giá trị hợp đồng và nguyên tắc giá", summary: "Giá trị đang được hệ thống quản lý ở mức 3.854.146.466 VNĐ trước VAT; dashboard hiển thị thêm tổng sau VAT để theo dõi ngân sách.", keywords: "giá trị hợp đồng giá tiền vat ngân sách đơn giá" },
  { id: "payment", filter: "money", group: "Giá trị & thanh toán", page: 6, title: "Tạm ứng, thanh toán theo đợt và hồ sơ cần nộp", summary: "Mở trang nguồn để đối chiếu điều kiện tạm ứng, giá trị được thanh toán, thành phần hồ sơ và thời điểm thanh toán từng đợt.", keywords: "thanh toán tạm ứng đợt hồ sơ đề nghị thanh toán giá trị" },
  { id: "settlement", filter: "money", group: "Giá trị & thanh toán", page: 7, title: "Quyết toán và xác nhận khối lượng", summary: "Kết quả nghiệm thu, xác nhận khối lượng thực tế và hồ sơ hoàn thành là căn cứ để lập thanh toán cuối kỳ/quyết toán.", keywords: "quyết toán khối lượng thực tế nghiệm thu hồ sơ hoàn thành" },
  { id: "guarantee", filter: "risk", group: "Bảo đảm & rủi ro", page: 8, title: "Bảo lãnh tạm ứng và bảo lãnh thực hiện", summary: "Theo dõi các bảo lãnh, giá trị, thời hạn hiệu lực và điều kiện phải nộp trước khi giải ngân hoặc chuyển bước.", keywords: "bảo lãnh tạm ứng thực hiện hiệu lực ngân hàng bảo đảm" },
  { id: "duties", filter: "overview", group: "Trách nhiệm các bên", page: 9, title: "Quyền, nghĩa vụ và phối hợp tại công trường", summary: "Dùng để xác định đầu mối cung cấp hồ sơ, phối hợp mặt bằng, thông tin kỹ thuật và trách nhiệm phản hồi khi có vướng mắc.", keywords: "quyền nghĩa vụ trách nhiệm phối hợp chủ đầu tư nhà thầu công trường" },
  { id: "safety", filter: "quality", group: "An toàn & môi trường", page: 10, title: "An toàn lao động, môi trường và bảo vệ công trường", summary: "Các yêu cầu về tổ chức thi công an toàn, vệ sinh môi trường, bảo vệ người và tài sản phải được kiểm soát trong nhật ký và hồ sơ hiện trường.", keywords: "an toàn lao động môi trường vệ sinh bảo vệ công trường" },
  { id: "suspension", filter: "risk", group: "Xử lý vi phạm", page: 12, title: "Tạm dừng, chấm dứt và xử lý khi không đáp ứng", summary: "Mở nguồn để đối chiếu điều kiện tạm dừng/chấm dứt, thông báo, khắc phục và trách nhiệm của các bên.", keywords: "tạm dừng chấm dứt vi phạm thông báo khắc phục" },
  { id: "warranty", filter: "risk", group: "Bảo hành & bảo hiểm", page: 14, title: "Bảo hành, bảo hiểm và khắc phục khiếm khuyết", summary: "Tra cứu thời hạn, phạm vi bảo hành và yêu cầu xử lý khiếm khuyết sau nghiệm thu bàn giao.", keywords: "bảo hành bảo hiểm khiếm khuyết sửa chữa bàn giao" },
  { id: "penalty", filter: "risk", group: "Bảo đảm & rủi ro", page: 15, title: "Phạt, bồi thường và thiệt hại", summary: "Tìm nhóm quy định về chậm tiến độ, vi phạm nghĩa vụ, chi phí phát sinh và bồi thường để chuyển đúng người phê duyệt.", keywords: "phạt bồi thường thiệt hại chậm tiến độ chi phí phát sinh" },
  { id: "dispute", filter: "overview", group: "Điều khoản chung", page: 17, title: "Thông báo, giải quyết tranh chấp và hiệu lực", summary: "Trang cuối của phần hợp đồng quy định cách trao đổi, giải quyết bất đồng và hiệu lực chữ ký của các bên.", keywords: "tranh chấp thông báo hiệu lực chữ ký điều khoản chung" },
  { id: "boq", filter: "money", group: "Phụ lục khối lượng", page: 20, title: "Phụ lục BOQ và bảng khối lượng", summary: "Phần phụ lục từ trang 20 đến 52 dùng để đối chiếu khối lượng, đơn vị tính, đơn giá và các ghi chú thương mại.", keywords: "boq phụ lục khối lượng đơn vị tính đơn giá vật tư" }
];

function buildCompleteDrawings() {
  const curated = new Map(DRAWINGS.map(drawing => [drawing.id, drawing]));
  const drawings = [];
  const structurePageTitles = {
    23: "Bìa phần Kết cấu",
    24: "Danh mục bản vẽ Kết cấu",
    25: "Ghi chú chung cho Kết cấu thép",
    26: "Mặt bằng Móng nâng cấp (TL 1/100)",
    27: "Chi tiết Kết cấu Móng M1–M3 (TL 1/25)",
    28: "Chi tiết Kết cấu Móng M4–M6 (TL 1/25)",
    29: "Mặt bằng & Chi tiết Đà kiềng (TL 1/100, 1/25)",
    30: "Mặt bằng Sân nền (TL 1/100)",
    31: "Mặt cắt Sân nền N1–N4",
    32: "Mặt bằng Bổ trụ & Giằng tường (TL 1/100)",
    33: "Mặt bằng Định vị Bu lông (TL 1/100)",
    34: "Mặt bằng Cột thép (TL 1/100)",
    35: "Mặt bằng Vì kèo & Dầm thép nâng cấp (TL 1/100)",
    36: "Mặt bằng Xà gồ (TL 1/100)",
    37: "Mặt bằng Tổng thể mái & Chi tiết Máng xối",
    38: "Mặt đứng Kết cấu trục 1–4 (TL 1/100)",
    39: "Mặt cắt & Chi tiết Nâng cấp gian Home",
    40: "Bổ trụ & Giằng tường khu nâng cấp",
    41: "Mặt bằng Khung treo trần (TL 1/100)",
    42: "Mặt cắt Khung thép 1–1 & Chi tiết G1–G2",
    43: "Mặt đứng Kết cấu nâng cấp",
    44: "Khung xương Bảng hiệu chính",
    45: "Mặt cắt & Chi tiết liên kết A–B",
    46: "Chi tiết liên kết Kết cấu 4–5–C",
    47: "Chi tiết Xà gồ & Diềm Bảng hiệu",
    48: "Chi tiết Bể tự hoại KC-49"
  };
  const categoryForDesignPage = page => {
    if (page <= 22) return ["arch", "Kiến Trúc & Hoàn Thiện"];
    if (page <= 48) return ["structure", "Kết Cấu & Canopy"];
    return ["mep", "MEP & PCCC TCVN"];
  };

  for (let page = 1; page <= 6; page++) {
    const id = `foundation-${page}`;
    drawings.push(curated.get(id) || {
      id,
      category: "foundation",
      categoryName: "Kết Cấu Móng & Đà Kiềng",
      pageNumber: page,
      title: `Bản vẽ Kết cấu móng - trang ${page}`,
      file: `./assets/hoa-sen/foundation-full-page-${page}.png`,
      desc: "Trang bản vẽ kết cấu móng và đà kiềng từ hồ sơ KC MÓNG PS.",
      tags: ["Kết cấu móng", `Trang ${page}`],
      revision: "Theo PDF nguồn",
      scale: "Xem trên bản vẽ"
    });
  }

  for (let page = 1; page <= 70; page++) {
    const id = `design-${page}`;
    const [category, categoryName] = categoryForDesignPage(page);
    const curatedDrawing = curated.get(id);
    const normalizedDrawing = {
      ...(curatedDrawing || {
      id,
      pageNumber: page,
      title: `Hồ sơ thiết kế thi công - trang ${page}`,
      file: `./assets/hoa-sen/design-full-page-${String(page).padStart(2, "0")}.png`,
      desc: "Trang bản vẽ thiết kế thi công Hoa Sen Home Phủ Lý - Ninh Bình.",
      tags: [categoryName, `Trang ${page}`, "TKTC"],
      revision: "Theo PDF nguồn",
      scale: "Xem trên bản vẽ"
      }),
      category,
      categoryName
    };
    if (category === "structure") {
      normalizedDrawing.title = structurePageTitles[page] || normalizedDrawing.title;
      normalizedDrawing.desc = `Trang ${page} thuộc phần Kết cấu của hồ sơ TKTC tổng hợp; đã phân loại theo tiêu đề và nội dung trên bản vẽ gốc.`;
      normalizedDrawing.tags = ["Kết cấu", `Trang ${page}`, page >= 33 && page <= 47 ? "Khung thép / Canopy" : "BTCT / Hạ tầng"];
    }
    drawings.push(normalizedDrawing);
  }

  return drawings.sort((a, b) => {
    const sourceOrder = a.id.startsWith("foundation") ? 0 : 1;
    const otherOrder = b.id.startsWith("foundation") ? 0 : 1;
    return sourceOrder - otherOrder || a.pageNumber - b.pageNumber;
  });
}

const COMPLETE_DRAWINGS = buildCompleteDrawings();

// ==========================================================================
// 3. DEXIE INDEXEDDB SETUP (v2)
// ==========================================================================
function createLocalDatabaseFallback() {
  const memoryStores = new Map();
  const storagePrefix = 'hsh_local_fallback_';

  const readStore = name => {
    if (memoryStores.has(name)) return memoryStores.get(name);
    try {
      const stored = JSON.parse(localStorage.getItem(`${storagePrefix}${name}`) || '[]');
      const value = Array.isArray(stored) ? stored : [];
      memoryStores.set(name, value);
      return value;
    } catch (error) {
      const value = [];
      memoryStores.set(name, value);
      return value;
    }
  };
  const writeStore = (name, value) => {
    memoryStores.set(name, value);
    try { localStorage.setItem(`${storagePrefix}${name}`, JSON.stringify(value)); } catch (error) { /* memory fallback */ }
  };
  const collection = name => ({
    count: async () => readStore(name).length,
    toArray: async () => [...readStore(name)],
    bulkAdd: async items => {
      const rows = readStore(name);
      items.forEach(item => rows.push({ ...item }));
      writeStore(name, rows);
    },
    add: async item => {
      const rows = readStore(name);
      const nextId = rows.reduce((max, row) => Math.max(max, Number(row.id) || 0), 0) + 1;
      const record = { ...item, id: item.id ?? nextId };
      rows.push(record);
      writeStore(name, rows);
      return record.id;
    },
    get: async id => readStore(name).find(row => String(row.id) === String(id)),
    update: async (id, changes) => {
      const rows = readStore(name);
      const index = rows.findIndex(row => String(row.id) === String(id));
      if (index >= 0) rows[index] = { ...rows[index], ...changes };
      writeStore(name, rows);
    },
    clear: async () => writeStore(name, []),
    orderBy: field => ({
      reverse: () => ({
        toArray: async () => [...readStore(name)].sort((a, b) => String(b[field] ?? '').localeCompare(String(a[field] ?? '')))
      })
    })
  });

  return {
    version: () => ({ stores: () => undefined }),
    boq: collection('boq'),
    drawings: collection('drawings'),
    qaqc: collection('qaqc'),
    dailyLogs: collection('dailyLogs'),
    config: collection('config')
  };
}

const db = typeof Dexie === 'function' ? new Dexie('HoaSenHomePhuLyDB_v85') : createLocalDatabaseFallback();
db.version(2).stores({
  boq: '++id, row, stt, content, dvt, qty, code, brand, price_mat, price_labor, price_total, total_amt, sec, subsec, status',
  drawings: 'id, category, pageNumber, title, file, desc, scale',
  qaqc: '++id, code, title, std, status, date, inspector',
  dailyLogs: '++id, date, dateDisplay, weather, workers, equipment, workContent, issues',
  config: 'key, value'
});

// State variables
let activeTab = 'tab-dashboard';
let contractLookupFilter = 'all';
let currentDrawingCategory = 'all';
let currentDrawingViewMode = 'grid'; // 'grid' | 'continuous' | 'slider'
let currentSliderIndex = 0;
let currentLightboxIndex = 0;
let currentLightboxZoom = 1;
let currentLightboxRotation = 0;
let isCADInverted = false;
let currentLightboxPan = { x: 0, y: 0 };
let lightboxPointerDrag = null;
let customLightboxItem = null;
let chartInstances = {};

// Formatting Helpers
const fmtNumber = (num) => new Intl.NumberFormat('vi-VN').format(Math.round(num || 0));
const fmtCurrency = (num) => new Intl.NumberFormat('vi-VN').format(Math.round(num || 0)) + ' đ';
const fmtDecimal = (num, digits = 2) => Number(num || 0).toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: digits });

// ==========================================================================
// 4. DATABASE INITIALIZATION & SEEDING
// ==========================================================================
async function initDatabase() {
  try {
    const boqCount = await db.boq.count();
    if (boqCount === 0) {
      console.log('[IndexedDB] Seeding 328 BOQ items...');
      const boqWithStatus = RAW_BOQ.map(b => ({ ...b, status: 'pending' }));
      await db.boq.bulkAdd(boqWithStatus);
    }

    const qaqcCount = await db.qaqc.count();
    if (qaqcCount === 0) {
      console.log('[IndexedDB] Seeding 16 QA/QC items...');
      await db.qaqc.bulkAdd(INITIAL_QAQC);
    }

    const logCount = await db.dailyLogs.count();
    if (logCount === 0) {
      console.log('[IndexedDB] Seeding initial daily log...');
      await db.dailyLogs.bulkAdd(INITIAL_LOGS);
    }

    console.log('[IndexedDB] Database ready.');
  } catch (e) {
    console.error('[IndexedDB] Init error:', e);
  }
}

// ==========================================================================
// 5. TAB NAVIGATION ENGINE
// ==========================================================================
function switchTab(tabId) {
  if (!tabId) return;
  activeTab = tabId;
  localStorage.setItem('hsh_active_tab', tabId);

  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    const target = item.getAttribute('data-tab');
    if (target === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update tab views
  document.querySelectorAll('.content-tab-view').forEach(view => {
    if (view.id === tabId) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Update Top Bar Title
  const titleMap = {
    'tab-dashboard': '<i class="fas fa-chart-pie text-primary"></i> <span>Tổng quan Dự án</span>',
    'tab-gallery': '<i class="fas fa-layer-group text-primary"></i> <span>Thư viện Bản vẽ Chuyên mục</span>',
    'tab-boq': '<i class="fas fa-file-invoice-dollar text-primary"></i> <span>Dự toán & BOQ Chi tiết (328 Dòng)</span>',
    'tab-contract': '<i class="fas fa-file-signature text-primary"></i> <span>Tra cứu Hợp đồng 01/2026</span>',
    'tab-progress': '<i class="fas fa-tasks text-primary"></i> <span>Tiến độ 60 Ngày & Nhật ký</span>',
    'tab-qaqc': '<i class="fas fa-clipboard-check text-primary"></i> <span>Nghiệm thu Kỹ thuật QA/QC</span>',
    'tab-dossier': '<i class="fas fa-folder-open text-primary"></i> <span>Hồ sơ Công trình</span>',
    'tab-tools': '<i class="fas fa-calculator text-primary"></i> <span>Máy tính Kỹ thuật Hiện trường (10 Tool)</span>',
    'tab-settings': '<i class="fas fa-sliders-h text-primary"></i> <span>Cấu hình Dự án & Dữ liệu</span>'
  };
  const topTitle = document.getElementById('topPageTitle');
  if (topTitle && titleMap[tabId]) {
    topTitle.innerHTML = titleMap[tabId];
  }

  // Tab-specific initializations
  if (tabId === 'tab-dashboard') {
    initDashboardCharts();
  } else if (tabId === 'tab-gallery') {
    renderDrawings();
  } else if (tabId === 'tab-boq') {
    renderBOQTable();
  } else if (tabId === 'tab-contract') {
    renderContractResults();
  } else if (tabId === 'tab-progress') {
    renderDailyLogs();
  } else if (tabId === 'tab-qaqc') {
    renderQaqcGrid();
  } else if (tabId === 'tab-dossier') {
    renderDossierChecklist();
  } else if (tabId === 'tab-tools') {
    runAllCalculators();
  }

  // Close mobile sidebar if open
  const sidebar = document.getElementById('leftSidebar');
  if (sidebar && sidebar.classList.contains('sidebar-open')) {
    sidebar.classList.remove('sidebar-open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.hshNavigateToTab = function(tabId) {
  switchTab(tabId);
};

// ==========================================================================
// 6. DRAWINGS CENTER ENGINE (CATEGORIES & MULTI-VIEW MODES)
// ==========================================================================
function getFilteredDrawings() {
  if (currentDrawingCategory === 'all') {
    return COMPLETE_DRAWINGS;
  }
  return COMPLETE_DRAWINGS.filter(d => d.category === currentDrawingCategory);
}

function renderDrawings() {
  const container = document.getElementById('drawingsMainDisplayArea');
  const bannerArea = document.getElementById('drawingsCategoryHeaderArea');
  if (!container) return;

  const filtered = getFilteredDrawings();

  const categoryHeaders = {
    all: {
      title: "Toàn bộ 76 Trang Bản vẽ Thi công Dự án Hoa Sen Home",
      desc: "Đầy đủ 6 trang Kết cấu Móng & Đà kiềng và 70 trang Hồ sơ Thiết kế thi công, phân loại theo nội dung để tra cứu nhanh."
    },
    foundation: {
      title: "1. Chuyên mục Móng & Đà Kiềng (KC - 6 Bản vẽ)",
      desc: "Chi tiết móng M1-M8, đà kiềng ĐK1-ĐK5, bể tự hoại KC-49, mương thoát nước và giải pháp xử lý sạt lở hàm ếch móng M8."
    },
    arch: {
      title: "2. Chuyên mục Kiến trúc & Hoàn thiện (KT - 22 Trang)",
      desc: "Trang 01–22: hồ sơ chung, hiện trạng, mặt bằng, mái, mặt đứng–mặt cắt, alu, cửa kính, nhà nhân viên và hoàn thiện."
    },
    structure: {
      title: "3. Chuyên mục Kết cấu & Canopy (KC - 26 Trang)",
      desc: "Trang 23–48: chỉ dẫn kết cấu, móng–đà kiềng trong bộ TKTC, sân nền, bổ trụ, khung thép, canopy, bảng hiệu và bể tự hoại."
    },
    mep: {
      title: "4. Chuyên mục Hệ thống MEP & PCCC (22 Trang)",
      desc: "Trang 49–70: danh mục và ký hiệu MEP, điện, cấp thoát nước, điều hòa, chống sét, chữa cháy và báo cháy."
    }
  };

  const currHeader = categoryHeaders[currentDrawingCategory] || categoryHeaders.all;
  if (bannerArea) {
    bannerArea.innerHTML = `
      <div class="cat-banner-card">
        <div>
          <div class="cat-banner-title"><i class="fas fa-folder-open text-warning"></i> ${currHeader.title}</div>
          <div class="cat-banner-sub">${currHeader.desc}</div>
        </div>
        <div class="cat-badge-counter">
          <span class="badge badge-outline" style="background: rgba(255,255,255,0.15); color:#fff; border:none;">
            ${filtered.length} bản vẽ
          </span>
        </div>
      </div>
    `;
  }

  if (currentDrawingViewMode === 'grid') {
    container.innerHTML = `
      <div class="drawings-grid-container">
        ${filtered.map(d => `
          <div class="drawing-card-item" onclick="window.hshLightboxOpen('${d.id}')">
            <div class="drawing-thumb-wrap">
              <img src="${d.file}" alt="${d.title}" class="drawing-thumb-img" loading="lazy">
              <span class="drawing-code-chip">${d.id.toUpperCase()}</span>
              <div class="drawing-card-overlay">
                <button class="btn-overlay-action"><i class="fas fa-search-plus"></i> Xem Phóng To</button>
              </div>
            </div>
            <div class="drawing-info-body">
              <div class="drawing-name">${d.title}</div>
              <p style="font-size: 11.5px; color: #64748b; line-height: 1.4; margin-top: 4px;">${d.desc}</p>
              <div class="drawing-meta-text">
                <span><i class="fas fa-ruler-combined text-primary"></i> TL: ${d.scale}</span>
                <span><i class="fas fa-calendar-alt"></i> ${d.revision}</span>
              </div>
              <div class="drawing-link-row">
                <button class="drawing-link-btn" onclick="event.stopPropagation(); window.hshOpenDrawingRelation('tab-boq', '${d.id}')"><i class="fas fa-file-invoice-dollar"></i> BOQ</button>
                <button class="drawing-link-btn" onclick="event.stopPropagation(); window.hshOpenDrawingRelation('tab-qaqc', '${d.id}')"><i class="fas fa-clipboard-check"></i> QA/QC</button>
                <button class="drawing-link-btn" onclick="event.stopPropagation(); window.hshOpenDrawingRelation('tab-dossier', '${d.id}')"><i class="fas fa-folder-open"></i> Hồ sơ</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentDrawingViewMode === 'continuous') {
    container.innerHTML = `
      <div class="continuous-drawings-container">
        ${filtered.map((d, idx) => `
          <div class="continuous-sheet-box">
            <div class="sheet-header-bar">
              <div class="sheet-title-left">
                <span class="sheet-number-tag">TRANG ${idx + 1} / ${filtered.length}</span>
                <span class="sheet-title-text">${d.id.toUpperCase()} — ${d.title}</span>
              </div>
              <div class="sheet-controls">
                <button class="btn btn-sm btn-outline" style="color:#fff; border-color:#415A77;" onclick="window.hshLightboxOpen('${d.id}')">
                  <i class="fas fa-expand"></i> Phóng to CAD
                </button>
                <a href="${d.file}" download="${d.id}.png" class="btn btn-sm btn-outline" style="color:#fff; border-color:#415A77;">
                  <i class="fas fa-download"></i> Tải ảnh HD
                </a>
              </div>
            </div>
            <div class="sheet-img-wrap" onclick="window.hshLightboxOpen('${d.id}')">
              <img src="${d.file}" alt="${d.title}" class="sheet-img-full" loading="lazy">
            </div>
            <div class="sheet-footer-info">
              <span><strong>Mô tả kỹ thuật:</strong> ${d.desc}</span>
              <span><strong>Tỷ lệ:</strong> ${d.scale} | <strong>Phát hành:</strong> ${d.revision}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentDrawingViewMode === 'slider') {
    if (currentSliderIndex >= filtered.length) currentSliderIndex = 0;
    const curr = filtered[currentSliderIndex] || filtered[0];

    container.innerHTML = `
      <div class="continuous-sheet-box" style="margin-top: 10px;">
        <div class="sheet-header-bar">
          <div class="sheet-title-left">
            <span class="sheet-number-tag">${currentSliderIndex + 1} / ${filtered.length}</span>
            <span class="sheet-title-text">${curr.title}</span>
          </div>
          <div class="lb-nav-buttons">
            <button class="btn btn-sm btn-primary" onclick="window.hshSliderPrev()"><i class="fas fa-chevron-left"></i> Trước</button>
            <button class="btn btn-sm btn-primary" onclick="window.hshSliderNext()">Sau <i class="fas fa-chevron-right"></i></button>
            <button class="btn btn-sm btn-outline" style="color:#fff; border-color:#415A77;" onclick="window.hshLightboxOpen('${curr.id}')"><i class="fas fa-search-plus"></i> Lightbox</button>
          </div>
        </div>
        <div class="sheet-img-wrap" style="cursor: pointer;" onclick="window.hshLightboxOpen('${curr.id}')">
          <img src="${curr.file}" alt="${curr.title}" class="sheet-img-full" style="max-height: 75vh;">
        </div>
        <div class="sheet-footer-info">
          <span>${curr.desc}</span>
          <span>Tỷ lệ: ${curr.scale} | ${curr.revision}</span>
        </div>
      </div>
    `;
  }
}

window.hshFilterDrawingsCategory = function(cat) {
  currentDrawingCategory = cat;
  document.querySelectorAll('.cat-nav-btn').forEach(btn => {
    if (btn.getAttribute('data-category') === cat) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderDrawings();
};

window.hshSetDrawingsViewMode = function(mode) {
  currentDrawingViewMode = mode;
  document.querySelectorAll('.btn-view-mode').forEach(btn => {
    btn.classList.remove('active');
  });
  if (mode === 'grid') document.getElementById('btnViewGrid')?.classList.add('active');
  if (mode === 'continuous') document.getElementById('btnViewContinuous')?.classList.add('active');
  if (mode === 'slider') document.getElementById('btnViewSlider')?.classList.add('active');
  renderDrawings();
};

window.hshSliderNext = function() {
  const filtered = getFilteredDrawings();
  currentSliderIndex = (currentSliderIndex + 1) % filtered.length;
  renderDrawings();
};

window.hshSliderPrev = function() {
  const filtered = getFilteredDrawings();
  currentSliderIndex = (currentSliderIndex - 1 + filtered.length) % filtered.length;
  renderDrawings();
};

// ==========================================================================
// 7. ENHANCED CAD LIGHTBOX ENGINE (ROTATE, CAD INVERT, ZOOM 500%)
// ==========================================================================
window.hshLightboxOpen = function(drawingId) {
  customLightboxItem = null;
  const idx = COMPLETE_DRAWINGS.findIndex(d => d.id === drawingId);
  currentLightboxIndex = idx >= 0 ? idx : 0;
  currentLightboxZoom = 1;
  currentLightboxRotation = 0;
  isCADInverted = false;
  currentLightboxPan = { x: 0, y: 0 };

  updateLightboxUI();
  const modal = document.getElementById('enhancedCadLightboxModal');
  if (modal) {
    modal.classList.remove('perspective-mode');
    modal.classList.add('active');
  }
  document.body.classList.add('lightbox-open');
};

window.hshPerspectiveOpen = function(file, title = 'Phối cảnh 3D Hoa Sen Home Phủ Lý') {
  customLightboxItem = {
    id: '3D + DIM',
    title,
    file,
    revision: 'Bản duyệt đối chiếu TKTC',
    scale: 'Ảnh HD 3496 × 2040 px'
  };
  currentLightboxZoom = 1;
  currentLightboxRotation = 0;
  currentLightboxPan = { x: 0, y: 0 };
  isCADInverted = false;

  const modal = document.getElementById('enhancedCadLightboxModal');
  const codeBadge = document.getElementById('lbDrawingCode');
  const titleText = document.getElementById('lbDrawingTitle');
  const imgEl = document.getElementById('lbImage');
  const indexText = document.getElementById('lbIndexText');
  const metaInfo = document.getElementById('lbMetaInfo');
  const wrapper = document.getElementById('lbImgWrapper');

  if (codeBadge) codeBadge.innerText = customLightboxItem.id;
  if (titleText) titleText.innerText = customLightboxItem.title;
  if (imgEl) {
    imgEl.src = customLightboxItem.file;
    imgEl.alt = customLightboxItem.title;
  }
  if (indexText) indexText.innerText = 'Cuộn chuột hoặc dùng thanh Zoom · kéo ảnh khi đã phóng';
  if (metaInfo) metaInfo.innerHTML = `<span><i class="fas fa-ruler-combined text-success"></i> ${customLightboxItem.revision} · ${customLightboxItem.scale}</span>`;
  wrapper?.classList.remove('cad-invert-active');
  modal?.classList.add('active', 'perspective-mode');
  document.body.classList.add('lightbox-open');
  applyLightboxTransform();
};

window.hshLightboxClose = function() {
  const modal = document.getElementById('enhancedCadLightboxModal');
  if (modal) modal.classList.remove('active', 'perspective-mode');
  customLightboxItem = null;
  document.body.classList.remove('lightbox-open');
};

window.hshLightboxFullscreen = function() {
  const modal = document.getElementById('enhancedCadLightboxModal');
  if (!modal) return;
  if (!document.fullscreenElement) {
    modal.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.();
  }
};

window.hshLightboxRotate = function() {
  currentLightboxRotation = (currentLightboxRotation + 90) % 360;
  applyLightboxTransform();
};

window.hshLightboxCadInvert = function() {
  isCADInverted = !isCADInverted;
  const wrapper = document.getElementById('lbImgWrapper');
  if (wrapper) {
    if (isCADInverted) {
      wrapper.classList.add('cad-invert-active');
      showToast("Đã kích hoạt Chế độ CAD Nền Đen (Invert Mode)", "info");
    } else {
      wrapper.classList.remove('cad-invert-active');
      showToast("Đã trở về Chế độ Bản vẽ Chuẩn", "info");
    }
  }
};

window.hshLightboxZoom = function(delta) {
  currentLightboxZoom = Math.max(0.5, Math.min(5.0, currentLightboxZoom + delta));
  applyLightboxTransform();
};

window.hshLightboxSetZoom = function(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return;
  currentLightboxZoom = Math.max(0.5, Math.min(5.0, numericValue / 100));
  applyLightboxTransform();
};

window.hshLightboxResetZoom = function() {
  currentLightboxZoom = 1;
  currentLightboxRotation = 0;
  currentLightboxPan = { x: 0, y: 0 };
  applyLightboxTransform();
};

window.hshLightboxNext = function() {
  if (customLightboxItem) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % COMPLETE_DRAWINGS.length;
  updateLightboxUI();
};

window.hshLightboxPrev = function() {
  if (customLightboxItem) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + COMPLETE_DRAWINGS.length) % COMPLETE_DRAWINGS.length;
  updateLightboxUI();
};

window.hshLightboxDownload = function() {
  const d = customLightboxItem || COMPLETE_DRAWINGS[currentLightboxIndex];
  if (!d) return;
  const a = document.createElement('a');
  a.href = d.file;
  a.download = `${d.id}_${d.title.replace(/\s+/g, '_')}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

function updateLightboxUI() {
  const d = COMPLETE_DRAWINGS[currentLightboxIndex];
  if (!d) return;

  const codeBadge = document.getElementById('lbDrawingCode');
  const titleText = document.getElementById('lbDrawingTitle');
  const imgEl = document.getElementById('lbImage');
  const indexText = document.getElementById('lbIndexText');
  const metaInfo = document.getElementById('lbMetaInfo');

  if (codeBadge) codeBadge.innerText = d.id.toUpperCase();
  if (titleText) titleText.innerText = d.title;
  if (imgEl) imgEl.src = d.file;
  if (indexText) indexText.innerText = `${currentLightboxIndex + 1} / ${COMPLETE_DRAWINGS.length}`;
  if (metaInfo) metaInfo.innerHTML = `<span><i class="fas fa-stamp text-success"></i> ${d.revision} | TL: ${d.scale}</span>`;

  currentLightboxZoom = 1;
  currentLightboxRotation = 0;
  currentLightboxPan = { x: 0, y: 0 };
  applyLightboxTransform();
}

function applyLightboxTransform() {
  const imgWrapper = document.getElementById('lbImgWrapper');
  if (imgWrapper) {
    imgWrapper.style.transform = `translate(${currentLightboxPan.x}px, ${currentLightboxPan.y}px) scale(${currentLightboxZoom}) rotate(${currentLightboxRotation}deg)`;
  }
  const zoomText = document.getElementById('lbZoomText');
  const zoomRange = document.getElementById('lbZoomRange');
  if (zoomText) zoomText.innerText = `${Math.round(currentLightboxZoom * 100)}%`;
  if (zoomRange) zoomRange.value = String(Math.round(currentLightboxZoom * 100));
  const viewport = document.getElementById('lbViewport');
  if (viewport) viewport.classList.toggle('is-pannable', currentLightboxZoom > 1);
}

function setupLightboxInteractions() {
  const viewport = document.getElementById('lbViewport');
  if (!viewport || viewport.dataset.interactionsReady === 'true') return;
  viewport.dataset.interactionsReady = 'true';

  viewport.addEventListener('wheel', (event) => {
    event.preventDefault();
    window.hshLightboxZoom(event.deltaY < 0 ? 0.25 : -0.25);
  }, { passive: false });

  viewport.addEventListener('dblclick', (event) => {
    if (event.target.closest('button, input')) return;
    currentLightboxZoom = currentLightboxZoom > 1 ? 1 : 2.5;
    if (currentLightboxZoom === 1) currentLightboxPan = { x: 0, y: 0 };
    applyLightboxTransform();
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (currentLightboxZoom <= 1 || event.target.closest('button, input')) return;
    lightboxPointerDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: currentLightboxPan.x,
      originY: currentLightboxPan.y
    };
    viewport.setPointerCapture?.(event.pointerId);
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!lightboxPointerDrag || lightboxPointerDrag.pointerId !== event.pointerId) return;
    currentLightboxPan = {
      x: lightboxPointerDrag.originX + event.clientX - lightboxPointerDrag.startX,
      y: lightboxPointerDrag.originY + event.clientY - lightboxPointerDrag.startY
    };
    applyLightboxTransform();
  });

  const stopPointerDrag = (event) => {
    if (lightboxPointerDrag?.pointerId === event.pointerId) {
      lightboxPointerDrag = null;
      viewport.releasePointerCapture?.(event.pointerId);
    }
  };
  viewport.addEventListener('pointerup', stopPointerDrag);
  viewport.addEventListener('pointercancel', stopPointerDrag);
  viewport.addEventListener('pointerleave', (event) => {
    if (event.buttons === 0) stopPointerDrag(event);
  });
}

// ==========================================================================
// 8. BOQ TABLE 328 ROWS ENGINE (KHÔNG TÍNH VAT: 3.854.146.466 VNĐ)
// ==========================================================================
async function renderBOQTable() {
  const tbody = document.getElementById('boqTableBody');
  if (!tbody) return;

  const searchKeyword = (document.getElementById('boqSearchInput')?.value || '').toLowerCase().trim();
  const chapterFilter = document.getElementById('boqChapterSelect')?.value || 'all';
  const statusFilter = document.getElementById('boqStatusSelect')?.value || 'all';

  let items = await db.boq.toArray();

  if (items.length === 0) {
    items = RAW_BOQ.map(b => ({ ...b, status: 'pending' }));
  }

  const filtered = items.filter(it => {
    if (searchKeyword) {
      const matchText = (it.content + ' ' + it.code + ' ' + it.brand + ' ' + it.note + ' ' + it.sec).toLowerCase();
      if (!matchText.includes(searchKeyword)) return false;
    }
    if (chapterFilter !== 'all') {
      if (!it.sec.includes(chapterFilter) && !it.subsec.includes(chapterFilter)) return false;
    }
    if (statusFilter !== 'all') {
      if (it.status !== statusFilter) return false;
    }
    return true;
  });

  let html = '';
  let currentSection = '';

  filtered.forEach(item => {
    if (item.sec && item.sec !== currentSection) {
      currentSection = item.sec;
      html += `
        <tr class="boq-chapter-header-row">
          <td colspan="9"><strong><i class="fas fa-folder text-primary"></i> ${currentSection}</strong></td>
        </tr>
      `;
    }

    const statusBadge = item.status === 'done'
      ? '<span class="zone-badge badge-green">Hoàn thành</span>'
      : item.status === 'in_progress'
      ? '<span class="zone-badge badge-blue">Đang làm</span>'
      : '<span class="zone-badge badge-secondary">Chưa làm</span>';

    html += `
      <tr data-boq-row="${item.row}">
        <td style="text-align: center; color: #64748b; font-weight: 700;">${item.stt || item.row}</td>
        <td><span class="badge badge-outline" style="font-size:10px;">${item.code || 'HSG-V8'}</span></td>
        <td>
          <div style="font-weight: 700; color: #0F172A;">${item.content}</div>
          ${item.brand ? `<div style="font-size: 10.5px; color: #0284C7;"><i class="fas fa-tag"></i> Nhãn hiệu: ${item.brand}</div>` : ''}
          ${item.note ? `<div style="font-size: 10px; color: #94A3B8;">${item.note}</div>` : ''}
        </td>
        <td style="text-align: center;">${item.dvt || '-'}</td>
        <td style="text-align: right; font-weight: 700;">${item.qty ? fmtDecimal(item.qty, 2) : '-'}</td>
        <td style="text-align: right; color: #475569;">${item.price_total ? fmtNumber(item.price_total) : '-'}</td>
        <td style="text-align: right; font-weight: 800; color: #0A2C54;">${item.total_amt ? fmtCurrency(item.total_amt) : '-'}</td>
        <td style="text-align: center;">${statusBadge}</td>
        <td style="text-align: center;">
          <button class="btn btn-sm btn-outline" title="Chuyển trạng thái" onclick="window.hshToggleBoqStatus(${item.id})">
            <i class="fas fa-check"></i>
          </button>
        </td>
      </tr>
    `;
  });

  if (filtered.length === 0) {
    html = `<tr><td colspan="9" style="text-align:center; padding: 40px; color: #94A3B8;">Không tìm thấy công tác nào phù hợp với bộ lọc.</td></tr>`;
  }

  tbody.innerHTML = html;
}

window.hshFilterBOQTable = function() {
  renderBOQTable();
};

window.hshToggleBoqStatus = async function(id) {
  const item = await db.boq.get(id);
  if (!item) return;
  const nextStatus = item.status === 'pending' ? 'in_progress' : item.status === 'in_progress' ? 'done' : 'pending';
  await db.boq.update(id, { status: nextStatus });
  renderBOQTable();
  showToast(`Đã cập nhật công tác [${item.stt}] sang: ${nextStatus}`, "success");
};

window.hshExportBOQExcel = function() {
  if (typeof XLSX === 'undefined') {
    showToast("Chưa tải được thư viện Excel. Hãy kết nối mạng rồi thử lại.", "error");
    return;
  }
  showToast("Đang kết xuất bảng BOQ 328 dòng ra file Excel...", "info");
  const ws_data = [
    ["DỰ ÁN CẢI TẠO HOA SEN HOME PHỦ LÝ - BẢNG TIÊN LƯỢNG BOQ CHI TIẾT (KHÔNG TÍNH VAT)"],
    ["Hợp đồng: 01/2026/HĐXD/HSG-HG | Tổng giá trị: 3.854.146.466 VNĐ"],
    ["STT", "Chương Mục", "Mã Hiệu", "Nội Dung Công Tác / Vật Tư", "ĐVT", "Khối Lượng", "Đơn Giá Vật Tư (đ)", "Đơn Giá Nhân Công (đ)", "Đơn Giá Tổng (đ)", "Thành Tiền (đ)", "Ghi Chú"]
  ];

  RAW_BOQ.forEach(b => {
    ws_data.push([
      b.stt || b.row,
      b.sec,
      b.code,
      b.content,
      b.dvt,
      b.qty,
      b.price_mat,
      b.price_labor,
      b.price_total,
      b.total_amt,
      b.note || b.vendor_note
    ]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "BOQ_HoaSenHome");
  XLSX.writeFile(wb, "BOQ_HoaSenHome_PhuLy_328Dong_KhongVAT.xlsx");
  showToast("Xuất file Excel BOQ thành công!", "success");
};

window.hshOpenBOQAddModal = function() {
  showToast("Tính năng thêm đầu việc phát sinh đã sẵn sàng trong cơ sở dữ liệu Dexie v2.", "info");
};

// ==========================================================================
// 9. DAILY LOGS & MILESTONES ENGINE
// ==========================================================================
async function renderDailyLogs() {
  const container = document.getElementById('dailyLogsList');
  if (!container) return;

  const logs = await db.dailyLogs.orderBy('id').reverse().toArray();

  container.innerHTML = logs.map(l => `
    <div class="log-item-card">
      <div class="log-item-head">
        <div class="log-item-date"><i class="fas fa-calendar-day text-primary"></i> ${escapeDossierHtml(l.dateDisplay || l.date)}</div>
        <div class="log-item-meta">
          <span><i class="fas fa-cloud-sun text-warning"></i> ${escapeDossierHtml(l.weather)}</span>
          <span><i class="fas fa-users text-primary"></i> Quân số: <strong>${escapeDossierHtml(l.workers)} người</strong></span>
        </div>
      </div>
      <div class="log-work-desc">
        ${l.location ? `<p><strong>Vị trí:</strong> ${escapeDossierHtml(l.location)}</p>` : ''}
        ${l.quantity ? `<p><strong>Khối lượng:</strong> ${escapeDossierHtml(l.quantity)}</p>` : ''}
        <strong>Nội dung thực hiện:</strong> ${escapeDossierHtml(l.workContent)}
      </div>
      <div style="font-size: 11.5px; color: #64748B;">
        <i class="fas fa-truck-monster text-secondary"></i> Thiết bị: ${escapeDossierHtml(l.equipment)}
      </div>
      ${l.issues ? `<div class="log-issues-box"><i class="fas fa-exclamation-triangle"></i> Ghi nhận: ${escapeDossierHtml(l.issues)}</div>` : ''}
    </div>
  `).join('');

  const countBadge = document.getElementById('logCountBadge');
  if (countBadge) countBadge.innerText = `${logs.length} Nhật ký ghi nhận`;
}

window.hshOpenDailyLogModal = function() {
  const modal = document.getElementById('dailyLogModal');
  const dateInput = document.getElementById('logInputDate');
  if (dateInput && !dateInput.value) { const today = new Date(); dateInput.value = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
  if (modal) modal.classList.add('active');
};

window.hshCloseDailyLogModal = function() {
  const modal = document.getElementById('dailyLogModal');
  if (modal) modal.classList.remove('active');
};

window.hshSaveDailyLog = async function() {
  const button = document.getElementById('saveDailyLogButton');
  if (button.disabled) return;
  const error = document.getElementById('dailyLogError');
  error.textContent = '';
  for (const id of ['logInputDate', 'logInputWorkers', 'logInputWorkDone']) {
    const input = document.getElementById(id);
    if (!input.checkValidity() || !input.value.trim()) {
      error.textContent = 'Vui lòng điền ngày, số nhân lực hợp lệ và nội dung công việc.';
      input.focus(); input.reportValidity(); return;
    }
  }
  const value = id => document.getElementById(id).value.trim();
  const date = value('logInputDate');
  button.disabled = true;
  try {
    await db.dailyLogs.add({date, dateDisplay: date.split('-').reverse().join('/'),
      location: value('logInputLocation'), quantity: value('logInputQuantity'), weather: value('logInputWeather'), workers: Number(value('logInputWorkers')),
      equipment: value('logInputEquipment'), workContent: value('logInputWorkDone'), issues: value('logInputIssues')});
    ['logInputWorkDone', 'logInputIssues', 'logInputEquipment', 'logInputWorkers', 'logInputLocation', 'logInputQuantity'].forEach(id => document.getElementById(id).value = '');
    window.hshCloseDailyLogModal();
    window.hshNavigateToTab('tab-progress');
    showToast('Đã lưu nhật ký trên thiết bị này.', 'success');
  } catch (err) {
    error.textContent = 'Chưa lưu được nhật ký. Nội dung vẫn được giữ trong biểu mẫu, vui lòng thử lại.';
  } finally { button.disabled = false; }
};

// ==========================================================================
// 10. QA/QC CHECKLIST ENGINE
// ==========================================================================
async function renderQaqcGrid() {
  const container = document.getElementById('qaqcCardsGrid');
  if (!container) return;

  const items = await db.qaqc.toArray();
  const doneCount = items.filter(i => i.status === 'done').length;

  const qcDoneCountEl = document.getElementById('qcDoneCount');
  if (qcDoneCountEl) qcDoneCountEl.innerText = doneCount;

  const sideBadgeQc = document.getElementById('sideBadgeQc');
  if (sideBadgeQc) sideBadgeQc.innerText = `${doneCount}/${items.length}`;

  container.innerHTML = items.map(item => `
    <div class="qaqc-card" id="qaqc-${item.code}">
      <div class="qaqc-card-head">
        <div>
          <span class="qaqc-code">${item.code}</span>
          <div class="qaqc-title">${item.title}</div>
          <div class="qaqc-std"><i class="fas fa-book"></i> Tiêu chuẩn: ${item.std}</div>
        </div>
        <div>
          ${item.status === 'done' 
            ? '<span class="qaqc-status-chip qaqc-status-done"><i class="fas fa-check-circle"></i> ĐÃ ĐẠT</span>'
            : '<span class="qaqc-status-chip qaqc-status-pending"><i class="fas fa-hourglass-half"></i> CHỜ DUYỆT</span>'}
        </div>
      </div>
      <div class="qaqc-card-footer">
        <span><i class="fas fa-user-check"></i> ${item.inspector}</span>
        <button class="btn-qaqc-toggle" onclick="window.hshToggleQcItem(${item.id})">
          <i class="fas fa-exchange-alt"></i> ${item.status === 'done' ? 'Hủy đạt' : 'Xác nhận Đạt'}
        </button>
      </div>
    </div>
  `).join('');
}

window.hshToggleQcItem = async function(id) {
  const item = await db.qaqc.get(id);
  if (!item) return;
  const newStatus = item.status === 'done' ? 'pending' : 'done';
  await db.qaqc.update(id, { status: newStatus });
  renderQaqcGrid();
  if (document.getElementById('inspectionWorkspaceModal')?.classList.contains('active')) {
    renderInspectionWorkspace();
  }
  showToast(`Đã cập nhật hạng mục QA/QC [${item.code}]`, "success");
};

// Interactive bridge from dossier checklist files to the relevant QA/QC records.
const INSPECTION_SCOPE_CODES = {
  construction: ['QC-01', 'QC-02', 'QC-03', 'QC-04', 'QC-05', 'QC-06', 'QC-07', 'QC-08', 'QC-09', 'QC-10', 'QC-11', 'QC-12', 'QC-13', 'QC-16'],
  mep: ['QC-14', 'QC-15']
};
const INSPECTION_SCOPE_TITLES = {
  construction: 'Checklist nghiệm thu phần xây dựng',
  mep: 'Checklist nghiệm thu phần MEP'
};
const INSPECTION_DRAWING_LINKS = {
  'QC-01': ['foundation-1', 'foundation-2'],
  'QC-02': ['foundation-2', 'foundation-3'],
  'QC-03': ['foundation-2', 'foundation-4'],
  'QC-04': ['foundation-5'],
  'QC-05': ['design-24'],
  'QC-06': ['foundation-4', 'foundation-5'],
  'QC-07': ['foundation-6'],
  'QC-08': ['design-24'],
  'QC-09': ['design-24', 'design-35'],
  'QC-10': ['design-24'],
  'QC-11': ['design-16'],
  'QC-12': ['design-5', 'design-35'],
  'QC-13': ['design-7'],
  'QC-14': ['design-52'],
  'QC-15': ['design-68'],
  'QC-16': ['design-16']
};
let activeInspectionScope = 'construction';

function inspectionStatusLabel(status) {
  return status === 'done' ? 'Đã đạt · Hủy đạt' : 'Chưa đạt · Xác nhận đạt';
}

async function renderInspectionWorkspace() {
  const list = document.getElementById('inspectionChecklistList');
  if (!list) return;
  const codes = INSPECTION_SCOPE_CODES[activeInspectionScope] || INSPECTION_SCOPE_CODES.construction;
  const allItems = await db.qaqc.toArray();
  const items = codes.map(code => allItems.find(item => item.code === code)).filter(Boolean);
  const done = items.filter(item => item.status === 'done').length;
  const title = INSPECTION_SCOPE_TITLES[activeInspectionScope] || INSPECTION_SCOPE_TITLES.construction;
  const titleEl = document.getElementById('inspectionWorkspaceTitle');
  const summaryEl = document.getElementById('inspectionWorkspaceSummary');
  if (titleEl) titleEl.textContent = title;
  if (summaryEl) {
    summaryEl.innerHTML = `<div><strong>${done}/${items.length}</strong><span>hạng mục đã xác nhận đạt</span></div><div class="inspection-progress-track"><span style="width:${items.length ? (done / items.length) * 100 : 0}%"></span></div><small>Tiến độ lưu tự động trong trình duyệt</small>`;
  }
  list.innerHTML = items.map((item, index) => {
    const drawingButtons = (INSPECTION_DRAWING_LINKS[item.code] || []).map(drawingId => {
      const drawing = COMPLETE_DRAWINGS.find(entry => entry.id === drawingId);
      return drawing ? `<button class="inspection-link-btn" onclick="window.hshOpenInspectionDrawing('${drawing.id}')"><i class="fas fa-drafting-compass"></i> BV p.${drawing.pageNumber}</button>` : '';
    }).join('');
    return `<div class="inspection-item inspection-item-${item.status === 'done' ? 'done' : 'pending'}">
      <div class="inspection-item-index">${String(index + 1).padStart(2, '0')}</div>
      <div class="inspection-item-content">
        <strong>${escapeDossierHtml(item.code)} · ${escapeDossierHtml(item.title)}</strong>
        <span><i class="fas fa-book"></i> ${escapeDossierHtml(item.std)} · Phụ trách: ${escapeDossierHtml(item.inspector)}</span>
        <div class="inspection-item-links">${drawingButtons || '<span class="inspection-no-link">Chưa gắn bản vẽ</span>'}</div>
      </div>
      <button class="inspection-status-btn inspection-status-btn-${item.status === 'done' ? 'done' : 'pending'}" onclick="window.hshToggleInspectionStatus(${item.id})">${inspectionStatusLabel(item.status)}</button>
    </div>`;
  }).join('') || '<div class="inspection-empty">Chưa có dữ liệu QA/QC cho nhóm này.</div>';
}

window.hshOpenInspectionWorkspace = async function(scope = 'construction') {
  activeInspectionScope = INSPECTION_SCOPE_CODES[scope] ? scope : 'construction';
  const modal = document.getElementById('inspectionWorkspaceModal');
  if (!modal) return;
  modal.classList.add('active');
  await renderInspectionWorkspace();
};

window.hshCloseInspectionWorkspace = function() {
  document.getElementById('inspectionWorkspaceModal')?.classList.remove('active');
};

window.hshToggleInspectionStatus = async function(id) {
  await window.hshToggleQcItem(id);
};

window.hshOpenInspectionDrawing = function(drawingId) {
  window.hshCloseInspectionWorkspace();
  switchTab('tab-gallery');
  setTimeout(() => window.hshLightboxOpen(drawingId), 80);
};

window.hshOpenInspectionQaqc = function() {
  window.hshCloseInspectionWorkspace();
  switchTab('tab-qaqc');
};

window.hshOpenInspectionSource = function() {
  const scope = activeInspectionScope;
  const file = scope === 'mep'
    ? './assets/hoa-sen/docs/11.CHECKLIST%20NGHIEM%20THU%20PHAN%20MEP.xls'
    : './assets/hoa-sen/docs/10.CHECKLIST%20NGHIEM%20THU%20PHAN%20XAY%20DUNG.xls';
  window.open(file, '_blank');
};

// ==========================================================================
// 11. THE 10 FIELD ENGINEERING CALCULATORS ENGINE
// ==========================================================================

// Tool 1: Bê tông & Cấp phối
function renderConcreteGeometry() {
  const target = document.getElementById('t1_geometry');
  if (!target) return;

  const type = document.getElementById('t1_struct')?.value || 'footing';
  const diagrams = {
    footing: {
      title: 'Móng đơn thực tế — bản móng vát + cổ cột + đà kiềng',
      formula: 'V = Vđế phẳng + Vphần vát + Vcổ cột',
      key: 'MB: nhiều móng đơn liên kết bằng đà kiềng · MC: đáy phẳng + phần vát/lăng trụ cụt + cổ cột · không gộp đà kiềng vào V móng',
      svg: `<svg viewBox="0 0 180 80" role="img" aria-label="Móng đơn bản móng vát, cổ cột và đà kiềng"><text class="geo-text" x="4" y="9">MB</text><path class="geo-stroke" d="M15 24H78M15 53H78M15 24V53M46 24V53M78 24V53"></path><rect class="geo-fill" x="7" y="17" width="18" height="14"></rect><rect class="geo-fill" x="37" y="17" width="18" height="14"></rect><rect class="geo-fill" x="67" y="17" width="18" height="14"></rect><rect class="geo-fill" x="7" y="46" width="18" height="14"></rect><rect class="geo-fill" x="37" y="46" width="18" height="14"></rect><rect class="geo-fill" x="67" y="46" width="18" height="14"></rect><path class="geo-accent" d="M14 22h4v4h-4zM44 22h4v4h-4zM74 22h4v4h-4zM14 51h4v4h-4zM44 51h4v4h-4zM74 51h4v4h-4z"></path><text class="geo-text" x="18" y="72">đà kiềng</text><text class="geo-text" x="94" y="9">MC</text><path class="geo-fill" d="M98 59H174V70H98z"></path><path class="geo-fill" d="M105 59L115 41H157L167 59z"></path><rect class="geo-fill" x="128" y="23" width="16" height="18"></rect><rect class="geo-accent" x="132" y="10" width="8" height="13"></rect><path class="geo-stroke" d="M98 59h76M105 59h62M115 41h42M128 23h16M132 10h8M106 66h60M111 69h50"></path><text class="geo-text" x="145" y="37">cổ cột</text><text class="geo-text" x="167" y="54">H</text></svg>`
    },
    strip_footing: {
      title: 'Móng băng — dải móng liên tục',
      formula: 'V = L × B × H × n',
      key: 'L chiều dài dải · B bề rộng · H chiều cao · n số dải',
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Móng băng"><path class="geo-fill" d="M10 37h96v18H10z"></path><path class="geo-stroke" d="M10 37l10-8h96l-10 8M106 37l10-8v18l-10 8M10 55l10-8h96"></path><path class="geo-accent" d="M22 29h12v8H22zM54 29h12v8H54zM86 29h12v8H86z"></path><path class="geo-stroke" d="M16 24h88M16 21v6M104 21v6"></path><text class="geo-text" x="55" y="18">L</text><text class="geo-text" x="108" y="49">B</text><text class="geo-text" x="14" y="49">H</text></svg>`
    },
    beam: {
      title: 'Dầm / đà kiềng — cấu kiện tuyến tính',
      formula: 'V = L × B × H × n',
      key: 'L nhịp dầm · B bề rộng · H chiều cao · n số dầm',
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Dầm đà kiềng"><path class="geo-fill" d="M14 29h92v18H14z"></path><path class="geo-stroke" d="M14 29l9-7h92l-9 7M106 29l9-7v18l-9 7M14 47l9-7h92"></path><path class="geo-accent" d="M20 33h80M20 42h80"></path><text class="geo-text" x="57" y="18">L</text><text class="geo-text" x="108" y="42">H</text><text class="geo-text" x="56" y="61">B</text></svg>`
    },
    column: {
      title: 'Cột bê tông — tiết diện + chiều cao',
      formula: 'V = a × b × H × n',
      key: 'a×b tiết diện cột · H chiều cao · n số cột',
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Cột bê tông"><path class="geo-fill" d="M43 18h28v37H43z"></path><path class="geo-stroke" d="M43 18l9-7h28l-9 7M71 18l9-7v37l-9 7M43 55l9-7h28"></path><path class="geo-accent" d="M48 22h18v28H48z"></path><text class="geo-text" x="55" y="9">H</text><text class="geo-text" x="48" y="66">a × b</text></svg>`
    },
    slab: {
      title: 'Sàn bê tông — mặt bằng + chiều dày',
      formula: 'V = L × B × H × n',
      key: 'L dài sàn · B rộng sàn · H chiều dày · n số ô sàn',
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Sàn bê tông"><path class="geo-fill" d="M16 30l58-13 30 15-58 14z"></path><path class="geo-stroke" d="M16 30v16l30 15 58-13V32M46 46v15M16 46l30 15M74 17v16"></path><path class="geo-accent" d="M30 29l30-7 17 8-30 7z"></path><text class="geo-text" x="45" y="13">L</text><text class="geo-text" x="100" y="29">B</text><text class="geo-text" x="80" y="58">H</text></svg>`
    }
  };

  const diagram = diagrams[type] || diagrams.footing;
  target.innerHTML = `${diagram.svg}<div><strong>${diagram.title}</strong><small>${diagram.formula}</small><div class="geo-key">${diagram.key}</div></div>`;
}

window.hshToggleConcreteType = function() {
  const type = document.getElementById('t1_struct')?.value || 'footing';
  const footingDims = document.getElementById('t1_footing_dims');
  const hgtLabel = document.getElementById('t1_hgt_label');
  const hgtInput = document.getElementById('t1_hgt');
  if (footingDims) footingDims.style.display = type === 'footing' ? 'block' : 'none';
  if (hgtLabel) hgtLabel.textContent = type === 'footing' ? 'Tổng cao H (tự tính):' : 'Cao/Dày H (m):';
  if (hgtInput) hgtInput.readOnly = type === 'footing';
};

window.hshCalcConcrete = function() {
  const structType = document.getElementById('t1_struct')?.value || 'footing';
  window.hshToggleConcreteType();
  renderConcreteGeometry();
  const grade = document.getElementById('t1_grade')?.value || 'M250';
  const len = parseFloat(document.getElementById('t1_len')?.value || 2.2);
  const wid = parseFloat(document.getElementById('t1_wid')?.value || 2.0);
  let hgt = parseFloat(document.getElementById('t1_hgt')?.value || 0.7);
  const qty = parseFloat(document.getElementById('t1_qty')?.value || 8);

  let volPerItem = len * wid * hgt;
  let volumeDetail = `L × B × H = ${fmtDecimal(volPerItem, 3)} m³`;

  if (structType === 'footing') {
    const baseH = Math.max(0, parseFloat(document.getElementById('t1_base_h')?.value || 0.15));
    const topLen = Math.min(len, Math.max(0, parseFloat(document.getElementById('t1_top_len')?.value || 0.6)));
    const topWid = Math.min(wid, Math.max(0, parseFloat(document.getElementById('t1_top_wid')?.value || 0.6)));
    const taperH = Math.max(0, parseFloat(document.getElementById('t1_taper_h')?.value || 0.2));
    const neckH = Math.max(0, parseFloat(document.getElementById('t1_neck_h')?.value || 0.4));
    hgt = baseH + taperH + neckH;
    const hgtInput = document.getElementById('t1_hgt');
    if (hgtInput) hgtInput.value = hgt.toFixed(2);
    const baseVol = len * wid * baseH;
    const taperVol = (taperH / 3) * (len * wid + topLen * topWid + Math.sqrt(len * wid * topLen * topWid));
    const neckVol = topLen * topWid * neckH;
    volPerItem = baseVol + taperVol + neckVol;
    volumeDetail = `đế ${fmtDecimal(baseVol, 3)} + vát ${fmtDecimal(taperVol, 3)} + cổ ${fmtDecimal(neckVol, 3)} = ${fmtDecimal(volPerItem, 3)} m³`;
  }
  const totalVol = volPerItem * qty;

  const mixes = {
    M100: { cement: 215, sand: 0.52, stone: 0.88, water: 175 },
    M200: { cement: 320, sand: 0.48, stone: 0.85, water: 185 },
    M250: { cement: 360, sand: 0.46, stone: 0.84, water: 185 },
    M300: { cement: 410, sand: 0.44, stone: 0.83, water: 190 }
  };

  const m = mixes[grade] || mixes.M250;
  const cement = totalVol * m.cement;
  const sand = totalVol * m.sand;
  const stone = totalVol * m.stone;
  const water = totalVol * m.water;

  const resEl = document.getElementById('t1_result');
  if (resEl) {
    resEl.innerHTML = `
      <div class="result-main-val">Thể tích Bê tông sơ bộ: ${fmtDecimal(totalVol, 2)} m³ (${qty} cấu kiện x ${fmtDecimal(volPerItem, 3)} m³)</div>
      <div class="result-breakdown">
        <div>• <strong>Phân rã hình học:</strong> <span>${volumeDetail}</span></div>
        <div>• <strong>Xi măng PCB40:</strong> <span>${fmtNumber(cement)} kg</span> (${fmtDecimal(cement/50, 1)} bao 50kg)</div>
        <div>• <strong>Cát vàng sạch:</strong> <span>${fmtDecimal(sand, 2)} m³</span></div>
        <div>• <strong>Đá 1x2 tuyển chọn:</strong> <span>${fmtDecimal(stone, 2)} m³</span></div>
        <div>• <strong>Nước sạch thi công:</strong> <span>${fmtNumber(water)} lít</span></div>
      </div>
    `;
  }
};

// Tool 2: Thép tròn & Thép hình
function renderSteelGeometry() {
  const target = document.getElementById('t2_geometry');
  if (!target) return;

  const type = document.getElementById('t2_type')?.value || 'rebar';
  const dia = parseFloat(document.getElementById('t2_dia')?.value || 16);
  const diagrams = {
    rebar: {
      title: `Thép tròn thanh vằn — tiết diện Ø${dia}`,
      formula: 'P = (d² / 162) × l × n',
      key: `d = ${dia} mm · qØ = ${(dia * dia / 162).toFixed(3)} kg/m · l chiều dài · n số cây`,
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Tiết diện thép tròn"><circle class="geo-fill" cx="30" cy="35" r="16"></circle><path class="geo-accent" d="M18 28l24 14M18 42l24-14M30 19v32M14 35h32"></path><line class="geo-stroke" x1="30" y1="12" x2="30" y2="7"></line><line class="geo-stroke" x1="24" y1="7" x2="36" y2="7"></line><path class="geo-fill" d="M58 28h45v14H58z"></path><path class="geo-stroke" d="M58 28l7-6h45l-7 6M103 28l7-6v14l-7 6M58 42l7-6h45"></path><text class="geo-text" x="24" y="5">d</text><text class="geo-text" x="78" y="23">l</text></svg>`
    },
    i_beam: {
      title: 'Thép hình I — I-350×175×7×11',
      formula: 'P = qI × l × n',
      key: 'h=350 · b=175 · tw=7 · tf=11 mm · qI=49.600 kg/m',
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Tiết diện thép hình I"><path class="geo-fill" d="M34 10h52v10H68v30h18v10H34V50h18V20H34z"></path><path class="geo-accent" d="M38 13h44v4H64v36h18v4H38v-4h18V17H38z"></path><path class="geo-stroke" d="M25 10v50M21 10h8M21 60h8M34 64h52M34 61v6M86 61v6"></path><text class="geo-text" x="14" y="38">h</text><text class="geo-text" x="56" y="69">b</text><text class="geo-text" x="70" y="37">tw</text><text class="geo-text" x="53" y="9">tf</text></svg>`
    },
    c_purlin: {
      title: 'Xà gồ C — C125×50×20×2.0',
      formula: 'P = qC × l × n',
      key: 'h=125 · b=50 · c=20 · t=2.0 mm · qC=3.560 kg/m',
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Tiết diện xà gồ C"><path class="geo-fill" d="M38 10h62v10H50v12h38v10H50v18h50v10H38z"></path><path class="geo-accent" d="M42 14h54v3H46v47h50v3H42z"></path><path class="geo-stroke" d="M27 10v60M23 10h8M23 70h8M38 6h62M38 3v6M100 3v6"></path><text class="geo-text" x="13" y="43">h</text><text class="geo-text" x="62" y="5">b</text><text class="geo-text" x="90" y="29">c</text><text class="geo-text" x="42" y="56">t</text></svg>`
    },
    box_tube: {
      title: 'Thép hộp mạ kẽm — 50×100×2.0',
      formula: 'P = qHộp × l × n',
      key: 'b=50 · h=100 · t=2.0 mm · qHộp=4.520 kg/m',
      svg: `<svg viewBox="0 0 120 70" role="img" aria-label="Tiết diện thép hộp"><rect class="geo-fill" x="34" y="14" width="52" height="42" rx="2"></rect><rect class="geo-accent" x="42" y="22" width="36" height="26" rx="1"></rect><path class="geo-stroke" d="M25 14v42M21 14h8M21 56h8M34 63h52M34 60v6M86 60v6"></path><text class="geo-text" x="12" y="38">h</text><text class="geo-text" x="56" y="69">b</text><text class="geo-text" x="88" y="25">t</text></svg>`
    }
  };

  const diagram = diagrams[type] || diagrams.rebar;
  target.innerHTML = `${diagram.svg}<div><strong>${diagram.title}</strong><small>${diagram.formula}</small><div class="geo-key">${diagram.key}</div></div>`;
}

window.hshToggleSteelType = function() {
  const type = document.getElementById('t2_type')?.value;
  const diaWrap = document.getElementById('t2_dia_wrap');
  if (diaWrap) {
    diaWrap.style.display = type === 'rebar' ? 'block' : 'none';
  }
};

window.hshCalcSteel = function() {
  const type = document.getElementById('t2_type')?.value || 'rebar';
  renderSteelGeometry();
  const dia = parseFloat(document.getElementById('t2_dia')?.value || 16);
  const len = parseFloat(document.getElementById('t2_len')?.value || 11.7);
  const qty = parseFloat(document.getElementById('t2_qty')?.value || 48);

  let unitWeight = 0;
  let title = '';

  if (type === 'rebar') {
    unitWeight = (dia * dia) / 162.0;
    title = `Thép tròn thanh vằn Φ${dia}`;
  } else if (type === 'i_beam') {
    unitWeight = 49.6; // I-350x175x7x11
    title = `Thép hình Kèo I-350x175x7x11`;
  } else if (type === 'c_purlin') {
    unitWeight = 3.56; // Xà gồ C125x50x20x2.0
    title = `Xà gồ C125x50x20x2.0 Hoa Sen`;
  } else if (type === 'box_tube') {
    unitWeight = 4.52; // Thép hộp 50x100x2.0
    title = `Thép hộp mạ kẽm 50x100x2.0`;
  }

  const totalLength = len * qty;
  const totalWeight = totalLength * unitWeight;

  const resEl = document.getElementById('t2_result');
  if (resEl) {
    resEl.innerHTML = `
      <div class="result-main-val">${title}: ${fmtNumber(totalWeight)} kg (${fmtDecimal(totalWeight/1000, 3)} tấn)</div>
      <div class="result-breakdown">
        <div>• <strong>Trọng lượng đơn vị:</strong> <span>${fmtDecimal(unitWeight, 3)} kg/m</span></div>
        <div>• <strong>Tổng chiều dài:</strong> <span>${fmtDecimal(totalLength, 1)} m</span> (${qty} thanh x ${len} m)</div>
        <div>• <strong>Định mức BOQ:</strong> <span>CB300V / SS400 tiêu chuẩn Hoa Sen Home</span></div>
      </div>
    `;
  }
};

// Tool 3: Sika Grout & Ramset
function renderSikaGeometry() {
  const target = document.getElementById('t3_geometry');
  if (!target) return;
  const mode = document.getElementById('t3_mode')?.value || 'sika';
  if (mode === 'sika') {
    const thick = parseFloat(document.getElementById('t3_thick')?.value || 50);
    const baseplate = document.getElementById('t3_baseplate')?.value || '450×300';
    target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Khe rót SikaGrout"><rect class="geo-fill" x="17" y="15" width="78" height="39" rx="2"></rect><rect class="geo-accent" x="30" y="42" width="52" height="9"></rect><path class="geo-stroke" d="M26 42V25h60M86 25v17M96 18v36M92 18h9M92 54h9"></path><text class="geo-text" x="99" y="39">h</text><text class="geo-text" x="39" y="39">D×R</text><text class="geo-text" x="35" y="66">${thick} mm</text></svg><div><strong>Khe rót chân cột</strong><small>V = D × R × h × n</small><div class="geo-key">Bản mã ${baseplate} · h khe ${thick} mm · n vị trí</div></div>`;
  } else {
    const size = document.getElementById('t3_rebar_size')?.value || '16';
    const hole = { '16': 20, '18': 22, '20': 25 }[size] || 20;
    const depth = { '16': 160, '18': 180, '20': 200 }[size] || 160;
    target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Khoan cấy thép Ramset"><path class="geo-fill" d="M28 12h62v15H43v31H28z"></path><path class="geo-accent" d="M43 27h25v10H43z"></path><path class="geo-stroke" d="M43 42h35M78 42v16M83 42v16M78 58h5M99 28v30M95 28h8M95 58h8"></path><text class="geo-text" x="100" y="47">L</text><text class="geo-text" x="48" y="25">d${hole}</text><text class="geo-text" x="34" y="67">D${size} · ${depth} mm</text></svg><div><strong>Khoan cấy thép bằng keo</strong><small>V keo = ml/lỗ × n</small><div class="geo-key">Thép D${size} · lỗ khoan d${hole} · sâu neo ${depth} mm</div></div>`;
  }
}

window.hshToggleSikaMode = function() {
  const mode = document.getElementById('t3_mode')?.value;
  const sikaDims = document.getElementById('t3_sika_dims');
  const ramsetDims = document.getElementById('t3_ramset_dims');
  const sikaParam1 = document.getElementById('t3_sika_param1');

  if (mode === 'sika') {
    if (sikaDims) sikaDims.style.display = 'grid';
    if (sikaParam1) sikaParam1.style.display = 'block';
    if (ramsetDims) ramsetDims.style.display = 'none';
  } else {
    if (sikaDims) sikaDims.style.display = 'none';
    if (sikaParam1) sikaParam1.style.display = 'none';
    if (ramsetDims) ramsetDims.style.display = 'grid';
  }
};

window.hshCalcSika = function() {
  const mode = document.getElementById('t3_mode')?.value || 'sika';
  renderSikaGeometry();
  const resEl = document.getElementById('t3_result');
  if (!resEl) return;

  if (mode === 'sika') {
    const thickMm = parseFloat(document.getElementById('t3_thick')?.value || 50);
    const colQty = parseFloat(document.getElementById('t3_col_qty')?.value || 8);
    const baseplateArea = 0.45 * 0.30;
    const volPerColM3 = baseplateArea * (thickMm / 1000);
    const totalVolM3 = volPerColM3 * colQty * 1.15; // 15% hao hụt
    const sikaYieldLiters = 13.30; // Sika PDS: 13.30 L/bao 25 kg
    const bags = Math.ceil((totalVolM3 * 1000) / sikaYieldLiters);
    const waterLiters = bags * 4.25; // Sika PDS: 4.25 L/bao ở cấp phối tham chiếu

    resEl.innerHTML = `
      <div class="result-main-val">Sika Grout 214-11: ${bags} Bao (25kg/bao) = ${fmtNumber(bags * 25)} kg</div>
      <div class="result-breakdown">
        <div>• <strong>Tổng thể tích rót (kèm 15% hao hụt):</strong> <span>${fmtDecimal(totalVolM3, 3)} m³</span> (${colQty} chân cột)</div>
        <div>• <strong>Định mức theo PDS Sika:</strong> <span>13,30 L/bao 25 kg · ${fmtDecimal(waterLiters, 1)} L nước</span></div>
        <div>• <strong>Phạm vi dùng:</strong> <span>Khe rót 20–100 mm; chốt lại theo datasheet/lô hàng thực tế</span></div>
      </div>
    `;
  } else {
    const rebarSize = document.getElementById('t3_rebar_size')?.value || '16';
    const holeQty = parseFloat(document.getElementById('t3_hole_qty')?.value || 32);

    const holesPerTubeMap = { '16': 5.5, '18': 4.2, '20': 3.1 };
    const holesPerTube = holesPerTubeMap[rebarSize] || 5;
    const tubes = Math.ceil(holeQty / holesPerTube);

    resEl.innerHTML = `
      <div class="result-main-val">Keo Ramset Epcon G5 Pro: ${tubes} Tuýp (600ml)</div>
      <div class="result-breakdown">
        <div>• <strong>Cấy thép D${rebarSize}:</strong> ${holeQty} lỗ khoan cấy vào bê tông hiện hữu</div>
        <div>• <strong>Định mức tiêu hao:</strong> <span>~${holesPerTube} lỗ / tuýp 600ml</span></div>
        <div>• <strong>Quy trình:</strong> <span>Thổi bụi 3 lần, chải cọ sắt 3 lần, bơm keo 2/3 lỗ và xoay thanh thép</span></div>
      </div>
    `;
  }
};

// Tool 4: Gạch xây & Vữa
function renderBrickGeometry() {
  const target = document.getElementById('t4_geometry');
  if (!target) return;
  const wallType = document.getElementById('t4_wall_type')?.value || 'wall200';
  const thickness = wallType === 'wall200' ? 200 : 100;
  const brickRate = (1 / ((0.19 + 0.01) * (0.08 + 0.01)) * (wallType === 'wall200' ? 2 : 1)).toFixed(1);
  target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Tường gạch ${thickness} mm"><rect class="geo-fill" x="22" y="12" width="65" height="45"></rect><path class="geo-stroke" d="M22 27h65M22 42h65M42 12v15M66 27v15M42 42v15M22 12h65"></path><path class="geo-accent" d="M91 17h16v40H91z"></path><path class="geo-stroke" d="M91 12h16M91 60h16M91 9v6M107 9v6"></path><text class="geo-text" x="52" y="9">L</text><text class="geo-text" x="90" y="37">H</text><text class="geo-text" x="91" y="68">t=${thickness}</text></svg><div><strong>Tường ${wallType === 'wall200' ? '200' : '100'} mm</strong><small>A net = L × H − A cửa</small><div class="geo-key">Gạch 8×8×19 · định mức tham chiếu ${brickRate} viên/m² · trừ lỗ mở</div></div>`;
}

window.hshCalcBrick = function() {
  const wallType = document.getElementById('t4_wall_type')?.value || 'wall200';
  const grade = document.getElementById('t4_mortar_grade')?.value || 'M75';
  const len = parseFloat(document.getElementById('t4_len')?.value || 28.5);
  const hgt = parseFloat(document.getElementById('t4_hgt')?.value || 3.6);
  const minus = parseFloat(document.getElementById('t4_minus')?.value || 12.0);
  renderBrickGeometry();

  const netArea = Math.max(0, (len * hgt) - minus);
  // Quy đổi theo gạch 80x80x190 mm + mạch vữa 10 mm; tường 200 dùng 2 lớp.
  const brickL = 0.19;
  const brickH = 0.08;
  const joint = 0.01;
  const brickPerM2 = (1 / ((brickL + joint) * (brickH + joint))) * (wallType === 'wall200' ? 2 : 1);
  const wallThickness = wallType === 'wall200' ? 0.20 : 0.10;
  const brickVolumePerM2 = brickPerM2 * brickL * brickH * brickH;
  const mortarPerM2 = Math.max(0, wallThickness - brickVolumePerM2);

  const totalBricks = Math.ceil(netArea * brickPerM2 * 1.03);
  const totalMortar = netArea * mortarPerM2;

  const cementKg = totalMortar * (grade === 'M75' ? 247 : 320);
  const sandM3 = totalMortar * 1.1;

  const resEl = document.getElementById('t4_result');
  if (resEl) {
    resEl.innerHTML = `
      <div class="result-main-val">Gạch Tuynel 8x8x19: ${fmtNumber(totalBricks)} viên (Diện tích: ${fmtDecimal(netArea, 1)} m²)</div>
      <div class="result-breakdown">
        <div>• <strong>Vữa xây ${grade}:</strong> <span>${fmtDecimal(totalMortar, 2)} m³</span></div>
        <div>• <strong>Xi măng PCB30/40:</strong> <span>${fmtNumber(cementKg)} kg</span> (${fmtDecimal(cementKg/50, 1)} bao)</div>
        <div>• <strong>Cát xây sạch:</strong> <span>${fmtDecimal(sandM3, 2)} m³</span></div>
      </div>
    `;
  }
};

// Tool 5: Gạch ốp lát & Keo
function renderTileGeometry() {
  const target = document.getElementById('t5_geometry');
  if (!target) return;
  const size = document.getElementById('t5_tile_size')?.value || '600x600';
  const adhesive = document.getElementById('t5_adhesive')?.value || 'glue';
  const boxAreaMap = { '600x600': 1.44, '300x600': 1.44, '800x800': 1.92, '300x300': 0.99 };
  const boxArea = boxAreaMap[size] || 1.44;
  const binder = adhesive === 'glue' ? 'keo dán gạch' : 'hồ dầu xi măng';
  target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Bố trí gạch ${size} mm"><rect class="geo-fill" x="17" y="10" width="56" height="50"></rect><path class="geo-stroke" d="M45 10v50M17 35h56"></path><path class="geo-accent" d="M81 20h25M81 50h25M94 20v30"></path><text class="geo-text" x="26" y="68">${size}</text><text class="geo-text" x="88" y="16">thùng</text></svg><div><strong>Gạch ${size} mm</strong><small>N thùng = ⌈A × (1 + w) / A thùng⌉</small><div class="geo-key">${boxArea} m²/thùng · ${binder} · w hao hụt cắt</div></div>`;
}

window.hshCalcTile = function() {
  const size = document.getElementById('t5_tile_size')?.value || '600x600';
  const area = parseFloat(document.getElementById('t5_area')?.value || 185);
  const waste = parseFloat(document.getElementById('t5_waste')?.value || 5);
  const adhesive = document.getElementById('t5_adhesive')?.value || 'glue';
  renderTileGeometry();

  const totalArea = area * (1 + waste / 100);
  const boxAreaMap = { '600x600': 1.44, '300x600': 1.44, '800x800': 1.92, '300x300': 0.99 };
  const boxArea = boxAreaMap[size] || 1.44;
  const totalBoxes = Math.ceil(totalArea / boxArea);

  let glueMsg = '';
  if (adhesive === 'glue') {
    const glueKg = totalArea * 5.0;
    const glueBags = Math.ceil(glueKg / 25);
    const groutKg = Math.ceil(totalArea * 0.3);
    glueMsg = `• <strong>Keo dán gạch:</strong> <span>${glueBags} bao 25kg</span> (${fmtNumber(glueKg)} kg) + ${groutKg} kg keo chà ron`;
  } else {
    const cementBags = Math.ceil(totalArea * 0.25);
    glueMsg = `• <strong>Hồ dầu xi măng:</strong> <span>${cementBags} bao xi măng PCB40</span>`;
  }

  const resEl = document.getElementById('t5_result');
  if (resEl) {
    resEl.innerHTML = `
      <div class="result-main-val">Gạch Granite ${size}: ${totalBoxes} Thùng (${fmtDecimal(totalArea, 1)} m² gồm ${waste}% hao hụt)</div>
      <div class="result-breakdown">
        <div>• <strong>Quy cách:</strong> <span>${boxArea} m²/thùng</span></div>
        <div>${glueMsg}</div>
      </div>
    `;
  }
};

// Tool 6: Sơn KCC & Bột bả
function renderPaintGeometry() {
  const target = document.getElementById('t6_geometry');
  if (!target) return;
  const type = document.getElementById('t6_paint_type')?.value || 'wall_ext';
  const isFloor = type === 'floor_epoxy';
  const isSteel = type === 'steel_alkyd';
  const title = isFloor ? 'Sàn epoxy — nền + lót + 2 phủ' : isSteel ? 'Kết cấu thép — làm sạch + chống rỉ + phủ' : type === 'wall_int' ? 'Tường nội thất — bột bả + lót + 2 phủ' : 'Tường ngoại thất — bột bả + lót + 2 phủ';
  const formula = isFloor ? 'Vật tư = A × định mức theo lớp' : 'Lít sơn = A × số lớp / độ phủ';
  const key = isSteel ? 'A diện tích thép · kiểm tra gỉ, bề mặt và thời gian khô' : 'A diện tích · nền → lót → phủ · định mức theo PDS';
  target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Các lớp sơn"><rect class="geo-stroke" x="18" y="13" width="16" height="45"></rect><rect class="geo-fill" x="34" y="13" width="19" height="45"></rect><rect class="geo-accent" x="53" y="13" width="19" height="45"></rect><rect fill="#FDE68A" stroke="#153E73" stroke-width="2" x="72" y="13" width="19" height="45"></rect><text class="geo-text" x="17" y="68">nền</text><text class="geo-text" x="35" y="9">lót</text><text class="geo-text" x="51" y="9">P1</text><text class="geo-text" x="72" y="9">P2</text></svg><div><strong>${title}</strong><small>${formula}</small><div class="geo-key">${key}</div></div>`;
}

window.hshCalcPaint = function() {
  const type = document.getElementById('t6_paint_type')?.value || 'wall_ext';
  const area = parseFloat(document.getElementById('t6_area')?.value || 450);
  renderPaintGeometry();

  let resHtml = '';
  if (type === 'floor_epoxy') {
    const primerLiters = Math.ceil(area / 8.0);
    const topLiters = Math.ceil((area * 2) / 7.0);
    resHtml = `
      <div class="result-main-val">Sơn Sàn Epoxy KCC: ${primerLiters}L Lót EP118 + ${topLiters}L Phủ ET5660</div>
      <div class="result-breakdown">
        <div>• <strong>Diện tích sàn xử lý:</strong> <span>${area} m²</span></div>
        <div>• <strong>Quy trình:</strong> <span>1 lớp lót Epoxy primer + 2 lớp phủ Epoxy tự phẳng chịu tải</span></div>
      </div>
    `;
  } else {
    const puttyBags = Math.ceil(area / 35.0);
    const primerLiters = Math.ceil(area / 10.0);
    const topLiters = Math.ceil((area * 2) / 9.0);
    const topPails = Math.ceil(topLiters / 18.0);

    resHtml = `
      <div class="result-main-val">Sơn KCC Purist Grey GA01250: ${topPails} Thùng 18L (Diện tích ${area} m²)</div>
      <div class="result-breakdown">
        <div>• <strong>Bột bả tường Maxilite/KCC:</strong> <span>${puttyBags} bao (40kg/bao)</span></div>
        <div>• <strong>Sơn lót kháng kiềm:</strong> <span>${Math.ceil(primerLiters/18.0)} thùng 18L (${primerLiters} Lít)</span></div>
        <div>• <strong>Sơn phủ màu GA01250:</strong> <span>${topPails} thùng 18L (${topLiters} Lít - 2 lớp)</span></div>
      </div>
    `;
  }

  const resEl = document.getElementById('t6_result');
  if (resEl) resEl.innerHTML = resHtml;
};

// Tool 7: Tôn Mag Shield & Thủy lực
function renderRoofGeometry() {
  const target = document.getElementById('t7_geometry');
  if (!target) return;
  const area = parseFloat(document.getElementById('t7_roof_area')?.value || 380);
  const slope = parseFloat(document.getElementById('t7_slope')?.value || 15);
  const pipe = document.getElementById('t7_pipe_dia')?.value || '110';
  target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Mái dốc và thoát nước"><path class="geo-fill" d="M13 51L53 17l54 34z"></path><path class="geo-stroke" d="M13 51h94M53 17v34M53 29h17M70 29l-4-3M70 29l-4 3M90 48v17M96 48v17M87 65h12"></path><circle class="geo-accent" cx="92" cy="47" r="5"></circle><text class="geo-text" x="51" y="14">i=${slope}%</text><text class="geo-text" x="15" y="64">A=${area}m²</text><text class="geo-text" x="86" y="43">D${pipe}</text></svg><div><strong>Mái dốc → máng → ống D${pipe}</strong><small>Q = i × A / 3.600 (L/s)</small><div class="geo-key">A hình chiếu ${area} m² · i độ dốc ${slope}% · chọn ống theo thủy lực</div></div>`;
}

window.hshCalcRoofHydraulics = function() {
  const roofArea = parseFloat(document.getElementById('t7_roof_area')?.value || 380);
  const slope = parseFloat(document.getElementById('t7_slope')?.value || 15);
  const rainQ = parseFloat(document.getElementById('t7_rain_intensity')?.value || 420);
  const pipeDia = parseInt(document.getElementById('t7_pipe_dia')?.value || 110);
  renderRoofGeometry();

  const cosSlope = Math.cos(Math.atan(slope / 100));
  const realRoofArea = roofArea / cosSlope;
  const sheetTons = Math.ceil(realRoofArea * 1.08);

  const flowLps = (rainQ * roofArea * 1.0) / 3600; // Rational method: i (mm/h) × A (m²) / 3600 = L/s
  const capacityPerPipe = pipeDia === 110 ? 12.0 : 25.0;
  const minPipes = Math.max(2, Math.ceil(flowLps / capacityPerPipe));

  const resEl = document.getElementById('t7_result');
  if (resEl) {
    resEl.innerHTML = `
      <div class="result-main-val">Tôn Mag Shield 0.50mm: ${sheetTons} m² | Cần tối thiểu: ${minPipes} Ống D${pipeDia}</div>
      <div class="result-breakdown">
        <div>• <strong>Diện tích mái thực (độ dốc ${slope}%):</strong> <span>${fmtDecimal(realRoofArea, 1)} m²</span></div>
        <div>• <strong>Lưu lượng theo Rational Method:</strong> <span>${fmtDecimal(flowLps, 1)} Lít/giây (i=${rainQ} mm/h × A=${roofArea} m²)</span></div>
        <div>• <strong>Máng xối Inox 304:</strong> <span>Kiểm tra tiết diện, độ dốc và khả năng thoát theo hồ sơ thiết kế</span></div>
      </div>
    `;
  }
};

// Tool 8: Chiếu sáng & Điện 3 Pha
function renderLightingGeometry() {
  const target = document.getElementById('t8_geometry');
  if (!target) return;
  const room = document.getElementById('t8_room_type')?.value || 'showroom';
  const area = parseFloat(document.getElementById('t8_area')?.value || 320);
  const lamp = document.getElementById('t8_lamp_type')?.value || 'highbay50';
  const targetLux = room === 'showroom' ? 500 : room === 'office' ? 300 : 150;
  const lampLmMap = { highbay50: 5000, highbay100: 10500, panel40: 3600, tube20: 2200 };
  const lmPerLamp = lampLmMap[lamp] || 5000;
  target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Bố trí đèn"><rect class="geo-fill" x="15" y="12" width="90" height="46"></rect><circle class="geo-accent" cx="35" cy="27" r="6"></circle><circle class="geo-accent" cx="60" cy="27" r="6"></circle><circle class="geo-accent" cx="85" cy="27" r="6"></circle><circle class="geo-accent" cx="47" cy="45" r="6"></circle><circle class="geo-accent" cx="73" cy="45" r="6"></circle><text class="geo-text" x="18" y="67">A=${area}m²</text><text class="geo-text" x="70" y="9">E=${targetLux}lx</text></svg><div><strong>Bố trí đèn theo lumen method</strong><small>n = E × A / (Φ × UF × MF)</small><div class="geo-key">E=${targetLux} Lux · A=${area} m² · Φ=${lmPerLamp} lm/bộ</div></div>`;
}

window.hshCalcLightingAndPower = function() {
  const room = document.getElementById('t8_room_type')?.value || 'showroom';
  const area = parseFloat(document.getElementById('t8_area')?.value || 320);
  const lamp = document.getElementById('t8_lamp_type')?.value || 'highbay50';
  const totalKw = parseFloat(document.getElementById('t8_total_kw')?.value || 35);
  renderLightingGeometry();

  const targetLux = room === 'showroom' ? 500 : room === 'office' ? 300 : 150;
  const lampLmMap = { highbay50: 5000, highbay100: 10500, panel40: 3600, tube20: 2200 };
  const lmPerLamp = lampLmMap[lamp] || 5000;

  const totalLmNeeded = (targetLux * area) / (0.6 * 0.8);
  const lampQty = Math.ceil(totalLmNeeded / lmPerLamp);

  const iAmps = (totalKw * 1000) / (Math.sqrt(3) * 380 * 0.85);
  const mcbAmps = Math.ceil(iAmps * 1.25);
  const cableSize = iAmps < 40 ? "Cu/PVC 4x10 mm²" : iAmps < 65 ? "Cu/PVC 4x16 mm²" : "Cu/PVC 4x25 mm²";

  const resEl = document.getElementById('t8_result');
  if (resEl) {
    resEl.innerHTML = `
      <div class="result-main-val">Cần ${lampQty} Bộ Đèn (${targetLux} Lux) | Dòng điện 3 Pha: ${fmtDecimal(iAmps, 1)} A</div>
      <div class="result-breakdown">
        <div>• <strong>Aptomat (MCCB) tổng khuyến nghị:</strong> <span>LS 3P-${mcbAmps}A</span></div>
        <div>• <strong>Cáp nguồn Cadivi chọn:</strong> <span>${cableSize} luồn ống PVC D48 âm sàn</span></div>
      </div>
    `;
  }
};

// Tool 9: Báo cháy & PCCC
function renderPcccGeometry() {
  const target = document.getElementById('t9_geometry');
  if (!target) return;
  const height = parseFloat(document.getElementById('t9_ceiling_hgt')?.value || 4.5);
  const area = parseFloat(document.getElementById('t9_area')?.value || 650);
  const hazard = document.getElementById('t9_hazard')?.value || 'medium';
  const extinguisherArea = hazard === 'high' ? 50 : 75;
  target.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Bố trí đầu báo và bình chữa cháy"><rect class="geo-fill" x="15" y="14" width="90" height="44"></rect><circle class="geo-accent" cx="35" cy="29" r="6"></circle><circle class="geo-accent" cx="78" cy="29" r="6"></circle><path class="geo-stroke" d="M28 48h14M71 48h14M35 42v6M78 42v6"></path><text class="geo-text" x="18" y="67">A=${area}m²</text><text class="geo-text" x="77" y="10">H=${height}m</text></svg><div><strong>Vùng bảo vệ đầu báo + bình</strong><small>n báo = ⌈A / S⌉ · n bình = ⌈A / ${extinguisherArea}⌉</small><div class="geo-key">A=${area} m² · H trần ${height} m · nguy cơ ${hazard === 'high' ? 'cao' : 'trung bình'}</div></div>`;
}

window.hshCalcPCCC = function() {
  const ceilHgt = parseFloat(document.getElementById('t9_ceiling_hgt')?.value || 4.5);
  const area = parseFloat(document.getElementById('t9_area')?.value || 650);
  const hazard = document.getElementById('t9_hazard')?.value || 'medium';
  renderPcccGeometry();

  const detectors = Math.ceil(area / 80.0);
  const extinguishers = Math.ceil(area / (hazard === 'high' ? 50.0 : 75.0));

  const resEl = document.getElementById('t9_result');
  if (resEl) {
    resEl.innerHTML = `
      <div class="result-main-val">PCCC TCVN: ${detectors} Đầu Báo Khói Asenware + ${extinguishers} Bình Chữa Cháy</div>
      <div class="result-breakdown">
        <div>• <strong>Đầu báo khói quang địa chỉ:</strong> <span>${detectors} bộ Asenware AW-CFP2166</span></div>
        <div>• <strong>Bình chữa cháy xách tay (TCVN 3890):</strong> <span>${extinguishers} bình (Bột ABC 4kg & Khí CO2 MT3)</span></div>
        <div>• <strong>Nút ấn khẩn cấp + Chuông còi:</strong> <span>03 vị trí cửa thoát hiểm chính</span></div>
      </div>
    `;
  }
};

// Tool 10: Cổng kiểm tra trước nghiệm thu & bàn giao
const FIELD_GATE_PRESETS = {
  foundation: {
    title: 'Móng, đà kiềng & bê tông',
    drawings: ['foundation-2', 'foundation-3', 'foundation-4', 'foundation-5'],
    qaqc: ['QC-01', 'QC-02', 'QC-03', 'QC-04', 'QC-06'],
    boq: [16, 18, 19],
    dossier: [10],
    checks: ['Đối chiếu bản vẽ, tim trục, kích thước và cao độ đáy móng', 'Hố móng sạch, nền ổn định, có ảnh trước khi che khuất', 'Cốt thép, ván khuôn, lớp bảo vệ và lỗ chờ đã được kiểm tra', 'Biên bản nghiệm thu, phiếu độ sụt và mẫu bê tông đã sẵn sàng']
  },
  steel: {
    title: 'Khung thép, bu lông & mối hàn',
    drawings: ['design-24', 'design-35'],
    qaqc: ['QC-05', 'QC-08', 'QC-09'],
    boq: [23, 42, 43],
    dossier: [6, 11],
    checks: ['Đối chiếu mã cấu kiện, tiết diện, vật liệu và bản vẽ được duyệt', 'Tim trục, cao độ chân cột, bu lông neo và chiều dài ren chờ đạt yêu cầu', 'Mối hàn, biến dạng, lớp sơn bảo vệ và hồ sơ gia công đã kiểm tra', 'Có biên bản lắp dựng, siết bu lông và ảnh liên kết trước khi che khuất']
  },
  roof: {
    title: 'Mái, vách tôn & máng xối',
    drawings: ['design-5', 'design-35'],
    qaqc: ['QC-12'],
    boq: [71, 72, 83, 84, 88, 89, 90, 115],
    dossier: [12],
    checks: ['Đúng mã tôn, màu, độ dày, sóng và phụ kiện theo phê duyệt vật liệu', 'Xà gồ, vít, long đen, chồng mí, diềm và vị trí xuyên mái đã kiểm tra', 'Độ dốc mái/máng, hướng thoát và ống đứng đúng bản vẽ', 'Đã thử nước chống dột và chụp ảnh chi tiết các mối nối']
  },
  waterproofing: {
    title: 'Bể tự hoại & chống thấm',
    drawings: ['foundation-6'],
    qaqc: ['QC-07'],
    boq: [13, 34],
    dossier: [10, 16],
    checks: ['Đúng kích thước bể, cao độ ống vào/ra và vị trí các ngăn', 'Nền, cốt thép đáy, thành xây và cổ ống đã được kiểm tra', 'Lớp chống thấm, góc chân tường và mạch ngừng đã xử lý', 'Đã thử nước/thử thoát, lập ảnh và biên bản trước khi lấp đất']
  },
  mep: {
    title: 'MEP: điện, nước & tiếp địa',
    drawings: ['design-52'],
    qaqc: ['QC-14'],
    boq: [291, 294, 295],
    dossier: [14],
    checks: ['Vật tư, model, CO/CQ và mẫu được phê duyệt trước khi lắp đặt', 'Tuyến ống/cáp, cao độ, đánh dấu mạch và vị trí xuyên tường đúng thiết kế', 'Đã kiểm tra thử kín, thoát nước, cách điện và điện trở tiếp địa', 'Có sơ đồ hoàn công, biên bản thử nghiệm và ảnh trước khi che khuất']
  },
  pccc: {
    title: 'PCCC & chạy thử liên động',
    drawings: ['design-68'],
    qaqc: ['QC-15'],
    boq: [296, 297],
    dossier: [15],
    checks: ['Đối chiếu thiết kế PCCC được duyệt và đúng chủng loại thiết bị', 'Thiết bị, địa chỉ, nguồn cấp, tuyến cáp và biển báo đã kiểm tra', 'Đã thử từng thiết bị và chạy thử liên động theo kịch bản', 'Có biên bản thử nghiệm, cấu hình hệ thống và hồ sơ cơ quan chuyên ngành nếu áp dụng']
  }
};

function getFieldGateState() {
  try { return JSON.parse(localStorage.getItem('hsh_field_gate_state') || '{}'); } catch (error) { return {}; }
}

window.hshFieldGateToggle = function(index) {
  const type = document.getElementById('t10_gate_type')?.value || 'foundation';
  const state = getFieldGateState();
  const checked = new Set(state[type] || []);
  checked.has(index) ? checked.delete(index) : checked.add(index);
  state[type] = [...checked].sort((a, b) => a - b);
  localStorage.setItem('hsh_field_gate_state', JSON.stringify(state));
  window.hshRenderFieldGate();
};

window.hshRenderFieldGate = function() {
  const result = document.getElementById('t10_result');
  if (!result) return;

  const type = document.getElementById('t10_gate_type')?.value || 'foundation';
  const preset = FIELD_GATE_PRESETS[type] || FIELD_GATE_PRESETS.foundation;
  const location = document.getElementById('t10_gate_location')?.value.trim() || 'Chưa nhập vị trí';
  const state = getFieldGateState();
  const checked = new Set(state[type] || []);
  const done = preset.checks.filter((_, index) => checked.has(index)).length;
  const geometry = document.getElementById('t10_geometry');
  if (geometry) {
    geometry.innerHTML = `<svg viewBox="0 0 120 70" role="img" aria-label="Cổng kiểm tra ${aiEscape(preset.title)}"><path class="geo-stroke" d="M16 35h88M29 35l10-12M52 35l10-12M75 35l10-12"></path><circle class="geo-fill" cx="16" cy="35" r="8"></circle><circle class="geo-fill" cx="39" cy="35" r="8"></circle><circle class="geo-fill" cx="62" cy="35" r="8"></circle><circle class="geo-accent" cx="85" cy="35" r="8"></circle><text class="geo-text" x="13" y="38">1</text><text class="geo-text" x="36" y="38">2</text><text class="geo-text" x="59" y="38">3</text><text class="geo-text" x="82" y="38">4</text><text class="geo-text" x="12" y="61">BV</text><text class="geo-text" x="35" y="61">VL</text><text class="geo-text" x="58" y="61">TC</text><text class="geo-text" x="81" y="61">HS</text></svg><div><strong>${aiEscape(preset.title)}</strong><small>Checklist 4 cổng trước nghiệm thu</small><div class="geo-key">Bản vẽ · vật liệu · thi công · hồ sơ</div></div>`;
  }
  const drawingLinks = preset.drawings.map(id => COMPLETE_DRAWINGS.find(item => item.id === id)).filter(Boolean).map(drawing => `<button class="field-gate-link" onclick="window.hshOpenDrawingRelation('tab-gallery','${drawing.id}')"><i class="fas fa-drafting-compass"></i> BV p.${drawing.pageNumber}</button>`).join('');
  const qaqcLinks = preset.qaqc.map(code => `<button class="field-gate-link" onclick="window.hshOpenQaQcSource('${code}')"><i class="fas fa-clipboard-check"></i> ${code}</button>`).join('');
  const boqLinks = preset.boq.map(row => `<button class="field-gate-link" onclick="window.hshOpenBoqSource(${row})"><i class="fas fa-list-ol"></i> BOQ ${row}</button>`).join('');
  const dossierLinks = preset.dossier.map(id => `<button class="field-gate-link" onclick="window.hshOpenDossierSource(${id})"><i class="fas fa-folder-open"></i> Hồ sơ ${String(id).padStart(2, '0')}</button>`).join('');

  result.innerHTML = `
    <div class="field-gate-title">${preset.title} · ${done}/${preset.checks.length} điều kiện đạt</div>
    <div class="field-gate-location"><i class="fas fa-location-dot"></i> Vị trí: <strong>${aiEscape(location)}</strong></div>
    <div class="field-gate-checks">${preset.checks.map((check, index) => `<label class="field-gate-item ${checked.has(index) ? 'is-done' : ''}"><input type="checkbox" ${checked.has(index) ? 'checked' : ''} onchange="window.hshFieldGateToggle(${index})"><span>${aiEscape(check)}</span></label>`).join('')}</div>
    <div class="field-gate-actions"><span class="field-gate-label">Mở đối chiếu:</span>${drawingLinks}${qaqcLinks}${boqLinks}${dossierLinks}<button class="field-gate-link" onclick="window.hshNavigateToTab('tab-progress')"><i class="fas fa-book"></i> Nhật ký</button></div>
  `;
};

function runAllCalculators() {
  window.hshCalcConcrete();
  window.hshCalcSteel();
  window.hshCalcSika();
  window.hshCalcBrick();
  window.hshCalcTile();
  window.hshCalcPaint();
  window.hshCalcRoofHydraulics();
  window.hshCalcLightingAndPower();
  window.hshCalcPCCC();
  window.hshRenderFieldGate();
}

// ==========================================================================
// 12. DASHBOARD CHARTS ENGINE (CHART.JS)
// ==========================================================================
function initDashboardCharts() {
  if (typeof Chart === 'undefined') {
    console.warn('[Dashboard] Chart.js chưa tải; bỏ qua biểu đồ nhưng các chức năng dữ liệu vẫn hoạt động.');
    return;
  }
  // 1. S-Curve Progress Chart
  const scurveCtx = document.getElementById('scurveChart');
  if (scurveCtx) {
    if (chartInstances.scurve) chartInstances.scurve.destroy();

    const days = [1, 10, 20, 30, 40, 50, 60];
    const planCurve = [1.5, 12.0, 28.0, 52.0, 78.0, 92.0, 100.0];
    const actualCurve = [0.0, null, null, null, null, null, null];

    chartInstances.scurve = new Chart(scurveCtx, {
      type: 'line',
      data: {
        labels: days.map(d => `Ngày ${d}`),
        datasets: [
          {
            label: 'Tiến độ Kế hoạch (Baseline)',
            data: planCurve,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 4
          },
          {
            label: 'Tiến độ Thực tế (Actual)',
            data: actualCurve,
            borderColor: '#C8102E',
            backgroundColor: 'rgba(200, 16, 46, 0.2)',
            borderWidth: 3,
            fill: false,
            tension: 0.35,
            pointRadius: 6,
            pointBackgroundColor: '#C8102E'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: 'Inter', weight: 600, size: 11 } } }
        },
        scales: {
          y: { min: 0, max: 100, ticks: { callback: v => v + '%' } }
        }
      }
    });
  }

  // 2. Cost Breakdown Donut Chart (Không tính VAT: 3.854.146.466 đ)
  const costCtx = document.getElementById('costBreakdownChart');
  if (costCtx) {
    if (chartInstances.cost) chartInstances.cost.destroy();

    chartInstances.cost = new Chart(costCtx, {
      type: 'doughnut',
      data: {
        labels: ['Móng & ĐK', 'KCT Canopy', 'Xây Hoàn Thiện', 'Cửa Xingfa', 'Điện & PCCC', 'Chi phí ban đầu'],
        datasets: [{
          data: [815, 1080, 860, 450, 420, 229],
          backgroundColor: ['#0A2C54', '#C8102E', '#F59E0B', '#10B981', '#0284C7', '#64748B'],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 10 } } }
        }
      }
    });
  }
}

// ==========================================================================
// 13. SETTINGS & SYSTEM BACKUP ENGINE
// ==========================================================================
const DOSSIER_STATUS_LABELS = { todo: "Chưa làm", progress: "Đang làm", done: "Hoàn tất" };
const DOSSIER_STATUS_NEXT = { todo: "progress", progress: "done", done: "todo" };

function getDossierState() {
  try {
    return JSON.parse(localStorage.getItem('hsh_dossier_state') || '{}');
  } catch (error) {
    return {};
  }
}

function escapeDossierHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
}

function renderDossierChecklist() {
  const body = document.getElementById('dossierChecklistBody');
  if (!body) return;

  const category = document.getElementById('dossierCategoryFilter')?.value || 'all';
  const statusFilter = document.getElementById('dossierStatusFilter')?.value || 'all';
  const state = getDossierState();
  const items = DOSSIER_ITEMS.filter(item => {
    const status = state[item.id] || 'todo';
    return (category === 'all' || item.category === category) &&
      (statusFilter === 'all' || status === statusFilter);
  });

  const priorityLabel = { critical: 'Bắt buộc', high: 'Ưu tiên' };
  body.innerHTML = items.length ? items.map(item => {
    const status = state[item.id] || 'todo';
    return `
      <tr class="dossier-row-${status}" id="dossier-item-${item.id}">
        <td class="dossier-stt">${String(item.id).padStart(2, '0')}</td>
        <td><span class="dossier-category">${escapeDossierHtml(item.category)}</span></td>
        <td><strong>${escapeDossierHtml(item.title)}</strong></td>
        <td class="dossier-output">${escapeDossierHtml(item.output)}</td>
        <td><span class="dossier-priority dossier-priority-${item.priority}">${priorityLabel[item.priority]}</span></td>
        <td><button class="dossier-status dossier-status-${status}" onclick="window.hshCycleDossierStatus(${item.id})" title="Bấm để đổi trạng thái">${DOSSIER_STATUS_LABELS[status]}</button></td>
      </tr>
    `;
  }).join('') : '<tr><td colspan="6" class="dossier-empty">Không có mục nào phù hợp với bộ lọc.</td></tr>';

  const allStatuses = DOSSIER_ITEMS.map(item => state[item.id] || 'todo');
  const done = allStatuses.filter(status => status === 'done').length;
  const progress = allStatuses.filter(status => status === 'progress').length;
  const todo = allStatuses.filter(status => status === 'todo').length;
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  setText('dossierTotalCount', DOSSIER_ITEMS.length);
  setText('dossierDoneCount', done);
  setText('dossierProgressCount', progress);
  setText('dossierTodoCount', todo);
  setText('sideBadgeDossier', `${done}/${DOSSIER_ITEMS.length}`);
}

window.hshRenderDossierChecklist = renderDossierChecklist;

window.hshCycleDossierStatus = function(itemId) {
  const state = getDossierState();
  const current = state[itemId] || 'todo';
  state[itemId] = DOSSIER_STATUS_NEXT[current] || 'todo';
  localStorage.setItem('hsh_dossier_state', JSON.stringify(state));
  renderDossierChecklist();
  showToast(`Hồ sơ #${String(itemId).padStart(2, '0')}: ${DOSSIER_STATUS_LABELS[state[itemId]]}`, state[itemId] === 'done' ? 'success' : 'info');
};

window.hshOpenDossierGuide = function() {
  const guide = document.querySelector('.dossier-guide-card');
  if (guide) guide.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Làm theo 6 bước ở khung Trình tự xử lý, sau đó bấm trạng thái từng đầu việc.', 'info');
};

window.hshExportDossierChecklist = function() {
  if (typeof XLSX === 'undefined') {
    showToast('Chưa tải được thư viện Excel. Hãy kết nối mạng rồi thử lại.', 'error');
    return;
  }
  const state = getDossierState();
  const rows = DOSSIER_ITEMS.map(item => ({
    STT: item.id,
    'Nhóm hồ sơ': item.category,
    'Hồ sơ cần lập': item.title,
    'Đầu ra / giấy tờ kèm theo': item.output,
    'Ưu tiên': item.priority === 'critical' ? 'Bắt buộc' : 'Ưu tiên',
    'Trạng thái': DOSSIER_STATUS_LABELS[state[item.id] || 'todo']
  }));
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  sheet['!cols'] = [{ wch: 6 }, { wch: 24 }, { wch: 42 }, { wch: 72 }, { wch: 12 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(workbook, sheet, 'Checklist hồ sơ');
  XLSX.writeFile(workbook, `HSH_Phuly_Checklist_HoSo_${new Date().toISOString().slice(0, 10)}.xlsx`);
  showToast('Đã xuất Checklist hồ sơ ra Excel.', 'success');
};

window.hshSaveProjectConfig = function() {
  showToast("Đã lưu và đồng bộ toàn bộ thông số dự án thành công!", "success");
};

window.hshExportJSONBackup = async function() {
  showToast("Đang tạo gói sao lưu toàn bộ cơ sở dữ liệu...", "info");
  const backupData = {
    exportDate: new Date().toISOString(),
    config: PROJECT_CONFIG,
    boq: await db.boq.toArray(),
    qaqc: await db.qaqc.toArray(),
    dailyLogs: await db.dailyLogs.toArray(),
    dossierState: getDossierState()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `HoaSenHome_Backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast("Xuất file sao lưu JSON thành công!", "success");
};

window.hshImportJSONBackup = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.boq) {
        await db.boq.clear();
        await db.boq.bulkAdd(data.boq);
      }
      if (data.qaqc) {
        await db.qaqc.clear();
        await db.qaqc.bulkAdd(data.qaqc);
      }
      if (data.dailyLogs) {
        await db.dailyLogs.clear();
        await db.dailyLogs.bulkAdd(data.dailyLogs);
      }
      if (data.dossierState) {
        localStorage.setItem('hsh_dossier_state', JSON.stringify(data.dossierState));
      }
      showToast("Khôi phục dữ liệu từ JSON thành công! Đang tải lại...", "success");
      setTimeout(() => location.reload(), 1200);
    } catch (err) {
      showToast("File sao lưu không hợp lệ: " + err.message, "error");
    }
  };
  reader.readAsText(file);
};

window.hshClearServiceWorkerCache = async function() {
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    showToast("Đã làm mới bộ nhớ đệm Cache PWA!", "success");
    setTimeout(() => location.reload(), 1000);
  }
};

window.hshResetDefaultData = async function() {
  if (confirm("Bạn có chắc chắn muốn khôi phục dữ liệu gốc chuẩn từ Tập đoàn Hoa Sen?")) {
    await db.boq.clear();
    await db.qaqc.clear();
    await db.dailyLogs.clear();
    localStorage.removeItem('hsh_dossier_state');
    await initDatabase();
    showToast("Đã khôi phục dữ liệu mặc định thành công!", "success");
    setTimeout(() => location.reload(), 1000);
  }
};

// ==========================================================================
// 14. UI HELPERS & SEARCH & AI ASSISTANT MODALS
// ==========================================================================
window.hshToggleGlareMode = function() {
  document.body.classList.toggle('outdoor-mode');
  const isOutdoor = document.body.classList.contains('outdoor-mode');
  showToast(isOutdoor ? "Đã BẬT Chế độ Chống Chói Nắng Ngoài Trời" : "Đã TẮT Chế độ Chống Chói", "info");
};

window.hshOpenDrawingRelation = function(tabId, drawingId) {
  const drawing = drawingId ? COMPLETE_DRAWINGS.find(item => item.id === drawingId) : null;
  switchTab(tabId);

  if (!drawing) {
    showToast("Đã mở khu vực liên quan để tiếp tục kiểm tra.", "info");
    return;
  }

  const boqKeyword = {
    foundation: "móng",
    arch: "tôn",
    canopy: "xà gồ",
    mep: "điện"
  }[drawing.category] || "";

  if (tabId === "tab-boq") {
    const input = document.getElementById("boqSearchInput");
    if (input && boqKeyword) {
      input.value = boqKeyword;
      window.hshFilterBOQTable();
    }
    showToast(`Đã lọc BOQ liên quan đến bản vẽ ${drawing.id.toUpperCase()}.`, "info");
  } else if (tabId === "tab-qaqc") {
    showToast(`Đã mở QA/QC để đối chiếu bản vẽ ${drawing.id.toUpperCase()}.`, "info");
  } else if (tabId === "tab-dossier") {
    const filter = document.getElementById("dossierCategoryFilter");
    if (filter) {
      filter.value = "Nghiệm thu QA/QC";
      renderDossierChecklist();
    }
    showToast(`Đã mở checklist hồ sơ cho bản vẽ ${drawing.id.toUpperCase()}.`, "info");
  } else if (tabId === "tab-gallery") {
    window.hshLightboxOpen(drawing.id);
  }
};

window.hshOpenBoqSource = async function(rowNumber) {
  const item = RAW_BOQ.find(row => Number(row.row) === Number(rowNumber));
  switchTab('tab-boq');
  const input = document.getElementById('boqSearchInput');
  if (input && item) input.value = item.content.slice(0, 42);
  await renderBOQTable();
  const rowEl = document.querySelector(`[data-boq-row="${Number(rowNumber)}"]`);
  if (rowEl) {
    rowEl.classList.add('boq-source-highlight');
    rowEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
    setTimeout(() => rowEl.classList.remove('boq-source-highlight'), 2800);
  }
  showToast(`Đã mở BOQ dòng ${Number(rowNumber)} để đối chiếu.`, 'info');
};

window.hshOpenQaQcSource = function(code) {
  switchTab('tab-qaqc');
  setTimeout(() => {
    const card = document.getElementById(`qaqc-${code}`);
    if (card) {
      card.classList.add('qaqc-source-highlight');
      card.scrollIntoView({ block: 'center', behavior: 'smooth' });
      setTimeout(() => card.classList.remove('qaqc-source-highlight'), 2800);
    }
  }, 180);
  showToast(`Đã mở nguồn QA/QC ${code}.`, 'info');
};

window.hshOpenDossierSource = function(itemId) {
  switchTab('tab-dossier');
  setTimeout(() => {
    const row = document.getElementById(`dossier-item-${Number(itemId)}`);
    if (row) {
      row.classList.add('dossier-source-highlight');
      row.scrollIntoView({ block: 'center', behavior: 'smooth' });
      setTimeout(() => row.classList.remove('dossier-source-highlight'), 2800);
    }
  }, 180);
  showToast(`Đã mở nguồn Hồ sơ mục ${String(itemId).padStart(2, '0')}.`, 'info');
};

function getContractSearchItems() {
  const input = document.getElementById('contractSearchInput');
  const query = aiNormalize(input?.value || '').trim();
  const terms = query.split(/\s+/).filter(term => term.length > 1);
  return CONTRACT_LOOKUP_ITEMS.filter(item => {
    if (contractLookupFilter !== 'all' && item.filter !== contractLookupFilter) return false;
    if (!terms.length) return true;
    const haystack = aiNormalize([item.group, item.title, item.summary, item.keywords].join(' '));
    return terms.every(term => haystack.includes(term));
  });
}

function renderContractResults() {
  const list = document.getElementById('contractSearchResults');
  const count = document.getElementById('contractResultsCount');
  const title = document.getElementById('contractResultsTitle');
  if (!list) return;

  const input = document.getElementById('contractSearchInput');
  const query = (input?.value || '').trim();
  const items = getContractSearchItems();
  if (count) count.textContent = `${items.length} mục`;
  if (title) title.textContent = query ? `Kết quả cho “${query}”` : 'Các điểm cần biết trước khi triển khai';

  if (!items.length) {
    list.innerHTML = `<div class="contract-empty-state"><i class="fas fa-magnifying-glass"></i><strong>Chưa có kết quả phù hợp</strong><span>Thử từ khóa ngắn hơn như “thanh toán”, “bảo hành” hoặc “tiến độ”.</span></div>`;
    return;
  }

  const source = './assets/hoa-sen/docs/signed%20HDTC%20HSH%20PHU%20LY%20NINH%20BINH.pdf';
  list.innerHTML = items.map(item => `
    <article class="contract-result-item" id="contract-result-${item.id}">
      <div class="contract-result-index">${String(item.page).padStart(2, '0')}</div>
      <div class="contract-result-copy">
        <div class="contract-result-meta"><span>${aiEscape(item.group)}</span><span>Trang ${item.page}</span></div>
        <h4>${aiEscape(item.title)}</h4>
        <p>${aiEscape(item.summary)}</p>
        <div class="contract-result-actions">
          <a href="${source}#page=${item.page}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> Mở PDF trang ${item.page}</a>
          <button type="button" onclick="window.hshOpenContractItem('${item.id}')"><i class="fas fa-crosshairs"></i> Giữ mục này</button>
        </div>
      </div>
    </article>
  `).join('');
}

window.hshRunContractSearch = function() {
  renderContractResults();
};

window.hshSetContractFilter = function(filter) {
  contractLookupFilter = filter || 'all';
  document.querySelectorAll('[data-contract-filter]').forEach(button => {
    button.classList.toggle('active', button.getAttribute('data-contract-filter') === contractLookupFilter);
  });
  renderContractResults();
};

window.hshSetContractQuery = function(query) {
  const input = document.getElementById('contractSearchInput');
  if (input) input.value = query || '';
  window.hshRunContractSearch();
  if (input) input.focus();
};

window.hshClearContractSearch = function() {
  window.hshSetContractQuery('');
};

window.hshOpenContractLookup = function(query = '') {
  switchTab('tab-contract');
  setTimeout(() => {
    window.hshSetContractQuery(query);
    document.getElementById('contractSearchInput')?.focus();
  }, 180);
};

window.hshOpenContractItem = function(itemId) {
  const item = CONTRACT_LOOKUP_ITEMS.find(entry => entry.id === itemId);
  if (!item) return;
  switchTab('tab-contract');
  setTimeout(() => {
    contractLookupFilter = item.filter;
    document.querySelectorAll('[data-contract-filter]').forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-contract-filter') === contractLookupFilter);
    });
    const input = document.getElementById('contractSearchInput');
    if (input) input.value = '';
    renderContractResults();
    const card = document.getElementById(`contract-result-${item.id}`);
    if (card) {
      card.classList.add('contract-source-highlight');
      card.scrollIntoView({ block: 'center', behavior: 'smooth' });
      setTimeout(() => card.classList.remove('contract-source-highlight'), 2800);
    }
  }, 220);
};

window.hshOpenQuickSearch = function() {
  const modal = document.getElementById('quickSearchModal');
  const input = document.getElementById('quickSearchModalInput');
  if (modal) modal.classList.add('active');
  if (input) {
    input.value = '';
    input.focus();
  }
};

window.hshCloseQuickSearch = function() {
  const modal = document.getElementById('quickSearchModal');
  if (modal) modal.classList.remove('active');
};

window.hshExecuteQuickSearch = function() {
  const kw = aiNormalize(document.getElementById('quickSearchModalInput')?.value || '').trim();
  const listEl = document.getElementById('quickSearchResultsList');
  if (!listEl) return;

  if (!kw) {
    listEl.innerHTML = `<div class="search-empty-prompt">Nhập từ khóa để tra cứu siêu tốc trong toàn bộ dự án Hoa Sen Home...</div>`;
    return;
  }

  let results = [];

  CONTRACT_LOOKUP_ITEMS.forEach(item => {
    const haystack = aiNormalize([item.group, item.title, item.summary, item.keywords].join(' '));
    if (haystack.includes(kw)) {
      results.push({
        type: "Hợp đồng",
        icon: "fa-file-signature text-primary",
        title: item.title,
        sub: `${item.group} • Trang ${item.page} • ${item.summary}`,
        action: () => { window.hshCloseQuickSearch(); window.hshOpenContractItem(item.id); }
      });
    }
  });

  DOSSIER_ITEMS.forEach(item => {
    if (aiNormalize([item.title, item.category, item.output].join(' ')).includes(kw)) {
      results.push({
        type: "Hồ sơ",
        icon: "fa-folder-open text-danger",
        title: `#${String(item.id).padStart(2, '0')} ${item.title}`,
        sub: `${item.category} • ${item.output}`,
        action: () => { window.hshCloseQuickSearch(); switchTab('tab-dossier'); }
      });
    }
  });

  COMPLETE_DRAWINGS.forEach(d => {
    if (aiNormalize([d.title, d.desc, d.id].join(' ')).includes(kw)) {
      results.push({
        type: "Bản vẽ",
        icon: "fa-layer-group text-primary",
        title: d.title,
        sub: `${d.id.toUpperCase()} • ${d.desc}`,
        action: () => { window.hshCloseQuickSearch(); switchTab('tab-gallery'); window.hshLightboxOpen(d.id); }
      });
    }
  });

  RAW_BOQ.slice(0, 100).forEach(b => {
    if (aiNormalize([b.content, b.code, b.brand].join(' ')).includes(kw)) {
      results.push({
        type: "BOQ Dự toán",
        icon: "fa-file-invoice-dollar text-success",
        title: `[${b.stt || b.row}] ${b.content}`,
        sub: `Đơn giá: ${fmtNumber(b.price_total)} đ • Thành tiền: ${fmtCurrency(b.total_amt)}`,
        action: () => { window.hshCloseQuickSearch(); switchTab('tab-boq'); }
      });
    }
  });

  if (results.length === 0) {
    listEl.innerHTML = `<div class="search-empty-prompt">Không tìm thấy kết quả nào cho "${kw}"</div>`;
  } else {
    listEl.innerHTML = results.slice(0, 10).map((r, i) => `
      <div class="db-action-item" style="cursor:pointer; margin-bottom:8px;" onclick="window.hshExecuteSearchAction(${i})">
        <div>
          <strong style="display:flex; align-items:center; gap:8px;"><i class="fas ${r.icon}"></i> ${r.title}</strong>
          <p class="text-muted text-xs" style="margin-top:2px;">${r.sub}</p>
        </div>
        <span class="badge badge-outline">${r.type}</span>
      </div>
    `).join('');
    window._lastSearchResults = results;
  }
};

window.hshExecuteSearchAction = function(index) {
  if (window._lastSearchResults && window._lastSearchResults[index]) {
    window._lastSearchResults[index].action();
  }
};

// AI Assistant
window.hshOpenAiAssistant = function() {
  const modal = document.getElementById('aiAssistantModal');
  if (modal) modal.classList.add('active');
};

window.hshCloseAiAssistant = function() {
  const modal = document.getElementById('aiAssistantModal');
  if (modal) modal.classList.remove('active');
};

const AI_SOURCES = [
  { label: "NĐ 06/2021/NĐ-CP", url: "https://vanban.chinhphu.vn/default.aspx?docid=202585&pageid=27160" },
  { label: "NĐ 175/2024/NĐ-CP", url: "https://vanban.chinhphu.vn/?classid=1&docid=212166&pageid=27160" },
  { label: "Hướng dẫn TCVN 5574:2018", url: "https://moc.gov.vn/Images/editor/files/TL%20KT%20Xay%20dung/HD%20tinh%20toan%20cot%20thep%20ket%20cau%20loi%20%E2%80%93%20vach%20BTCT%20theo%20TCVN%205574-2018.pdf" }
];

const AI_PROJECT_DOCUMENTS = {
  dailyReport: "./assets/hoa-sen/docs/01.BAO%20CAO%20NGAY.xlsx",
  journal: "./assets/hoa-sen/docs/03.NHAT%20KY%20CONG%20TRINH.DOC",
  acceptance: "./assets/hoa-sen/docs/07.BBNT%20CONG%20VIEC%20XAY%20DUNG.doc",
  defect: "./assets/hoa-sen/docs/09.BIEN%20BAN%20GHI%20NHAN%20DEFECT%20LIST.docx",
  buildingChecklist: "./assets/hoa-sen/docs/10.CHECKLIST%20NGHIEM%20THU%20PHAN%20XAY%20DUNG.xls",
  mepChecklist: "./assets/hoa-sen/docs/11.CHECKLIST%20NGHIEM%20THU%20PHAN%20MEP.xls",
  settlement: "./assets/hoa-sen/docs/BM%20-%20HO%20SO%20THANH%20-%20QUYET%20TOAN.xlsx",
  contract: "./assets/hoa-sen/docs/signed%20HDTC%20HSH%20PHU%20LY%20NINH%20BINH.pdf"
};

const AI_KNOWLEDGE_PACK = [
  {
    id: "septic-tank", priority: 14,
    triggers: ["be phot", "be tu hoai", "kc-49", "ba ngan", "ngan chua", "ngan lang", "ngan loc"],
    title: "Bể tự hoại KC-49 và mương thoát nước",
    body: "Theo bản vẽ kết cấu móng trang 6, bể tự hoại KC-49 có kích thước tham chiếu 3.900 × 1.900 × 1.900 mm, chia 3 ngăn Chứa - Lắng - Lọc; đáy bê tông dày 150 mm, thép Φ12a200 hai lớp, thành gạch 200 trát vữa M75 chống thấm. Trình tự làm gọn: xác định vị trí và cao độ ống vào/ra → đào và chống sạt → kiểm tra nền, lớp lót và cốt thép → xây/chia ngăn, xử lý cổ ống và chống thấm → thử nước/thử thoát → nghiệm thu rồi mới lấp đất. Không bịt đường ống hoặc lấp kín khi chưa có ảnh, biên bản và xác nhận cao độ.",
    links: [{ label: "Mở bản vẽ bể phốt", tab: "tab-gallery", drawingId: "foundation-6" }, { label: "Mở QC chống thấm", tab: "tab-qaqc" }, { label: "Checklist hồ sơ", tab: "tab-dossier" }],
    evidence: { drawings: ["foundation-6"], qaqc: ["QC-07"], boqRows: [13, 34], dossier: [10], docs: ["acceptance", "buildingChecklist"] },
    caution: "Cần đối chiếu cao độ đấu nối thực tế, hướng dòng chảy và yêu cầu thoát nước được duyệt; nếu gặp hạ tầng ngầm hoặc nước ngầm, dừng đào và báo kỹ sư/TVGS."
  },
  {
    id: "foundation-m8", priority: 12,
    triggers: ["mong m8", "m8", "ham ech", "ho gas"],
    title: "Xử lý móng M8 giáp hố gas",
    body: "Theo ghi chú hiện trường đang có trong dự án: dừng công việc tại vùng mất ổn định, khoanh vùng/chống sạt, chụp ảnh và đo cao độ; vét sạch bùn rác trong hố gas cũ sâu khoảng 1,8 m; bơm bù bê tông lót M100 đá 1x2 để lấp kín phần rỗng. Chỉ sau khi có xác nhận xử lý, thực hiện cấy 4 thanh D18 neo sâu 600 mm bằng Ramset G5 Pro, nghiệm thu cấy thép và ván khuôn rồi mới đổ bê tông M250. Không tự đổi đường kính, chiều sâu neo hoặc kích thước móng.",
    links: [{ label: "Mở bản vẽ M8", tab: "tab-gallery", drawingId: "foundation-4" }, { label: "Mở QC-04", tab: "tab-qaqc" }, { label: "Checklist hồ sơ", tab: "tab-dossier" }],
    evidence: { drawings: ["foundation-4"], qaqc: ["QC-04"], boqRows: [13, 16, 19], dossier: [10], docs: ["acceptance", "defect"] },
    caution: "Nếu có nước ngầm, sạt tiếp hoặc lộ kết cấu hiện hữu chưa rõ: dừng và xin ý kiến kỹ sư kết cấu/TVGS trước khi bơm bù hoặc khoan cấy."
  },
  {
    id: "foundation-overview", priority: 2,
    triggers: ["mong", "dai kieng"],
    title: "Tra cứu móng theo mã bản vẽ",
    body: "Hãy nhập mã cụ thể như M1, M2, M3, M4, M5, M6, M7 hoặc M8 để trợ lý mở đúng trang bản vẽ và chuỗi QA/QC tương ứng. Không dùng một quy cách chung cho tất cả móng vì kích thước, cao độ và cốt thép từng loại có thể khác nhau.",
    links: [{ label: "Mở thư viện bản vẽ móng", tab: "tab-gallery" }, { label: "Mở QA/QC móng", tab: "tab-qaqc" }, { label: "Checklist hồ sơ", tab: "tab-dossier" }],
    evidence: { drawings: ["foundation-1", "foundation-2", "foundation-3", "foundation-4", "foundation-5"], qaqc: ["QC-01", "QC-02", "QC-03"], dossier: [10] }
  },
  {
    id: "foundation-m5-m6", priority: 16,
    triggers: ["mong m5", "mong m6", "m5", "m6"],
    title: "Móng M5-M6 khu Nhà nhân viên",
    body: "Theo bản vẽ kết cấu móng trang 3, M5-M6 khu Nhà nhân viên có kích thước tham chiếu 1.200 × 1.200 × 200 mm, cao độ đáy -1.000; cốt thép đáy 4Φ14 và đai Φ6a150 theo chi tiết bản vẽ. Khi thi công cần đối chiếu đúng mã móng, tim trục, cao độ đáy, kích thước bản móng, thép chờ/cổ cột và đà kiềng liên kết; nghiệm thu hố móng, cốt thép và ván khuôn trước khi đổ bê tông.",
    links: [{ label: "Mở bản vẽ M5-M6", tab: "tab-gallery", drawingId: "foundation-3" }, { label: "Mở QA/QC móng", tab: "tab-qaqc" }, { label: "Checklist hồ sơ", tab: "tab-dossier" }],
    evidence: { drawings: ["foundation-3"], qaqc: ["QC-01", "QC-02", "QC-03"], dossier: [10], docs: ["acceptance", "buildingChecklist"] },
    caution: "Kích thước và thép phải chốt theo bản vẽ phát hành mới nhất; không suy ra M5/M6 giống M1-M4 hoặc M8 nếu chưa đối chiếu trang bản vẽ."
  },
  {
    id: "concrete-rebar", priority: 9,
    triggers: ["cot thep", "van khuon", "be tong", "do sut", "m250", "m100", "d18", "d16"],
    title: "Điểm dừng nghiệm thu bê tông - cốt thép",
    body: "Trình tự gọn: (1) kiểm tra tim trục, cao độ, kích thước và lớp bảo vệ; (2) kiểm tra chủng loại, đường kính, số lượng, bước thép, nối và kê thép; (3) kiểm tra ván khuôn, vệ sinh, lỗ chờ và chống đỡ; (4) lập biên bản nghiệm thu trước khi đổ. Khi đổ bê tông cần ghi phiếu giao hàng, mác/cấp độ bền, thời gian, độ sụt và lấy mẫu theo chỉ dẫn kỹ thuật/hồ sơ được duyệt. Kết quả phải gắn với vị trí móng/cấu kiện và ảnh hiện trường.",
    links: [{ label: "Mở QA/QC", tab: "tab-qaqc" }, { label: "Mở bản vẽ móng", tab: "tab-gallery", drawingId: "foundation-2" }, { label: "Mở Hồ sơ Công trình", tab: "tab-dossier" }],
    evidence: { drawings: ["foundation-2"], qaqc: ["QC-01", "QC-02", "QC-03"], boqRows: [16, 18, 19], dossier: [10], docs: ["acceptance", "buildingChecklist"] },
    sources: [2]
  },
  {
    id: "steel-canopy", priority: 8,
    triggers: ["khung thep", "canopy", "keo thep", "xa go", "bu long", "m20", "moi han"],
    title: "Khung thép, canopy và liên kết",
    body: "Trước lắp dựng: đối chiếu bản vẽ, mã cấu kiện, kích thước và chứng chỉ vật liệu; kiểm tra bu lông neo J M20 (8.8), tim trục, cao độ và chiều dài ren chờ. Tại xưởng kiểm tra đường hàn, biến dạng và sơn bảo vệ; tại công trường kiểm tra độ thẳng đứng, cao độ, liên kết và siết bu lông theo quy trình được duyệt. Không tự suy ra lực siết hoặc thay đổi tiết diện khi chưa có thiết kế/TVGS xác nhận.",
    links: [{ label: "Mở bản vẽ canopy", tab: "tab-gallery", drawingId: "design-24" }, { label: "Mở QC khung thép", tab: "tab-qaqc" }, { label: "Lọc BOQ xà gồ", tab: "tab-boq", drawingId: "design-35" }],
    evidence: { drawings: ["design-24", "design-35"], qaqc: ["QC-05", "QC-08", "QC-09"], boqRows: [23, 42, 43], dossier: [6, 11], docs: ["acceptance", "buildingChecklist"] },
    sources: [2]
  },
  {
    id: "roof-sheet", priority: 8,
    triggers: ["ton", "mai ton", "vach ton", "mang xoi", "chong dot", "mag shield", "d110", "d140"],
    title: "Lợp tôn - vách tôn - thoát nước mưa",
    body: "Kiểm tra theo 4 nhóm: vật liệu (mã sản phẩm, màu, độ dày 0,50 mm theo hồ sơ), nền đỡ/xà gồ, phụ kiện (vít, long đen, diềm, chồng mí) và thoát nước. Trước nghiệm thu cần kiểm tra độ dốc mái/máng, hướng thoát, vị trí ống đứng, xử lý xuyên mái và thử nước chống dột. Chụp ảnh các mối nối và lập biên bản theo khu vực, không nghiệm thu chỉ bằng ảnh tổng thể.",
    links: [{ label: "Mở bản vẽ mái tôn", tab: "tab-gallery", drawingId: "design-5" }, { label: "Mở QC-12", tab: "tab-qaqc" }, { label: "Lọc BOQ tôn", tab: "tab-boq", drawingId: "design-5" }],
    evidence: { drawings: ["design-5", "design-35"], qaqc: ["QC-12"], boqRows: [71, 72, 83, 84, 88, 89, 90, 115], dossier: [12], docs: ["acceptance", "buildingChecklist"] }
  },
  {
    id: "mep-pccc", priority: 8,
    triggers: ["pccc", "bao chay", "asenware", "dien", "chong set", "tiep dia", "me p", "mep"],
    title: "MEP - điện - PCCC",
    body: "Tách kiểm tra thành 3 cổng: vật tư/CO-CQ và phê duyệt mẫu; lắp đặt (tuyến, cao độ, đánh dấu mạch, tiếp địa, khoảng cách và xuyên tường); thử nghiệm/chạy thử (đo điện, cách điện, tiếp địa, thử kín/thoát nước và thử liên động báo cháy). Với PCCC, đối chiếu thiết kế được duyệt và yêu cầu cơ quan có thẩm quyền; không kết luận đạt chỉ dựa trên tên thiết bị Asenware.",
    links: [{ label: "Mở bản vẽ PCCC", tab: "tab-gallery", drawingId: "design-68" }, { label: "Mở QA/QC PCCC", tab: "tab-qaqc" }, { label: "Checklist hồ sơ", tab: "tab-dossier" }],
    caution: "Các chỉ tiêu như điện trở tiếp địa, vùng bảo vệ và cấu hình liên động phải theo thiết kế/biên bản thử nghiệm được duyệt; trợ lý không thay thế đơn vị PCCC đủ điều kiện.",
    evidence: { drawings: ["design-52", "design-68"], qaqc: ["QC-14", "QC-15"], boqRows: [291, 294, 295, 296, 297], dossier: [14, 15], docs: ["mepChecklist"] },
    sources: [0, 1]
  },
  {
    id: "grout-anchor", priority: 9,
    triggers: ["sika", "grout", "ramset", "epcon", "chan cot", "khoan cay", "neo thep"],
    title: "Vữa không co ngót và khoan cấy thép",
    body: "Trong dữ liệu dự án, SikaGrout 214-11 được ghi cho vị trí chèn chân cột; hồ sơ hiện trường cũng ghi Ramset Epcon G5 Pro cho xử lý M8. Trước khi thi công phải xác nhận đúng sản phẩm, lô hàng, nền bê tông, đường kính/lỗ khoan, chiều sâu neo, vệ sinh lỗ và thời gian đóng rắn theo tài liệu kỹ thuật được duyệt. Lập biên bản vật liệu, nhật ký thi công và nghiệm thu trước khi che khuất. Không dùng định mức nước, số bao hoặc chiều sâu neo từ câu trả lời này để thay thế datasheet/biện pháp đã duyệt.",
    links: [{ label: "Mở chi tiết M8", tab: "tab-gallery", drawingId: "foundation-4" }, { label: "Mở QC cấy thép", tab: "tab-qaqc" }, { label: "Mở checklist hồ sơ", tab: "tab-dossier" }],
    evidence: { drawings: ["foundation-4", "design-24"], qaqc: ["QC-04", "QC-06", "QC-10"], boqRows: [22, 23], dossier: [6, 7, 10], docs: ["acceptance", "buildingChecklist"] },
    caution: "Keo hóa chất và vữa grout phải dùng đúng hệ sản phẩm, điều kiện nền/nhiệt độ và thời gian bảo dưỡng theo nhà sản xuất và biện pháp được phê duyệt."
  },
  {
    id: "contract-schedule", priority: 8,
    triggers: ["tien do", "hop dong", "gia han", "gia tri hop dong", "thanh toan", "phat sinh"],
    title: "Hợp đồng, tiến độ và phát sinh",
    body: "Theo dữ liệu dự án, mọi thay đổi về tiến độ, khối lượng hoặc phạm vi công việc cần được ghi nhận theo chuỗi: xác định nguyên nhân → lập ghi nhận hiện trường → đối chiếu hợp đồng/BOQ → xin chấp thuận → cập nhật tiến độ và hồ sơ thanh toán. Khi lập văn bản chính thức phải mở bản hợp đồng đã ký, phụ lục và các biên bản được phê duyệt; không chốt phát sinh chỉ từ trao đổi miệng hoặc con số tạm tính.",
    links: [{ label: "Mở tiến độ & nhật ký", tab: "tab-progress" }, { label: "Mở BOQ/phát sinh", tab: "tab-boq" }, { label: "Mở hồ sơ thanh toán", tab: "tab-dossier" }],
    evidence: { dossier: [1, 17, 18, 20], docs: ["contract", "dailyReport", "journal", "settlement"] },
    caution: "Chỉ cập nhật tiến độ, phát sinh và giá trị thanh toán sau khi có người có thẩm quyền xác nhận và tài liệu làm căn cứ."
  },
  {
    id: "dossier-payment", priority: 7,
    triggers: ["ho so", "thanh toan", "quyet toan", "hoan cong", "nghiem thu", "co cq", "phat sinh", "vat lieu"],
    title: "Hồ sơ nghiệm thu - thanh toán - hoàn công",
    body: "Một bộ hồ sơ nên đi theo chuỗi không đứt: bản vẽ/biện pháp được duyệt → trình duyệt vật liệu → chứng từ đầu vào → nhật ký và ảnh → biên bản nghiệm thu công việc → khối lượng xác nhận → đề nghị thanh toán → hoàn công/bàn giao. Với phát sinh, lập ghi nhận hiện trường, xác định nguyên nhân/khối lượng, xin chấp thuận trước khi thi công phần thay đổi và cập nhật BOQ/hoàn công. Mỗi biên bản phải có mã vị trí, ngày, thành phần ký và tài liệu viện dẫn.",
    links: [{ label: "Mở checklist 20 mục", tab: "tab-dossier" }, { label: "Mở QA/QC", tab: "tab-qaqc" }, { label: "Mở BOQ", tab: "tab-boq" }],
    evidence: { dossier: [7, 8, 9, 10, 17, 18, 19, 20], docs: ["dailyReport", "journal", "acceptance", "defect", "settlement"] },
    sources: [0, 1]
  },
  {
    id: "standards", priority: 6,
    triggers: ["tieu chuan", "tcvn", "quy chuan", "phap ly", "nghi dinh", "van ban"],
    title: "Tra cứu tiêu chuẩn và căn cứ pháp lý",
    body: "Trong app đang dùng các căn cứ tham chiếu theo từng nhóm: TCVN 4453:1995 cho thi công/nghiệm thu bê tông toàn khối; TCVN 5574:2018 cho thiết kế bê tông cốt thép; TCVN 5738:2024 và TCVN 3890:2023 cho các hạng mục PCCC theo hồ sơ; cùng Nghị định 06/2021/NĐ-CP và Nghị định 175/2024/NĐ-CP cho quản lý chất lượng/hoạt động xây dựng. Khi lập hồ sơ chính thức phải kiểm tra phiên bản, phạm vi áp dụng và yêu cầu của thiết kế được duyệt.",
    links: [{ label: "Mở Hồ sơ Công trình", tab: "tab-dossier" }, { label: "Mở QA/QC", tab: "tab-qaqc" }],
    sources: [0, 1, 2],
    caution: "Không dùng một tiêu chuẩn đơn lẻ để thay thế thiết kế được duyệt, chỉ dẫn kỹ thuật, hợp đồng hoặc yêu cầu của cơ quan chuyên ngành."
  },
  {
    id: "boq-drawing", priority: 5,
    triggers: ["boq", "khoi luong", "m1567", "so luong", "ban ve", "trang", "ma hang", "thep"],
    title: "Đối chiếu bản vẽ - BOQ - hiện trường",
    body: "Cách tra không lan man: xác định mã/vị trí → mở trang bản vẽ → lọc BOQ theo từ khóa/mã → đối chiếu đơn vị và khối lượng → ghi nhận chênh lệch → chuyển QA/QC hoặc hồ sơ phát sinh. Nếu chỉ có mã như M1567 mà chưa có dòng BOQ tương ứng trong dữ liệu đang nạp, hãy tìm theo mô tả/vị trí và bổ sung mã nguồn trước khi chốt số lượng.",
    links: [{ label: "Mở thư viện 76 trang", tab: "tab-gallery" }, { label: "Mở BOQ 328 dòng", tab: "tab-boq" }, { label: "Mở Hồ sơ Công trình", tab: "tab-dossier" }]
  }
];

function aiNormalize(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}

function aiEscape(value) {
  return String(value || "").replace(/[&<>\"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
}

function aiActionLinks(links = []) {
  if (!links.length) return "";
  return `<div class="ai-action-links">${links.map(link => {
    const drawingArg = link.drawingId ? `, '${link.drawingId}'` : "";
    return `<button class="ai-action-link" onclick="window.hshOpenDrawingRelation('${link.tab}'${drawingArg})"><i class="fas fa-arrow-right"></i> ${aiEscape(link.label)}</button>`;
  }).join("")}</div>`;
}

function aiSourceLinks(sourceIndexes = []) {
  if (!sourceIndexes.length) return "";
  return `<div class="ai-source-links"><i class="fas fa-link"></i> Nguồn tham chiếu: ${sourceIndexes.map(index => {
    const source = AI_SOURCES[index];
    return source ? `<a href="${source.url}" target="_blank" rel="noopener">${aiEscape(source.label)}</a>` : "";
  }).join("")}</div>`;
}

function aiEvidenceLinks(evidence = {}) {
  const links = [];
  (evidence.drawings || []).forEach(id => {
    const drawing = COMPLETE_DRAWINGS.find(item => item.id === id);
    if (drawing) links.push(`<button class="ai-action-link" onclick="window.hshOpenDrawingRelation('tab-gallery','${drawing.id}')"><i class="fas fa-drafting-compass"></i> Bản vẽ p.${drawing.pageNumber}</button>`);
  });
  (evidence.qaqc || []).forEach(code => links.push(`<button class="ai-action-link" onclick="window.hshOpenQaQcSource('${aiEscape(code)}')"><i class="fas fa-clipboard-check"></i> ${aiEscape(code)}</button>`));
  (evidence.boqRows || []).forEach(row => links.push(`<button class="ai-action-link" onclick="window.hshOpenBoqSource(${Number(row)})"><i class="fas fa-list-ol"></i> BOQ dòng ${Number(row)}</button>`));
  (evidence.dossier || []).forEach(id => links.push(`<button class="ai-action-link" onclick="window.hshOpenDossierSource(${Number(id)})"><i class="fas fa-folder-open"></i> Hồ sơ mục ${String(id).padStart(2, "0")}</button>`));
  const documentLabels = { dailyReport: "Báo cáo ngày", journal: "Nhật ký", acceptance: "Biên bản nghiệm thu", defect: "Defect List", buildingChecklist: "Checklist xây dựng", mepChecklist: "Checklist MEP", settlement: "Thanh quyết toán", contract: "Hợp đồng" };
  (evidence.docs || []).forEach(key => {
    const path = AI_PROJECT_DOCUMENTS[key];
    if (path) links.push(`<a class="ai-action-link" href="${path}" target="_blank" rel="noopener"><i class="fas fa-file-arrow-up"></i> ${documentLabels[key] || "Tài liệu nội bộ"}</a>`);
  });
  return links.length ? `<div class="ai-evidence"><div class="ai-evidence-title"><i class="fas fa-fingerprint"></i> Nguồn trong hồ sơ dự án</div><div class="ai-action-links">${links.join("")}</div></div>` : "";
}

function aiProjectLookup(message) {
  const normalized = aiNormalize(message);
  const evidence = { drawings: [], qaqc: [], boqRows: [], dossier: [], docs: [] };
  const facts = [];
  const addUnique = (list, value) => { if (value && !list.includes(value)) list.push(value); };
  const addFact = value => { if (value && !facts.includes(value)) facts.push(value); };
  let matched = false;

  const footingCodes = [...normalized.matchAll(/\b(?:mong\s*)?m([1-8])\b/g)].map(match => Number(match[1]));
  footingCodes.forEach(code => {
    const drawingId = code <= 3 ? 'foundation-2' : code <= 6 ? 'foundation-3' : 'foundation-4';
    const drawing = COMPLETE_DRAWINGS.find(item => item.id === drawingId);
    if (drawing) {
      addUnique(evidence.drawings, drawing.id);
      addFact(`Móng M${code}: ${drawing.title} — ${drawing.desc}`);
      matched = true;
    }
  });

  const pageMatch = normalized.match(/\b(?:trang|page|p)\s*(\d{1,3})\b/);
  if (pageMatch) {
    const page = Number(pageMatch[1]);
    const isFoundation = normalized.includes('mong') || normalized.includes('dai kieng') || normalized.includes('kc');
    const drawing = COMPLETE_DRAWINGS.find(item => item.pageNumber === page && (isFoundation ? item.id.startsWith('foundation-') : item.id.startsWith('design-')));
    if (drawing) {
      addUnique(evidence.drawings, drawing.id);
      addFact(`Bản vẽ trang ${page}: ${drawing.title} — ${drawing.desc}`);
      matched = true;
    }
  }

  const qaMatch = normalized.match(/\bqc[-\s]?(\d{1,2})\b/);
  if (qaMatch) {
    const code = `QC-${String(Number(qaMatch[1])).padStart(2, '0')}`;
    const item = INITIAL_QAQC.find(row => row.code === code);
    if (item) {
      addUnique(evidence.qaqc, item.code);
      addFact(`${item.code}: ${item.title} — căn cứ ${item.std}; trạng thái ${item.status === 'done' ? 'đã hoàn tất' : 'chưa hoàn tất'}.`);
      matched = true;
    }
  }

  const boqMatch = normalized.match(/\b(?:boq\s*)?(?:dong\s*|row\s*)?(\d{1,3})\b/);
  const hasBoqContext = normalized.includes('boq') || normalized.includes('khoi luong') || normalized.includes('don gia');
  if (hasBoqContext && boqMatch) {
    const rowNumber = Number(boqMatch[1]);
    const item = RAW_BOQ.find(row => Number(row.row) === rowNumber);
    if (item) {
      addUnique(evidence.boqRows, item.row);
      addFact(`BOQ dòng ${item.row}: ${item.content} — ${item.qty ? `${fmtDecimal(item.qty, 2)} ${item.dvt}` : 'dòng tiêu đề'}${item.brand ? ` · ${item.brand}` : ''}${item.note ? ` · ${item.note}` : ''}.`);
      matched = true;
    }
  }

  if (hasBoqContext && !boqMatch) {
    const tokens = normalized.split(/\s+/).filter(token => token.length > 2 && !['boq', 'dong', 'khoi', 'luong', 'don', 'gia', 'cho', 'toi', 'can', 'tra'].includes(token));
    const matches = tokens.length
      ? RAW_BOQ.filter(row => {
          const haystack = aiNormalize([row.content, row.code, row.brand, row.note, row.sec, row.subsec].join(' '));
          return tokens.some(token => haystack.includes(token));
        }).slice(0, 5)
      : [];
    matches.forEach(item => {
      addUnique(evidence.boqRows, item.row);
      addFact(`BOQ dòng ${item.row}: ${item.content} — ${item.qty ? `${fmtDecimal(item.qty, 2)} ${item.dvt}` : 'dòng tiêu đề'}.`);
    });
    addFact(`Kho BOQ dự án hiện có ${RAW_BOQ.length} dòng; nhập “BOQ dòng 19” hoặc tên công việc để tra chính xác.`);
    matched = true;
  }

  const dossierMatch = normalized.match(/\b(?:ho so|muc)\s*(?:muc\s*)?(\d{1,2})\b/);
  if (dossierMatch) {
    const item = DOSSIER_ITEMS.find(row => row.id === Number(dossierMatch[1]));
    if (item) {
      addUnique(evidence.dossier, item.id);
      addFact(`Hồ sơ mục ${String(item.id).padStart(2, '0')}: ${item.title} — đầu ra: ${item.output}.`);
      matched = true;
    }
  }

  const documentMatchers = [
    ['bao cao ngay', 'dailyReport'], ['nhat ky', 'journal'], ['bien ban nghiem thu', 'acceptance'],
    ['defect', 'defect'], ['checklist xay dung', 'buildingChecklist'], ['checklist mep', 'mepChecklist'],
    ['thanh quyet toan', 'settlement'], ['quyet toan', 'settlement'], ['hop dong', 'contract']
  ];
  documentMatchers.forEach(([keyword, key]) => {
    if (normalized.includes(keyword)) {
      addUnique(evidence.docs, key);
      matched = true;
    }
  });

  if (normalized.includes('du an') || normalized.includes('hoa sen') || normalized.includes('phu ly') || normalized.includes('ninh binh')) {
    addFact(`Dự án: ${PROJECT_CONFIG.projectName}; hợp đồng ${PROJECT_CONFIG.contractNo}; giá trị hợp đồng ${fmtNumber(PROJECT_CONFIG.contractValue)} VNĐ, không tính VAT.`);
    addFact(`Phạm vi chính: Nhà nhân viên D30, khung thép & canopy, khối cửa hàng Hoa Sen Home, MEP & PCCC.`);
    addFact(`Nguồn hiện có: ${COMPLETE_DRAWINGS.length} trang bản vẽ, ${RAW_BOQ.length} dòng BOQ, ${INITIAL_QAQC.length} mã QA/QC và ${DOSSIER_ITEMS.length} mục hồ sơ.`);
    const indexedCount = Array.isArray(window.PROJECT_DOCUMENT_INDEX) ? window.PROJECT_DOCUMENT_INDEX.length : 0;
    const indexedFiles = Array.isArray(window.PROJECT_DOCUMENT_MANIFEST) ? window.PROJECT_DOCUMENT_MANIFEST.length : 0;
    if (indexedCount) addFact(`Đã nạp offline ${indexedCount.toLocaleString('vi-VN')} mục nội dung từ ${indexedFiles} tài liệu gốc; kết quả sẽ kèm sheet/dòng hoặc trang PDF khi tìm thấy.`);
    addUnique(evidence.docs, 'contract');
    matched = true;
  }

  return matched ? { facts, evidence } : null;
}

const AI_DOCUMENT_STOPWORDS = new Set([
  'toi', 'can', 'cho', 'biet', 'tra', 'tim', 'xem', 'giup', 'hay', 'voi', 'cua', 'va', 'la', 'co', 'mot',
  'nhung', 'nao', 'tren', 'trong', 'du', 'an', 'theo', 'nhu', 'phai', 'lam', 'sao', 'noi', 'dung', 'nhe',
  'tai', 'lieu', 'ho', 'so', 'tiep', 'the', 'chi', 'dinh', 'thong', 'tin', 'cho', 'minh'
]);

function aiDocumentSearch(message) {
  const documents = Array.isArray(window.PROJECT_DOCUMENT_INDEX) ? window.PROJECT_DOCUMENT_INDEX : [];
  if (!documents.length) return null;
  const normalized = aiNormalize(message);
  const projectSignal = /(hoa sen|phu ly|ninh binh|mong|thep|boq|qaqc|qc|nghiem thu|nhat ky|bao cao|defect|checklist|hop dong|quyet toan|ban ve|trang|page|dai kieng|be phot|pccc|mep)/.test(normalized);
  if (!projectSignal) return null;
  const tokens = normalized.split(/[^a-z0-9]+/).filter(token => token.length >= 3 && !AI_DOCUMENT_STOPWORDS.has(token));
  if (!tokens.length) return null;

  const ranked = documents.map(document => {
    const sourceText = aiNormalize(document.source);
    const haystack = aiNormalize([document.source, document.locator, document.text].join(' '));
    let score = 0;
    tokens.forEach(token => {
      if (haystack.includes(token)) score += token.length >= 5 ? 2 : 1;
      if (sourceText.includes(token)) score += 5;
    });
    if (normalized.includes(aiNormalize(document.source))) score += 8;
    return { document, score };
  }).filter(item => item.score >= 2).sort((a, b) => b.score - a.score);

  const matches = ranked.slice(0, 4).map(item => item.document);
  if (!matches.length) return null;
  const facts = matches.map(document => {
    const snippet = cleanAiSnippet(document.text, 280);
    return `${document.source} · ${document.locator}: ${snippet}`;
  });
  return { facts, matches };
}

function cleanAiSnippet(value, limit = 280) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length <= limit ? text : `${text.slice(0, limit).replace(/\s+\S*$/, '')} ...`;
}

function aiDocumentIndexLinks(matches = []) {
  if (!matches.length) return '';
  const links = matches.map(document => `<a class="ai-action-link" href="${aiEscape(document.url)}" target="_blank" rel="noopener"><i class="fas fa-file-lines"></i> ${aiEscape(cleanAiSnippet(`${document.source} · ${document.locator}`, 90))}</a>`).join('');
  return `<div class="ai-evidence"><div class="ai-evidence-title"><i class="fas fa-book-open"></i> Nguồn nội dung đã nạp</div><div class="ai-action-links">${links}</div></div>`;
}

function aiProjectEvidenceHtml(message) {
  const lookup = aiProjectLookup(message);
  const documentSearch = aiDocumentSearch(message);
  if (!lookup && !documentSearch) return '';
  const facts = [...(lookup ? lookup.facts : []), ...(documentSearch ? documentSearch.facts : [])].slice(0, 8).map(fact => `<div>• ${aiEscape(fact)}</div>`).join('');
  return `<div class="ai-project-source"><div class="ai-answer-section"><strong>Tra cứu trực tiếp trong dữ liệu dự án:</strong>${facts}</div>${lookup ? aiEvidenceLinks(lookup.evidence) : ''}${documentSearch ? aiDocumentIndexLinks(documentSearch.matches) : ''}</div>`;
}

function buildAiReply(message) {
  const normalized = aiNormalize(message);
  const projectEvidence = aiProjectEvidenceHtml(message);
  let best = null;
  let bestScore = 0;
  AI_KNOWLEDGE_PACK.forEach(entry => {
    const score = entry.triggers.reduce((total, trigger) => total + (normalized.includes(aiNormalize(trigger)) ? (trigger.length > 3 ? 2 : 1) : 0), 0) + entry.priority / 100;
    if (score > bestScore) { best = entry; bestScore = score; }
  });

  if (!best) {
    if (projectEvidence) return `<div class="ai-answer-title"><i class="fas fa-database text-primary"></i> Tra cứu dữ liệu dự án</div>${projectEvidence}`;
    return `<div class="ai-answer-title">Chưa đủ ngữ cảnh để chốt việc</div><div>Hãy nhập một trong các dạng: <strong>mã bản vẽ/trang</strong>, <strong>mã BOQ</strong>, <strong>vị trí thi công</strong>, hoặc <strong>hạng mục cần nghiệm thu</strong>. Tôi sẽ trả về đúng 4 phần: việc cần làm, hồ sơ cần lập, điểm dừng kiểm tra và nơi mở tiếp theo.</div>${aiActionLinks([{ label: "Mở thư viện bản vẽ", tab: "tab-gallery" }, { label: "Mở BOQ", tab: "tab-boq" }, { label: "Mở checklist hồ sơ", tab: "tab-dossier" }])}`;
  }

  const caution = best.caution ? `<div class="ai-safety-note"><i class="fas fa-triangle-exclamation"></i> ${aiEscape(best.caution)}</div>` : "";
  return `<div class="ai-answer-title"><i class="fas fa-check-circle text-success"></i> ${aiEscape(best.title)}</div><div>${best.body}</div><div class="ai-answer-section"><strong>Chuỗi hồ sơ nên tạo:</strong> ghi nhận hiện trường → kiểm tra/biên bản → ảnh và kết quả thử → xác nhận khối lượng → cập nhật hồ sơ.</div>${caution}${aiActionLinks(best.links)}${aiEvidenceLinks(best.evidence)}${projectEvidence}${aiSourceLinks(best.sources)}`;
}

window.hshAskAiPreset = function(message) {
  const input = document.getElementById('aiUserInput');
  if (!input) return;
  input.value = message;
  window.hshSendAiMessage();
};

window.hshSendAiMessage = function() {
  const input = document.getElementById('aiUserInput');
  const chatBody = document.getElementById('aiChatBody');
  if (!input || !chatBody || !input.value.trim()) return;

  const msg = input.value.trim();
  input.value = '';

  chatBody.innerHTML += `
    <div class="ai-msg ai-msg-user">
      <div class="ai-text">${aiEscape(msg)}</div>
    </div>
  `;

  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    const reply = buildAiReply(msg);

    chatBody.innerHTML += `
      <div class="ai-msg ai-msg-bot">
        <div class="ai-avatar"><i class="fas fa-robot"></i></div>
        <div class="ai-text">${reply}</div>
      </div>
    `;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);
};

// Export Modal
window.hshOpenExportModal = function() {
  const modal = document.getElementById('exportModal');
  if (modal) modal.classList.add('active');
};

window.hshCloseExportModal = function() {
  const modal = document.getElementById('exportModal');
  if (modal) modal.classList.remove('active');
};

window.hshExportProgressPDF = function() {
  window.print();
};

function showToast(msg, type = 'info') {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.querySelector('.toast-msg').innerText = msg;
  toast.className = `toast-popup show toast-${type}`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================================================
// 15. GLOBAL EVENT LISTENERS & APP STARTUP
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[HoaSenHome V9.8] Initializing application (No-VAT standard: 3.854.146.466 VNĐ)...');

  setupLightboxInteractions();

  await initDatabase();

  document.querySelectorAll('.nav-item[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute('data-tab');
      if (targetTab) switchTab(targetTab);
    });
  });

  const hamburgerBtn = document.getElementById('btnSidebarToggle');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('leftSidebar');
      if (sidebar) sidebar.classList.toggle('sidebar-open');
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      window.hshOpenQuickSearch();
    }
    const lightboxActive = document.getElementById('enhancedCadLightboxModal')?.classList.contains('active');
    const typingInControl = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    if (lightboxActive && !typingInControl) {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        window.hshLightboxZoom(0.25);
      } else if (e.key === '-') {
        e.preventDefault();
        window.hshLightboxZoom(-0.25);
      } else if (e.key === '0') {
        e.preventDefault();
        window.hshLightboxResetZoom();
      } else if (currentLightboxZoom > 1 && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        const panStep = e.shiftKey ? 60 : 24;
        const panDelta = {
          ArrowLeft: { x: -panStep, y: 0 },
          ArrowRight: { x: panStep, y: 0 },
          ArrowUp: { x: 0, y: -panStep },
          ArrowDown: { x: 0, y: panStep }
        }[e.key];
        currentLightboxPan = { x: currentLightboxPan.x + panDelta.x, y: currentLightboxPan.y + panDelta.y };
        applyLightboxTransform();
      }
    }
    if (e.key === 'Escape') {
      window.hshCloseQuickSearch();
      window.hshLightboxClose();
      window.hshCloseDailyLogModal();
      window.hshCloseAiAssistant();
      window.hshCloseExportModal();
      window.hshCloseInspectionWorkspace();
    }
  });

  runAllCalculators();
  renderDossierChecklist();

  const savedTab = localStorage.getItem('hsh_active_tab') || 'tab-dashboard';
  switchTab(savedTab);

  window.addEventListener('offline', () => {
    const banner = document.getElementById('offlineNotice');
    if (banner) banner.style.display = 'flex';
    showToast("Đang hoạt động Chế độ Ngoại tuyến (Offline PWA)", "warning");
  });

  window.addEventListener('online', () => {
    const banner = document.getElementById('offlineNotice');
    if (banner) banner.style.display = 'none';
    showToast("Đã kết nối Internet thành công!", "success");
  });

  console.log('[HoaSenHome V9.8] Startup complete. Single source of truth active.');
});

window.hshCopyPreviousLog = async function() {
  const status = document.getElementById('copyPreviousStatus');
  const chosen = document.getElementById('logInputDate').value;
  if (!chosen) { status.textContent = 'Chọn ngày lập trước khi sao chép.'; return; }
  const previous = new Date(chosen + 'T12:00:00'); previous.setDate(previous.getDate() - 1);
  const date = previous.getFullYear() + '-' + String(previous.getMonth()+1).padStart(2,'0') + '-' + String(previous.getDate()).padStart(2,'0');
  const fields = {location:'logInputLocation',quantity:'logInputQuantity',workContent:'logInputWorkDone',workers:'logInputWorkers',equipment:'logInputEquipment',issues:'logInputIssues'};
  try {
    const logs = await db.dailyLogs.toArray();
    const entry = logs.filter(log => log.date === date).sort((a,b)=>b.id-a.id)[0];
    if (!entry) { status.textContent = 'Chưa có nhật ký ngày ' + date.split('-').reverse().join('/') + ' để sao chép.'; return; }
    if (Object.values(fields).some(id=>document.getElementById(id).value.trim()) && !confirm('Thay nội dung đang nhập bằng nhật ký hôm trước?')) return;
    for (const [key,id] of Object.entries(fields)) document.getElementById(id).value = entry[key] ?? '';
    status.textContent = 'Đã sao chép bản ghi mới nhất ngày ' + date.split('-').reverse().join('/') + '. Kiểm tra lại khối lượng, nhân lực, thời tiết và nội dung trước khi lưu.';
  } catch (error) { status.textContent = 'Chưa đọc được nhật ký hôm trước. Vui lòng thử lại.'; }
};

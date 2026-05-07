const TOTAL_ROWS = 77;

const departments = [
  "Sở KHCN TUYÊN QUANG",
  "Sở KHCN NINH BÌNH",
  "Sở KHCN ĐĂKLĂK",
  "Sở KHCN THÁI NGUYÊN",
  "Sở KHCN QUẢNG NINH",
  "Sở KHCN ĐÀ NẴNG",
  "Sở KHCN HÀ NAM",
  "Sở KHCN BÌNH DƯƠNG",
];

const topics = [
  "Công tác tổng hợp",
  "Ứng dụng khoa học",
  "Đổi mới sáng tạo",
  "Chuyển đổi số",
];

const requestTypes = [
  "Kiến nghị hướng dẫn triển khai, vận dụng chính sách",
  "Kiến nghị các nội dung bất cập, mâu thuẫn trong chính sách",
  "Kiến nghị khác",
  "Kiến nghị bổ sung cơ chế phối hợp",
];

const offices = ["Văn phòng Bộ", "Vụ KHCN", "Cục Đổi mới sáng tạo", "Thanh tra Bộ"];

const contentTemplates = [
  "Đề nghị hướng dẫn chi tiết về quy trình phân bổ kinh phí cho nhiệm vụ khoa học và công nghệ cấp tỉnh.",
  "Kiến nghị tháo gỡ vướng mắc trong việc áp dụng chính sách ưu đãi cho doanh nghiệp đổi mới sáng tạo.",
  "Đề xuất làm rõ trách nhiệm phối hợp giữa các đơn vị trong triển khai đề án chuyển đổi số.",
  "Kiến nghị cập nhật biểu mẫu và chuẩn hóa dữ liệu báo cáo định kỳ của địa phương.",
];

const statusClasses = ["status-purple", "status-blue", "status-orange", "status-red"];

function buildRows(total) {
  const rows = [];
  for (let i = 5; i <= total; i += 1) {
    rows.push({
      stt: i,
      doiTuong: departments[(i - 1) % departments.length],
      noiDung: `${i}. ${contentTemplates[(i - 1) % contentTemplates.length]}`,
      linhVuc: topics[(i - 1) % topics.length],
      loaiKienNghi: requestTypes[(i - 1) % requestTypes.length],
      donViTraLoi: offices[(i - 1) % offices.length],
      statusClass: statusClasses[(i - 1) % statusClasses.length],
    });
  }
  return rows;
}

function renderTable(rows) {
  const tableBody = document.getElementById("table-body");
  const existingRows = tableBody.querySelectorAll("tr");
  existingRows.forEach((r) => r.remove());

  const fragment = document.createDocumentFragment();
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.statusClass) tr.className = row.statusClass;
    tr.innerHTML = `
      <td>${row.stt}</td>
      <td>${row.doiTuong}</td>
      <td>${row.noiDung}</td>
      <td>${row.linhVuc}</td>
      <td>${row.loaiKienNghi}</td>
      <td>${row.donViTraLoi}</td>`;
    fragment.appendChild(tr);
  });
  tableBody.appendChild(fragment);
}

function escapeCsvCell(value) {
  const cell = String(value).replace(/"/g, '""');
  return `"${cell}"`;
}

function exportCsv(rows) {
  const header = [
    "STT",
    "DOI_TUONG_KIEN_NGHI",
    "NOI_DUNG_KIEN_NGHI",
    "LINH_VUC",
    "LOAI_KIEN_NGHI",
    "DON_VI_TRA_LOI",
  ];

  const lines = [header.map(escapeCsvCell).join(",")];
  rows.forEach((row) => {
    const line = [
      row.stt,
      row.doiTuong,
      row.noiDung,
      row.linhVuc,
      row.loaiKienNghi,
      row.donViTraLoi,
    ]
      .map(escapeCsvCell)
      .join(",");
    lines.push(line);
  });

  const csvContent = "\uFEFF" + lines.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "danh-sach-kien-nghi-5000.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const allRows = buildRows(TOTAL_ROWS);
renderTable(allRows);

const exportButton = document.getElementById("export-btn");
if (exportButton) {
  exportButton.addEventListener("click", () => exportCsv(allRows));
}

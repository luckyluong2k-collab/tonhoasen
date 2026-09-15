/**
 * Google Apps Script Web App for bao-cao-ngay.html.
 *
 * Deploy as: Web app → Execute as Me → Anyone with the link.
 * The frontend sends text/plain JSON so the browser does not need a CORS preflight.
 */
function doGet() {
  return json_({ ok: true, service: 'hsh-daily-report', message: 'Daily report endpoint is ready.' });
}

function doPost(e) {
  try {
    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(body);
    var sheet = getSheet_();
    var headers = [
      'Thời gian lưu', 'Ngày báo cáo', 'Ban Chỉ huy', 'Lái máy đào', 'Công nhân',
      'Tổng nhân sự', 'Thời tiết sáng', 'Thời tiết chiều', 'Công việc',
      'ATLĐ & QLCL', 'Vướng mắc', 'Nội dung copy', 'Nguồn'
    ];
    ensureHeaders_(sheet, headers);

    var reportDate = String(data.reportDate || '').trim();
    var row = findDateRow_(sheet, reportDate);
    var values = [[
      new Date(),
      reportDate,
      data.commanders || 0,
      data.excavator || 0,
      data.workers || 0,
      data.totalWorkers || 0,
      data.morningWeather || '',
      data.afternoonWeather || '',
      data.workDone || '',
      data.safety || '',
      data.issues || '',
      data.reportText || '',
      data.source || 'bao-cao-ngay.html'
    ]];

    if (row) {
      sheet.getRange(row, 1, 1, values[0].length).setValues(values);
    } else {
      sheet.getRange(sheet.getLastRow() + 1, 1, 1, values[0].length).setValues(values);
    }
    return json_({ ok: true, action: row ? 'updated' : 'created', reportDate: reportDate });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Báo cáo ngày');
  return sheet || spreadsheet.insertSheet('Báo cáo ngày');
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    return;
  }
  var current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (current.join('|') !== headers.join('|')) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

function findDateRow_(sheet, reportDate) {
  if (!reportDate || sheet.getLastRow() < 2) return null;
  var dates = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getDisplayValues();
  for (var i = dates.length - 1; i >= 0; i--) {
    if (String(dates[i][0]).trim() === reportDate) return i + 2;
  }
  return null;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

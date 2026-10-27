// Google Apps Script bound to a Google Sheet. Deploy as Web app (Execute as: Me, Access: Anyone).
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(["Timestamp", "Name", "Email", "Quiz", "Reason"]);
  sheet.appendRow([new Date(), d.name, d.email, d.quiz, d.reason]);
  MailApp.sendEmail(d.email, "PM Quiz Retake – Confirmation",
    `Dear ${d.name},\n\nYou are registered to retake ${d.quiz}.\n\n` +
    `Date: Friday, 04.12.2026\nTime: 15:45 – 18:15\nSession: Lab 11\nRoom: MSA 3.350\n\n` +
    `Please note this is a one-time exception.\n\nBest regards`);
  return ContentService.createTextOutput("ok");
}

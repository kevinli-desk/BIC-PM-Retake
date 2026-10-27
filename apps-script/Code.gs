// Google Apps Script bound to the Google Sheet. Deploy as Web app (Execute as: Me, Access: Anyone).
// Columns: A Timestamp | B Name | C Email | D Quiz | E Reason | F Status | G Notified
// Workflow: set Status to "Approved" or "Declined", then menu Retake → Send decision emails.

const SESSION = "Date: Friday, 04.12.2026\nTime: 15:45 – 18:15\nSession: Lab 11\nRoom: MSA 3.350";
const HEADER = ["Timestamp", "Name", "Email", "Quiz", "Reason", "Status", "Notified"];

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sh.getRange(1, 1, 1, HEADER.length).setValues([HEADER]);
  return sh;
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  sheet_().appendRow([new Date(), d.name, d.email, d.quiz, d.reason, "Pending", ""]);
  MailApp.sendEmail(d.email, "PM Quiz Retake – Request received",
    `Dear ${d.name},\n\nWe have received your retake request for ${d.quiz}. ` +
    `It will be reviewed, and you will be informed by email of the decision.\n\n` +
    `Please note that submitting a request does not guarantee approval.\n\nBest regards`);
  return ContentService.createTextOutput("ok");
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Retake")
    .addItem("Send decision emails", "sendDecisions").addToUi();
}

function sendDecisions() {
  const sh = sheet_(), rows = sh.getDataRange().getValues();
  let sent = 0;
  for (let i = 1; i < rows.length; i++) {
    const [, name, email, quiz, , status, notified] = rows[i];
    if (notified || !email) continue;
    if (status === "Approved") {
      MailApp.sendEmail(email, "PM Quiz Retake – Approved",
        `Dear ${name},\n\nYour retake request for ${quiz} has been approved as a one-time exception.\n\n` +
        `${SESSION}\n\nPlease bring your student card and your supporting document.\n\nBest regards`);
    } else if (status === "Declined") {
      MailApp.sendEmail(email, "PM Quiz Retake – Request declined",
        `Dear ${name},\n\nAfter review, your retake request for ${quiz} could not be approved.\n\nBest regards`);
    } else continue;
    sh.getRange(i + 1, 7).setValue(new Date());
    sent++;
  }
  SpreadsheetApp.getUi().alert(`${sent} email(s) sent.`);
}

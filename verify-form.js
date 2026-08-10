// Checks whether the FormSubmit enquiry endpoint is live, and sends a real test enquiry.
// Run:  node verify-form.js
//
// Uses the raw https module on purpose: Node's fetch() strips Referer/Origin
// (they are forbidden header names), and FormSubmit rejects requests without a referer,
// which produces a false "needs Activation" result.
const https = require("https");

const TO = "joe@marleyandco.com.au";
const SITE = "https://marleyandco.com.au/";

const payload = JSON.stringify({
  _subject: "Marley & Co website - enquiry form test",
  name: "Form verification",
  email: TO,
  message: "Automated test of the website enquiry form. If this lands in the inbox, the form is working."
});

const req = https.request(
  {
    hostname: "formsubmit.co",
    path: "/ajax/" + encodeURIComponent(TO),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
      Referer: SITE,
      Origin: SITE.replace(/\/$/, "")
    }
  },
  (res) => {
    let body = "";
    res.on("data", (d) => (body += d));
    res.on("end", () => {
      let j = null;
      try { j = JSON.parse(body); } catch {}
      if (j && String(j.success) === "true") {
        console.log("\n  WORKING - the enquiry form is live.");
        console.log("  A test enquiry has just been sent to " + TO + ". Check the inbox to confirm delivery.\n");
      } else {
        console.log("\n  NOT WORKING - " + (j ? j.message : body.slice(0, 200)));
        console.log("  If it mentions Activation, open " + TO + " and click the 'Activate Form' link.\n");
      }
    });
  }
);

req.on("error", (e) => console.log("\n  Could not reach FormSubmit: " + e.message + "\n"));
req.write(payload);
req.end();

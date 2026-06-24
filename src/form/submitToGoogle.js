const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyrVPBiTcLDf-7t5ykMeXtRLT8ueWuKPkj4puZ2JJ6tqzmdzS0rn_yLnwqWe815mJUEzg/exec";

export async function submitToGoogle(data) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {

      "Content-Type": "text/plain",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  let result;
  const text = await response.text();

  try {
    result = JSON.parse(text);
  } catch {
    throw new Error("Server returned invalid JSON: " + text.slice(0, 200));
  }

  if (!result.success) {
    throw new Error(result.error || "Submission failed — no error details from server.");
  }

  return result;
}
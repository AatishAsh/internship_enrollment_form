const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz7o5BAk80rhI_CGsPvHL1jVNQMwrsxmhKcBYQ7c5yPca_zUDLhA-s7dan8ID75ijQADw/exec";
//  ↑ Same URL as submitToGoogle.js — keep both in sync.

/**
 * @param {FileList | File[]} files      Files chosen by the user
 * @param {string}            userName   Used to name the Drive sub-folder
 * @param {string|null}       folderId   Reuse an existing folder (optional)
 * @returns {{ links: Array<{name,url,id}>, folderId: string } | []}
 */
export async function uploadFilesToDrive(files, userName, folderId = null) {
  const fileArray = Array.from(files);

  if (fileArray.length === 0) {
    return { links: [], folderId: null };
  }

  // ── 1. Convert every file to Base64 ──────────────────────────
  const base64Files = await Promise.all(
    fileArray.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload  = () =>
            resolve({
              name    : file.name,
              mimeType: file.type || "application/octet-stream",
              data    : reader.result.split(",")[1], // strip the data-URL prefix
            });
          reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
          reader.readAsDataURL(file);
        })
    )
  );

  // ── 2. POST to Apps Script ────────────────────────────────────
  const response = await fetch(APPS_SCRIPT_URL, {
    method : "POST",
    headers: { "Content-Type": "text/plain" },
    body   : JSON.stringify({
      action  : "uploadFiles",   // tells Apps Script which handler to use
      userName: userName || "Unknown",
      files   : base64Files,
      folderId: folderId,         // null → script creates a new sub-folder
    }),
  });

  const text = await response.text();

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error("Apps Script returned invalid JSON during file upload.");
  }

  if (!result.success) {
    throw new Error(result.error || "File upload failed.");
  }

  // ── 3. Return links + folderId ────────────────────────────────
  return {
    links   : result.links    || [],    // [{ name, url, id }, …]
    folderId: result.folderId || null,  // Drive folder ID for this intern
    folderUrl: result.folderUrl || null,
  };
}
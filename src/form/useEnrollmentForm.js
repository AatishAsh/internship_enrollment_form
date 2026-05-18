// ── useEnrollmentForm.js ───────────────────────────────────────
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import schema from "./validationSchema";
import { submitToGoogle } from "./submitToGoogle";
import { uploadFilesToDrive } from "./uploadToGoogleDrive";
import { toast } from "../components/ui/use-toast";

const useEnrollmentForm = (setStep) => {
  const [showErrors,   setShowErrors  ] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver       : yupResolver(schema),
    mode           : "onSubmit",
    reValidateMode : "onSubmit",
  });

  // ── Main submit handler ──────────────────────────────────────
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const fullName = (data.fullName || "Unknown Intern").trim();

      // ── Step A: Upload resume / portfolio file(s) to Drive ───
      // Step 4 stores the file list under the key "resume".
      const filesToUpload = data.resume;

      if (filesToUpload && Array.isArray(filesToUpload) && filesToUpload.length > 0) {
        const uploadResult = await uploadFilesToDrive(
          filesToUpload,
          fullName,
          null  // null → Apps Script creates a new named sub-folder
        );

        // Store human-readable links in the payload
        data.documentLinks = uploadResult.links || [];

        // Store the folder ID so the sheet row can link back to the Drive folder
        data.driveFolderId = uploadResult.folderId || null;
      } else {
        data.documentLinks = [];
        data.driveFolderId = null;
      }

      // ── Step B: Strip raw File objects — they can't be JSON-serialised ──
      // "resume" holds actual File objects; we've already uploaded them above.
      delete data.resume;

      // ── Step C: Submit cleaned text data + Drive links to Sheets ──
      await submitToGoogle(data);

      // ── Step D: Success feedback ─────────────────────────────
      toast({
        title      : "Application submitted!",
        description: "We'll be in touch soon. Check your email for confirmation.",
        variant    : "success",
        duration   : 4000,
      });

      // Navigate to the SuccessCompletion screen (step 9)
      setStep(9);

    } catch (err) {
      console.error("Submission error:", err);

      toast({
        title      : "Submission failed",
        description: err.message || "Something went wrong. Please try again.",
        variant    : "destructive",
        duration   : 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...methods,
    onSubmit,
    showErrors,
    setShowErrors,
    isSubmitting,
  };
};

export default useEnrollmentForm;
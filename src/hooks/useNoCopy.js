// src/hooks/useNoCopy.js
import { useEffect } from "react";

export function useNoCopy(step) {
  useEffect(() => {
    if (step < 4 || step > 6) return;

    const block = (e) => e.preventDefault();

    // Only block keyboard copy/cut/paste/select-all — NOT Ctrl+A inside inputs
    const blockKeys = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) return;

      if (["c", "x", "v"].includes(e.key)) e.preventDefault();

      // Block Ctrl+A only outside input/textarea so typing still works
      if (e.key === "a") {
        const tag = document.activeElement?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") e.preventDefault();
      }
    };

    document.addEventListener("copy",        block);
    document.addEventListener("cut",         block);
    document.addEventListener("paste",       block);
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown",     blockKeys);

    return () => {
      document.removeEventListener("copy",        block);
      document.removeEventListener("cut",         block);
      document.removeEventListener("paste",       block);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("keydown",     blockKeys);
    };
  }, [step]);
}
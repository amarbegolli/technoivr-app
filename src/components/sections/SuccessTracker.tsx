"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function SuccessTracker() {
  useEffect(() => {
    sendGAEvent("event", "contact_form_submit");
  }, []);

  return null;
}
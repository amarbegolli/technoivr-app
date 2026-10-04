"use client";

import { useEffect } from "react";

export default function GalleryError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Gallery route error:", error);
  }, [error]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50 px-6 py-8 text-center text-amber-950">
        <h1 className="text-xl font-semibold">Galeria nuk mund të ngarkohet tani.</h1>
        <p className="mt-2 text-sm">
          Ju lutemi provoni përsëri. Nëse problemi vazhdon, kontaktoni me ne.
        </p>
        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Provo përsëri
        </button>
      </div>
    </section>
  );
}

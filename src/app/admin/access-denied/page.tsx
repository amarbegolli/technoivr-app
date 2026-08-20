import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminAccessDeniedPage() {
  return (
    <section className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-7 sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
          !
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Qasje e kufizuar</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">Nuk ke qasje në panelin admin</h1>
        <p className="mt-4 text-gray-600">
          Kjo llogari nuk ka autorizim për të menaxhuar përmbajtjen e faqes.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-lg border border-primary px-5 py-2.5 font-medium text-primary hover:bg-primary/5 sm:w-auto"
          >
            Kthehu te ballina
          </Link>
          <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm">
            Ndrysho llogarinë
            <UserButton />
          </div>
        </div>
      </div>
    </section>
  );
}

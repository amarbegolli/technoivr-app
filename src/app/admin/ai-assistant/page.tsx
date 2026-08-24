import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AIAssistantClient from "./AIAssistantClient";

export default async function AIAssistantPage() {
  if (!(await isAdmin())) {
    redirect("/admin/access-denied");
  }

  return <AIAssistantClient />;
}

import "server-only";

import { auth } from "@clerk/nextjs/server";

function getAdminUserIds() {
  return (process.env.ADMIN_USER_IDS ?? "")
    .split(",")
    .map((userId) => userId.trim())
    .filter(Boolean);
}

export async function requireAdmin() {
  const { userId } = await auth();
  const adminUserIds = getAdminUserIds();

  if (!userId || !adminUserIds.includes(userId)) {
    throw new Error("Unauthorized");
  }

  return userId;
}

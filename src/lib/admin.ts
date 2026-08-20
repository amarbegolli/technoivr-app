import "server-only";

import { auth } from "@clerk/nextjs/server";

function getAdminUserIds() {
  return (process.env.ADMIN_USER_IDS ?? "")
    .split(",")
    .map((userId) => userId.trim())
    .filter(Boolean);
}

export async function isAdmin() {
  const { userId } = await auth();
  const adminUserIds = getAdminUserIds();

  return Boolean(userId && adminUserIds.includes(userId));
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
}

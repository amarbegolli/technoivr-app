export function getPageNumber(value: string | undefined) {
  const page = Number(value);

  if (!Number.isSafeInteger(page) || page < 1) {
    return 1;
  }

  return Math.min(page, 10_000);
}

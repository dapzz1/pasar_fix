export const getYearOptions = (
  items: Array<{ year?: string | null }>
): string[] => {
  const years = items.flatMap((item) => {
    const year = item.year?.trim();
    return year ? [year] : [];
  });

  return [...new Set(years)].sort((first, second) =>
    second.localeCompare(first, undefined, { numeric: true })
  );
};

export const displayYear = (year?: string | null): string =>
  year?.trim() || '—';

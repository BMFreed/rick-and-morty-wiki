export const validateEntriesPageData = (data: unknown): boolean =>
  typeof data === 'object' &&
  data !== null &&
  'info' in data &&
  typeof (data as Record<string, object>).info === 'object' &&
  'results' in data &&
  typeof (data as Record<string, object>).results === 'object';

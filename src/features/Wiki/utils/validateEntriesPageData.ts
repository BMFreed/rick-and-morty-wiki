import { IEntriesPageData } from '@Wiki/types/entriesPageData';

export const validateEntriesPageData = (data: unknown): boolean => {
  const responseWithEntries = data as IEntriesPageData;

  return (
    typeof responseWithEntries === 'object' &&
    data !== null &&
    'info' in responseWithEntries &&
    typeof responseWithEntries.info === 'object' &&
    'results' in responseWithEntries &&
    typeof responseWithEntries.results === 'object'
  );
};

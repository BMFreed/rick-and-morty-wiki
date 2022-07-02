import { useEffect, useState } from 'react';
import { useFetchData } from '@common/hooks/useFetchData';
import { IEntriesPageData } from '@Wiki/types/entriesPageData';
import { validateEntriesPageData } from '@Wiki/utils/validateEntriesPageData';

export const useApi = (): {
  entriesPageData?: IEntriesPageData;
  isLoading: boolean;
  fetchError?: string;
  onPageChange(pageNumber: number): void;
  onApplyFilters(filters: Record<string, string>): void;
  loadCategoryEntries(url: string): void;
} => {
  const [queryUrl, setQueryUrl] = useState<string>();
  const {
    data: entriesPageData,
    loadData: loadEntriesPageData,
    isLoading,
    fetchError,
  } = useFetchData<IEntriesPageData>(validateEntriesPageData);

  useEffect(() => {
    if (queryUrl) {
      void loadEntriesPageData(queryUrl);
    }
  }, [queryUrl]);

  const onPageChange = (pageNumber: number): void => {
    if (!queryUrl) {
      return;
    }

    const url = new URL(queryUrl);

    url.searchParams.delete('page');
    url.searchParams.append('page', String(pageNumber));

    setQueryUrl(url.toString());
  };

  const onApplyFilters = (filters: Record<string, string>): void => {
    if (!queryUrl) {
      return;
    }

    const url = new URL(queryUrl);

    Object.entries(filters).forEach(([filterName, filterCondition]) => {
      url.searchParams.delete(filterName);
      if (filterCondition) {
        url.searchParams.append(filterName, filterCondition);
      }
    });

    setQueryUrl(url.toString());
  };

  const loadCategoryEntries = (url: string): void => setQueryUrl(url);

  return {
    entriesPageData,
    isLoading,
    fetchError,
    onPageChange,
    onApplyFilters,
    loadCategoryEntries,
  };
};

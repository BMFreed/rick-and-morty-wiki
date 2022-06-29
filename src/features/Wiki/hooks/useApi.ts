import { useEffect, useState } from 'react';
import { head } from 'lodash';
import useFetchData from '../../../common/hooks/useFetchData';
import { IEntriesPageData } from '../types/entriesPageData';
import validateEntriesPageData from '../utils/validateEntriesPageData';

const useApi = (): {
  entriesPageData?: IEntriesPageData;
  isLoading: boolean;
  fetchError?: string;
  onPageChange(url: string, pageNumber: number): void;
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

  const onPageChange = (url: string, pageNumber: number): void =>
    setQueryUrl(`${url}/?page=${pageNumber}`);
  // TODO здесь баг, фильтры сбрасываются

  const onApplyFilters = (filters: Record<string, string>): void => {
    if (!queryUrl) {
      return;
    }

    let filterQuery = '';

    Object.entries(filters).forEach(([filterName, filterCondition]) => {
      if (filterCondition) {
        filterQuery += `&${filterName}=${filterCondition}`;
      }
    });

    setQueryUrl(head(queryUrl.split('&')) + filterQuery);
    // TODO использовать URL API
  };

  const loadCategoryEntries = (url: string): void =>
    setQueryUrl(`${url}/?page=1`);

  return {
    entriesPageData,
    isLoading,
    fetchError,
    onPageChange,
    onApplyFilters,
    loadCategoryEntries,
  };
};

export default useApi;

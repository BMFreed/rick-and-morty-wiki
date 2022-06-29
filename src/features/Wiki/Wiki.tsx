import { FC, useEffect, useState } from 'react';

import { head } from 'lodash';
import { MainPage } from './components/MainPage';
import useFetchData from '../../common/hooks/useFetchData';
import validateEntriesPageData from './utils/validateEntriesPageData';
import { EntriesPage } from './components/EntriesPage/EntriesPage';
import { IEntriesPageData } from './types/entriesPageData';
import { categories, ICategory } from './utils/categories';

export const Wiki: FC = () => {
  const [category, setCategory] = useState<ICategory>();
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
  };

  return category ? (
    <EntriesPage
      category={category}
      data={entriesPageData}
      isLoading={isLoading}
      fetchError={fetchError}
      onPageChange={(url, pageNumber) =>
        setQueryUrl(`${url}/?page=${pageNumber}`)
      }
      closePage={() => setCategory(undefined)}
      onApplyFilters={onApplyFilters}
    />
  ) : (
    <MainPage
      categories={categories}
      onCategoryClick={(clickedCategory) => {
        setCategory(clickedCategory);
        setQueryUrl(`${clickedCategory.url}/?page=1`);
      }}
    />
  );
};

import { FC, useState } from 'react';

import { MainPage } from './components/MainPage';
import useFetchData from '../../common/hooks/useFetchData';
import validateEntriesPageData from './utils/validateEntriesPageData';
import { EntriesPage } from './components/EntriesPage/EntriesPage';
import { IEntriesPageData } from './types/entriesPageData';
import { categories, ICategory } from './utils/categories';

export const Wiki: FC = () => {
  const [category, setCategory] = useState<ICategory>();
  const {
    data: entriesPageData,
    loadData: loadEntriesPageData,
    isLoading,
    fetchError,
  } = useFetchData<IEntriesPageData>(validateEntriesPageData);

  return category && entriesPageData ? (
    <EntriesPage
      category={category}
      data={entriesPageData}
      isLoading={isLoading}
      fetchError={fetchError}
      onPageChange={(url, pageNumber) =>
        loadEntriesPageData(`${url}/?page=${pageNumber}`)
      }
      closePage={() => setCategory(undefined)}
    />
  ) : (
    <MainPage
      categories={categories}
      onCategoryClick={(clickedCategory) => {
        setCategory(clickedCategory);
        void loadEntriesPageData(clickedCategory.url);
      }}
    />
  );
};

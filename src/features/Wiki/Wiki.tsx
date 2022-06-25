import { FC, useState } from 'react';

import { MainPage } from './components/MainPage';
import useFetchData from '../../common/hooks/useFetchData';
import validateEntriesPageData from './utils/validateEntriesPageData';
import { EntriesPage } from './components/EntriesPage';
import { IEntriesPageData } from './types/entriesPageData';
import { CategoryName } from './utils/categories';

export const Wiki: FC = () => {
  const [category, setCategory] = useState<CategoryName>();
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
      closePage={() => setCategory(undefined)}
    />
  ) : (
    <MainPage
      onCategoryClick={(categoryName, url) => {
        setCategory(categoryName);
        void loadEntriesPageData(url);
      }}
    />
  );
};

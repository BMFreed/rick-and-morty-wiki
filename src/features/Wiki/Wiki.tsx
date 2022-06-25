import { FC, useState } from 'react';

import { MainPage } from './components/MainPage';
import useFetchData from '../../common/hooks/useFetchData';
import validateEntriesPageData from './utils/validateEntriesPageData';

export const Wiki: FC = () => {
  const [category, setCategory] = useState<string>();
  const {
    pageData: entriesPageData,
    loadPageData: loadEntriesPageData,
    isLoading,
    fetchError,
  } = useFetchData(validateEntriesPageData);

  return category ? (
    <div></div>
  ) : (
    <MainPage
      onCategoryClick={(categoryName, url) => {
        setCategory(categoryName);
        void loadEntriesPageData(url);
      }}
    />
  );
};

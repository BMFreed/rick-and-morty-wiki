import { FC, useState } from 'react';

import { MainPage } from './components/MainPage';
import { EntriesPage } from './components/EntriesPage/EntriesPage';
import { categories, ICategory } from './utils/categories';
import useApi from './hooks/useApi';

export const Wiki: FC = () => {
  const [category, setCategory] = useState<ICategory>();

  const {
    entriesPageData,
    isLoading,
    fetchError,
    onPageChange,
    onApplyFilters,
    loadCategoryEntries,
  } = useApi();

  return category ? (
    <EntriesPage
      category={category}
      data={entriesPageData}
      isLoading={isLoading}
      fetchError={fetchError}
      onPageChange={onPageChange}
      closePage={() => setCategory(undefined)}
      onApplyFilters={onApplyFilters}
    />
  ) : (
    <MainPage
      categories={categories}
      onCategoryClick={(clickedCategory) => {
        setCategory(clickedCategory);
        loadCategoryEntries(clickedCategory.url);
      }}
    />
  );
};

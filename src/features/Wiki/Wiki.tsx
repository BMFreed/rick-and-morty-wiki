import { FC, useState } from 'react';
import { MainPage } from '@Wiki/components/MainPage';
import { EntriesPage } from '@Wiki/components/EntriesPage/EntriesPage';
import { categories, ICategory } from '@Wiki/utils/categories';
import { useApi } from '@Wiki/hooks/useApi';
import styled, { css } from 'styled-components';

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

  return (
    <SWrapper>
      {category ? (
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
      )}
    </SWrapper>
  );
};

const SWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.text};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  `};
  min-height: 100vh;
`;

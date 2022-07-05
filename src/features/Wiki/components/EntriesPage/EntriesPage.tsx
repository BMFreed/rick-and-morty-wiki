import { DispatchWithoutAction, FC, useState } from 'react';
import styled from 'styled-components';
import { IEntriesPageData, TEntry } from '@Wiki/types/entriesPageData';
import { ICategory } from '@Wiki/utils/categories';
import { DetailedEntryPopup } from '@Wiki/components/DetailedEntryPopup';
import { FiltersPanel } from '@Wiki/components/EntriesPage/components/FiltersPanel';
import { PageButtons } from '@Wiki/components/EntriesPage/components/PageButtons';
import { SPageWrapper, SHeading, SButton } from '@Wiki/ui';
import BackIcon from '@common/icons/back.svg';
import fallbackImage from '@Wiki/images/fallback.jpg';

interface IProps {
  category: ICategory;
  data?: IEntriesPageData;
  isLoading: boolean;
  fetchError?: string;
  onPageChange(pageNumber: number): void;
  closePage: DispatchWithoutAction;
  onApplyFilters(filters: Record<string, string>): void;
}

export const EntriesPage: FC<IProps> = ({
  category,
  data,
  isLoading,
  fetchError,
  onPageChange,
  closePage,
  onApplyFilters,
}) => {
  if (!data) {
    return <SLoadingOverlay>{fetchError || 'Loading...'}</SLoadingOverlay>;
  }

  const [popupData, setPopupData] = useState<TEntry>();

  const { results: entries, info: pageInfo } = data;

  return (
    <SPageWrapper>
      <header>
        <SBackButton onClick={closePage}>
          <SBackIcon />
          <div>Go back</div>
        </SBackButton>
        <SHeading>{category.name}</SHeading>
      </header>
      <SPageContent>
        <SMainContent>
          <FiltersPanel
            filters={category.filters}
            onApplyFilters={onApplyFilters}
          />
          <SEntriesWrapper>
            {isLoading && <SLoadingOverlay>{'Loading...'}</SLoadingOverlay>}
            {fetchError ? (
              <SErrorMessage>{fetchError}</SErrorMessage>
            ) : (
              entries.map((entry) => (
                <li key={entry.id}>
                  <SEntry onClick={() => setPopupData(entry)}>
                    <img
                      src={('image' in entry && entry.image) || fallbackImage}
                    />
                    <SEntryCaption>{entry.name}</SEntryCaption>
                  </SEntry>
                </li>
              ))
            )}
          </SEntriesWrapper>
        </SMainContent>
        <PageButtons
          numberOfPages={fetchError ? 0 : pageInfo.pages}
          pagesPerView={5}
          onPageChange={onPageChange}
        />
      </SPageContent>
      {popupData && (
        <DetailedEntryPopup
          categoryName={category.name}
          data={popupData}
          onClose={() => setPopupData(undefined)}
        />
      )}
    </SPageWrapper>
  );
};

const SPageContent = styled.main`
  width: 100%;
`;

const SBackButton = styled(SButton)`
  gap: 8px;
  position: absolute;
  top: 16px;
  left: 24px;
`;

const SMainContent = styled.div`
  display: flex;
  padding: 0 60px;
`;

const SBackIcon = styled(BackIcon)`
  fill: ${({ theme }) => theme.colors.text};
  height: 24px;
`;

const SEntriesWrapper = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  margin-left: 40px;
`;

const SEntry = styled.figure`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  cursor: pointer;
`;

const SEntryCaption = styled.figcaption`
  position: absolute;
  bottom: 20px;
  font-weight: bold;
  font-size: 30px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8px 20px;
  border-radius: 6px;
  max-width: 90%;
`;

const SLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 60px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  background-color: rgb(66 66 66 / 50%);
  z-index: 1;
`;

const SErrorMessage = styled.div`
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  margin-right: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

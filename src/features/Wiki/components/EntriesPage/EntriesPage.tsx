import { DispatchWithoutAction, FC, useState } from 'react';
import styled from 'styled-components';
import { IEntriesPageData, TEntry } from '@Wiki/types/entriesPageData';
import { ICategory } from '@Wiki/utils/categories';
import { DetailedEntryPopup } from '@Wiki/components/DetailedEntryPopup';
import { FiltersPanel } from '@Wiki/components/EntriesPage/components/FiltersPanel';
import { PageButtons } from '@Wiki/components/EntriesPage/components/PageButtons';
import { SPageWrapper, SHeading, SButton } from '@Wiki/ui';
import BackIcon from '@common/icons/back.svg';

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
  const [popupData, setPopupData] = useState<TEntry>();

  const showOverlay = isLoading || fetchError;

  return (
    <SPageWrapper>
      {showOverlay && <div>{fetchError || 'Loading...'}</div>}
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
            {data?.results.map((entry) => (
              <li key={entry.id}>
                <SEntry onClick={() => setPopupData(entry)}>
                  {'image' in entry && <img src={entry.image} />}
                  <SEntryCaption>{entry.name}</SEntryCaption>
                </SEntry>
              </li>
            ))}
          </SEntriesWrapper>
        </SMainContent>
        <PageButtons
          numberOfPages={data?.info.pages || 0}
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

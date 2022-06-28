import { DispatchWithoutAction, FC, useState } from 'react';
import { IEntriesPageData, TEntry } from '../../types/entriesPageData';
import { ICategory } from '../../utils/categories';
import { DetailedEntryPopup } from '../DetailedEntryPopup';
import usePagination from './hooks/usePagination';

interface IProps {
  category: ICategory;
  data: IEntriesPageData;
  isLoading: boolean;
  fetchError?: string;
  onPageChange(url: string, pageNumber: number): Promise<void>;
  closePage: DispatchWithoutAction;
}

export const EntriesPage: FC<IProps> = ({
  category,
  data,
  isLoading,
  fetchError,
  onPageChange,
  closePage,
}) => {
  const [popupData, setPopupData] = useState<TEntry>();
  const showOverlay = isLoading || fetchError;
  const { info: pageInfo, results: entries } = data;

  const {
    isFirstSetOfPages,
    isLastSetOfPages,
    goToPreviousSetOfPages,
    goToNextSetOfPages,
    currentSetOfPages,
  } = usePagination({ numberOfPages: pageInfo.pages, pageStep: 5 });

  return (
    <>
      {showOverlay && <div>{fetchError || 'Loading...'}</div>}
      <header>
        <button onClick={closePage}>Назад</button>
      </header>
      <main>
        {entries.map((entry) => (
          <figure key={entry.id} onClick={() => setPopupData(entry)}>
            {'image' in entry && <img src={entry.image} />}
            <figcaption>{entry.name}</figcaption>
          </figure>
        ))}
      </main>
      {popupData && (
        <DetailedEntryPopup
          categoryName={category.name}
          data={popupData}
          onClose={() => setPopupData(undefined)}
        />
      )}
      <section>
        {isFirstSetOfPages && (
          <button onClick={goToPreviousSetOfPages}>...</button>
        )}
        {currentSetOfPages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(category.url, pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {isLastSetOfPages && <button onClick={goToNextSetOfPages}>...</button>}
      </section>
    </>
  );
};

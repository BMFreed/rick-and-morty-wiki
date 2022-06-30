import { DispatchWithoutAction, FC, useState } from 'react';

import { IEntriesPageData, TEntry } from '../../types/entriesPageData';
import { ICategory } from '../../utils/categories';
import { DetailedEntryPopup } from '../DetailedEntryPopup';
import { FiltersPanel } from './components/FiltersPanel';
import { PageButtons } from './components/PageButtons';

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
    <>
      {showOverlay && <div>{fetchError || 'Loading...'}</div>}
      <header>
        <button onClick={closePage}>Назад</button>
      </header>
      <FiltersPanel
        filters={category.filters}
        onApplyFilters={onApplyFilters}
      />
      <main>
        <ul>
          {data?.results.map((entry) => (
            <li key={entry.id}>
              <figure onClick={() => setPopupData(entry)}>
                {'image' in entry && <img src={entry.image} />}
                <figcaption>{entry.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </main>
      {popupData && (
        <DetailedEntryPopup
          categoryName={category.name}
          data={popupData}
          onClose={() => setPopupData(undefined)}
        />
      )}
      <PageButtons
        numberOfPages={data?.info.pages || 0}
        pagesPerView={5}
        onPageChange={onPageChange}
      />
    </>
  );
};

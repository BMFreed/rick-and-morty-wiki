import { DispatchWithoutAction, FC, useState } from 'react';
import { IEntriesPageData, TEntry } from '../../types/entriesPageData';
import { ICategory } from '../../utils/categories';
import { DetailedEntryPopup } from '../DetailedEntryPopup';
import usePagination from './hooks/usePagination';

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
    return <div>{fetchError || 'Oops! Something went wrong...'}</div>;
    // TODO перенести это в родительский компонент
  }

  const [popupData, setPopupData] = useState<TEntry>();
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );

  const onFiltersChange = (filterName: string, newValue: string): void =>
    setActiveFilters((prevState) => ({
      ...prevState,
      [filterName]: newValue,
    }));

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
      <aside>
        {category.filters.map((filter) =>
          'conditions' in filter ? (
            <article key={filter.name}>
              <label htmlFor={`filter-${filter.name}`}>{filter.name}</label>{' '}
              <select
                name={`filter-${filter.name}`}
                id={filter.name}
                onChange={(event) => {
                  const currentValue = event.target.value;

                  const condition = currentValue === 'all' ? '' : currentValue;

                  onFiltersChange(filter.name, condition);
                }}
              >
                <option>all</option>
                {filter.conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </article>
          ) : (
            <article key={filter.name}>
              <label htmlFor={`filter-${filter.name}`}>{filter.name}</label>{' '}
              <input
                type='text'
                id={`filter-${filter.name}`}
                onChange={(event) =>
                  onFiltersChange(
                    filter.name,
                    event.target.value.trim().toLowerCase(),
                  )
                }
              />
            </article>
          ),
        )}
        <button onClick={() => onApplyFilters(activeFilters)}>
          Apply filters
        </button>
      </aside>
      <main>
        <ul>
          {entries.map((entry) => (
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
      <section>
        {isFirstSetOfPages && (
          <button onClick={goToPreviousSetOfPages}>...</button>
        )}
        {currentSetOfPages.map((pageNumber) => (
          <button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        {isLastSetOfPages && <button onClick={goToNextSetOfPages}>...</button>}
      </section>
    </>
  );
};

import { DispatchWithoutAction, FC, useState } from 'react';
import { IEntriesPageData, TEntry } from '../types/entriesPageData';
import { CategoryName } from '../utils/categories';
import { DetailedEntryPopup } from './DetailedEntryPopup';

interface IProps {
  category: CategoryName;
  data: IEntriesPageData;
  isLoading: boolean;
  fetchError?: string;
  closePage: DispatchWithoutAction;
}

export const EntriesPage: FC<IProps> = ({
  category,
  data,
  isLoading,
  fetchError,
  closePage,
}) => {
  const [popupData, setPopupData] = useState<TEntry>();
  const showOverlay = isLoading || fetchError;
  const { info: pageInfo, results: entries } = data;

  return (
    <>
      {showOverlay ? (
        <div>{fetchError || 'Loading...'}</div>
      ) : (
        <>
          <header>
            <button onClick={closePage}>Назад</button>
          </header>
          <section>
            {entries.map((entry) => (
              <figure key={entry.id} onClick={() => setPopupData(entry)}>
                {'image' in entry && <img src={entry.image} />}
                <figcaption>{entry.name}</figcaption>
              </figure>
            ))}
          </section>
          {popupData && (
            <DetailedEntryPopup
              category={category}
              data={popupData}
              onClose={() => setPopupData(undefined)}
            />
          )}
        </>
      )}
    </>
  );
};

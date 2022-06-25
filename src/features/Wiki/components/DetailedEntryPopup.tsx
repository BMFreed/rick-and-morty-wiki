import { DispatchWithoutAction, FC } from 'react';
import { CategoryName } from '../utils/categories';
import { TEntry } from '../types/entriesPageData';

interface IProps {
  category: CategoryName;
  data: TEntry;
  onClose: DispatchWithoutAction;
}

export const DetailedEntryPopup: FC<IProps> = ({ category, data }) => {
  switch (category) {
    case CategoryName.CHARACTERS:
      return <section>Это попап</section>;
    default:
      return null;
  }
};

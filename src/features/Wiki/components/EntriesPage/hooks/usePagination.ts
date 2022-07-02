import { useState } from 'react';
import { range } from 'lodash';

interface IProps {
  numberOfPages: number;
  pagesPerView: number;
}

export const usePagination = ({
  numberOfPages,
  pagesPerView,
}: IProps): {
  isFirstSetOfPages: boolean;
  isLastSetOfPages: boolean;
  goToPreviousSetOfPages(): void;
  goToNextSetOfPages(): void;
  currentSetOfPages: number[];
} => {
  const [firstPageInRange, setFirstPageInRange] = useState(1);

  const assumedLastPage = firstPageInRange + (pagesPerView - 1);
  const lastPageInRange =
    assumedLastPage < numberOfPages ? assumedLastPage : numberOfPages;

  const isFirstSetOfPages = firstPageInRange > pagesPerView;
  const isLastSetOfPages = lastPageInRange < numberOfPages;

  const goToPreviousSetOfPages = (): void =>
    setFirstPageInRange(firstPageInRange - pagesPerView);
  const goToNextSetOfPages = (): void =>
    setFirstPageInRange(firstPageInRange + pagesPerView);

  const currentSetOfPages = range(firstPageInRange, lastPageInRange + 1);

  return {
    isFirstSetOfPages,
    isLastSetOfPages,
    goToPreviousSetOfPages,
    goToNextSetOfPages,
    currentSetOfPages,
  };
};

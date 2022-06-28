import { useState } from 'react';
import { range } from 'lodash';

interface IProps {
  numberOfPages: number;
  pageStep: number;
}

const usePagination = ({
  numberOfPages,
  pageStep,
}: IProps): {
  isFirstSetOfPages: boolean;
  isLastSetOfPages: boolean;
  goToPreviousSetOfPages(): void;
  goToNextSetOfPages(): void;
  currentSetOfPages: number[];
} => {
  const [firstPageInRange, setFirstPageInRange] = useState(1);
  const lastPageInRange =
    firstPageInRange + (pageStep - 1) < numberOfPages
      ? firstPageInRange + (pageStep - 1)
      : numberOfPages;

  const isFirstSetOfPages = firstPageInRange > pageStep;
  const isLastSetOfPages = lastPageInRange < numberOfPages;

  const goToPreviousSetOfPages = (): void =>
    setFirstPageInRange(firstPageInRange - pageStep);
  const goToNextSetOfPages = (): void =>
    setFirstPageInRange(firstPageInRange + pageStep);

  const currentSetOfPages = range(firstPageInRange, lastPageInRange + 1);

  return {
    isFirstSetOfPages,
    isLastSetOfPages,
    goToPreviousSetOfPages,
    goToNextSetOfPages,
    currentSetOfPages,
  };
};

export default usePagination;

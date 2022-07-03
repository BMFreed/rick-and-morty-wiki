import { noop } from 'lodash';
import {
  DispatchWithoutAction,
  MutableRefObject,
  MouseEvent,
  useRef,
} from 'react';

interface IParams {
  onClick?: DispatchWithoutAction;
  onClickAway: DispatchWithoutAction;
}

export const useClickAway = ({
  onClick = noop,
  onClickAway,
}: IParams): {
  contentRef: MutableRefObject<HTMLElement>;
  onClickWithClickAway(event: MouseEvent): void;
} => {
  const contentRef = useRef<HTMLElement>(null);

  const onClickWithClickAway = (event: MouseEvent): void => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (!contentRef.current.contains(event.target)) {
      onClickAway();

      return;
    }
    onClick();
  };

  return { contentRef, onClickWithClickAway };
};

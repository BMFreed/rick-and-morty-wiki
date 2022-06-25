import { FC } from 'react';
import { Wiki } from './features/Wiki/Wiki';
import GlobalStyle from './common/styles/GlobalStyles';

export const App: FC = () => (
  <>
    <Wiki />
    <GlobalStyle />
  </>
);

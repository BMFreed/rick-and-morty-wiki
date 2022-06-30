import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { Wiki } from './features/Wiki/Wiki';
import GlobalStyle from './common/styles/GlobalStyles';
import defaultTheme from './common/styles/DefaultTheme';

export const App: FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <Wiki />
    <GlobalStyle />
  </ThemeProvider>
);

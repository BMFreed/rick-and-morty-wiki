import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { Wiki } from '@Wiki/Wiki';
import { GlobalStyle } from '@common/styles/GlobalStyles';
import { defaultTheme } from '@common/styles/defaultTheme';

export const App: FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <Wiki />
    <GlobalStyle />
  </ThemeProvider>
);

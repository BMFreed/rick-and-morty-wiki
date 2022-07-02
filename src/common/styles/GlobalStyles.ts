import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import roboto from '@common/fonts/Roboto.woff2';
import bebasNeue from '@common/fonts/bebasneuebold.woff2';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Roboto';
    src: url(${roboto}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bebas-neue';
    src: url(${bebasNeue}) format('woff2');
    font-weight: bold;
    font-style: normal;
  }
    
    html * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
`;

import styled, { css } from 'styled-components';

export const SHeading = styled.h1`
  ${({ theme }) => css`
    ${theme.fonts.heading.main};
    color: ${theme.colors.accent};
  `}
  margin-bottom: 40px;
`;

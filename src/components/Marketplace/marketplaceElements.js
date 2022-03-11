import styled from "styled-components";

export const UserDetailGrid = styled.div`
  display: grid;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    grid-gap: 1rem;
  }
`;
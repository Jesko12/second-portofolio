import styled from "styled-components";

export const MainLoginWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 0 1.5rem;

  @media screen and (min-width: 600px) {
    padding: 0;
  }
`;

export const LoginWrapper = styled.div`
  border: 1px solid #e6eaee;
  background: #f8fafc;
  margin-top: 2rem;
`;

export const LoginHeader = styled.div`
  padding: 2rem 2rem;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
`;

export const LoginContent = styled.div`
  padding: 2rem 2rem;
  background: white;
`;

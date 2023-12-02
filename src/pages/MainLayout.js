import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex,
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #333l;
  color: $fff;
  padding: 1rem;
`
const Main = styled.main`
  flex: 1;
  padding: 1rem;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const MainLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <h1>Chat Quiz</h1>
      </Header>
      <Main>{children}</Main>
      <Footer>&copy; {new Date().getFullYear()} Chat Quiz</Footer>
    </Wrapper>
  );
};


export default MainLayout;
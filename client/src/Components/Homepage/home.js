import styled from "styled-components";
import Header from "../header";

const Home = () => {
  return (
    <Section>
      <Header />
      <Content></Content>
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  max-width: 100%;
  padding: 50px 10px;
`;

const Content = styled.div`
  display: flex;
  min-width: 60%;
  border: 1px solid black;
  border-radius: 10px;
`;

export default Home;

import styled from "styled-components";
import Header from "../header";
const Messages = () => {
  return (
    <Section>
      <Header />
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  max-width: 100%;
  padding: 50px 10px;
`;

export default Messages;

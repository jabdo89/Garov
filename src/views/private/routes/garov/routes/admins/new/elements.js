import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export { Container, Row, Col };

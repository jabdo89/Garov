import styled from "styled-components";
import { Card } from "antd";

const ElementsContainer = styled.div`
  position: fixed;
  margin-top: 66px;
  z-index: 999999;
`;

const Menu = styled(Card)`
  background-color: white;
  left: 20px;
  top: 30px;

  .ant-card-body {
    display: flex;
    flex-direction: column;
  }
`;

export { ElementsContainer, Menu };

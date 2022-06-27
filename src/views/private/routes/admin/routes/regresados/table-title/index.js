import React from "react";
import { Typography, Button } from "antd";
import { TitleContainer } from "./elements";

const { Title } = Typography;

const TableTitle = ({ selected, crearGuias }) => {
  return (
    <TitleContainer>
      <Title style={{ margin: "auto 10px" }} level={3}>
        Regresados
      </Title>
      <Button
        type="primary"
        disabled={selected.length === 0}
        onClick={() => crearGuias()}
      >
        Enviar de Nuevo
      </Button>
    </TitleContainer>
  );
};

export default TableTitle;

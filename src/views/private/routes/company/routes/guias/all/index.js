import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import moment from "moment";
import {
  FileImageOutlined,
  CodeSandboxOutlined,
  CarOutlined,
  ClockCircleOutlined,
  FundOutlined,
} from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Row, Col } from "antd";
import Title from "./table-title";
import {
  Container,
  ComponentCard,
  ComponentSubtitle,
  ComponentDescription,
  IconDiv,
  ComponentTitle,
} from "./elements";

const Orders = ({ guias }) => {
  const [search, setSearch] = useState("");

  const columns = [
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
      render: (deliveries) => (
        <Tag color="blue" key={shortid.generate()}>
          {deliveries}
        </Tag>
      ),
    },
    {
      title: "# Guia",
      dataIndex: "numGuia",
      key: "numGuia",
    },
    {
      title: "# Orden",
      dataIndex: "numOrden",
      key: "numOrden",
    },
    {
      title: "Tipo de Envio",
      key: "tipoEnvio",
      dataIndex: "tipoEnvio",
    },
    {
      title: "Cliente",
      key: "cliente",
      dataIndex: "cliente",
    },
    {
      title: "Evidencia",
      dataIndex: "evidence",
      key: "evidence",
      // eslint-disable-next-line react/prop-types
      render: (photo) => (
        <Tooltip title="Evidencia">
          <Button
            shape="circle"
            onClick={() => window.open(photo)}
            icon={<FileImageOutlined />}
            disabled={!photo}
          />
        </Tooltip>
      ),
    },
  ];

  function checkSearch(company) {
    return company.company.toUpperCase() === search.toUpperCase();
  }

  if (!guias) {
    return null;
  }
  const creadas = guias.filter((guia) => guia.estatus === "Creado");
  const documentado = guias.filter((guia) => guia.estatus === "Documentado");
  const enCorrida = guias.filter((guia) => guia.estatus === "En Corrida");
  const completados = guias.filter(
    (guia) => guia.estatus === "Entregado" || guia.estatus === "Regresado"
  );
  return (
    <Container>
      <Row justify="space-between">
        <Col xs={24} sm={12} md={12} lg={6}>
          <ComponentCard>
            <Row>
              <Col flex="auto">
                <ComponentSubtitle>{creadas.length}</ComponentSubtitle>
              </Col>
              <Col flex="20px">
                <IconDiv>
                  <CodeSandboxOutlined />
                </IconDiv>
              </Col>
            </Row>
            <ComponentTitle>Creados</ComponentTitle>
          </ComponentCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <ComponentCard>
            <Row>
              <Col flex="auto">
                <ComponentSubtitle>{documentado.length}</ComponentSubtitle>
              </Col>
              <Col flex="20px">
                <IconDiv>
                  <CarOutlined />
                </IconDiv>
              </Col>
            </Row>
            <ComponentTitle>Documentado</ComponentTitle>
          </ComponentCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <ComponentCard>
            <Row>
              <Col flex="auto">
                <ComponentSubtitle>
                  {enCorrida.length}
                  <ComponentDescription></ComponentDescription>
                </ComponentSubtitle>
              </Col>
              <Col flex="20px">
                <IconDiv>
                  <ClockCircleOutlined />
                </IconDiv>
              </Col>
            </Row>
            <ComponentTitle>En Corrida</ComponentTitle>
          </ComponentCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <ComponentCard>
            <Row>
              <Col flex="auto">
                <ComponentSubtitle>
                  {completados.length}
                  <ComponentDescription></ComponentDescription>
                </ComponentSubtitle>
              </Col>
              <Col flex="20px">
                <IconDiv>
                  <FundOutlined />
                </IconDiv>
              </Col>
            </Row>
            <ComponentTitle>Completados</ComponentTitle>
          </ComponentCard>
        </Col>
      </Row>
      <Table
        title={() => (
          <Title search={search} setSearch={setSearch} data={guias} />
        )}
        dataSource={guias.map((service) => ({
          key: service.id,
          ...service,
        }))}
        columns={columns}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    guias: state.firestore.ordered.Guias,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Guias",
        where: [["clienteID", "==", props.profile.userID]],
      },
    ];
  })
)(Orders);

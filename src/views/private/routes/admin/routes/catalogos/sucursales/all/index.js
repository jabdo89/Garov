import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Corridas = ({ corridas }) => {
  const columns = [
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
      render: (deliveries) => (
        <Tag color="green" key={shortid.generate()}>
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

  if (!corridas) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={corridas} />}
        dataSource={corridas.map((service) => ({
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
    corridas: state.firestore.ordered.Corridas,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Corridas",
      },
    ];
  })
)(Corridas);

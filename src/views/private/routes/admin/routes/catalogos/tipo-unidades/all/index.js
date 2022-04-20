import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Corridas = ({ unidades }) => {
  const columns = [
    {
      title: "Tipo de Unidad",
      dataIndex: "tipoUnidad",
      key: "tipoUnidad",
    },
    {
      title: "Tarjeta de Circulacion",
      dataIndex: "tarjetaCirculacion",
      key: "numOrden",
    },
    {
      title: "Poliza Seguro",
      key: "polizaSeguro",
      dataIndex: "polizaSeguro",
    },
    {
      title: "Borrar",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Administrar">
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            shape="circle"
            style={{ marginRight: 10 }}
          />
        </Tooltip>
      ),
    },
  ];

  if (!unidades) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={unidades} />}
        dataSource={unidades.map((service) => ({
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
    unidades: state.firestore.ordered.Unidades,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Unidades",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(Corridas);

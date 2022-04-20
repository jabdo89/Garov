import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Servicios = ({ servicios }) => {
  const columns = [
    {
      title: "Tipo de Servicio",
      key: "tipoServicio",
      dataIndex: "tipoServicio",
    },
    {
      title: "Cantidad de Destinos",
      dataIndex: "destinos",
      key: "destinos",
      render: (destinos) => destinos.length,
    },
  ];

  if (!servicios) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={servicios} />}
        dataSource={servicios.map((service) => ({
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
    servicios: state.firestore.ordered.Servicios,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Servicios",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(Servicios);

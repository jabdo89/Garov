import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Plantas = ({ plantas }) => {
  const columns = [
    {
      title: "Planta",
      key: "planta",
      dataIndex: "planta",
      render: (planta) => <Tag color="green">{planta}</Tag>,
    },
    {
      title: "Horario Entrega",
      dataIndex: "nota",
      key: "nota",
    },
    {
      title: "Cliente Final",
      dataIndex: "clienteFinal",
      key: "clienteFinal",
    },
    {
      title: "Contacto",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Telefono",
      key: "telefono",
      dataIndex: "telefono",
    },
  ];

  if (!plantas) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title />}
        dataSource={plantas.map((service) => ({
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
    plantas: state.firestore.ordered.Plantas,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Plantas",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(Plantas);

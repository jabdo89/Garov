import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Table, Tag } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Paquetes = ({ paquetes }) => {
  const columns = [
    {
      title: "Paquete",
      key: "paquete",
      dataIndex: "paquete",
      render: (paquete) => <Tag color="blue"> {paquete}</Tag>,
    },
  ];

  if (!paquetes) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={paquetes} />}
        dataSource={paquetes.map((service) => ({
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
    paquetes: state.firestore.ordered.Paquetes,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Paquetes",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(Paquetes);

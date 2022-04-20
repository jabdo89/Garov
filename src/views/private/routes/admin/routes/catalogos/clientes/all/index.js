import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Clientes = ({ clientes }) => {
  const columns = [
    {
      title: "Numero de Cliente",
      key: "numCliente",
      dataIndex: "numCliente",
    },
    {
      title: "Socio",
      dataIndex: "socio",
      key: "socio",
      render: (socio) => (
        <Tag color="green" key={shortid.generate()}>
          {socio}
        </Tag>
      ),
    },
    {
      title: "Razon Social",
      dataIndex: "razonSocial",
      key: "razonSocial",
    },
  ];

  if (!clientes) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={clientes} />}
        dataSource={clientes.map((service) => ({
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
    clientes: state.firestore.ordered.Users,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Users",
        where: [
          ["adminID", "==", props.profile.userID],
          ["rol", "==", "Company"],
        ],
      },
    ];
  })
)(Clientes);

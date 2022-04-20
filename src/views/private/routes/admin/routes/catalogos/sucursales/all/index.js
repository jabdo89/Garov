import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Sucursales = ({ sucursales }) => {
  const columns = [
    {
      title: "Sucursal",
      key: "sucursal",
      dataIndex: "sucursal",
      render: (sucursal) => <Tag color="green">{sucursal}</Tag>,
    },
    {
      title: "Codigo Postal",
      dataIndex: "codigoPostal",
      key: "codigoPostal",
    },
    {
      title: "Ship Branch",
      dataIndex: "shipBranch",
      key: "shipBranch",
    },
  ];

  if (!sucursales) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={sucursales} />}
        dataSource={sucursales.map((service) => ({
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
    sucursales: state.firestore.ordered.Sucursales,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Sucursales",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(Sucursales);

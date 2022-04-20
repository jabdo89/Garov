import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const TipoGuias = ({ tipoGuias }) => {
  const columns = [
    {
      title: "Tipo de Guia",
      key: "tipoGuia",
      dataIndex: "tipoGuia",
      render: (tipoGuia) => (
        <Tag color="green" key={shortid.generate()}>
          {tipoGuia}
        </Tag>
      ),
    },
  ];

  if (!tipoGuias) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={tipoGuias} />}
        dataSource={tipoGuias.map((service) => ({
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
    tipoGuias: state.firestore.ordered.TipoGuias,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "TipoGuias",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(TipoGuias);

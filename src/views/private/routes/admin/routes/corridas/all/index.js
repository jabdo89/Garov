import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import { Table, Spin } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Corridas = ({ corridas, operadores }) => {
  const [search, setSearch] = useState("");

  if (!operadores) {
    return <Spin size="large" style={{ padding: 200 }} />;
  }

  const columns = [
    {
      title: "Fecha",
      key: "fecha",
      dataIndex: "fecha",
      render: (fecha) => moment(fecha.seconds * 1000).format("ll"),
    },
    {
      title: "Num Corrida",
      dataIndex: "numCorrida",
      key: "numCorrida",
    },
    {
      title: "Operador",
      dataIndex: "operador",
      key: "operador",
      render: (id) => operadores[id]?.nombre,
    },
    {
      title: "Cant Guias",
      key: "guias",
      dataIndex: "guias",
      render: (guiasList) => guiasList.length,
    },
  ];

  if (!corridas) {
    return <Spin size="large" style={{ padding: 200 }} />;
  }
  let corridasFiltered = corridas;

  if (search !== "") {
    corridasFiltered = corridasFiltered.filter((corrida) => {
      return corrida.numCorrida.includes(search);
    });
  }

  return (
    <Container>
      <Table
        title={() => (
          <Title
            search={search}
            setSearch={setSearch}
            data={corridasFiltered}
          />
        )}
        dataSource={corridasFiltered.map((service) => ({
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
    operadores: state.firestore.data.Operadores,
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
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Operadores",
      },
    ];
  })
)(Corridas);

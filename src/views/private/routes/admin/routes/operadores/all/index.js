import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { Table, Tag } from "antd";
import Title from "./table-title";
import AdminModal from "./components/admin-modal";
import { Container } from "./elements";

const Operators = ({ operadores }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);

  const columns = [
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
    },

    {
      title: "Operador",
      key: "nombre",
      dataIndex: "nombre",
      render: (name) => (
        <Tag color="blue" key={shortid.generate()}>
          {name}
        </Tag>
      ),
    },
    {
      title: "Correo",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Sueldo",
      key: "sueldo",
      dataIndex: "sueldo",
    },
    {
      title: "Compensacion",
      key: "compensacion",
      dataIndex: "compensacion",
    },
  ];

  function checkSearch(company) {
    return company.company.toUpperCase() === search.toUpperCase();
  }

  if (!operadores) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => (
          <Title search={search} setSearch={setSearch} data={operadores} />
        )}
        dataSource={operadores.map((service) => ({
          key: service.id,
          ...service,
        }))}
        columns={columns}
      />
      <AdminModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingLocation={editingLocation}
        setEditingLocation={setEditingLocation}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    operadores: state.firestore.ordered.Operadores,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Operadores",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(Operators);

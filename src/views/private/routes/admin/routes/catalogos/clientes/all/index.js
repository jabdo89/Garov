import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditOutlined } from "@ant-design/icons";
import shortid from "shortid";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import Modal from "./components/edit-modal";
import { Container } from "./elements";

const Clientes = ({ clientes }) => {
  const [editingLocation, setEditingLocation] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

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
        <Tag color="blue" key={shortid.generate()}>
          {socio}
        </Tag>
      ),
    },
    {
      title: "Clientes Finales",
      dataIndex: "clientes",
      key: "clientes",
      render: (clientes) => clientes.length,
    },
    {
      title: "Razon Social",
      dataIndex: "razonSocial",
      key: "razonSocial",
    },
    {
      title: "Editar",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Editar">
          <Button
            type="primary"
            icon={<EditOutlined />}
            shape="circle"
            style={{ marginRight: 10 }}
            onClick={() => {
              setEditingLocation(row);
              setShowModal(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  if (!clientes) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title />}
        dataSource={clientes.map((service) => ({
          key: service.id,
          ...service,
        }))}
        columns={columns}
      />
      <Modal
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

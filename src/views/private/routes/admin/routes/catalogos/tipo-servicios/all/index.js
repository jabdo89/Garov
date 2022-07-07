import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Tooltip, Button, Modal } from "antd";
import Title from "./table-title";
import ModalEdit from "./components/edit-modal";
import { Container } from "./elements";

const Servicios = ({ servicios }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);

  const db = firebase.firestore();

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
    {
      title: "Acciones",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <>
          <Tooltip title="Destinos">
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
          <Tooltip title="Borrar">
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              shape="circle"
              style={{ marginRight: 10 }}
              onClick={async () => {
                Modal.confirm({
                  maskClosable: true,
                  title: <>Estas Borrando {row.tipoServicio}</>,
                  content: "¿Esta segurx de que quiere hacer esto?",
                  okText: "Aceptar",
                  onOk: async () => {
                    await db
                      .collection("Servicios")
                      .doc(row.id)
                      .delete();
                  },

                  cancelText: "Cancelar",
                  onCancel: () => {},
                });
              }}
            />
          </Tooltip>
        </>
      ),
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
      <ModalEdit
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

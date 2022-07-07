import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Modal } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Plantas = ({ plantas }) => {
  const db = firebase.firestore();

  const columns = [
    {
      title: "Planta",
      key: "planta",
      dataIndex: "planta",
      render: (planta) => <Tag color="blue">{planta}</Tag>,
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
    {
      title: "Borrar",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Borrar">
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            shape="circle"
            style={{ marginRight: 10 }}
            onClick={async () => {
              Modal.confirm({
                maskClosable: true,
                title: <>Estas Borrando {row.planta}</>,
                content: "¿Esta segurx de que quiere hacer esto?",
                okText: "Aceptar",
                onOk: async () => {
                  await db
                    .collection("Plantas")
                    .doc(row.id)
                    .delete();
                },

                cancelText: "Cancelar",
                onCancel: () => {},
              });
            }}
          />
        </Tooltip>
      ),
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

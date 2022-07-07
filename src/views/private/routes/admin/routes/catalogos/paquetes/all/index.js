import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { DeleteOutlined } from "@ant-design/icons";
import { compose } from "redux";
import { Table, Tag, Modal, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Paquetes = ({ paquetes }) => {
  const db = firebase.firestore();

  const columns = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Paquete",
      key: "paquete",
      dataIndex: "paquete",
      render: (paquete) => <Tag color="blue"> {paquete}</Tag>,
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
            onClick={async () => {
              Modal.confirm({
                maskClosable: true,
                title: <>Estas Borrando {row.paquete}</>,
                content: "¿Esta segurx de que quiere hacer esto?",
                okText: "Aceptar",
                onOk: async () => {
                  await db
                    .collection("Paquetes")
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

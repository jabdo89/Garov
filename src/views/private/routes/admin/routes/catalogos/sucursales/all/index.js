import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Modal } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Sucursales = ({ sucursales }) => {
  const db = firebase.firestore();

  const columns = [
    {
      title: "Sucursal",
      key: "sucursal",
      dataIndex: "sucursal",
      render: (sucursal) => <Tag color="blue">{sucursal}</Tag>,
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
                title: <>Estas Borrando {row.sucursal}</>,
                content: "¿Esta segurx de que quiere hacer esto?",
                okText: "Aceptar",
                onOk: async () => {
                  await db
                    .collection("Sucursales")
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

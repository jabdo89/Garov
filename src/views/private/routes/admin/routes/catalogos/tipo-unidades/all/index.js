import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tooltip, Button, Modal } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Corridas = ({ unidades }) => {
  const db = firebase.firestore();

  const columns = [
    {
      title: "Tipo de Unidad",
      dataIndex: "tipoUnidad",
      key: "tipoUnidad",
    },
    {
      title: "Tarjeta de Circulacion",
      dataIndex: "tarjetaCirculacion",
      key: "numOrden",
    },
    {
      title: "Poliza Seguro",
      key: "polizaSeguro",
      dataIndex: "polizaSeguro",
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
                title: <>Estas Borrando {row.tipoUnidad}</>,
                content: "¿Esta segurx de que quiere hacer esto?",
                okText: "Aceptar",
                onOk: async () => {
                  await db
                    .collection("Unidades")
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

  if (!unidades) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={unidades} />}
        dataSource={unidades.map((service) => ({
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
    unidades: state.firestore.ordered.Unidades,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Unidades",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(Corridas);

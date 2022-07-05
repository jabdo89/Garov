import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "firebase";
import shortid from "shortid";
import { Table, Tag, Spin } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Regresados = ({ guias, profile }) => {
  const [selected, setSelected] = useState([]);

  const crearGuias = () => {
    const db = firebase.firestore();

    for (let i = 0; i < selected.length; i++) {
      let info = null;
      db.collection("Guias")
        .doc(selected[i])
        .get()
        .then((doc) => {
          info = doc.data();
          const tempArray = info.eventos;

          tempArray.push({
            statusid: 3,
            status: "Documentado",
            fecha: new Date(),
          });
          db.collection("Guias")
            .doc(selected[i])
            .update({
              estatus: "Documentado",
              eventos: tempArray,
            })
            .then(async () => {
              setSelected([]);
            });
        });
    }
  };

  const columns = [
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
    },
    {
      title: "# Delivery",
      dataIndex: "delivery",
      key: "delivery",
      render: (delivery) => (
        <Tag color="blue" key={shortid.generate()}>
          {delivery}
        </Tag>
      ),
    },
    {
      title: "# Orden",
      dataIndex: "id",
      key: "id",
      render: (id) => id.substring(0, 6),
    },
    {
      title: "Numero de Factura",
      key: "numFactura",
      dataIndex: "nFactura",
    },
  ];

  if (!guias) {
    return <Spin size="large" style={{ padding: 200 }} />;
  }

  return (
    <Container>
      <Table
        title={() => <Title selected={selected} crearGuias={crearGuias} />}
        dataSource={guias.map((service) => ({
          key: service.id,
          ...service,
        }))}
        columns={columns}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRows) => {
            setSelected(selectedRows);
          },
          getCheckboxProps: (record) => ({
            id: record.id,
            reference: record.reference,
            service: record.service,
            price: record.price,
            destination: record.destination,
          }),
        }}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    guias: state.firestore.ordered.Guias,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Guias",
        where: [
          ["estatus", "==", "Regresado"],
          ["adminID", "==", props.profile.userID],
        ],
      },
    ];
  })
)(Regresados);

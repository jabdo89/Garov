import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import firebase from "firebase";
import { EditOutlined, FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Row, Spin } from "antd";
import Title from "./table-title";
import AdminModal from "./components/admin-modal";
import EvidenceModal from "./components/evidence-modal";
import { Container } from "./elements";

const Orders = ({ guias, profile }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(undefined);

  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);

  const [parcelEvidence, setParcelEvidence] = useState(undefined);

  useEffect(() => {
    const db = firebase.firestore();

    const query = async () => {
      if (profile) {
        db.collection("Users")
          .where("adminID", "==", profile.userID)
          .onSnapshot((querySnapshot) => {
            const usersArray = [];
            let data = {};
            // eslint-disable-next-line func-names
            querySnapshot.forEach((doc) => {
              data = doc.data();
              usersArray.push(doc.data());
            });
            setUsers(usersArray);
          });
      }
    };
    query();
  }, [profile]);

  const columns = [
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
      render: (deliveries) => (
        <Tag color="green" key={shortid.generate()}>
          {deliveries}
        </Tag>
      ),
    },
    {
      title: "Delivery Number",
      dataIndex: "delivery",
      key: "delivery",
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
    {
      title: "Cliente",
      key: "clienteID",
      dataIndex: "clienteID",
      render: (cliente) =>
        users && users.find((x) => x.userID === cliente)?.socio,
    },
    {
      title: "Acciones",
      key: "action",
      width: "14%",
      render: (row) => (
        <Row>
          <Tooltip title="Subir Evidencia">
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
          <Tooltip placement="top" title="Evidencia">
            <Button
              type="default"
              shape="circle"
              icon={<FileImageOutlined />}
              // disabled={!row.evidence?.documents.length}
              onClick={() => setParcelEvidence(row.preEvidencia)}
            />
          </Tooltip>
        </Row>
      ),
    },
  ];

  if (!guias) {
    return <Spin size="large" style={{ padding: 200 }} />;
  }
  let guiasFiltered = guias;
  if (search !== "") {
    guiasFiltered = guiasFiltered.filter((guia) => {
      return guia.delivery.includes(search);
    });
  }
  return (
    <Container>
      <Table
        title={() => (
          <Title search={search} setSearch={setSearch} data={guias} />
        )}
        dataSource={guiasFiltered.map((service) => ({
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
      <EvidenceModal
        parcelEvidence={parcelEvidence}
        setParcelEvidence={setParcelEvidence}
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
          ["estatus", "in", ["Entregado", "Regresado"]],
          ["adminID", "==", props.profile.userID],
          ["evidence", "==", null],
        ],
      },
    ];
  })
)(Orders);

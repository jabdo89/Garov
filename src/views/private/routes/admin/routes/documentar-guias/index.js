import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { EditOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Spin } from "antd";
import Title from "./table-title";
import AdminModal from "./components/admin-modal";
import { Container } from "./elements";

const Orders = ({ guias, profile }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [users, setUsers] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);

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
    {
      title: "Cliente",
      key: "clienteID",
      dataIndex: "clienteID",
      render: (cliente) =>
        users && users.find((x) => x.userID === cliente)?.socio,
    },
    {
      title: "Documentar",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Documentar">
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
          <Title
            search={search}
            setSearch={setSearch}
            setStatus={setStatus}
            setDateRange={setDateRange}
            data={guiasFiltered}
          />
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
          ["estatus", "==", "Escaneado"],
          ["adminID", "==", props.profile.userID],
        ],
      },
    ];
  })
)(Orders);

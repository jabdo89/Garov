import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { EditOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Row, Col } from "antd";
import Title from "./table-title";
import AdminModal from "./components/admin-modal";
import {
  Container,
  ComponentCard,
  ComponentSubtitle,
  ComponentDescription,
  IconDiv,
  ComponentTitle,
} from "./elements";

const Orders = ({ guias }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);

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
      title: "# Guia",
      dataIndex: "numGuia",
      key: "numGuia",
    },
    {
      title: "# Orden",
      dataIndex: "numOrden",
      key: "numOrden",
    },
    {
      title: "Tipo de Envio",
      key: "tipoEnvio",
      dataIndex: "tipoEnvio",
    },
    {
      title: "Cliente",
      key: "cliente",
      dataIndex: "cliente",
    },
    {
      title: "Documentar",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Administrar">
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

  function checkSearch(company) {
    return company.company.toUpperCase() === search.toUpperCase();
  }

  if (!guias) {
    return null;
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
            data={guias}
          />
        )}
        dataSource={guias.map((service) => ({
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
        where: [["estatus", "==", "Creado"]],
      },
    ];
  })
)(Orders);

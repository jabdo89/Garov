import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import moment from "moment";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import PropTypes from "prop-types";
import Title from "./table-title";
import { Container } from "./elements";
import EvidenciaModal from "./components/evidencia-modal";

const Evidencias = ({ guias }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);
  const columns = [
    {
      title: "# Guia",
      dataIndex: "numGuia",
      key: "numGuia",
      render: (deliveries) => (
        <Tag color="green" key={shortid.generate()}>
          {deliveries}
        </Tag>
      ),
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
      title: "Acciones",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Asignar Evidencia">
          <Button
            type="default"
            icon={<FileImageOutlined />}
            size="small"
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
          <Title search={search} setSearch={setSearch} data={guias} />
        )}
        dataSource={guias.map((service) => ({
          key: service.id,
          ...service,
        }))}
        columns={columns}
      />
      <EvidenciaModal
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
          ["estatus", "==", "Entregado"],
          ["operator", "==", props.profile.userID],
        ],
      },
    ];
  })
)(Evidencias);

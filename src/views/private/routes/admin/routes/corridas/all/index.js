import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import moment from "moment";
import { InfoCircleOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Table, Spin, Tag, Button, Tooltip } from "antd";
import Title from "./table-title";
import { Container } from "./elements";
import Modal from "./components/detail-modal";
import ModalKM from "./components/kmFinal-modal";

const Corridas = ({ corridas, operadores }) => {
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);

  const [showKmFinalModal, setShowKmFinalModal] = useState(false);
  const [editingLocationKmFinal, setEditingLocationKmFinal] = useState(
    undefined
  );

  if (!operadores) {
    return <Spin size="large" style={{ padding: 200 }} />;
  }

  const columns = [
    {
      title: "Fecha",
      key: "fecha",
      dataIndex: "fecha",
      render: (fecha) => moment(fecha.seconds * 1000).format("ll"),
    },
    {
      title: "Num Corrida",
      dataIndex: "id",
      key: "id",
      render: (id) => id.substring(0, 6),
    },
    {
      title: "Operador",
      dataIndex: "operador",
      key: "operador",
      render: (id) => operadores[id]?.nombre,
    },
    {
      title: "Cant Guias",
      key: "guias",
      dataIndex: "guias",
      render: (guiasList) => guiasList.length,
    },
    {
      title: "Km Inicial",
      key: "kmInicial",
      dataIndex: "kmInicial",
    },
    {
      title: "Km Final",
      key: "kmFinal",
      dataIndex: "kmFinal",
    },
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
      render: (deliveries) => (
        <Tag color="blue" key={shortid.generate()}>
          {deliveries}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <>
          <Tooltip title="Detalle">
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              shape="circle"
              style={{ marginRight: 10 }}
              onClick={() => {
                setEditingLocation(row);
                setShowModal(true);
              }}
            />
          </Tooltip>
          {row.estatus === "Completado" && !row.kmFinal && (
            <Tooltip title="Km Final">
              <Button
                type="secondary"
                icon={<ScheduleOutlined />}
                shape="circle"
                style={{ marginRight: 10 }}
                onClick={() => {
                  setEditingLocationKmFinal(row);
                  setShowKmFinalModal(true);
                }}
              />
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  if (!corridas) {
    return <Spin size="large" style={{ padding: 200 }} />;
  }
  let corridasFiltered = corridas.slice().sort((a, b) => b.fecha - a.fecha);

  if (search !== "") {
    corridasFiltered = corridasFiltered.filter((corrida) => {
      return corrida.id.includes(search);
    });
  }

  return (
    <Container>
      <Table
        title={() => (
          <Title
            search={search}
            setSearch={setSearch}
            data={corridasFiltered}
          />
        )}
        dataSource={corridasFiltered.map((service) => ({
          key: service.id,
          ...service,
        }))}
        columns={columns}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        editingLocation={editingLocation}
        setEditingLocation={setEditingLocation}
      />
      <ModalKM
        showModal={showKmFinalModal}
        setShowModal={setShowKmFinalModal}
        editingLocation={editingLocationKmFinal}
        setEditingLocation={setEditingLocationKmFinal}
        operadores={operadores}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    corridas: state.firestore.ordered.Corridas,
    operadores: state.firestore.data.Operadores,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Corridas",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Operadores",
      },
    ];
  })
)(Corridas);

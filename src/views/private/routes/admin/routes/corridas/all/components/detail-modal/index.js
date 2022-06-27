import React, { useEffect, useState } from "react";
import { Modal, Table, Tag, Typography } from "antd";
import moment from "moment";
import shortid from "shortid";
import firebase from "firebase";

const { Text } = Typography;
const { Title } = Typography;

const DetailModal = ({
  showModal,
  setShowModal,
  editingLocation,
  setEditingLocation,
}) => {
  const [guias, setGuias] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const query = async () => {
      db.collection("Guias")
        .where("id", "in", editingLocation?.guias)
        .onSnapshot((querySnapshot) => {
          const guiasArray = [];
          let data = {};
          // eslint-disable-next-line func-names
          querySnapshot.forEach((doc) => {
            data = doc.data();
            guiasArray.push(doc.data());
          });
          setGuias(guiasArray);
        });
    };
    if (editingLocation) {
      query();
    }
  }, [editingLocation]);

  const onCancel = () => {
    setShowModal(false);
    setEditingLocation(undefined);
  };
  console.log(guias);
  // Package Table Columns

  const columns = [
    {
      title: "Estatus Documentado",
      dataIndex: "estatus",
      key: "estatus",
      render: (delivery) => (
        <Tag color="blue" key={shortid.generate()}>
          {delivery}
        </Tag>
      ),
    },

    {
      title: "# Factura",
      dataIndex: "nFactura",
      key: "nFactura",
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
      title: "# Paquetes",
      dataIndex: "paquetes",
      key: "paquetes",
      render: (paquetes) => paquetes?.length,
    },
  ];

  return (
    <Modal
      title={<Text>Corrida : {editingLocation?.id} </Text>}
      visible={showModal}
      onCancel={onCancel}
      okText="Guardar"
      cancelText="Cancelar"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      destroyOnClose={true}
      forceRender={true}
      width="50%"
    >
      <Title level={5}>
        <Tag color="blue">{editingLocation?.tipo}</Tag> -{" "}
        {moment(editingLocation?.fecha.seconds * 1000).format("ll")}
      </Title>
      <Table
        dataSource={guias.map((guias) => ({
          key: guias.id,
          ...guias,
        }))}
        columns={columns}
      />
    </Modal>
  );
};

export default DetailModal;

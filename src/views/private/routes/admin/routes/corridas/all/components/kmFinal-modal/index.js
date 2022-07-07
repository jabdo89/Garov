import React, { useEffect, useState } from "react";
import { Modal, Form, Tag, Typography, Input, Button } from "antd";
import moment from "moment";
import firebase from "firebase";

const { Text } = Typography;
const { Title } = Typography;
const { Item } = Form;

const DetailModal = ({
  showModal,
  setShowModal,
  editingLocation,
  setEditingLocation,
  operadores,
}) => {
  const onFinish = (values) => {
    const db = firebase.firestore();

    db.collection("Corridas")
      .doc(editingLocation.id)
      .update({ kmFinal: values.kmFinal })
      .then(() => {
        setShowModal(false);
        setEditingLocation(undefined);
      });
  };

  const onCancel = () => {
    setShowModal(false);
    setEditingLocation(undefined);
  };

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
      <Title level={5} style={{ marginBottom: 30 }}>
        <Tag color="blue">{operadores[editingLocation?.operador]?.nombre}</Tag>{" "}
        - {moment(editingLocation?.fecha.seconds * 1000).format("ll")}
      </Title>
      <Form onFinish={onFinish}>
        <Item
          label={<Text strong>Km Final</Text>}
          name="kmFinal"
          style={{ width: "80%" }}
          rules={[{ required: true, message: "Ingresa el kilometraje final" }]}
        >
          <Input placeholder="Km" size="large" />
        </Item>
        <Item style={{ display: "block", width: "100%", marginTop: 20 }}>
          <Button
            style={{ marginLeft: "auto", display: "block" }}
            type="primary"
            htmlType="submit"
          >
            Guardar
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default DetailModal;

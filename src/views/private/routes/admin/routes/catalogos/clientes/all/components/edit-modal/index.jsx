import React, { useState } from "react";
import { Form, Modal, Table, Typography, Button, Input, Alert } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import firebase from "firebase";

const { Item } = Form;
const { Text } = Typography;
const { Title } = Typography;

const AdminForm = ({
  showModal,
  setShowModal,
  editingLocation,
  setEditingLocation,
  users,
}) => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  //Functions
  const onFinish = (values) => {
    if (editingLocation?.clientes.some((e) => e.cliente === values.cliente)) {
      setError("Cliente ya Existe");
      return;
    }
    const db = firebase.firestore();
    const array = editingLocation?.clientes;
    array.push(values);
    db.collection("Users")
      .doc(editingLocation.id)
      .update({ clientes: array })
      .then(async () => {
        setStep(0);
        setError("");
      });
  };

  const onCancel = () => {
    setShowModal(false);
    setEditingLocation(undefined);
    setError("");
  };

  if (users === null) {
    return null;
  }

  // Package Table Columns
  const columns = [
    {
      title: "Numero de Cliente",
      key: "numCliente",
      dataIndex: "numCliente",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
  ];

  return (
    <Modal
      title={
        <>
          {step === 1 ? (
            <Button style={{ marginRight: 50 }} onClick={() => setStep(0)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ArrowLeftOutlined />
                <Text style={{ marginLeft: 15 }}> Regresar</Text>
              </div>
            </Button>
          ) : null}
          <Text>{editingLocation?.socio}</Text>
        </>
      }
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
      {step === 0 ? (
        <Table
          title={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Title level={3}>Clientes Finales</Title>
              <Button type="primary" onClick={() => setStep(1)}>
                <Text strong style={{ color: "white" }}>
                  Agregar Cliente Finales
                </Text>
              </Button>
            </div>
          )}
          dataSource={editingLocation?.clientes.map((clientes) => ({
            key: clientes.id,
            ...clientes,
          }))}
          columns={columns}
        />
      ) : (
        <Form onFinish={onFinish}>
          <Item
            label={<Text strong>Nombre de Cliente</Text>}
            name="cliente"
            rules={[{ required: true, message: "Ingresa nombre de Cliente" }]}
          >
            <Input placeholder="Nombre" size="large" />
          </Item>
          <Item
            label={<Text strong>Numero de Cliente</Text>}
            name="numCliente"
            rules={[{ required: true, message: "Ingresa numero de Cliente" }]}
          >
            <Input placeholder="Numero" size="large" />
          </Item>
          <Text style={{ color: "red" }}>{error}</Text>
          <Item style={{ display: "block", width: "100%", marginTop: 20 }}>
            <Button
              style={{ marginLeft: "auto", display: "block" }}
              type="primary"
              htmlType="submit"
            >
              Agregar
            </Button>
          </Item>
        </Form>
      )}
    </Modal>
  );
};

export default AdminForm;

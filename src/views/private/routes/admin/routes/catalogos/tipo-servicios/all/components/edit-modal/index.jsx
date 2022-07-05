import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Form, Modal, Table, Typography, Button, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import firebase from "firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;
const { Title } = Typography;

const AdminForm = ({
  showModal,
  setShowModal,
  editingLocation,
  setEditingLocation,
  unidades,
  services,
}) => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  //Functions
  console.log(services);
  const onFinish = (values) => {
    if (editingLocation?.destinos.some((e) => e.destino === values.destino)) {
      setError("Destino ya Existe");
      return;
    }
    const db = firebase.firestore();
    let array = [...editingLocation?.destinos, values];

    db.collection("Servicios")
      .doc(editingLocation.id)
      .update({ destinos: array })
      .then(async () => {
        let tempLocation = editingLocation;
        tempLocation.destinos = array;
        setEditingLocation(tempLocation);
        setStep(0);
        setError("");
      });
  };

  const onCancel = () => {
    setShowModal(false);
    setEditingLocation(undefined);
    setError("");
  };

  if (services === null) {
    return null;
  }

  // Package Table Columns
  const columns = [
    {
      title: "Destino",
      key: "destino",
      dataIndex: "destino",
    },
    {
      title: "Costo",
      dataIndex: "costo",
      key: "costo",
    },
    {
      title: "Comision",
      dataIndex: "comision",
      key: "comision",
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
          <Text>{editingLocation?.tipoServicios}</Text>
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
              <Title level={3}>Destinos</Title>
              <Button type="primary" onClick={() => setStep(1)}>
                <Text strong style={{ color: "white" }}>
                  Agregar Destinos
                </Text>
              </Button>
            </div>
          )}
          dataSource={editingLocation?.destinos.map((destinos) => ({
            key: destinos.id,
            ...destinos,
          }))}
          columns={columns}
        />
      ) : (
        <Form onFinish={onFinish}>
          <Item
            label={<Text strong>Tipo Unidad</Text>}
            name="tipoUnidad"
            rules={[{ required: true, message: "Ingrese Tipo de Unidad" }]}
          >
            <Select
              showSearch
              size="large"
              placeholder="Tipo de Unidad"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {unidades &&
                unidades.map((data) => (
                  <Option key={data.id} value={data.id} label={data.tipoUnidad}>
                    {data.tipoUnidad}
                  </Option>
                ))}
            </Select>
          </Item>
          <Item
            name="destino"
            label={<Text strong>Destino</Text>}
            rules={[{ required: true, message: "Ingresa Destino" }]}
          >
            <Input placeholder="Destino" size="large" />
          </Item>
          <Item
            name="costo"
            label={<Text strong>Costo</Text>}
            rules={[{ required: true, message: "Ingresa Costo" }]}
          >
            <Input placeholder="Costo" size="large" />
          </Item>
          <Item
            name="comision"
            label={<Text strong>Comision</Text>}
            rules={[{ required: true, message: "Ingresa Comision" }]}
          >
            <Input placeholder="Comision" size="large" />
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

const mapStateToProps = (state) => {
  return {
    unidades: state.firestore.ordered.Unidades,
    profile: state.firebase.profile,
    services: state.firestore.data.Servicios,
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
      {
        collection: "Servicios",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(AdminForm);

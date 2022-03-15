import React, { useEffect, useState } from "react";
import { Form, Modal, Row, Typography, Select, Button, Input } from "antd";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { compose } from "redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;

const AdminForm = ({
  showModal,
  setShowModal,
  editingLocation,
  setEditingLocation,
  users,
}) => {
  const onFinish = (values) => {
    const data = values;
    const db = firebase.firestore();
    db.collection("Guias")
      .doc(editingLocation.id)
      .update({ estatus: "Modificando", operator: values.correo })
      .then(async () => {
        setShowModal(false);
      });
  };

  const onCancel = () => {
    setShowModal(false);
    setEditingLocation(undefined);
  };

  if (users === null || !editingLocation) {
    return null;
  }
  console.log(editingLocation);
  return (
    <Modal
      title={"Asignar Guia - " + editingLocation.numGuia}
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
      <Form layout="vertical" onFinish={onFinish}>
        <Row
          style={{
            justifyContent: "space-between",
            width: "80%",
            marginRight: "auto",
          }}
        >
          <Item
            name="correo"
            label={<Text strong>Campo a editar 1</Text>}
            rules={[{ required: true, message: "Ingrese numero de Cliente" }]}
          >
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
            />
          </Item>
          <Item
            name="correo"
            label={<Text strong>Campo a editar 2</Text>}
            rules={[{ required: true, message: "Ingrese numero de Cliente" }]}
          >
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
            />
          </Item>
        </Row>
        <Row
          style={{
            justifyContent: "space-between",
            width: "80%",
            marginRight: "auto",
          }}
        >
          <Item
            name="correo"
            label={<Text strong>Campo a editar 3</Text>}
            rules={[{ required: true, message: "Ingrese numero de Cliente" }]}
          >
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
            />
          </Item>
          <Item
            name="correo"
            label={<Text strong>Campo a editar 4</Text>}
            rules={[{ required: true, message: "Ingrese numero de Cliente" }]}
          >
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
            />
          </Item>
        </Row>
        <Item style={{ display: "block", width: "100%", marginTop: 20 }}>
          <Button
            style={{ marginLeft: "auto", display: "block" }}
            type="primary"
            htmlType="submit"
          >
            Asignar
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.Users,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Users",
        where: [["rol", "==", "User"]],
      },
    ];
  })
)(AdminForm);

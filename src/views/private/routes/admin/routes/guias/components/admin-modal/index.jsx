import React, { useEffect, useState } from "react";
import { Form, Modal, Row, Typography, Select, Button } from "antd";
import { connect } from "react-redux";
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

  if (users === null) {
    return null;
  }
  return (
    <Modal
      title="Asignar Guia"
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
        <Item
          name="correo"
          label={<Text strong>Correo de Usario a Asignar</Text>}
          rules={[{ required: true, message: "Ingrese numero de Cliente" }]}
        >
          <Select placeholder="# Cliente" size="large">
            {users &&
              users.map((data) => (
                <Option key={data.id} value={data.id} label={data.email}>
                  {data.email}
                </Option>
              ))}
          </Select>
        </Item>
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

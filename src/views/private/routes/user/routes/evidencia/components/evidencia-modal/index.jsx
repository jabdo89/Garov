import React, { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Row,
  Typography,
  Select,
  Button,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const EvidenciaForm = ({
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
      title="Asignar Evidencia"
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
      <Dragger {...props} style={{ marginBottom: 20 }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <Button type="primary" style={{ marginLeft: "auto", display: "block" }}>
        Asignar
      </Button>
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
)(EvidenciaForm);

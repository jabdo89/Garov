import React, { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Tag,
  Typography,
  Select,
  Tooltip,
  Button,
  Upload,
  message,
} from "antd";
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import shortid from "shortid";
import { connect } from "react-redux";
import { compose } from "redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;
const { Dragger } = Upload;

const EvidenciaForm = ({
  showModal,
  setShowModal,
  editingLocation,
  setEditingLocation,
}) => {
  //Functions
  const [data, setData] = useState({ progress: 0 });

  const onFinish = () => {
    const db = firebase.firestore();

    db.collection("Guias")
      .doc(editingLocation.id)
      .update({
        evidence: data.url,
      })
      .then(() => {
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const upload = async (evidence) => {
    const storage = firebase.storage();
    console.log(evidence);
    const uploadTask = storage
      .ref(`evidencias/${editingLocation.id}`)
      .put(evidence.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setData({ ...data, progress });
      },
      (error) => {
        // Error function ...
        console.error(error);
      },
      () => {
        // complete function ...
        storage
          .ref("evidencias")
          .child(editingLocation.id)
          .getDownloadURL()
          .then((url) => {
            setData({ ...data, url });
          });
      }
    );
  };

  const onCancel = () => {
    setShowModal(false);
    setEditingLocation(undefined);
  };

  return (
    <Modal
      title={<Text>Subir Evidencia de Guia </Text>}
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
      <Dragger
        name={"file"}
        multiple={true}
        onChange={(e) => upload(e)}
        onRemove={() => setData({ progress: 0 })}
        maxCount={1}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          De click o pon el archivo en la area azul
        </p>
        <p className="ant-upload-hint">Sube el Archivo de Evidencia</p>
      </Dragger>
      {data.progress !== 0 && <Text>{data.progress} %</Text>}

      <Button
        disabled={!data.url}
        onClick={() => onFinish()}
        style={{ marginLeft: "auto", display: "block" }}
        type="primary"
      >
        Subir Evidencia
      </Button>
    </Modal>
  );
};

export default EvidenciaForm;

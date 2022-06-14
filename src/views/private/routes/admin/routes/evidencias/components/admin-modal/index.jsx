import React, { useEffect, useState } from "react";
import { Form, Modal, Typography, Select, Button, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import firebase from "firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;
const { Dragger } = Upload;

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

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

  const sendGrainger = (data) => {
    postData(
      "https://us-central1-garov-3c5b2.cloudfunctions.net/subirEvidenciaGarov",
      data
    ).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  const upload = async (evidence) => {
    // const storage = firebase.storage();
    // console.log(evidence);
    // const uploadTask = storage
    //   .ref(`evidencias/${editingLocation.id}`)
    //   .put(evidence.file);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // progress function ...
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     setData({ ...data, progress });
    //   },
    //   (error) => {
    //     // Error function ...
    //     console.error(error);
    //   },
    //   () => {
    //     // complete function ...
    //     storage
    //       .ref("evidencias")
    //       .child(editingLocation.id)
    //       .getDownloadURL()
    //       .then((url) => {
    //         setData({ ...data, url });
    //       });
    //   }
    // );
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
        onChange={(e) => sendGrainger({ archive: e, name: "0123456789" })}
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

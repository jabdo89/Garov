import React, { useState } from "react";
import { Form, Modal, Typography, Select, Button, Input } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;

const DestinosModal = ({
  showModal,
  setShowModal,
  setDestinos,
  destinos,
  unidades,
}) => {
  // Form Info
  const [inputsModified, setInputsModified] = useState({
    tipoUnidad: null,
    destino: null,
    costo: null,
    comision: null,
  });

  const onCancel = () => {
    setShowModal(false);
  };

  const addDestino = () => {
    setDestinos([...destinos, inputsModified]);
    setInputsModified({
      tipoUnidad: null,
      destino: null,
      costo: null,
      comision: null,
    });
    setShowModal(false);
  };

  return (
    <Modal
      title={<Text>Llenar Campos Faltantes </Text>}
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
      <Form>
        <Item
          label={<Text strong>Tipo Unidad</Text>}
          rules={[{ required: true, message: "Ingrese Tipo de Unidad" }]}
        >
          <Select
            showSearch
            size="large"
            placeholder="Tipo de Unidad"
            optionFilterProp="children"
            onChange={(value) =>
              setInputsModified({ ...inputsModified, tipoUnidad: value })
            }
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
          label={<Text strong>Destino</Text>}
          onChange={(e) =>
            setInputsModified({ ...inputsModified, destino: e.target.value })
          }
          rules={[{ required: true, message: "Ingresa Destino" }]}
        >
          <Input placeholder="Destino" size="large" />
        </Item>
        <Item
          label={<Text strong>Costo</Text>}
          onChange={(e) =>
            setInputsModified({ ...inputsModified, costo: e.target.value })
          }
          rules={[{ required: true, message: "Ingresa Costo" }]}
        >
          <Input placeholder="Costo" size="large" />
        </Item>
        <Item
          label={<Text strong>Comision</Text>}
          onChange={(e) =>
            setInputsModified({ ...inputsModified, comision: e.target.value })
          }
          rules={[{ required: true, message: "Ingresa Comision" }]}
        >
          <Input placeholder="Comision" size="large" />
        </Item>
        <Button
          style={{
            marginLeft: "auto",
            display: "block",
            width: "100%",
            marginTop: 20,
          }}
          type="primary"
          size="large"
          onClick={() => addDestino()}
          disabled={
            !inputsModified.tipoUnidad ||
            !inputsModified.comision ||
            !inputsModified.costo ||
            !inputsModified.destino
          }
        >
          <Text strong style={{ color: "white" }}>
            Agregar Destino
          </Text>
        </Button>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    unidades: state.firestore.ordered.Unidades,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Unidades",
      },
    ];
  })
)(DestinosModal);

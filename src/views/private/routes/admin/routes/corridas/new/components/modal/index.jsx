import React, { useState } from "react";
import { Form, Modal, Typography, Select, Button } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;

const GuiaModal = ({
  showModal,
  setShowModal,
  addingGuias,
  setAddingGuias,
  guias,
  guiasObj,
}) => {
  // Adding Guias

  const [currGuia, setCurrGuia] = useState("");

  //Functions

  const onCancel = () => {
    setShowModal(false);
  };

  const addGuia = () => {
    setAddingGuias([...addingGuias, guiasObj[currGuia]]);
    setCurrGuia("");
    setShowModal(false);
  };

  if (guias === null) {
    return null;
  }

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
          name="currGuia"
          value={currGuia}
          label={<Text strong># Delivery</Text>}
          rules={[{ required: true, message: "Ingrese Tipo de Paquete" }]}
        >
          <Select
            showSearch
            size="large"
            placeholder="Seleccione # Delivery"
            optionFilterProp="children"
            onChange={(value) => setCurrGuia(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {guias &&
              guias.map((data) => (
                <Option key={data.id} value={data.id} label={data.deliveryNum}>
                  {data.delivery}
                </Option>
              ))}
          </Select>
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
          onClick={() => addGuia()}
          disabled={!currGuia}
        >
          <Text strong style={{ color: "white" }}>
            Agregar Guia
          </Text>
        </Button>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.Users,
    profile: state.firebase.profile,
    guias: state.firestore.ordered.Guias,
    guiasObj: state.firestore.data.Guias,
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
      {
        collection: "Guias",
        where: [
          ["estatus", "==", "Documentado"],
          ["adminID", "==", props.profile.userID],
        ],
      },
    ];
  })
)(GuiaModal);

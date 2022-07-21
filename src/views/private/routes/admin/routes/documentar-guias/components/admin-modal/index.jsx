import React, { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Table,
  Tag,
  Typography,
  Select,
  Tooltip,
  Button,
  InputNumber,
} from "antd";
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import shortid from "shortid";
import { connect } from "react-redux";
import { compose } from "redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";

const { Option } = Select;
const { Item } = Form;
const { Text } = Typography;
const { Title } = Typography;

const AdminForm = ({
  showModal,
  setShowModal,
  editingLocation,
  setEditingLocation,
  users,
  servicios,
  paquetes,
  serviciosObj,
}) => {
  const [step, setStep] = useState(0);
  // Form Info

  const [servicio, setServicio] = useState(null);

  const [inputsModified, setInputsModified] = useState({
    tipoDeServicio: null,
    tipoDeDestino: null,
    importe: null,
  });

  // Adding Packages
  const [addingPackage, setAddingPackage] = useState(false);
  const [packageAdding, setPackageadding] = useState({
    cantPaquetes: null,
    peso: null,
    tipoDePaquete: null,
  });
  const [packages, setPackages] = useState([]);

  const setImporte = (value) => {
    setInputsModified({
      ...inputsModified,
      tipoDeDestino: value,
    });
    console.log(value);
    let importe =
      serviciosObj &&
      serviciosObj[servicio]?.destinos?.filter((data) => {
        console.log(data);
        return data.destino === value;
      });
    console.log(importe);
    setInputsModified({ ...inputsModified, importe: importe[0].costo });
  };

  //Functions
  const onFinish = () => {
    const db = firebase.firestore();
    const tempArray = [...editingLocation.eventos];
    tempArray.push({ statusid: 3, status: "Documentado", fecha: new Date() });
    db.collection("Guias")
      .doc(editingLocation.id)
      .update({
        estatus:
          editingLocation?.estatus === "En Corrida"
            ? "En Corrida"
            : "Documentado",
        ...inputsModified,
        paquetes: packages,
        eventos: tempArray,
      })
      .then(async () => {
        setPackages([]);
        setStep(0);
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

  // Package Table Columns
  const columns = [
    {
      title: "# Paquetes",
      key: "cantPaquetes",
      dataIndex: "cantPaquetes",
    },
    {
      title: "Peso",
      dataIndex: "peso",
      key: "peso",
    },
    {
      title: "Tipo de Paquete",
      dataIndex: "tipoDePaquete",
      key: "tipoDePaquete",
      render: (tipo) => (
        <Tag color="blue" key={shortid.generate()}>
          {tipo}
        </Tag>
      ),
    },
    {
      title: "Borrar",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Administrar">
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            shape="circle"
            style={{ marginRight: 10 }}
            onClick={() => {
              var newArray = packages.filter(function(value) {
                return value.id !== row.id;
              });
              setPackages(newArray);
            }}
          />
        </Tooltip>
      ),
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

          <Text>Llenar Campos Faltantes </Text>
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
      <Form layout="vertical">
        {step === 0 ? (
          <>
            <Text style={{ fontWeight: "700" }}>
              {editingLocation?.nombreDestinatario}
            </Text>
            <br />
            <Text>{editingLocation?.dDireccion}</Text>
            <Item
              name="tipoDeServicio"
              style={{ marginTop: 20 }}
              label={<Text strong>Tipo de Servicio</Text>}
              value={inputsModified.tipoDeServicio}
              rules={[{ required: true, message: "Ingrese Tipo de Servicio" }]}
            >
              <Select
                placeholder="Tipo de Servicio"
                size="large"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) =>
                  setInputsModified(
                    {
                      ...inputsModified,
                      tipoDeServicio: value,
                    },
                    setServicio(value)
                  )
                }
              >
                {servicios &&
                  servicios.map((data) => (
                    <Option
                      key={data.id}
                      value={data.tipoServicio}
                      label={data.tipoServicio}
                    >
                      {data.tipoServicio}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item
              name="tipoDeDestino"
              style={{ marginTop: 20 }}
              label={<Text strong>Tipo de Destino</Text>}
              value={inputsModified.tipoDeDestino}
              rules={[{ required: true, message: "Ingrese Tipo de Destino" }]}
            >
              <Select
                placeholder="Tipo de Destino"
                size="large"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) => setImporte(value)}
              >
                {servicio &&
                  serviciosObj[servicio]?.destinos &&
                  serviciosObj[servicio]?.destinos.map((data) => (
                    <Option
                      key={data.destino}
                      value={data.destino}
                      label={data.destino}
                    >
                      {data.destino}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item
              name="importe"
              label={<Text strong>Importe</Text>}
              value={inputsModified.importe}
              onChange={(e) =>
                setInputsModified({
                  ...inputsModified,
                  importe: e.target.value,
                })
              }
            >
              <Text>$ {inputsModified.importe}</Text>
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
              onClick={() => setStep(1)}
              disabled={
                !inputsModified.tipoDeServicio || !inputsModified.importe
              }
            >
              <Text strong style={{ color: "white" }}>
                Dar de Alta Productos
              </Text>
            </Button>
          </>
        ) : (
          <>
            {!addingPackage ? (
              <>
                <Table
                  title={() => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Title level={3}>Paquetes</Title>
                      <Button
                        type="primary"
                        onClick={() => setAddingPackage(true)}
                      >
                        <Text strong style={{ color: "white" }}>
                          Agregar Paquete
                        </Text>
                      </Button>
                    </div>
                  )}
                  dataSource={packages.map((packages) => ({
                    key: packages.id,
                    ...packages,
                  }))}
                  columns={columns}
                />
                <Button
                  type="primary"
                  style={{ display: "block", width: "100%" }}
                  size="large"
                  disabled={packages.length === 0}
                  onClick={() => onFinish()}
                >
                  <Text strong style={{ color: "white" }}>
                    Guardar
                  </Text>
                </Button>
              </>
            ) : (
              <>
                <Item
                  value={packageAdding.cantPaquetes}
                  label={<Text strong># Paquetes</Text>}
                  rules={[
                    {
                      required: true,
                      message: "Ingresa un valor",
                    },
                  ]}
                  onChange={(e) =>
                    setPackageadding({
                      ...packageAdding,
                      cantPaquetes: e.target.value,
                    })
                  }
                >
                  <InputNumber
                    size="large"
                    controls={false}
                    style={{ width: "100%" }}
                    maxLength={18}
                  />
                </Item>
                <Item
                  value={packageAdding.peso}
                  onChange={(e) =>
                    setPackageadding({ ...packageAdding, peso: e.target.value })
                  }
                  label={<Text strong>Peso</Text>}
                  rules={[
                    {
                      required: true,
                      message: "Ingresa un valor",
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    controls={false}
                    style={{ width: "100%" }}
                    maxLength={18}
                  />
                </Item>
                <Item
                  value={packageAdding.tipoDePaquete}
                  label={<Text strong>Tipo de Paquete</Text>}
                  rules={[
                    { required: true, message: "Ingrese Tipo de Paquete" },
                  ]}
                >
                  <Select
                    placeholder="Tipo de Paquete"
                    size="large"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(value) =>
                      setPackageadding({
                        ...packageAdding,
                        tipoDePaquete: value,
                      })
                    }
                  >
                    {paquetes &&
                      paquetes.map((data) => (
                        <Option
                          key={data.id}
                          value={data.id}
                          label={data.paquete}
                        >
                          {data.paquete}
                        </Option>
                      ))}
                  </Select>
                </Item>
                <Button
                  style={{
                    marginLeft: "auto",
                    display: "block",
                    width: "40%",
                    marginTop: 20,
                  }}
                  type="primary"
                  size="large"
                  disabled={
                    packageAdding.cantPaquetes === null ||
                    packageAdding.tipoDePaquete === null ||
                    packageAdding.peso === null
                  }
                  onClick={() => {
                    setPackageadding({
                      cantPaquetes: null,
                      peso: null,
                      tipoDePaquete: null,
                    });
                    setPackages([
                      ...packages,
                      { ...packageAdding, id: shortid.generate() },
                    ]);
                    setAddingPackage(false);
                  }}
                >
                  <Text strong style={{ color: "white" }}>
                    Agregar
                  </Text>
                </Button>
              </>
            )}
          </>
        )}
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    servicios: state.firestore.ordered.Servicios,
    serviciosObj: state.firestore.data.Servicios,
    paquetes: state.firestore.ordered.Paquetes,
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
      {
        collection: "Paquetes",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Servicios",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(AdminForm);

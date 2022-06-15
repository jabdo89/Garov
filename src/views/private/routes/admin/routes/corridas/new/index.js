import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Form,
  Input,
  Divider,
  Button,
  Typography,
  Select,
  Radio,
  Table,
  Tag,
  Tooltip,
} from "antd";
import shortid from "shortid";
import GuiasModal from "./components/modal";
import {
  HomeOutlined,
  UserOutlined,
  MailOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Paragraph, Text } = Typography;
const { Password } = Input;

const NewCorrida = ({
  history,
  operadores,
  unidades,
  operadoresObj,
  unidadesObj,
  profile,
}) => {
  const [showModal, setShowModal] = useState(false);

  const [addingGuias, setAddingGuias] = useState([]);

  // Display Fields
  const [unidadesFields, setUnidadesFields] = useState({
    polizaSeguro: "",
    tarjetaCirculacion: "",
  });

  const [numCorrida] = useState(shortid.generate());

  // Functions

  const onFinish = (values) => {
    const data = values;
    ["tipo"].forEach((e) => {
      if (e.tipo === undefined) {
        data[e] = "Corrida a Cliente";
      }
    });

    const guiasArray = [];
    for (let i = 0; i < addingGuias.length; i++) {
      guiasArray.push(addingGuias[i].id);
    }

    const db = firebase.firestore();

    db.collection("Corridas")
      .doc(numCorrida)
      .set({
        ...data,
        id: numCorrida,
        guias: guiasArray,
        estatus: "activo",
        fecha: new Date(),
        adminID: profile.userID,
      })
      .then(() => {
        for (let i = 0; i < guiasArray.length; i++) {
          db.collection("Guias")
            .doc(guiasArray[i])
            .update({
              estatus: "En Corrida",
            });
        }
        history.push("/corridas/all");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Guias Table Columns
  const columns = [
    {
      title: "Estatus Documentado",
      key: "estatus",
      dataIndex: "estatus",
    },

    {
      title: "# Factura",
      dataIndex: "nFactura",
      key: "nFactura",
    },
    {
      title: "# Delivery",
      dataIndex: "delivery",
      key: "delivery",
      render: (delivery) => (
        <Tag color="blue" key={shortid.generate()}>
          {delivery}
        </Tag>
      ),
    },
    {
      title: "# Paquetes",
      dataIndex: "paquetes",
      key: "paquetes",
      render: (paquetes) => paquetes?.length,
    },
    {
      title: "Tipos de Paquetes",
      dataIndex: "paquetes",
      key: "paquetes",
      render: (paquetes) =>
        paquetes?.map((paquete) => {
          return (
            <Tag color="blue" key={shortid.generate()}>
              {paquete.tipoDePaquete}
            </Tag>
          );
        }),
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
              var newArray = addingGuias.filter(function(value) {
                return value.numOrden !== row.numOrden;
              });
              setAddingGuias(newArray);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Container>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/corridas/all">
              <UserOutlined />
              <span style={{ marginLeft: 5 }}>Corridas</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear Corrida</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Title level={4}>Añade los datos de la nueva Corrida</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Divider
              style={{ borderTop: "grey" }}
              orientation="right"
            ></Divider>
            <Col>
              <Item
                label={<Text strong>Tipo de Corrida</Text>}
                name="tipo"
                style={{ width: "100%" }}
              >
                <Radio.Group
                  defaultValue="Corrida a Cliente"
                  buttonStyle="solid"
                >
                  <Radio.Button value="Corrida a Cliente">
                    Corrida a Cliente
                  </Radio.Button>
                  <Radio.Button value="Corrida a Bodega">
                    Corrida a Bodega
                  </Radio.Button>
                </Radio.Group>
              </Item>
            </Col>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              <Text strong>Datos Operador</Text>
            </Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Operador</Text>}
                  name="operador"
                  style={{ width: "47%" }}
                  rules={[{ required: true, message: "Ingresa Operador" }]}
                >
                  <Select placeholder="Operador" size="large">
                    {operadores &&
                      operadores.map((data) => (
                        <Option
                          key={data.userID}
                          value={data.userID}
                          label={data.nombre}
                        >
                          {data.nombre}
                        </Option>
                      ))}
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Unidad</Text>}
                  name="unidad"
                  style={{ width: "47%" }}
                  rules={[{ required: true, message: "Ingresa Unidad" }]}
                >
                  <Select
                    placeholder="Planta"
                    size="large"
                    onSelect={(e) =>
                      setUnidadesFields({
                        polizaSeguro: unidadesObj[e].polizaSeguro,
                        tarjetaCirculacion: unidadesObj[e].tarjetaCirculacion,
                      })
                    }
                  >
                    {unidades &&
                      unidades.map((data) => (
                        <Option
                          key={data.id}
                          value={data.id}
                          label={data.tipoUnidad}
                        >
                          {data.tipoUnidad}
                        </Option>
                      ))}
                  </Select>
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Num Corrida</Text>}
                  name="numCorrida"
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingresa numero de corrida" },
                  ]}
                >
                  <Text>{numCorrida}</Text>
                </Item>
                <Item
                  label={<Text strong>Tarjeta de Circulacion</Text>}
                  style={{ width: "20%" }}
                >
                  <Text>{unidadesFields.tarjetaCirculacion}</Text>
                </Item>
                <Item
                  label={<Text strong>Poliza de Seguro</Text>}
                  style={{ width: "20%" }}
                >
                  <Text>{unidadesFields.polizaSeguro}</Text>
                </Item>
              </Row>
            </Col>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              <Text strong>Guias</Text>
            </Divider>
            <Table
              title={() => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Title level={3}>Guias</Title>
                  <Button type="primary" onClick={() => setShowModal(true)}>
                    <Text strong style={{ color: "white" }}>
                      Agregar Guia
                    </Text>
                  </Button>
                </div>
              )}
              dataSource={addingGuias.map((guia) => ({
                key: guia.id,
                ...guia,
              }))}
              columns={columns}
            />
            <Item style={{ display: "block", width: "100%", marginTop: 20 }}>
              <Button
                style={{ marginLeft: "auto", display: "block" }}
                type="primary"
                htmlType="submit"
              >
                Crear
              </Button>
            </Item>
          </Form>
        </Card>
        <GuiasModal
          showModal={showModal}
          setShowModal={setShowModal}
          setAddingGuias={setAddingGuias}
          addingGuias={addingGuias}
        />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    operadores: state.firestore.ordered.Operadores,
    unidades: state.firestore.ordered.Unidades,
    operadoresObj: state.firestore.data.Operadores,
    unidadesObj: state.firestore.data.Unidades,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Operadores",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Unidades",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  }),
  withRouter
)(NewCorrida);

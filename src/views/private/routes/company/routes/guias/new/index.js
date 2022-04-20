import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import shortid from "shortid";
import { firestoreConnect } from "react-redux-firebase";
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
  DatePicker,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Paragraph, Text } = Typography;
const { Password } = Input;

const NewGuia = ({ history, profile }) => {
  const idGuia = shortid.generate();

  const onFinish = (values) => {
    const data = values;
    ["fechaEmbarque", "fechaCompromiso", "estatus"].forEach(
      (e) => delete data[e]
    );
    const db = firebase.firestore();
    const fechaEmbarque = moment(values.fechaEmbarque).valueOf();
    const fechaCompromiso = moment(values.fechaCompromiso).valueOf();
    const id = uuidv4();
    db.collection("Guias")
      .doc(id)
      .set({
        ...data,
        fechaEmbarque,
        fechaCompromiso,
        estatus: "Creado",
      })
      .then(async () => {
        history.push("/guias/all");
      });
  };

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
            <Link to="/guias/all">
              <UserOutlined />
              <span style={{ marginLeft: 5 }}>Guías</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear Guía</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Title level={4}>Añade los datos de tu nueva Guía</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              <Text strong>Captura de informacion</Text>
            </Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong># Guía</Text>}
                  name="numGuia"
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingresa numero de Gúia" },
                  ]}
                >
                  <Text>{idGuia}</Text>
                </Item>
                <Item
                  name="numCliente"
                  label={<Text strong># Cliente</Text>}
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingrese numero de Cliente" },
                  ]}
                >
                  <Text>{profile.numCliente}</Text>
                </Item>
                <Item
                  name="fechaEmbarque"
                  label={<Text strong>Fecha Embarque</Text>}
                  rules={[
                    { required: true, message: "Ingrese Fecha de Embarque" },
                  ]}
                  style={{ width: "20%" }}
                >
                  <DatePicker size="large" style={{ width: "100%" }} />
                </Item>
                <Item
                  name="fechaCompromiso"
                  label={<Text strong>Fecha Compromiso</Text>}
                  rules={[
                    { required: true, message: "Ingrese Fecha de Compromiso" },
                  ]}
                  style={{ width: "20%" }}
                >
                  <DatePicker size="large" style={{ width: "100%" }} />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Cliente</Text>}
                  name="cliente"
                  style={{ width: "47%" }}
                  rules={[
                    { required: true, message: "Ingresa nombre de Cliente" },
                  ]}
                >
                  <Text>{profile.socio}</Text>
                </Item>
                <Item
                  label={<Text strong># Factura</Text>}
                  name="numFactura"
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingresa numero de Factura" },
                  ]}
                >
                  <Input placeholder="# Factura" size="large" />
                </Item>
                <Item
                  label={<Text strong># Orden</Text>}
                  name="numOrden"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa numero Orden" }]}
                >
                  <Input placeholder="# Orden" size="large" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Planta</Text>}
                  name="planta"
                  style={{ width: "47%" }}
                  rules={[
                    { required: true, message: "Ingresa numero de Planta" },
                  ]}
                >
                  <Select placeholder="Planta" size="large">
                    <Option key={"prueba"} value={"prueba"} label={"prueba"}>
                      Prueba
                    </Option>
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Preguia</Text>}
                  name="preguia"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa preguia" }]}
                >
                  <Input placeholder="Preguia" size="large" />
                </Item>
                <Item
                  label={<Text strong>Estatus</Text>}
                  name="estatus"
                  style={{ width: "20%" }}
                >
                  <Input size="large" disabled defaultValue="Creado" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Estado Destino</Text>}
                  name="estadoDestino"
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingresa Estado Destino" },
                  ]}
                >
                  <Select placeholder="Estado Destino" size="large">
                    <Option key={"prueba"} value={"prueba"} label={"prueba"}>
                      Prueba
                    </Option>
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Municipio Destino</Text>}
                  name="municipioDestino"
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingresa Municipio Destino" },
                  ]}
                >
                  <Select placeholder="Municipio Destino" size="large">
                    <Option key={"prueba"} value={"prueba"} label={"prueba"}>
                      Prueba
                    </Option>
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Dirrecion</Text>}
                  name="dirrecion"
                  style={{ width: "47%" }}
                  rules={[{ required: true, message: "Ingresa Dirrecion" }]}
                >
                  <Input placeholder="# Guia" size="large" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Horario General</Text>}
                  name="horarioGeneral"
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingresa Horario General" },
                  ]}
                >
                  <Input placeholder="Horario General" size="large" />
                </Item>
                <Item
                  name="tipoServicio"
                  label={<Text strong>Tipo de Servicio</Text>}
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingrese Tipo de Servicio" },
                  ]}
                >
                  <Select placeholder="Tipo de Servicio" size="large">
                    <Option key={"prueba"} value={"prueba"} label={"prueba"}>
                      Prueba
                    </Option>
                  </Select>
                </Item>
                <Item
                  name="Tipo de Envio"
                  label={<Text strong>Tipo de Envio</Text>}
                  rules={[
                    { required: true, message: "Ingrese Fecha de Embarque" },
                  ]}
                  style={{ width: "20%" }}
                >
                  <Select placeholder="Tipo de Envio" size="large">
                    <Option key={"prueba"} value={"prueba"} label={"prueba"}>
                      Prueba
                    </Option>
                  </Select>
                </Item>
                <Item
                  name="tipoSucursal"
                  label={<Text strong>Tipo Sucursal</Text>}
                  rules={[{ required: true, message: "Ingrese Tipo Sucursal" }]}
                  style={{ width: "20%" }}
                >
                  <Select placeholder="Tipo de Sucursal" size="large">
                    <Option key={"prueba"} value={"prueba"} label={"prueba"}>
                      Prueba
                    </Option>
                  </Select>
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Sucursal</Text>}
                  name="sucursal"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa Sucursal" }]}
                >
                  <Select placeholder="Sucursal" size="large">
                    <Option key={"prueba"} value={"prueba"} label={"prueba"}>
                      Prueba
                    </Option>
                  </Select>
                </Item>
                <Item
                  name="shipBranch"
                  label={<Text strong>Ship Branch</Text>}
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingrese Ship Branch" }]}
                >
                  <Input placeholder="Ship Branch" size="large" />
                </Item>
                <Item
                  name="cpOrigen"
                  label={<Text strong>CP Origen</Text>}
                  rules={[{ required: true, message: "Ingrese CP Origen" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="CP Origen" size="large" />
                </Item>
                <Item
                  name="cpDestino"
                  label={<Text strong>CP Destino</Text>}
                  rules={[{ required: true, message: "Ingrese CP Destino" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="CP Destino" size="large" />
                </Item>
              </Row>
            </Col>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              <Text strong>Costos e Importe</Text>
            </Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Importe</Text>}
                  name="importe"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa Importe" }]}
                >
                  <Input placeholder="Importe" size="large" />
                </Item>
                <Item
                  name="costoFletes"
                  label={<Text strong>Costo Fletes</Text>}
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingrese Costo de Fletes" },
                  ]}
                >
                  <Input placeholder="Costo Fletes" size="large" />
                </Item>
                <Item
                  name="costoReparto"
                  label={<Text strong>Costo Reparto</Text>}
                  rules={[{ required: true, message: "Ingrese Costo Reparto" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Costo Reparto" size="large" />
                </Item>
                <Item
                  name="costoEstadias"
                  label={<Text strong>Costo Estadias</Text>}
                  rules={[
                    { required: true, message: "Ingrese Costo Estadias" },
                  ]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Costo Estadias" size="large" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Comision</Text>}
                  name="comision"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa Comision" }]}
                >
                  <Input placeholder="Comision" size="large" />
                </Item>
                <Item
                  name="costosManiobras"
                  label={<Text strong>Costos Maniobras</Text>}
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingrese Costos de Maniobras" },
                  ]}
                >
                  <Input placeholder="Costos Maniobras" size="large" />
                </Item>
                <Item
                  name="costoTotal"
                  label={<Text strong>Costo Total</Text>}
                  rules={[{ required: true, message: "Ingrese Costo Total" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Costo Total" size="large" />
                </Item>
                <div style={{ width: "20%" }} />
              </Row>
            </Col>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              <Text strong>Datos de la Guia</Text>
            </Divider>
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
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Guias",
        where: [["clienteID", "==", props.profile.userID]],
      },
    ];
  })
)(NewGuia);

import React, { useState } from "react";
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
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Paragraph, Text } = Typography;
const { Password } = Input;

const NewGuia = ({
  history,
  profile,
  clientes,
  clientesObj,
  plantas,
  plantasObj,
  sucursales,
  sucursalesObj,
}) => {
  const idGuia = shortid.generate();

  const [socio, setSocio] = useState(null);
  const [clienteFinal, setClienteFinal] = useState(null);
  const [planta, setPlanta] = useState(null);

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
        id,
        adminID: profile.userID,
        clienteID: "pendiente",
        fechaCreado: new Date(),
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
                  label={<Text strong>Cliente</Text>}
                  name="cliente"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa Cliente" }]}
                >
                  <Select
                    placeholder="Cliente"
                    size="large"
                    onChange={(value) => setSocio(value)}
                  >
                    {clientes &&
                      clientes.map((data) => (
                        <Option
                          key={data.id}
                          value={data.id}
                          label={data.socio}
                        >
                          {data.socio}
                        </Option>
                      ))}
                  </Select>
                </Item>
                <Item
                  name="Cliente Final"
                  label={<Text strong>Cliente Final</Text>}
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingrese numero de Cliente" },
                  ]}
                >
                  <Select
                    placeholder="Socio"
                    size="large"
                    onChange={(value) => setClienteFinal(value)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {socio &&
                      clientesObj[socio].clientes &&
                      clientesObj[socio]?.clientes.map((data) => (
                        <Option
                          key={data.numCliente}
                          value={data.cliente}
                          label={data.cliente}
                        >
                          {data.cliente}
                        </Option>
                      ))}
                  </Select>
                </Item>
                <Item
                  name="delivery"
                  label={<Text strong> # Delivery</Text>}
                  rules={[{ required: true, message: "Ingrese #delivery" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Delivery" size="large" />
                </Item>
                <Item
                  name="nFactura"
                  label={<Text strong># Factura</Text>}
                  rules={[{ required: true, message: "Ingrese # Factura" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Factura" size="large" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Planta Destino</Text>}
                  name="planta"
                  style={{ width: "47%" }}
                  rules={[
                    { required: true, message: "Ingresa nombre de Cliente" },
                  ]}
                >
                  <Select
                    placeholder="Planta"
                    size="large"
                    onChange={(value) => setPlanta(value)}
                  >
                    {plantas &&
                      plantas.map((data) => {
                        if (data.clienteFinal === clienteFinal) {
                          return (
                            <Option
                              key={data.id}
                              value={data.id}
                              label={data.planta}
                            >
                              {data.planta}
                            </Option>
                          );
                        }
                      })}
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Direccion Destino</Text>}
                  name="dDireccion"
                  style={{ width: "47%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.Dirrecion}</Text>
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Municipio Destino</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.municipio}</Text>
                </Item>
                <Item
                  label={<Text strong>Codigo Postal Destino</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.codigoPostal}</Text>
                </Item>
                <Item
                  label={<Text strong>Estado Destino</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.estado}</Text>
                </Item>
                <Item
                  label={<Text strong>Telefono Destino</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.telefono}</Text>
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Sucursal Orgien</Text>}
                  name="planta"
                  style={{ width: "47%" }}
                  rules={[
                    { required: true, message: "Ingresa nombre de Cliente" },
                  ]}
                >
                  <Select
                    placeholder="Planta"
                    size="large"
                    onChange={(value) => setPlanta(value)}
                  >
                    {plantas &&
                      plantas.map((data) => {
                        if (data.clienteFinal === clienteFinal) {
                          return (
                            <Option
                              key={data.id}
                              value={data.id}
                              label={data.planta}
                            >
                              {data.planta}
                            </Option>
                          );
                        }
                      })}
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Direccion Origen</Text>}
                  name="dDireccion"
                  style={{ width: "47%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.Dirrecion}</Text>
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Municipio Origen</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.municipio}</Text>
                </Item>
                <Item
                  label={<Text strong>Codigo Postal Origen</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.codigoPostal}</Text>
                </Item>
                <Item
                  label={<Text strong>Estado Origen</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.estado}</Text>
                </Item>
                <Item
                  label={<Text strong>Telefono Origen</Text>}
                  style={{ width: "20%" }}
                >
                  <Text> {plantasObj && plantasObj[planta]?.telefono}</Text>
                </Item>
              </Row>
            </Col>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              <Text strong>Mas Informacion</Text>
            </Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Largo</Text>}
                  name="largo"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa lo Largo" }]}
                >
                  <Input placeholder="Largo" size="large" />
                </Item>
                <Item
                  name="ancho"
                  label={<Text strong>Ancho</Text>}
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingrese lo Ancho" }]}
                >
                  <Input placeholder="Ancho" size="large" />
                </Item>
                <Item
                  name="alto"
                  label={<Text strong>Alto</Text>}
                  rules={[{ required: true, message: "Ingrese lo Alto" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Alto" size="large" />
                </Item>
                <Item
                  name="peso"
                  label={<Text strong>Peso</Text>}
                  rules={[{ required: true, message: "Ingrese el Peso" }]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Peso" size="large" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Valor Declarado</Text>}
                  name="valorDeclarado"
                  style={{ width: "20%" }}
                  rules={[
                    { required: true, message: "Ingresa Valor Declarado" },
                  ]}
                >
                  <Input placeholder="Valor" size="large" />
                </Item>
                <Item
                  name="contenido"
                  label={<Text strong>Contenido</Text>}
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingrese Contenido" }]}
                >
                  <Input placeholder="Contenido" size="large" />
                </Item>
                <Item
                  name="cantidadPqte"
                  label={<Text strong>Cantidad de Paquetes</Text>}
                  rules={[
                    { required: true, message: "Ingrese Cantidad de Paquetes" },
                  ]}
                  style={{ width: "20%" }}
                >
                  <Input placeholder="Cantidad Paquetes" size="large" />
                </Item>
                <div style={{ width: "20%" }} />
              </Row>
            </Col>

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
    clientes: state.firestore.ordered.Users,
    clientesObj: state.firestore.data.Users,
    plantas: state.firestore.ordered.Plantas,
    plantasObj: state.firestore.data.Plantas,
    sucursales: state.firestore.ordered.Sucursales,
    sucursalesObj: state.firestore.data.Sucursales,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Users",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Plantas",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Sucursales",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  })
)(NewGuia);

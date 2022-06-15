import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
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
} from "antd";
import firebase from "firebase";
import shortid from "shortid";
import { HomeOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Text } = Typography;

const NewPlanta = ({
  history,
  profile,
  servicios,
  unidades,
  clientes,
  clientesObj,
}) => {
  const [socio, setSocio] = useState(null);

  const onFinish = (values) => {
    const data = values;
    ["preferido"].forEach((e) => {
      if (e.preferido === undefined) {
        data[e] = "No";
      }
    });

    const db = firebase.firestore();
    const id = shortid.generate();

    db.collection("Plantas")
      .doc(id)
      .set({
        ...data,
        id,
        adminID: profile.userID,
      })
      .then(() => {
        history.push("/catalogos/plantas/all");
      })
      .catch((err) => {
        console.error(err);
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
            <Link to="/corridas/all">
              <UserOutlined />
              <span style={{ marginLeft: 5 }}>Plantas</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear Planta</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Title level={4}>Añade los datos de la nueva Planta</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Divider
              style={{ borderTop: "grey" }}
              orientation="right"
            ></Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Nombre de Planta</Text>}
                  name="planta"
                  style={{ width: "23%" }}
                  rules={[
                    { required: true, message: "Ingresa nombre de Planta" },
                  ]}
                >
                  <Input placeholder="Planta" size="large" />
                </Item>
                <Item
                  label={<Text strong>Socio</Text>}
                  name="socio"
                  style={{ width: "23%" }}
                  rules={[
                    { required: true, message: "Ingresa nombre de Socio" },
                  ]}
                >
                  <Select
                    placeholder="Socio"
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
                  label={<Text strong>Cliente Final</Text>}
                  name="clienteFinal"
                  style={{ width: "23%" }}
                  rules={[{ required: true, message: "Ingresa Cliente Final" }]}
                >
                  <Select placeholder="Socio" size="large">
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
                  label={<Text strong>Preferido</Text>}
                  name="preferido"
                  style={{ width: "23%" }}
                >
                  <Radio.Group defaultValue="No">
                    <Radio.Button value="Si">Si</Radio.Button>
                    <Radio.Button value="No">No</Radio.Button>
                  </Radio.Group>
                </Item>
              </Row>
            </Col>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Dirrecion</Text>}
                  name="Dirrecion"
                  style={{ width: "23%" }}
                  rules={[
                    { required: true, message: "Ingresa Dirrecion de Planta" },
                  ]}
                >
                  <Input placeholder="Dirrecion de Planta" size="large" />
                </Item>
                <Item
                  label={<Text strong>Estado</Text>}
                  name="estado"
                  style={{ width: "23%" }}
                  rules={[{ required: true, message: "Ingresa Estado" }]}
                >
                  <Input placeholder="Estado" size="large" />
                </Item>
                <Item
                  label={<Text strong>Municipio</Text>}
                  name="municipio"
                  style={{ width: "23%" }}
                  rules={[{ required: true, message: "Ingresa Municipio" }]}
                >
                  <Input placeholder="Municipio" size="large" />
                </Item>
                <Item
                  label={<Text strong>Codigo Postal</Text>}
                  name="codigoPostal"
                  style={{ width: "23%" }}
                  rules={[{ required: true, message: "Ingresa Codigo Postal" }]}
                >
                  <Input placeholder="Codigo Postal" size="large" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Tipo de Servicio Prefereido</Text>}
                  name="servicioPreferido"
                  style={{ width: "47%" }}
                  rules={[{ required: true, message: "Ingresa Servicio" }]}
                >
                  <Select placeholder="Servicio" size="large">
                    {servicios &&
                      servicios.map((data) => (
                        <Option
                          key={data.id}
                          value={data.id}
                          label={data.tipoServicio}
                        >
                          {data.tipoServicio}
                        </Option>
                      ))}
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Tipo de Unidad Prefereida</Text>}
                  name="unidadPreferida"
                  style={{ width: "47%" }}
                  rules={[{ required: true, message: "Ingresa Unidad" }]}
                >
                  <Select placeholder="Unidad" size="large">
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
              <Divider style={{ borderTop: "grey" }} orientation="right">
                Informacion de Contacto
              </Divider>
              <Row>
                <Item
                  label={<Text strong>Contacto</Text>}
                  name="contact"
                  style={{ width: "30%" }}
                  rules={[
                    { required: true, message: "Ingresa Nombre de Contacto" },
                  ]}
                >
                  <Input placeholder="Nombre de Contacto" size="large" />
                </Item>
                <Item
                  label={<Text strong>Telefono</Text>}
                  name="telefono"
                  style={{ width: "30%" }}
                  rules={[{ required: true, message: "Ingresa telefono" }]}
                >
                  <Input placeholder="Telefono" size="large" />
                </Item>
                <Item
                  label={<Text strong>Nota de Horario</Text>}
                  name="nota"
                  style={{ width: "30%" }}
                  rules={[
                    { required: true, message: "Ingresa Nota de Horario" },
                  ]}
                >
                  <Input placeholder="Nota" size="large" />
                </Item>
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
    servicios: state.firestore.ordered.Servicios,
    unidades: state.firestore.ordered.Unidades,
    serviciosObj: state.firestore.data.Servicios,
    unidadesObj: state.firestore.data.Unidades,
    profile: state.firebase.profile,
    clientes: state.firestore.ordered.Users,
    clientesObj: state.firestore.data.Users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Servicios",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Unidades",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Users",
        where: [["rol", "==", "Company"]],
      },
    ];
  }),
  withRouter
)(NewPlanta);

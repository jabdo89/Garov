import React from "react";
import firebase from "firebase";
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
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { secondConfig } from "../../../../../../../redux/config";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Paragraph, Text } = Typography;
const { Password } = Input;

const NewOperador = ({ history, profile }) => {
  console.log(history);
  const onFinish = (values) => {
    const secondAuth = firebase.initializeApp(secondConfig, "Secondary");
    const db = firebase.firestore();

    secondAuth
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((resp) => {
        return db
          .collection("Operadores")
          .doc(resp.user.uid)
          .set({
            userID: resp.user.uid,
            nombre: values.nombre,
            telefono: values.telefono,
            estatus: values.estatus,
            sueldo: values.sueldo,
            afectadoComisiones: values.afectadoComisiones,
            compensacion: values.compensacion,
            email: values.email,
            adminID: profile.userID,
          })
          .then(() => {
            secondAuth.delete();
            history.push("/operadores/all");
          })
          .catch((err) => {
            secondAuth.delete();
            console.error(err);
          });
      })
      .catch((err) => {
        secondAuth.delete();
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
                  label={<Text strong>Nombre</Text>}
                  name="nombre"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa su nombre" }]}
                >
                  <Input placeholder="Nombre" size="large" />
                </Item>
                <Item
                  label={<Text strong>Telefono</Text>}
                  name="telefono"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa su telefono" }]}
                >
                  <Input placeholder="Telefono" size="large" />
                </Item>
                <Item
                  name="estatus"
                  label={<Text strong>Estatus</Text>}
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingrese su estatus" }]}
                >
                  <Select placeholder="Estatus" size="large">
                    <Option key={"Activo"} value={"Activo"} label={"Activo"}>
                      Activo
                    </Option>
                    <Option
                      key={"Inactivo"}
                      value={"Inactivo"}
                      label={"Inactivo"}
                    >
                      Inactivo
                    </Option>
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Sueldo</Text>}
                  name="sueldo"
                  style={{ width: "20%" }}
                  rules={[{ required: true, message: "Ingresa su sueldo" }]}
                >
                  <Input placeholder="Sueldo" size="large" />
                </Item>
              </Row>
            </Col>
            <Col>
              <Row>
                <Item
                  name="afectadoComisiones"
                  label={<Text strong>Afectado Por Comisiones</Text>}
                  style={{ width: "46%" }}
                  rules={[
                    { required: true, message: "¿Es afectado por comisiones?" },
                  ]}
                >
                  <Select placeholder="Afectado Por Comisiones" size="large">
                    <Option key={"Si"} value={"Si"} label={"Si"}>
                      Si
                    </Option>
                    <Option key={"No"} value={"No"} label={"No"}>
                      No
                    </Option>
                  </Select>
                </Item>
                <Item
                  label={<Text strong>Compensacion</Text>}
                  name="compensacion"
                  style={{ width: "46%" }}
                  rules={[{ required: true, message: "Ingresa Compensacion" }]}
                >
                  <Input placeholder="Compensacion" size="large" />
                </Item>
              </Row>
            </Col>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              <Text strong>Datos de Usuario</Text>
            </Divider>
            <Col>
              <Row>
                <Item
                  name="email"
                  style={{ width: "46%" }}
                  rules={[
                    {
                      type: "email",
                      message: "Ingresa un correo válido",
                    },
                    { required: true, message: "Ingresa su email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Item>
                <Item
                  name="password"
                  style={{ width: "46%" }}
                  rules={[
                    {
                      required: true,
                      message: "Ingresa su contraseña",
                    },
                  ]}
                  hasFeedback
                >
                  <Password
                    prefix={<LockOutlined />}
                    placeholder="Contraseña"
                    size="large"
                  />
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
    profile: state.firebase.profile,
  };
};

export default compose(connect(mapStateToProps), withRouter)(NewOperador);

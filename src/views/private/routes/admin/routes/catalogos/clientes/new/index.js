import React, { useEffect, useState } from "react";
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
import firebase from "firebase";
import { secondConfig } from "../../../../../../../../redux/config";
import { HomeOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Paragraph, Text } = Typography;
const { Password } = Input;

const NewGuia = ({ history, profile }) => {
  const onFinish = (values) => {
    const secondAuth = firebase.initializeApp(secondConfig, "Secondary");
    const db = firebase.firestore();

    secondAuth
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((resp) => {
        return db
          .collection("Users")
          .doc(resp.user.uid)
          .set({
            userID: resp.user.uid,
            ...values,
            email: values.email,
            adminID: profile.userID,
            clientes: [],
            rol: "Company",
          })
          .then(() => {
            secondAuth.delete();
            history.push("/admins/all");
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
            <Link to="/cliente/all">
              <UserOutlined />
              <span style={{ marginLeft: 5 }}>Cliente</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear Cliente</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Title level={4}>Añade los datos de el nuevo Cliente</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Divider
              style={{ borderTop: "grey" }}
              orientation="right"
            ></Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong># de Cliente</Text>}
                  name="numCliente"
                  style={{ width: "30%" }}
                  rules={[
                    { required: true, message: "Ingresa numero de cliente" },
                  ]}
                >
                  <Input placeholder="Numero de Cliente" size="large" />
                </Item>
                <Item
                  label={<Text strong>Socio</Text>}
                  name="socio"
                  style={{ width: "30%" }}
                  rules={[
                    { required: true, message: "Ingresa nombre de Socio" },
                  ]}
                >
                  <Input placeholder="Socio" size="large" />
                </Item>
                <Item
                  label={<Text strong>Razon Social</Text>}
                  name="razonSocial"
                  style={{ width: "30%" }}
                  rules={[{ required: true, message: "Ingresa Razon Social" }]}
                >
                  <Input placeholder="Razon Social" size="large" />
                </Item>
              </Row>
              <Row>
                <Item
                  label={<Text strong>Email</Text>}
                  name="email"
                  style={{ width: "46%" }}
                  rules={[
                    { required: true, message: "Ingresa nombre de Paquete" },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Item>
                <Item
                  label={<Text strong>Contraseña</Text>}
                  name="password"
                  style={{ width: "46%" }}
                  rules={[{ required: true, message: "Contraseña" }]}
                >
                  <Input placeholder="Paquete" size="large" />
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

export default compose(connect(mapStateToProps), withRouter)(NewGuia);

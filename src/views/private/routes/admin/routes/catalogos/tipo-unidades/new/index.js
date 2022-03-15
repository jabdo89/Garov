import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "firebase";
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
import shortid from "shortid";
import { HomeOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Paragraph, Text } = Typography;
const { Password } = Input;

const NewUnidad = ({ history }) => {
  const onFinish = (values) => {
    const data = values;

    const id = shortid.generate();
    const db = firebase.firestore();

    db.collection("Unidades")
      .doc(id)
      .set({
        ...data,
        id,
      })
      .then(async () => {
        history.push("/catalogos/unidades/all");
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
            <Link to="/catalogos/unidades/all">
              <UserOutlined />
              <span style={{ marginLeft: 5 }}>Unidades</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear Unidad</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Title level={4}>Añade los datos de la nueva Unidad</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Divider
              style={{ borderTop: "grey" }}
              orientation="right"
            ></Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Tipo de Unidad</Text>}
                  name="tipoUnidad"
                  style={{ width: "46%" }}
                  rules={[
                    { required: true, message: "Ingresa tipo de unidad" },
                  ]}
                >
                  <Input placeholder="Nombre de Unidad" size="large" />
                </Item>
                <Item
                  label={<Text strong>Tarjeta de Circulacion</Text>}
                  name="tarjetaCirculacion"
                  style={{ width: "46%" }}
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tarjeta de circulacion",
                    },
                  ]}
                >
                  <Input placeholder="Tarjeta de Circulacion" size="large" />
                </Item>
              </Row>
            </Col>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Poliza Seguro</Text>}
                  name="polizaSeguro"
                  style={{ width: "46%" }}
                  rules={[{ required: true, message: "Ingresa poliza seguro" }]}
                >
                  <Input placeholder="Poliza Seguro" size="large" />
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

export default compose(connect(mapStateToProps), withRouter)(NewUnidad);

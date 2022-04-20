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
    const data = values;

    const db = firebase.firestore();
    const id = shortid.generate();

    db.collection("TipoGuias")
      .doc(id)
      .set({
        ...data,
        id,
        adminID: profile.userID,
      })
      .then(() => {
        history.push("/catalogos/guias/all");
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
            <Link to="/catalogos/guias/all">
              <UserOutlined />
              <span style={{ marginLeft: 5 }}>Tipo de Guias</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear Tipo de Guia</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Title level={4}>Añade los datos del nuevo Tipo de Guia</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Divider
              style={{ borderTop: "grey" }}
              orientation="right"
            ></Divider>
            <Col>
              <Item
                label={<Text strong>Tipo de Guia</Text>}
                name="tipoGuia"
                style={{ width: "48%" }}
                rules={[{ required: true, message: "Ingresa Tipo de Guia" }]}
              >
                <Input placeholder="Tipo de Guia" size="large" />
              </Item>
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

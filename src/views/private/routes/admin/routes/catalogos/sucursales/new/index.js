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
import GuiasModal from "./components/modal";
import { HomeOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";

const { Option } = Select;
const { Item } = Form;
const { Title, Paragraph, Text } = Typography;
const { Password } = Input;

const NewGuia = ({ history, profile }) => {
  const onFinish = (values) => {};

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
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a">Corrida a Cliente</Radio.Button>
                  <Radio.Button value="b">Corrida a Bodega</Radio.Button>
                </Radio.Group>
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

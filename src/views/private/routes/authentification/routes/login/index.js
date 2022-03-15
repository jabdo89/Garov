import React, { useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Card, Form, Input, Button, Divider, Typography, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

const { Item } = Form;
const { Text } = Typography;

const Login = () => {
  const [error, setError] = useState("");

  const onFinish = (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {})
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Card style={{ maxWidth: 450, width: "100%" }}>
      <Form onFinish={onFinish}>
        <Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Ingresa un correo válido",
            },
            { required: true, message: "Ingresa tu email" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Item>
        <Item
          style={{ marginTop: 10 }}
          name="password"
          rules={[{ required: true, message: "Ingresa tu password" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Item>
        <Item style={{ marginTop: 20 }}>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Item>
        <div style={{ color: "red" }}>{error}</div>
      </Form>
      <Divider>
        <Text style={{ fontSize: 10 }} type="secondary">
          ¿Aún no tienes una cuenta?
        </Text>
      </Divider>
      <Link to="/signup">
        <Button block>Crea una</Button>
      </Link>
      <Link to="/recover">
        <Typography.Link
          style={{
            margin: "5px auto",
            textAlign: "center",
            display: "block",
            width: "100%",
          }}
        >
          ¿Olvidaste tu contraseña?
        </Typography.Link>
      </Link>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

export default withRouter(connect(mapStateToProps)(Login));

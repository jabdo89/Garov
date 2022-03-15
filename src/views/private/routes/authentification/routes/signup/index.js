import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Form, Input, Button, Divider, Typography, Image } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { signUp } from "../../../../../../redux/Actions/authActions";
import { Link, withRouter } from "react-router-dom";

const { Item } = Form;
const { Password } = Input;
const { Text } = Typography;

class Signup extends Component {
  onFinish = (values) => {
    // Use values to authenticate here
    const { signUp: localeSignUp } = this.props;
    localeSignUp(values);
  };

  render() {
    return (
      <Card style={{ maxWidth: 450, width: "100%" }}>
        <Image
          style={{ margin: "10px auto", display: "block" }}
          width={200}
          src="/images/brand/logo_black.svg"
          alt="Logo"
        />
        <Form onFinish={this.onFinish}>
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
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Item>
          <Item
            name="firstName"
            rules={[{ required: true, message: "Ingresa tu nombre" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nombre" />
          </Item>
          <Item
            name="lastName"
            rules={[{ required: true, message: "Ingresa tu apellido" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Apellido" />
          </Item>
          <Item
            name="company"
            rules={[{ required: true, message: "Nombre de Empresa" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Empresa" />
          </Item>
          <Item
            name="website"
            rules={[{ required: true, message: "URL de pagina web" }]}
          >
            <Input prefix={<LinkOutlined />} placeholder="Pagina Web" />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: "Ingresa tu contraseña",
              },
            ]}
            hasFeedback
          >
            <Password prefix={<LockOutlined />} placeholder="Password" />
          </Item>
          <Item
            name="confirm"
            placeholder="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Porfavor confirma tu contraseña",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject("Las dos contraseñas no coinciden");
                },
              }),
            ]}
          >
            <Password
              prefix={<LockOutlined />}
              placeholder="Confirmar password"
            />
          </Item>
          <Item style={{ marginTop: 20 }}>
            <Button block type="primary" htmlType="submit">
              Registrarme
            </Button>
          </Item>
        </Form>
        <Divider>
          <Text style={{ fontSize: 10 }} type="secondary">
            ¿Ya tienes una cuenta?
          </Text>
        </Divider>
        <Link to="/login">
          <Button block>Ingresa</Button>
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
  }
}

Signup.propTypes = {
  signUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));

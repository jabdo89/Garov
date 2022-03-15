import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Divider, Typography, Alert, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';

const { Item } = Form;
const { Text } = Typography;

const RecoverPassword = ({ history }) => {
  const onFinish = values => {
    // Use values to authenticate here
    history.push(`/login${values}`);
  };

  return (
    <Card style={{ maxWidth: 450, width: '100%' }}>
      <Image
        style={{ margin: '10px auto', display: 'block' }}
        width={200}
        src="/images/brand/logo_black.svg"
        alt="Logo"
      />
      <Alert
        style={{ marginBottom: 20 }}
        message="Indícanos tu correo electrónico y te enviaremos los detalles para recuperar tu cuenta"
        type="info"
      />
      <Form onFinish={onFinish}>
        <Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Ingresa un correo válido'
            },
            { required: true, message: 'Ingresa tu email' }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Item>
        <Item style={{ marginTop: 20 }}>
          <Button block type="primary" htmlType="submit">
            Recuperar
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
    </Card>
  );
};

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(RecoverPassword);

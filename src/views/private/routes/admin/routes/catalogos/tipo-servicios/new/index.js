import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import {
  Breadcrumb,
  Card,
  Form,
  Input,
  Divider,
  Button,
  Typography,
  Table,
  Tag,
  Tooltip,
} from "antd";
import shortid from "shortid";
import { HomeOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { Container, Row, Col } from "./elements";
import DestinosModal from "./components/modal";

const { Item } = Form;
const { Title, Text } = Typography;

const NewTipoServicio = ({ history, unidades, profile }) => {
  const [destinos, setDestinos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onFinish = (values) => {
    const data = values;

    const id = shortid.generate();
    const db = firebase.firestore();

    db.collection("Servicios")
      .doc(id)
      .set({
        ...data,
        id,
        destinos,
        adminID: profile.userID,
      })
      .then(async () => {
        history.push("/catalogos/servicios/all");
      });
  };

  const columns = [
    {
      title: "Destino",
      key: "destino",
      dataIndex: "destino",
      render: (destino) => (
        <Tag color="blue" key={shortid.generate()}>
          {destino}
        </Tag>
      ),
    },
    {
      title: "Costo",
      dataIndex: "costo",
      key: "costo",
    },
    {
      title: "Comision",
      dataIndex: "comision",
      key: "comision",
    },

    {
      title: "Borrar",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Administrar">
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            shape="circle"
            style={{ marginRight: 10 }}
            onClick={() => {
              let newDestinos = destinos.filter(function(value) {
                return value.destino !== row.destino;
              });
              setDestinos(newDestinos);
            }}
          />
        </Tooltip>
      ),
    },
  ];

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
            <Link to="/catalogos/servicios/all">
              <UserOutlined />
              <span style={{ marginLeft: 5 }}>Tipo Servicios</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Crear Tipo de Servicio</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Title level={4}>Añade los datos de el nuevo Tipo de Servicio</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Divider
              style={{ borderTop: "grey" }}
              orientation="right"
            ></Divider>
            <Col>
              <Row>
                <Item
                  label={<Text strong>Tipo de Servicio</Text>}
                  name="tipoServicio"
                  style={{ width: "46%" }}
                  rules={[
                    { required: true, message: "Ingresa tipo de servicio" },
                  ]}
                >
                  <Input placeholder="Nombre de Servicio" size="large" />
                </Item>
              </Row>
            </Col>
            <Divider style={{ borderTop: "grey" }} orientation="right">
              Destinos
            </Divider>
            <Table
              title={() => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Title level={3}>Destinos</Title>
                  <Button type="primary" onClick={() => setShowModal(true)}>
                    <Text strong style={{ color: "white" }}>
                      Agregar Destino
                    </Text>
                  </Button>
                </div>
              )}
              dataSource={destinos.map((guia) => ({
                key: guia.id,
                ...guia,
              }))}
              columns={columns}
            />
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
        <DestinosModal
          showModal={showModal}
          setShowModal={setShowModal}
          setDestinos={setDestinos}
          destinos={destinos}
        />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    unidades: state.firestore.data.Unidades,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Unidades",
        where: [["adminID", "==", props.profile.userID]],
      },
    ];
  }),
  withRouter
)(NewTipoServicio);

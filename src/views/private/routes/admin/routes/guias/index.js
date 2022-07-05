import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "firebase";
import shortid from "shortid";
import moment from "moment";
import {
  CodeSandboxOutlined,
  CarOutlined,
  ClockCircleOutlined,
  FundOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Row, Col, Spin } from "antd";
import Title from "./table-title";
import EvidenceModal from "./components/evidence-modal";
import {
  Container,
  ComponentCard,
  ComponentSubtitle,
  ComponentDescription,
  IconDiv,
  ComponentTitle,
} from "./elements";

// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

const Orders = ({ history, profile }) => {
  const [guias, setGuias] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [dateRange, setDateRange] = useState(undefined);

  const [parcelEvidence, setParcelEvidence] = useState(undefined);

  useEffect(() => {
    const db = firebase.firestore();

    const query = async () => {
      if (dateRange) {
        db.collection("Guias")
          .where(
            "fechaCreado",
            ">=",
            firebase.firestore.Timestamp.fromDate(dateRange[0]?._d)
          )
          .where(
            "fechaCreado",
            "<=",
            firebase.firestore.Timestamp.fromDate(dateRange[1]?._d)
          )
          .onSnapshot((querySnapshot) => {
            const guiasArray = [];
            let data = {};
            // eslint-disable-next-line func-names
            querySnapshot.forEach((doc) => {
              data = doc.data();
              guiasArray.push(doc.data());
            });
            setGuias(guiasArray);
          });
      } else {
        db.collection("Guias")
          .where(
            "fechaCreado",
            ">=",
            firebase.firestore.Timestamp.fromDate(moment().subtract(7, "d")._d)
          )
          .where(
            "fechaCreado",
            "<=",
            firebase.firestore.Timestamp.fromDate(moment()._d)
          )
          .onSnapshot((querySnapshot) => {
            const guiasArray = [];
            let data = {};
            // eslint-disable-next-line func-names
            querySnapshot.forEach((doc) => {
              data = doc.data();
              guiasArray.push(doc.data());
            });
            setGuias(guiasArray);
          });
      }
    };

    query();
  }, [dateRange]);

  useEffect(() => {
    const db = firebase.firestore();

    const query = async () => {
      if (profile) {
        db.collection("Users")
          .where("adminID", "==", profile.userID)
          .onSnapshot((querySnapshot) => {
            const usersArray = [];
            let data = {};
            // eslint-disable-next-line func-names
            querySnapshot.forEach((doc) => {
              data = doc.data();
              usersArray.push(doc.data());
            });
            setUsers(usersArray);
          });
      }
    };
    query();
  }, [profile]);

  const columns = [
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
      render: (deliveries) => (
        <Tag color="blue" key={shortid.generate()}>
          {deliveries}
        </Tag>
      ),
    },
    {
      title: "Delivery Number",
      dataIndex: "delivery",
      key: "delivery",
    },
    {
      title: "# Orden",
      dataIndex: "id",
      key: "id",
      render: (id) => id.substring(0, 6),
    },
    {
      title: "Numero de Factura",
      key: "numFactura",
      dataIndex: "nFactura",
    },
    {
      title: "Cliente",
      key: "clienteID",
      dataIndex: "clienteID",
      render: (cliente) =>
        users && users.find((x) => x.userID === cliente)?.socio,
    },
    {
      title: "Cantidad Paquetes",
      key: "cantidadPqte",
      width: "10%",
      dataIndex: "cantidadPqte",
    },
    {
      title: "Paquetes Escaneados",
      key: "escaneadas",
      width: "10%",
      dataIndex: "escaneadas",
      render: (escaneadas) => (escaneadas ? escaneadas.length : 0),
    },
    {
      title: "Evidencia",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Evidencia">
          <Button
            type="default"
            shape="circle"
            icon={<FileImageOutlined />}
            disabled={!row.preEvidencia}
            onClick={() => setParcelEvidence(row.preEvidencia)}
          />
        </Tooltip>
      ),
    },
  ];

  if (!guias) {
    return <Spin size="large" style={{ padding: 200 }} />;
  }
  const creadas = guias.filter(
    (guia) => guia.estatus === "Creado" || guia.estatus === "Escaneado"
  );
  const documentado = guias.filter((guia) => guia.estatus === "Documentado");
  const enCorrida = guias.filter((guia) => guia.estatus === "En Corrida");
  const completados = guias.filter(
    (guia) => guia.estatus === "Entregado" || guia.estatus === "Regresado"
  );

  let guiasFiltered = guias
    .slice()
    .sort((a, b) => b.fechaCreado - a.fechaCreado);
  if (status.length !== 0) {
    guiasFiltered = guiasFiltered.filter((guia) => {
      return status.includes(guia.estatus);
    });
  }
  if (search !== "") {
    guiasFiltered = guiasFiltered.filter((guia) => {
      return guia.delivery.includes(search);
    });
  }

  // const fetchTracking = () => {
  //   console.log("hi");
  //   postData(
  //     "https://us-central1-garov-3c5b2.cloudfunctions.net/trackingGarov",
  //     {
  //       "soapenv:Envelope": {
  //         "soapenv:Body": {
  //           "urn:trackingGuia": { delivery: { "#text": "6549908896" } },
  //         },
  //       },
  //     }
  //   )
  //     .then((data) => {
  //       console.log(data); // JSON data parsed by `data.json()` call
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  console.log(loading);
  return (
    <Container>
      {/* <Button onClick={() => fetchTracking()}> Prueba </Button> */}
      {!loading ? (
        <Row justify="space-between">
          <Col xs={24} sm={12} md={12} lg={6}>
            <ComponentCard>
              <Row>
                <Col flex="auto">
                  <ComponentSubtitle>{creadas.length}</ComponentSubtitle>
                </Col>
                <Col flex="20px">
                  <IconDiv>
                    <CodeSandboxOutlined />
                  </IconDiv>
                </Col>
              </Row>
              <ComponentTitle>Creados/Escaneados</ComponentTitle>
            </ComponentCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <ComponentCard>
              <Row>
                <Col flex="auto">
                  <ComponentSubtitle>{documentado.length}</ComponentSubtitle>
                </Col>
                <Col flex="20px">
                  <IconDiv>
                    <ClockCircleOutlined />
                  </IconDiv>
                </Col>
              </Row>
              <ComponentTitle>Documentado</ComponentTitle>
            </ComponentCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <ComponentCard>
              <Row>
                <Col flex="auto">
                  <ComponentSubtitle>
                    {enCorrida.length}
                    <ComponentDescription></ComponentDescription>
                  </ComponentSubtitle>
                </Col>
                <Col flex="20px">
                  <IconDiv>
                    <CarOutlined />
                  </IconDiv>
                </Col>
              </Row>
              <ComponentTitle>En Corrida</ComponentTitle>
            </ComponentCard>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <ComponentCard>
              <Row>
                <Col flex="auto">
                  <ComponentSubtitle>
                    {completados.length}
                    <ComponentDescription></ComponentDescription>
                  </ComponentSubtitle>
                </Col>
                <Col flex="20px">
                  <IconDiv>
                    <FundOutlined />
                  </IconDiv>
                </Col>
              </Row>
              <ComponentTitle>Completados</ComponentTitle>
            </ComponentCard>
          </Col>
        </Row>
      ) : (
        <Spin size="large" style={{ padding: 150 }} />
      )}
      {!loading ? (
        <Table
          title={() => (
            <Title
              history={history}
              search={search}
              setSearch={setSearch}
              setStatus={setStatus}
              dateRange={dateRange}
              setDateRange={setDateRange}
              data={guiasFiltered}
            />
          )}
          dataSource={
            guiasFiltered &&
            guiasFiltered.map((service) => ({
              key: service.id,
              ...service,
            }))
          }
          columns={columns}
        />
      ) : (
        <Spin size="large" style={{ padding: 150 }} />
      )}

      <EvidenceModal
        parcelEvidence={parcelEvidence}
        setParcelEvidence={setParcelEvidence}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [];
  })
)(Orders);

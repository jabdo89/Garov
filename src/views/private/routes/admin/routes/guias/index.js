import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import {
  CodeSandboxOutlined,
  CarOutlined,
  ClockCircleOutlined,
  FundOutlined,
  EditOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Table, Tag, Tooltip, Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import Title from "./table-title";
import AdminModal from "./components/admin-modal";
import {
  Container,
  ComponentCard,
  ComponentSubtitle,
  ComponentDescription,
  IconDiv,
  ComponentTitle,
} from "./elements";

const Orders = ({ guias, profile, users }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(undefined);
  const [filteredDate, setFilteredData] = useState(guias);

  const columns = [
    {
      title: "Estatus",
      key: "estatus",
      dataIndex: "estatus",
      render: (deliveries) => (
        <Tag color="green" key={shortid.generate()}>
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
      dataIndex: "numOrden",
      key: "numOrden",
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
      render: (cliente) => users && users[cliente]?.socio,
    },
    {
      title: "Evidencia",
      key: "action",
      // eslint-disable-next-line react/prop-types
      render: (row) => (
        <Tooltip title="Evidencia">
          <Button
            type="default"
            icon={<SnippetsOutlined />}
            size="large"
            shape="circle"
            disabled={!row.evidence}
            style={{ marginRight: 10 }}
            onClick={() => {
              setEditingLocation(row);
              setShowModal(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const prueba = async () => {
    const params = {
      "soapenv:Envelope": {
        "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "soapenv:Body": {
          "urn:crearGuia": {
            contenido: {
              "@xsi:type": "xsd:string",
              "#text": "PAQUETE GRAINGER",
            },
            dDireccion: {
              "@xsi:type": "xsd:string",
              "#text":
                "CD INDUSTRIAL BRUNO PAGLIAL   ARRAYANES LOTE 4 MANZANA 14",
            },
            rDireccion: {
              "#text": "AV. DESARROLLO 500 PARQUE INDUSTRIAL FINSA GUADALUPE",
              "@xsi:type": "xsd:string",
            },
            dCorreoElectronico: { "#text": "NA", "@xsi:type": "xsd:string" },
            rCorreoElectronico: { "@xsi:type": "xsd:string" },
            cantidadPqte: { "@xsi:type": "xsd:string", "#text": "2" },
            nCliente: { "@xsi:type": "xsd:string", "#text": "MD0-0886202269" },
            valorDeclarado: { "#text": "0", "@xsi:type": "xsd:string" },
            nFactura: { "#text": "6545808053", "@xsi:type": "xsd:string" },
            rCodigoPostal: { "#text": "67132", "@xsi:type": "xsd:string" },
            usuarioWS: {
              "#text": "grainger@garovexpress.com",
              "@xsi:type": "xsd:string",
            },
            dColonia: { "@xsi:type": "xsd:string", "#text": "NA" },
            dNotas: { "#text": "NA", "@xsi:type": "xsd:string" },
            "@soapenv:encodingStyle":
              "http://schemas.xmlsoap.org/soap/encoding/",
            ancho: { "#text": "0", "@xsi:type": "xsd:string" },
            rTelefono: { "@xsi:type": "xsd:string" },
            dCodigoPostal: { "@xsi:type": "xsd:string", "#text": "91697" },
            delivery: { "@xsi:type": "xsd:string", "#text": "6545808053" },
            dTelefono: { "#text": "NA", "@xsi:type": "xsd:string" },
            nOrden: { "#text": "1442469486", "@xsi:type": "xsd:string" },
            nombreRemitente: { "@xsi:type": "xsd:string", "#text": "Grainger" },
            nombreDestinatatio: {
              "@xsi:type": "xsd:string",
              "#text": "INSPECCIONES Y PRUEBAS NO DEST RUCTIVAS S DE RL DE CV",
            },
            dCiudad: { "#text": "VERACRUZ", "@xsi:type": "xsd:string" },
            dEstado: { "@xsi:type": "xsd:string", "#text": "VER" },
            rTelefonoMovil: { "@xsi:type": "xsd:string" },
            rPais: { "@xsi:type": "xsd:string", "#text": "MX" },
            dMunicipio: { "#text": "VERACRUZ", "@xsi:type": "xsd:string" },
            dTelefonoMovil: { "#text": "NA", "@xsi:type": "xsd:string" },
            contrasena: { "@xsi:type": "xsd:string", "#text": "#Grainger17" },
            largo: { "#text": "0", "@xsi:type": "xsd:string" },
            rMunicipio: { "@xsi:type": "xsd:string", "#text": "MONTERREY" },
            rEstado: { "#text": "NUEVO LEON", "@xsi:type": "xsd:string" },
            rCiudad: { "#text": "MONTERREY", "@xsi:type": "xsd:string" },
            rColonia: { "@xsi:type": "xsd:string" },
            dPais: { "#text": "MX", "@xsi:type": "xsd:string" },
            peso: { "@xsi:type": "xsd:string", "#text": "0" },
            alto: { "@xsi:type": "xsd:string", "#text": "0" },
          },
        },
        "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "soapenv:Header": null,
        "@xmlns:urn": "urn:kpiGarovWS",
      },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };

    fetch(
      "https://us-central1-garov-3c5b2.cloudfunctions.net/grainger",
      options
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  if (!guias) {
    return null;
  }
  const creadas = guias.filter((guia) => guia.estatus === "Creado");
  const documentado = guias.filter((guia) => guia.estatus === "Documentado");
  const enCorrida = guias.filter((guia) => guia.estatus === "En Corrida");
  const completados = guias.filter(
    (guia) => guia.estatus === "Entregado" || guia.estatus === "Regresado"
  );

  let guiasFiltered = guias;
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
  if (dateRange.length !== 0) {
  }
  return (
    <Container>
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
            <ComponentTitle>Creados</ComponentTitle>
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
                  <CarOutlined />
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
                  <ClockCircleOutlined />
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
      <Button style={{ margin: 20 }} onClick={() => prueba()}>
        Generar Guia
      </Button>
      <Table
        title={() => (
          <Title
            search={search}
            setSearch={setSearch}
            setStatus={setStatus}
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
      <AdminModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingLocation={editingLocation}
        setEditingLocation={setEditingLocation}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    guias: state.firestore.ordered.Guias,
    users: state.firestore.data.Users,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Guias",
        where: [["adminID", "==", props.profile.userID]],
      },
      {
        collection: "Users",
      },
    ];
  })
)(Orders);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import moment from "moment";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import PropTypes from "prop-types";
import Title from "./table-title";
import { Container } from "./elements";

const Orders = ({ guias }) => {
  const [search, setSearch] = useState("");

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
      title: "# Guia",
      dataIndex: "numGuia",
      key: "numGuia",
    },
    {
      title: "# Orden",
      dataIndex: "numOrden",
      key: "numOrden",
    },
    {
      title: "Tipo de Envio",
      key: "tipoEnvio",
      dataIndex: "tipoEnvio",
    },
    {
      title: "Cliente",
      key: "cliente",
      dataIndex: "cliente",
    },
    {
      title: "Evidencia",
      dataIndex: "evidence",
      key: "evidence",
      // eslint-disable-next-line react/prop-types
      render: (photo) => (
        <Tooltip title="Evidencia">
          <Button
            shape="circle"
            onClick={() => window.open(photo)}
            icon={<FileImageOutlined />}
            disabled={!photo}
          />
        </Tooltip>
      ),
    },
  ];

  function checkSearch(company) {
    return company.company.toUpperCase() === search.toUpperCase();
  }
  const prueba = async () => {
    const params = {
      "soapenv:Envelope": {
        "soapenv:Header": null,
        "soapenv:Body": {
          "urn:crearGuia": {
            rTelefono: { "@xsi:type": "xsd:string" },
            rCorreoElectronico: { "@xsi:type": "xsd:string" },
            nombreRemitente: { "#text": "Grainger", "@xsi:type": "xsd:string" },
            dTelefono: { "#text": "NA", "@xsi:type": "xsd:string" },
            dEstado: { "@xsi:type": "xsd:string", "#text": "GTO" },
            cantidadPqte: { "#text": "4", "@xsi:type": "xsd:string" },
            contenido: {
              "@xsi:type": "xsd:string",
              "#text": "PAQUETE GRAINGER",
            },
            usuarioWS: {
              "#text": "grainger@garovexpress.com",
              "@xsi:type": "xsd:string",
            },
            nOrden: { "@xsi:type": "xsd:string", "#text": "1435662160" },
            contrasena: { "@xsi:type": "xsd:string", "#text": "#Grainger17" },
            nCliente: { "#text": "MD1-0887179139", "@xsi:type": "xsd:string" },
            dCorreoElectronico: { "#text": "NA", "@xsi:type": "xsd:string" },
            rCiudad: { "#text": "TLANEPANTLA", "@xsi:type": "xsd:string" },
            dNotas: { "#text": "NA", "@xsi:type": "xsd:string" },
            alto: { "@xsi:type": "xsd:string", "#text": "0" },
            nombreDestinatatio: {
              "@xsi:type": "xsd:string",
              "#text": "PLANTA LEON",
            },
            ancho: { "@xsi:type": "xsd:string", "#text": "0" },
            "@soapenv:encodingStyle":
              "http://schemas.xmlsoap.org/soap/encoding/",
            rDireccion: {
              "#text":
                "VIA GUSTAVO BAZ PRADA KM 12.5 COL. SAN PEDRO BARRIENTOS PARQUE INDUSTRIAL CPA",
              "@xsi:type": "xsd:string",
            },
            dCiudad: { "#text": "LEON", "@xsi:type": "xsd:string" },
            rCodigoPostal: { "#text": "54010", "@xsi:type": "xsd:string" },
            dMunicipio: { "#text": "LEON", "@xsi:type": "xsd:string" },
            dDireccion: {
              "#text": "BLVD STIVA LEON NO 301",
              "@xsi:type": "xsd:string",
            },
            rColonia: { "@xsi:type": "xsd:string" },
            nFactura: { "#text": "5503474411", "@xsi:type": "xsd:string" },
            dTelefonoMovil: { "@xsi:type": "xsd:string", "#text": "NA" },
            valorDeclarado: { "@xsi:type": "xsd:string", "#text": "0" },
            dColonia: {
              "#text": "PARQUE INDUSTRIAL STIVA LEON",
              "@xsi:type": "xsd:string",
            },
            rPais: { "@xsi:type": "xsd:string", "#text": "MX" },
            rEstado: { "#text": "MEXICO", "@xsi:type": "xsd:string" },
            rTelefonoMovil: { "@xsi:type": "xsd:string" },
            rMunicipio: { "@xsi:type": "xsd:string", "#text": "TLANEPANTLA" },
            dPais: { "#text": "MX", "@xsi:type": "xsd:string" },
            largo: { "@xsi:type": "xsd:string", "#text": "0" },
            peso: { "@xsi:type": "xsd:string", "#text": "0" },
            dCodigoPostal: { "#text": "37555", "@xsi:type": "xsd:string" },
            delivery: { "@xsi:type": "xsd:string", "#text": "6535430408" },
          },
        },
        "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "@xmlns:urn": "urn:kpiGarovWS",
      },
    };
    const options = {
      method: "POST",
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

  return (
    <Container>
      <Button onClick={() => prueba()}>prueba</Button>
      <Table
        title={() => (
          <Title search={search} setSearch={setSearch} data={guias} />
        )}
        dataSource={guias.map((service) => ({
          key: service.id,
          ...service,
        }))}
        columns={columns}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    guias: state.firestore.ordered.Guias,
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
      },
    ];
  })
)(Orders);

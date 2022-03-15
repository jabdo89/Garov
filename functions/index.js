const functions = require("firebase-functions");
const { v4 } = require("uuid");

const admin = require("firebase-admin");
const { uuid } = require("uuidv4");

admin.initializeApp();

const db = admin.firestore();

exports.grainger = functions.https.onRequest((request, response) => {
  functions.logger.log("info", request.body);
  //["soapenv:Envelope"]
  //["urn:crearGuia"]["nCliente"]["#text"]
  const id = uuid();
  db.collection("Guias")
    .doc(id)
    .set({
      id,
      cliente: "Grainger",
      comision: "4",
      costoEstadias: "4",
      costoFletes: "4",
      costoReparto: "4",
      costoTotal: "4",
      costosManiobras: "4",
      cpDestino: "66270",
      cpOrigen: "66270",
      dirrecion: "Marsella 200",
      estadoDestino: "Nuevo Leon",
      estatus: "Creado",
      fechaCompromiso: 1639348569792,
      fechaEmbarque: 1639348569792,
      horarioGeneral: "4",
      importe: "4",
      municipioDestino: "San pedro",
      numCliente: "938747",
      numFactura: "432",
      numGuia: "5432",
      numOrden: "432",
      planta: "Bodega",
      preguia: "4",
      shipBranch: "4",
      sucursal: "Walmart",
      tipoServicio: "Local",
      tipoSucursal: "Interna",
      // cliente:
      //   request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
      //     "nCliente"
      //   ]["#text"],
      // comision: "4",
      // costoEstadias: "4",
      // costoFletes: "4",
      // costoReparto: "4",
      // costoTotal: "4",
      // costosManiobras: "4",
      // cpDestino:
      //   request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
      //     "dCpdigoPostal"
      //   ]["#text"],
      // cpOrigen:
      //   request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
      //     "rCpdigoPostal"
      //   ]["#text"],
      // dirrecion: "3",
      // estadoDestino: "prueba",
      // estatus: "Creado",
      // fechaCompromiso: 1639348569792,
      // fechaEmbarque: 1639348569792,
      // horarioGeneral: "4",
      // importe: "4",
      // municipioDestino: "prueba",
      // numCliente: "prueba",
      // numFactura: "432",
      // numGuia: "5432",
      // numOrden: "432",
      // planta: "prueba",
      // preguia: "4",
      // shipBranch: "4",
      // sucursal: "prueba",
      // tipoServicio: "prueba",
      // tipoSucursal: "prueba",
      estatus: "Creado",
    })
    .then(() => {
      response.status(200).send("success");
      return 0;
    })
    .catch((err) => {
      response.status(400).send(err);
      return 0;
    });
  return;
});

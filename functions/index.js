const functions = require("firebase-functions");
const { v4 } = require("uuid");
const { Client } = require("node-scp");

const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { v4: uuidv4 } = require("uuid");

admin.initializeApp();

const db = admin.firestore();

exports.grainger = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    functions.logger.log("info", request.body);
    functions.logger.log(
      "try1",
      request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
        "dCodigoPostal"
      ]["#text"]
    );
    const id = uuidv4();
    await db
      .collection("Guias")
      .doc(id)
      .set({
        // IDs
        id,
        adminID: "11K2Fd6xULgOUCE7GIyfbeGmRW62",
        clienteID: "w0kxnLOxRSUQb9gMcq7xI5FejcO2",
        fechaCreado: new Date(),
        // Change DB "dirrecion" -> "rDireccion" "dDireccion

        // R
        nombreRemitente:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "nombreRemitente"
          ]["#text"],
        rPais:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rPais"
          ]["#text"],
        rEstado:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rEstado"
          ]["#text"],
        rMunicipio:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rMunicipio"
          ]["#text"],
        rCiudad:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rCiudad"
          ]["#text"],
        rDireccion:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rDireccion"
          ]["#text"],
        rColonia: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rColonia"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rColonia"
            ]["#text"]
          : null,
        rCodigoPostal:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rCodigoPostal"
          ]["#text"],
        rTelefono: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rTelefono"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rTelefono"
            ]["#text"]
          : null,
        rTelefonoMovil: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rTelefonoMovil"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rTelefonoMovil"
            ]["#text"]
          : null,
        rCorreoElectronico: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rCorreoElectronico"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rCorreoElectronico"
            ]["#text"]
          : null,
        // D
        nombreDestinatario:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "nombreDestinatatio"
          ]["#text"],
        dPais:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dPais"
          ]["#text"],
        dEstado:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dEstado"
          ]["#text"],
        dMunicipio:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dMunicipio"
          ]["#text"],
        dCiudad:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dCiudad"
          ]["#text"],
        dDireccion:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dDireccion"
          ]["#text"],
        dColonia: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dColonia"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dColonia"
            ]["#text"]
          : null,
        dCodigoPostal:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dCodigoPostal"
          ]["#text"],
        dTelefono: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dTelefono"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dTelefono"
            ]["#text"]
          : null,
        dTelefonoMovil: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dTelefonoMovil"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dTelefonoMovil"
            ]["#text"]
          : null,
        dCorreoElectronico: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dCorreoElectronico"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dCorreoElectronico"
            ]["#text"]
          : null,
        dNotas:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dNotas"
          ]["#text"],

        //Other
        valorDeclarado:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "valorDeclarado"
          ]["#text"],
        contenido:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "contenido"
          ]["#text"],
        largo:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "largo"
          ]["#text"],
        ancho:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "ancho"
          ]["#text"],
        alto:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "alto"
          ]["#text"],
        peso:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "peso"
          ]["#text"],
        cantidadPqte:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "cantidadPqte"
          ]["#text"],
        delivery:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "delivery"
          ]["#text"],
        nFactura:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "nFactura"
          ]["#text"],
        numCliente: "432",

        // Internal
        //Todo esto Pendiente (Preguntar a Blanca)
        estatus: "Creado",
        tipoServicio: "prueba",
        tipoSucursal: "prueba",
        planta: "prueba",
        preguia: "4",
        shipBranch: "4",
        numGuia: "5432",
        numOrden: "432",
        importe: "4",
        comision: "4",
        costoEstadias: "4",
        costoFletes: "4",
        costoReparto: "4",
        costoTotal: "4",
        costosManiobras: "4",
      })
      .then(() => {
        response
          .status(200)
          .send(
            request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "delivery"
            ]["#text"]
          );
        // Regresar delivery Num
        return 0;
      })
      .catch((err) => {
        functions.logger.log("error", err);
        response.status(400).send(err);
        return 0;
      });
    return;
  });
});

exports.crearGuiaGarov = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    const id = uuidv4();
    await db
      .collection("Guias")
      .doc(id)
      .set({
        // IDs
        id,
        adminID: "11K2Fd6xULgOUCE7GIyfbeGmRW62",
        clienteID: "w0kxnLOxRSUQb9gMcq7xI5FejcO2",
        fechaCreado: new Date(),

        // R
        nombreRemitente:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "nombreRemitente"
          ]["#text"],
        rPais:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rPais"
          ]["#text"],
        rEstado:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rEstado"
          ]["#text"],
        rMunicipio:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rMunicipio"
          ]["#text"],
        rCiudad:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rCiudad"
          ]["#text"],
        rDireccion:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rDireccion"
          ]["#text"],
        rColonia: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rColonia"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rColonia"
            ]["#text"]
          : null,
        rCodigoPostal:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "rCodigoPostal"
          ]["#text"],
        rTelefono: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rTelefono"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rTelefono"
            ]["#text"]
          : null,
        rTelefonoMovil: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rTelefonoMovil"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rTelefonoMovil"
            ]["#text"]
          : null,
        rCorreoElectronico: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["rCorreoElectronico"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "rCorreoElectronico"
            ]["#text"]
          : null,
        // D
        nombreDestinatario:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "nombreDestinatatio"
          ]["#text"],
        dPais:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dPais"
          ]["#text"],
        dEstado:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dEstado"
          ]["#text"],
        dMunicipio:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dMunicipio"
          ]["#text"],
        dCiudad:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dCiudad"
          ]["#text"],
        dDireccion:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dDireccion"
          ]["#text"],
        dColonia: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dColonia"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dColonia"
            ]["#text"]
          : null,
        dCodigoPostal:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dCodigoPostal"
          ]["#text"],
        dTelefono: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dTelefono"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dTelefono"
            ]["#text"]
          : null,
        dTelefonoMovil: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dTelefonoMovil"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dTelefonoMovil"
            ]["#text"]
          : null,
        dCorreoElectronico: request.body["soapenv:Envelope"]["soapenv:Body"][
          "urn:crearGuia"
        ]["dCorreoElectronico"]["#text"]
          ? request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "dCorreoElectronico"
            ]["#text"]
          : null,
        dNotas:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "dNotas"
          ]["#text"],

        //Other
        valorDeclarado:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "valorDeclarado"
          ]["#text"],
        contenido:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "contenido"
          ]["#text"],
        largo:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "largo"
          ]["#text"],
        ancho:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "ancho"
          ]["#text"],
        alto:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "alto"
          ]["#text"],
        peso:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "peso"
          ]["#text"],
        cantidadPqte:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "cantidadPqte"
          ]["#text"],
        delivery:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "delivery"
          ]["#text"],
        nFactura:
          request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
            "nFactura"
          ]["#text"],

        // Internal
        //Todo esto Pendiente (Preguntar a Blanca)
        estatus: "Creado",
        eventos: [{ statusid: 1, status: "Creado", fecha: new Date() }],
        tipoServicio: "prueba",
        tipoSucursal: "prueba",
        numCliente: "432",
        planta: "prueba",
        preguia: "4",
        shipBranch: "4",
        numGuia: "5432",
        numOrden: "432",
        importe: "4",
        comision: "4",
        costoEstadias: "4",
        costoFletes: "4",
        costoReparto: "4",
        costoTotal: "4",
        costosManiobras: "4",
      })
      .then(() => {
        response
          .status(200)
          .send(
            request.body["soapenv:Envelope"]["soapenv:Body"]["urn:crearGuia"][
              "delivery"
            ]["#text"]
          );
        return 0;
      })
      .catch((err) => {
        functions.logger.log("error", err);
        response.status(400).send(err);
        return 0;
      });
    return;
  });
});

exports.cancelarGuiaGarov = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    functions.logger.log("Call", request);
    await db
      .collection("Guias")
      .where(
        "delivery",
        "==",
        request.body["soapenv:Envelope"]["soapenv:Body"]["urn:cancelarGuia"][
          "delivery"
        ]["#text"]
      )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("Guias")
            .doc(doc.id)
            .delete()
            .then(() => {
              response.status(200).send("Guia Cancelada");
              return 0;
            })
            .catch((err) => {
              functions.logger.log("error", err);
              response.status(400).send(err);
              return 0;
            });
        });
      });
    querySnapshot
      .empty(() => {
        response.status(400).send("Delivery no existe");
        return 0;
      })
      .catch((error) => {
        response.status(400).send(error);
        return 0;
      });

    return;
  });
});

exports.trackingGarov = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    functions.logger.log("Call", request);
    let info = {};
    await db
      .collection("Guias")
      .where(
        "delivery",
        "==",
        request.body["soapenv:Envelope"]["soapenv:Body"]["urn:trackingGuia"][
          "delivery"
        ]["#text"]
      )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          info = doc.data();

          response
            .status(200)
            .send({ eventos: info.eventos, tracking: "url.com" });
          return 0;
        });

        querySnapshot
          .empty(() => {
            response.status(400).send("Delivery no existe");
            return 0;
          })
          .catch((err) => {
            functions.logger.log("error", err);
            response.status(400).send(err);
            return 0;
          });
      });
    return;
  });
});

exports.subirEvidenciaGarov = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      functions.logger.log("request", request);
      const client = await Client({
        host: "187.191.93.229", //remote host ip
        port: 22, //port used for scp
        username: "ftpGarov", //username to authenticate
        password: "3NFt9k8TWY", //password to authenticate
      });
      //Archivos siempre seran pdf nombrados con el nombre del delivery a 10 digitos y la extension pdf ejemplo 6464646464.pdf
      //En el ejemplo el archivo se renombra a test.txt y test1.txt solo para pruebas
      functions.logger.log(request);
      await client.uploadFile(
        request.body.archive,
        "/PruebasdeEntrega/" + request.body.name + ".txt"
      ); //Carpeta destino siempre sera /PruebasdeEntrega/
      //Aqui iria la carga de todos los archivos pendientes
      client.close(); // Cerrar conexion
      response.status(400).send("Success");
    } catch (e) {
      functions.logger.log("Error controlado: ", e);
      response.status(400).send("Error");
    }
  });
});

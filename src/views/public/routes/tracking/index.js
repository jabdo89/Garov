import React, { useEffect, useState } from "react";
import { Input, Button, Typography, message } from "antd";
import PublicLayout from "../../../../layouts/public";
import moment from "moment";
import firebase from "firebase";
import { ElementsContainer, Menu } from "./elements";
import Modal from "./components/history-modal";
import useQueryParam from "./hooks";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Tracking = () => {
  const [service, setService] = useQueryParam("delivery");
  const [locationData, setLocationData] = useState();
  const [locationTrackerRef, setLocationTrackerRef] = useState();
  const [deliveryData, setDeliveryData] = useState();
  const [serviceData, setServiceData] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let temp;
    if (service) {
      firebase
        .firestore()
        .collection("Guias")
        .where("delivery", "==", service)
        .get()
        // eslint-disable-next-line consistent-return
        .then((snapshot) => {
          if (snapshot.empty) {
            setLocationTrackerRef();
            setLocationData();
            setService("");
          }
          snapshot.forEach((doc) => {
            temp = doc.data();
            setServiceData(temp);
          });
        });
    }
  }, []);

  useEffect(() => {
    if (locationTrackerRef) {
      firebase
        .firestore()
        .collection("Guias")
        .where("delivery", "==", service)
        .get()
        // eslint-disable-next-line consistent-return
        .then((snapshot) => {
          if (snapshot.empty) {
            setLocationTrackerRef();
            setLocationData();
            setService("");
          }
          snapshot.forEach((doc) => {
            locationTrackerRef.on("value", (snapshot) => {
              if (!snapshot.exists()) {
                setLocationTrackerRef();
                setLocationData();
                message.warning("El código es inválido");
                setService("");
              } else {
                const data = snapshot.val();
                setLocationData(data);
              }
            });
          });
        });
    }
  }, [locationTrackerRef]);

  const establishTracker = (value) => {
    let temp;
    if (value) {
      firebase
        .firestore()
        .collection("Guias")
        .where("delivery", "==", value)
        .get()
        // eslint-disable-next-line consistent-return
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log("hey");
            message.warning("El código es inválido");
          }
          snapshot.forEach((doc) => {
            const ref = doc.id;
            temp = doc.data();
            setServiceData(temp);
            setService(temp.delivery);
            setLocationData(temp);
          });
        });
    }
  };

  const messageSatus = (data) => {
    if (data === "Creado" || data === "Escaneado" || data === "Documentado") {
      return "Tu entrega esta siendo procesada";
    } else if (data === "En Corrida") {
      return "Tu entrega esta en camino";
    } else if (data === "Entregado") {
      return "Tu entrega esta entregada";
    } else if (data === "Regresado") {
      return "Tu entrega se intento entregar";
    } else {
      return null;
    }
  };

  return (
    <PublicLayout>
      <ElementsContainer
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Menu>
          <Title level={5}>Rastrea tu envío</Title>
          <Search
            placeholder="Código"
            disabled={locationData}
            defaultValue={service}
            onSearch={establishTracker}
            size="large"
            style={{ width: 350 }}
          />
          {locationData && (
            <>
              <Button
                onClick={() => {
                  setLocationData();
                  setService("");
                }}
                type="link"
              >
                Reset
              </Button>
              <Paragraph strong style={{ margin: 0 }}>
                Estatus
              </Paragraph>
              <Paragraph>{locationData.estatus}</Paragraph>
              <Paragraph>{messageSatus(locationData.estatus)}</Paragraph>
              <Paragraph strong style={{ margin: 0 }}>
                Última actualización
              </Paragraph>
              <Paragraph>
                {moment(
                  locationData?.eventos[locationData.eventos.length - 1].fecha
                    .seconds * 1000
                ).format("lll")}
              </Paragraph>
              <Paragraph strong style={{ margin: 0 }}>
                Info de Pedido
              </Paragraph>
              <Paragraph>{locationData.nombreDestinatario}</Paragraph>
              <Paragraph style={{ width: 300 }}>
                {locationData.dDireccion}
              </Paragraph>
              <Button outline onClick={() => setShowModal(true)}>
                Ver Historial de paquete
              </Button>
              <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                eventos={locationData.eventos}
              />
            </>
          )}
        </Menu>
      </ElementsContainer>
    </PublicLayout>
  );
};

export default Tracking;

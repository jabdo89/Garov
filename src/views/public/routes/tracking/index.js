import React, { useEffect, useState } from "react";
import { Input, Button, Typography, message } from "antd";
import PublicLayout from "../../../../layouts/public";
import moment from "moment";
import { useFirebase } from "react-redux-firebase";
import { ElementsContainer, Menu } from "./elements";
import useQueryParam from "./hooks";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Tracking = () => {
  const [db, setDb] = useState();
  const [service, setService] = useQueryParam("service");
  const [locationData, setLocationData] = useState();
  const [locationTrackerRef, setLocationTrackerRef] = useState();
  const [deliveryData, setDeliveryData] = useState();
  const [serviceData, setServiceData] = useState();
  const [deliveryIndex, setDeliveryIndex] = useState();

  const firebase = useFirebase();

  useEffect(() => {
    if (firebase) {
      setDb(firebase.database());
    }
  }, [firebase]);

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
            setLocationTrackerRef(ref);
            setService(doc.id);
            setLocationData(temp);
          });
        });
    }
  };

  if (serviceData && deliveryIndex) {
    console.log(serviceData.deliveries[deliveryIndex].location.lat);
  }
  console.log(deliveryData);
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
                Última actualización
              </Paragraph>
              <Paragraph>{moment(new Date()).format("lll")}</Paragraph>
              <Paragraph strong style={{ margin: 0 }}>
                Info de Pedido
              </Paragraph>
              <Paragraph>{locationData.nombreDestinatario}</Paragraph>
              <Paragraph>{locationData.dDireccion}</Paragraph>
              <Paragraph>{locationData.estatus}</Paragraph>
            </>
          )}
        </Menu>
      </ElementsContainer>
    </PublicLayout>
  );
};

export default Tracking;

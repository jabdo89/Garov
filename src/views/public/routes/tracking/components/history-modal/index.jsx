import React from "react";
import { Drawer, Timeline } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import shortid from "shortid";

const HistoryModal = ({ showModal, setShowModal, eventos }) => {
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <Drawer
      title="Historial de Paquete"
      visible={showModal}
      onClose={onClose}
      destroyOnClose={true}
      forceRender={true}
      keyboard={false}
      mask={false} // https://github.com/ant-design/ant-design/issues/25870#issuecomment-854674355
      width={"30vw"}
    >
      <Timeline reverse={true} style={{ width: "100%" }}>
        {eventos?.map((event) => {
          return (
            <Timeline.Item
              key={shortid.generate()}
              style={{ marginBottom: 20 }}
            >
              {`${moment(event.fecha.seconds * 1000).format("lll")} - ${
                event.status
              }`}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Drawer>
  );
};

HistoryModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default React.memo(HistoryModal);

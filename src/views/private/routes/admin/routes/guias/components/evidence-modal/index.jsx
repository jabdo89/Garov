import React from "react";
import PropTypes from "prop-types";
import { Image, Input, Modal, Row } from "antd";
import { CarouselImageContainer } from "./elements";

const EvidenceModal = ({ parcelEvidence, setParcelEvidence }) => {
  return (
    <Modal
      visible={parcelEvidence}
      onOk={() => setParcelEvidence(undefined)}
      onCancel={() => setParcelEvidence(undefined)}
      cancelText={null}
      closable={false}
    >
      <div key={parcelEvidence}>
        <Row>
          <CarouselImageContainer>
            <Image height="60vh" src={parcelEvidence} alt={parcelEvidence} />
          </CarouselImageContainer>
        </Row>
      </div>
    </Modal>
  );
};

EvidenceModal.propTypes = {
  parcelEvidence: PropTypes.object,
  setParcelEvidence: PropTypes.func.isRequired,
};

export default EvidenceModal;

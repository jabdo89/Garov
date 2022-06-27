import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import shortid from "shortid";
import { FileImageOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip, Button } from "antd";
import Title from "./table-title";
import { Container } from "./elements";

const Admins = ({ users }) => {
  const columns = [
    {
      title: "Nombre",
      key: "nombre",
      dataIndex: "nombre",
      render: (name) => (
        <Tag color="blue" key={shortid.generate()}>
          {name}
        </Tag>
      ),
    },
    {
      title: "Correo Admin",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
  ];

  if (!users) {
    return null;
  }

  return (
    <Container>
      <Table
        title={() => <Title data={users} />}
        dataSource={users.map((service) => ({
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
    users: state.firestore.ordered.Users,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (props.profile.userID === undefined) return [];

    return [
      {
        collection: "Users",
        where: [["rol", "==", "Main"]],
      },
    ];
  })
)(Admins);

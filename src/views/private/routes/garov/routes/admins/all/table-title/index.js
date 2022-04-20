import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Typography, Button } from "antd";
import { TitleContainer } from "./elements";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Search } = Input;

const TableTitle = ({ search, setSearch, data }) => {
  return (
    <TitleContainer>
      <Title style={{ margin: "auto 10px" }} level={3}>
        Admins
      </Title>
      <Link to="/admins/new">
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Admin
        </Button>
      </Link>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;

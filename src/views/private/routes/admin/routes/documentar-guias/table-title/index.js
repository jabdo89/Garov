import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Typography } from "antd";
import { TitleContainer } from "./elements";

const { Title } = Typography;
const { Search } = Input;

const TableTitle = ({ search, setSearch, data }) => {
  return (
    <TitleContainer>
      <Title style={{ margin: "auto 10px" }} level={3}>
        Documentar Guias
      </Title>
      <Search
        style={{ width: 250, marginRight: 10 }}
        allowClear
        value={search}
        placeholder="Buscar #Delivery"
        onChange={({ target: { value } }) => setSearch(value)}
      />
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;

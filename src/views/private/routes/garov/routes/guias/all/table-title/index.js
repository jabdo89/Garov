import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Typography } from "antd";
import { TitleContainer } from "./elements";
import ExcelExport from "../ExcelExport";
import ExcelFormater from "../excel";

const { Title } = Typography;
const { Search } = Input;

const TableTitle = ({ search, setSearch, data }) => {
  return (
    <TitleContainer>
      <Title style={{ margin: "auto 10px" }} level={3}>
        Admin
      </Title>
      <ExcelExport fileExport={ExcelFormater} data={data} />
      <Search
        style={{ width: 250, margin: "auto 10px auto auto" }}
        allowClear
        value={search}
        placeholder="Buscar Guia"
        onChange={({ target: { value } }) => setSearch(value)}
      />
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;

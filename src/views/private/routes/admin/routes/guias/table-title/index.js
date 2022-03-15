import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { Input, Typography, DatePicker } from "antd";
import { TitleContainer } from "./elements";
import ExcelExport from "../ExcelExport";
import ExcelFormater from "../excel";

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TableTitle = ({ search, setSearch, setStatus, setDateRange, data }) => {
  return (
    <TitleContainer>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Title style={{ margin: "auto 10px" }} level={3}>
          Consultar Guias
        </Title>
        <div style={{ width: "45%" }}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "30%", marginRight: 40 }}
            placeholder="Filtrar por Estatus"
            defaultValue={[]}
            onChange={(e) => setStatus(e)}
          >
            <Option key={"Creado"}>Creado</Option>
            <Option key={"Modificando"}>Modificando</Option>
            <Option key={"Entregando"}>Entregando</Option>
            <Option key={"Entregado"}>Entregado</Option>
          </Select>
          <RangePicker
            onChange={(e) => setDateRange(e)}
            style={{ width: "50%", marginRigth: 40 }}
            placeholder={["Comienzo", "Fin"]}
          />
        </div>
        <div>
          <Search
            style={{ width: 250, marginRight: 10 }}
            allowClear
            value={search}
            placeholder="Buscar Guia"
            onChange={({ target: { value } }) => setSearch(value)}
          />
          <ExcelExport fileExport={ExcelFormater} data={data} />
        </div>
      </div>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;

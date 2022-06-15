import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import moment from "moment";
import { Input, Typography, DatePicker, Tooltip } from "antd";
import { TitleContainer } from "./elements";
import ExcelExport from "../ExcelExport";
import ExcelFormater from "../excel";

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TableTitle = ({
  search,
  setSearch,
  setStatus,
  dateRange,
  setDateRange,
  data,
}) => {
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
            <Option key={"Escaneado"}>Escaneado</Option>
            <Option key={"Documentado"}>Documentado</Option>
            <Option key={"En Corrida"}>En Corrida</Option>
            <Option key={"Entregado"}>Entregado</Option>
            <Option key={"Regresado"}>Regresado</Option>
          </Select>
          <RangePicker
            onChange={(e) => setDateRange(e)}
            style={{ width: "50%", marginRigth: 40 }}
            placeholder={["Comienzo", "Fin"]}
            value={
              dateRange ? dateRange : [moment().subtract(7, "d"), moment()]
            }
          />
        </div>
        <div>
          <Search
            style={{ width: 250, marginRight: 10 }}
            allowClear
            value={search}
            placeholder="Buscar Delivery #"
            onChange={({ target: { value } }) => setSearch(value)}
          />
          <Tooltip placement="bottom" title={"Exportar Excel"}>
            <ExcelExport fileExport={ExcelFormater} data={data} />
          </Tooltip>
        </div>
      </div>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;

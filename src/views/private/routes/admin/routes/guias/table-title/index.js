import React from "react";
import PropTypes from "prop-types";
import { Select, Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
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
        <div
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RangePicker
            onChange={(e) => setDateRange(e)}
            style={{ width: "30%" }}
            placeholder={["Comienzo", "Fin"]}
            value={
              dateRange ? dateRange : [moment().subtract(7, "d"), moment()]
            }
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: "30%" }}
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
          <Link to="/guias/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Crear Guia
            </Button>
          </Link>
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

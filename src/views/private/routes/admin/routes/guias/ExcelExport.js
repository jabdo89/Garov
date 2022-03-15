import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import XLSX from "xlsx";

const defaultExcelExport = (data) => {
  let worksheet = XLSX.utils.json_to_sheet(data);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, "data.xlsx");
};

const ExcelExport = ({ data = [], fileExport = defaultExcelExport }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      onClick={() => fileExport(data)}
    >
      <DownloadOutlined />
    </Button>
  );
};

export default ExcelExport;

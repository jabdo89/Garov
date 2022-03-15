import React from 'react';
import { Button } from 'antd';
import XLSX from 'xlsx';

const defaultExcelExport = data => {
  let worksheet = XLSX.utils.json_to_sheet(data);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, 'data.xlsx');
};

const ExcelExport = ({ data = [], fileExport = defaultExcelExport }) => {
  return <Button onClick={() => fileExport(data)}>Exportar a Excel</Button>;
};

export default ExcelExport;

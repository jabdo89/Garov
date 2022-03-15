import XLSX from "xlsx";
import moment from "moment";

const ClientsExcelFormatter = (data) => {
  let wb = XLSX.utils.book_new();

  let transformedData = data.map((obj) => ({
    paciente: obj.user ? `${obj.user}` : "",
    seguimiento: obj.name ? `${obj.name}` : "",
    valor: obj.value ?? "",
    fecha: obj.date ? moment(obj.date.seconds * 1000).format("ll") : "",
  }));

  const ws = XLSX.utils.json_to_sheet(transformedData);

  XLSX.utils.book_append_sheet(wb, ws, "Dirreciones");
  XLSX.writeFile(wb, "dirreciones.xlsx");
};

export default ClientsExcelFormatter;

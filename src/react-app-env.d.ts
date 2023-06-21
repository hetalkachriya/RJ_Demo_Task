/// <reference types="react-scripts" />
interface CellProps {
  rowId: string;
  columnId: string;
  value: any;
  type: string;
  onCellEdit: (rowId: string, columnId: string, value: any) => void;
}


interface Column {
  id: string;
  ordinalNo: number;
  title: string;
  type: string;
  width?: number;
}

interface Row {
  id: string;
  [columnId: string]: any;
}

interface TableData {
  columns: Column[];
  data: Row[];
}

interface Props {
  tableData: TableData;
}
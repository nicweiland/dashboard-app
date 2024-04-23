declare module 'src/app/react-components/DataTable' {
  import { FC } from 'react';

  interface DataRow {
    id: number;
    name: string;
    age: number;
    location: string;
  }

  interface DataTableProps {
    data: DataRow[];
  }

  const DataTable: FC<DataTableProps>;
  export default DataTable;
}

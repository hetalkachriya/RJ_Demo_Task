import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const Table: React.FC<Props> = ({ tableData }) => {
  console.log("🚀 ~ file: table.tsx:5 ~ tableData:", tableData)
  const [data, setData] = useState(tableData.data);
  const [visibleColumns, setVisibleColumns] = useState<{ [columnId: string]: boolean }>(
    tableData.columns.reduce((obj, column) => ({ ...obj, [column.id]: true }), {})
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleCellEdit = (rowId: string, columnId: string, value: any) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  const handleColumnToggle = (columnId: string) => {
    setVisibleColumns((prevVisibleColumns) => ({
      ...prevVisibleColumns,
      [columnId]: !prevVisibleColumns[columnId],
    }));
  };
  const handleSave = () => {
    localStorage.setItem('tableData', JSON.stringify(data));
    alert('Data saved successfully!');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (columnId: string) => {
    if (sortConfig && sortConfig.column === columnId) {
      // Toggle the sort direction if the same column is clicked again
      const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
      setSortConfig({ column: columnId, direction });
    } else {
      // Set the column and default sort direction (ascending) if a new column is clicked
      setSortConfig({ column: columnId, direction: 'asc' });
    }
  };
  const renderSortIcon = (columnId: string) => {
    if (sortConfig && sortConfig.column === columnId) {
      if (sortConfig.direction === 'asc') {
        return <span>&uarr;</span>; // Ascending sort icon (up arrow)
      } else {
        return <span>&darr;</span>; // Descending sort icon (down arrow)
      }
    }
    return null;
  };
  const sortedData =
    data.length > 0 &&
    [...data].sort((a, b) => {
      if (!sortConfig) {
        return 0;
      }
      const { column, direction } = sortConfig;

      const valueA = a[column];
      const valueB = b[column];

      if (valueA === valueB) {
        return 0;
      }

      if (direction === 'asc') {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });
  const filteredData =
    sortedData &&
    sortedData.filter((row: any) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className='h-screen bg-[#d8d8ed85] flex items-center justify-center'>
      <div className='max-w-[900px] w-full table-box mx-auto py-[40px]'>
        <input
          type='text'
          className='max-w-[400px] w-full mb-[15px] p-[10px_20px] rounded-[6px] border border-[#ddd]'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search...'
        />
        <div className='max-w-[817px] overflow-x-scroll w-auto max-h-[400px] tableres'>
          <table>
            <thead>
              <tr>
                {tableData.columns.map((column) => {
                  if (!visibleColumns[column.id]) {
                    return null;
                  }
                  return (
                    <th key={column.id} style={{ width: column.width }} onClick={() => handleSort(column.id)} className='cursor-pointer'>
                      {column.title}
                      {renderSortIcon(column.id)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData?.map((row: any) => (
                  <tr key={row.id}>
                    {tableData.columns.map((column) => {
                      if (!visibleColumns[column.id]) {
                        return null;
                      }
                      return (
                        <td key={column.id}>
                          <Cell
                            rowId={row.id}
                            columnId={column.id}
                            value={row[column.id]}
                            type={column.type}
                            onCellEdit={handleCellEdit}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                {tableData.columns.map((column) => (
                  <td key={column.id}>
                    <label>
                      <input
                        type='checkbox'
                        checked={visibleColumns[column.id]}
                        onChange={() => handleColumnToggle(column.id)}
                      />
                      {column.title}
                    </label>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        <div className='btn-group mt-[15px]'>
          <button
            onClick={handleSave}
            className='text-[#000] p-[10px_15px] max-w-[100px] bg-[#ebebf6] border border-[#959595] w-full rounded-[6px]'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

import React from 'react';
import TableData from './components/table';
import { tableData } from './data/tableData';
import './App.css';

const App = () => {
  return (
    <div>
      <TableData tableData={tableData} />
    </div>
  );
};

export default App;

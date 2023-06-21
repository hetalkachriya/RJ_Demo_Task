export const tableData: TableData = {
  columns: [],
  data: [],
};

const numColumns = 10;
const numRows = 10;

// Generate column data
for (let i = 1; i <= numColumns; i++) {
  const columnType = getRandomColumnType();
  const column: Column = {
    id: `column${i}`,
    ordinalNo: i,
    title: `Column ${i}`,
    type: columnType,
    width: 100,
  };
  tableData.columns.push(column);
}

// Generate row data
for (let i = 1; i <= numRows; i++) {
  const row: Row = { id: `row${i}` };
  for (let j = 1; j <= numColumns; j++) {
    const columnName = `column${j}`;
    const columnType = tableData.columns[j - 1].type;
    row[columnName] = generateRandomData(columnType);
  }
  tableData.data.push(row);
}

// Helper function to get a random column type
function getRandomColumnType(): string {
  const columnTypes = ['boolean', 'selection', 'string'];
  const randomIndex = Math.floor(Math.random() * columnTypes.length);
  return columnTypes[randomIndex];
}

// Helper function to generate random data based on column type
function generateRandomData(columnType: string): any {
  if (columnType === 'boolean') {
   const checkboxValue = Math.random() < 0.5;
   const checkboxLabel = generateRandomString(); // Generate random string for checkbox label
   return Math.random() < 0.5;
  } else if (columnType === 'selection') {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  } else {
    return generateRandomString();
  }
}

// Helper function to generate a random string
function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const length = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

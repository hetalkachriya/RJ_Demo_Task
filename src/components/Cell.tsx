const Cell: React.FC<CellProps> = ({ rowId, columnId, value, type, onCellEdit }) => {
  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onCellEdit(rowId, columnId, e.target.value);
  };

  let content;
  if (type === 'boolean') {
    content = (
      <div className='flex whitespace-nowrap'>
        <input
          type='checkbox'
          checked={value}
          onChange={(e) => onCellEdit(rowId, columnId, e.target.checked)}
        />
        <label className='ml-2'>{value}</label>
        </div>
    );
  } else if (type === 'selection') {
    content = (
      <select value={value} onChange={handleCellChange}>
        <option value=''>-- Select --</option>
        <option>India</option>
        <option>US</option>
        <option>UK</option>
        {/* Add options here */}
      </select>
    );
  } else {
    content = (
      <input
        type='text'
        value={value}
        onChange={handleCellChange}
        onBlur={(e) => onCellEdit(rowId, columnId, e.target.value)}
      />
    );
  }

  return content;
};

export default Cell
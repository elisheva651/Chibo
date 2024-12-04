import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ToExel() {
  const [jsonData, setJsonData] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      // Parse the Excel file
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      // Get the first sheet name
      const sheetName = workbook.SheetNames[0];

      // Get the sheet object
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet data to JSON
      const data = XLSX.utils.sheet_to_json(sheet);

      // Set the data to state
      setJsonData(data);
    };

    // Read the file as binary string
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <input type="file" onChange={handleFileUpload} />
      
      <h2>JSON Data</h2>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
}

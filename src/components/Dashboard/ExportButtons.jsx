import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { exportToPDF, exportToCSV } from '../../services/export';

const ExportButtons = ({ data }) => {
  return (
    <ButtonGroup className="mb-3">
      <Button variant="primary" onClick={() => exportToPDF(data)}>
        Export PDF
      </Button>
      <Button variant="success" onClick={() => exportToCSV(data)}>
        Export CSV
      </Button>
    </ButtonGroup>
  );
};

export default ExportButtons;

import jsPDF from 'jspdf';
import Papa from 'papaparse';

export const exportToPDF = (data, filename = 'payout-report.pdf') => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Payout Report', 20, 20);
  
  let yPosition = 40;
  data.forEach((item, index) => {
    doc.setFontSize(10);
    doc.text(`${item.author}: $${item.payout}`, 20, yPosition);
    yPosition += 10;
    
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  doc.save(filename);
};

export const exportToCSV = (data, filename = 'payout-report.csv') => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};

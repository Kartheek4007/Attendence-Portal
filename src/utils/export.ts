import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import type { ReportData } from '../types';

export const generatePDF = (data: ReportData[], title: string, columns: string[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Title
  doc.setFontSize(16);
  doc.text(title, pageWidth / 2, 15, { align: 'center' });

  // Date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 25, {
    align: 'center',
  });

  // Table
  const startY = 35;
  const rowHeight = 7;
  const colWidth = pageWidth / columns.length;

  // Header
  doc.setFontSize(9);
  doc.setFillColor(41, 128, 185);
  doc.setTextColor(255, 255, 255);
  columns.forEach((col, i) => {
    doc.text(col, 10 + i * colWidth, startY, {
      align: 'center',
    });
  });

  // Data rows
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(245, 245, 245);
  data.forEach((row: any, rowIndex) => {
    const y = startY + (rowIndex + 1) * rowHeight;
    if (y > pageHeight - 10) {
      doc.addPage();
    }
    columns.forEach((col, colIndex) => {
      const value = row[col.toLowerCase().replace(/\s/g, '')] || '';
      doc.text(String(value), 10 + colIndex * colWidth, y, {
        align: 'center',
      });
    });
  });

  return doc;
};

export const exportToExcel = (data: ReportData[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToCSV = (data: ReportData[], fileName: string) => {
  const csv = XLSX.utils.json_to_sheet(data);
  const csvContent = XLSX.utils.sheet_to_csv(csv);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
};

export const generateQRCode = async () => {
  const QRCode = await import('qrcode.react');
  return QRCode;
};

export const downloadQRCode = (qrRef: any, fileName: string = 'qrcode') => {
  const canvas = qrRef.current?.querySelector('canvas');
  if (canvas) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${fileName}.png`;
    link.click();
  }
};

export const parseCSV = (csvText: string) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1).map((line) => {
    const values = line.split(',');
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim();
    });
    return obj;
  });
  return data;
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateAttendancePercentage = (
  presentDays: number,
  totalDays: number
) => {
  if (totalDays === 0) return 0;
  return ((presentDays / totalDays) * 100).toFixed(2);
};

export const getAttendanceStatus = (percentage: number) => {
  if (percentage >= 75) return { status: 'Good', color: 'text-green-600' };
  if (percentage >= 60) return { status: 'Warning', color: 'text-yellow-600' };
  return { status: 'Alert', color: 'text-red-600' };
};

/**
 * PDF Certificate Generation
 * 
 * Creates a satirical PDF certificate for purchased Nothing.
 * Uses jsPDF for client-side PDF generation.
 * 
 * DESIGN NOTE: Keeping it simple - no actual PDF signature required.
 * The humor is in the absurdity, not production quality.
 */

import { jsPDF } from 'jspdf';

export function generateCertificatePDF(order) {
  const doc = new jsPDF();
  
  // Background simulation with colors (jsPDF doesn't support fillRect)
  doc.setFillColor(47, 47, 47); // Dark slate
  doc.rect(0, 0, 210, 297, 'F'); // Fill rectangle
  
  // Certificate border
  doc.setDrawColor(139, 0, 0); // Maroon border
  doc.setLineWidth(2);
  doc.rect(10, 10, 190, 277);
  
  // Title with gradient effect (simulated with text colors)
  doc.setTextColor(255, 215, 0); // Gold
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATE OF NOTHING', 105, 40, { align: 'center' });
  
  // Subtitle
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('This certifies that you have purchased:', 105, 60, { align: 'center' });
  
  // Recipient name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(order.name, 105, 80, { align: 'center' });
  
  // Certificate body
  doc.setFontSize(14);
  doc.setFont('helvetica', 'italic');
  doc.text('has successfully acquired', 105, 100, { align: 'center' });
  
  // Product name (the Nothing itself)
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(176, 196, 222); // Soft blue for the Nothing
  const productName = order.items[0]?.name || 'nothing';
  const productNameLines = doc.splitTextToSize(productName, 150);
  const yPos = 115 + ((productNameLines.length - 1) * 8);
  doc.text(productName, 105, yPos, { align: 'center' });
  
  // Order details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  
  doc.text(`Order ID: ${order.orderId}`, 105, 160, { align: 'center' });
  doc.text(`Date: ${order.date}`, 105, 170, { align: 'center' });
  doc.text(`Amount paid: ${order.total}`, 105, 180, { align: 'center' });
  
  // The punchline
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('[ NOTHING CAPTURED ]', 105, 220, { align: 'center' });
  
  // Legal disclaimer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'italic');
  
  const disclaimer = [
    'This certificate has no real value. You have purchased nothing.',
    'This is performance art. There is nothing to ship.',
    'By purchasing, you acknowledge that you are buying absolutely nothing.',
    'All rights (to nothing) reserved.'
  ];
  
  const lines = doc.splitTextToSize(disclaimer.join(' '), 180);
  const disclaimerY = 240 - ((lines.length - 1) * 5);
  
  lines.forEach((line, i) => {
    doc.text(line, 105, disclaimerY + (i * 5), { align: 'center' });
  });
  
  return doc;
}

export default generateCertificatePDF;

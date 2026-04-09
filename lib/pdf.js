/**
 * PDF Certificate Generation
 * 
 * Creates an elegant satirical PDF certificate for purchased Nothing.
 * Uses jsPDF for client-side PDF generation.
 * 
 * Design: Luxury Gold - Navy background, gold borders, ornamental flourishes,
 * and a wax-seal aesthetic for the ultimate satirical proof of purchase.
 */

import { jsPDF } from 'jspdf';

export function generateCertificatePDF(order) {
  const doc = new jsPDF();
  const pageWidth = 210;
  const pageHeight = 297;
  const centerX = pageWidth / 2;
  
  // Color palette
  const colors = {
    navy: [26, 26, 46],
    gold: [212, 175, 55],
    goldLight: [201, 162, 39],
    cream: [245, 245, 220],
    white: [255, 255, 255],
    gray: [180, 180, 180],
    darkGray: [100, 100, 100],
  };

  // Background - deep navy
  doc.setFillColor(...colors.navy);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Add subtle gradient overlay effect (lighter center)
  doc.setFillColor(40, 40, 70);
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40, 'F');

  // Outer gold border
  doc.setDrawColor(...colors.gold);
  doc.setLineWidth(1.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Inner gold border
  doc.setLineWidth(0.5);
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40);

  // Corner flourishes
  const cornerSize = 12;
  const corners = [
    [15, 15],      // top-left
    [pageWidth - 15, 15],      // top-right
    [15, pageHeight - 15],    // bottom-left
    [pageWidth - 15, pageHeight - 15], // bottom-right
  ];

  corners.forEach(([x, y], i) => {
    const flipX = i % 2 === 1 ? -1 : 1;
    const flipY = i >= 2 ? -1 : 1;
    doc.setDrawColor(...colors.gold);
    doc.setLineWidth(0.5);
    // L-shaped corner accent
    doc.line(x, y + (flipY * cornerSize), x, y);
    doc.line(x, y, x + (flipX * cornerSize), y);
  });

  // Title section
  doc.setTextColor(...colors.gold);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATE OF NOTHING', centerX, 48, { align: 'center' });

  // Ornamental divider under title - single elegant line
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 50, 60, centerX + 50, 60);

  // Subtitle
  doc.setTextColor(...colors.cream);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text('This certifies that the distinguished', centerX, 75, { align: 'center' });

  // Recipient name - prominent
  doc.setTextColor(...colors.white);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(order.name, centerX, 88, { align: 'center' });

  // Decorative line under name
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.3);
  doc.line(centerX - 30, 93, centerX + 30, 93);

  // Body text
  doc.setTextColor(...colors.cream);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('has successfully acquired', centerX, 103, { align: 'center' });

  // Product name - the Nothing itself
  doc.setTextColor(...colors.gold);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  const productName = order.items[0]?.name || 'NOTHING';
  doc.text(productName, centerX, 118, { align: 'center' });

  // Second ornamental divider - single elegant line
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 45, 125, centerX + 45, 125);

  // Order details section
  doc.setTextColor(...colors.gray);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const detailsY = 140;
  const lineHeight = 8;

  doc.text(`Order Number: ${order.orderId}`, centerX, detailsY, { align: 'center' });
  doc.text(`Date: ${order.date}`, centerX, detailsY + lineHeight, { align: 'center' });
  doc.text(`Amount: ${order.total}`, centerX, detailsY + (lineHeight * 2), { align: 'center' });

  // Wax seal / stamp effect - circular badge
  const sealX = centerX;
  const sealY = 190;
  const sealRadius = 22;

  // Seal outer circle
  doc.setDrawColor(...colors.gold);
  doc.setLineWidth(2);
  doc.circle(sealX, sealY, sealRadius);

  // Seal inner circle
  doc.setLineWidth(0.5);
  doc.circle(sealX, sealY, sealRadius - 3);

  // Seal text
  doc.setTextColor(...colors.gold);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('[ NOTHING', sealX, sealY - 4, { align: 'center' });
  doc.text('CAPTURED ]', sealX, sealY + 3, { align: 'center' });

  // Small decorative dots around seal
  doc.setFontSize(6);
  doc.setTextColor(...colors.goldLight);
  doc.text('.', sealX - 28, sealY - 10, { align: 'center' });
  doc.text('.', sealX + 28, sealY - 10, { align: 'center' });
  doc.text('.', sealX - 28, sealY + 10, { align: 'center' });
  doc.text('.', sealX + 28, sealY + 10, { align: 'center' });

  // Legal disclaimer - subtle at bottom
  doc.setTextColor(...colors.darkGray);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');

  const disclaimer = [
    'This certificate confirms the purchase of absolutely nothing.',
    'For legal purposes, this document acknowledges nothing was received.',
    'All rights to nothing are reserved. The Nothing Store™ is not responsible for emptiness.',
    'This certificate is printed on premium virtual paper. Nothing physical will be shipped.'
  ];

  let disclaimerY = 230;
  disclaimer.forEach((line) => {
    doc.text(line, centerX, disclaimerY, { align: 'center' });
    disclaimerY += 5;
  });

  // Bottom decorative line
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(50, 258, 160, 258);

  // Footer
  doc.setTextColor(...colors.gold);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('The Nothing Store', centerX, 268, { align: 'center' });

  doc.setTextColor(...colors.gray);
  doc.setFontSize(7);
  doc.text('Premium Nothing Since Today', centerX, 275, { align: 'center' });

  // Decorative corner dots
  doc.setTextColor(...colors.goldLight);
  doc.setFontSize(8);
  const dotPositions = [
    [35, 35], [175, 35], [35, 262], [175, 262]
  ];
  dotPositions.forEach(([x, y]) => {
    doc.text('•', x, y, { align: 'center' });
  });

  return doc;
}

export default generateCertificatePDF;

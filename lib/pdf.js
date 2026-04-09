/**
 * PDF Certificate Generation
 * 
 * Creates an elegant satirical PDF certificate for purchased Nothing.
 * Uses jsPDF for client-side PDF generation.
 * 
 * Design: Luxury Gold - Navy background, gold borders, ornamental flourishes,
 * and a wax-seal aesthetic for the ultimate satirical proof of purchase.
 * 
 * Decorative elements are created using PDF drawing operations for reliable
 * rendering across all PDF readers.
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

  // Corner flourishes - elegant L-shaped accents
  const cornerSize = 15;
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
    doc.setLineWidth(0.8);
    // L-shaped corner accent
    doc.line(x, y + (flipY * cornerSize), x, y);
    doc.line(x, y, x + (flipX * cornerSize), y);
    // Small decorative dot at corner
    doc.setFillColor(...colors.gold);
    doc.circle(x, y, 1.5, 'F');
  });

  // Decorative element above title - elegant diamond pattern
  const titleDecorY = 35;
  doc.setDrawColor(...colors.gold);
  doc.setLineWidth(0.5);
  // Horizontal lines
  doc.line(centerX - 35, titleDecorY, centerX - 15, titleDecorY);
  doc.line(centerX + 15, titleDecorY, centerX + 35, titleDecorY);
  // Central diamond (rotated square)
  doc.setLineWidth(0.4);
  const diamondSize = 3;
  doc.line(centerX - diamondSize, titleDecorY, centerX, titleDecorY - diamondSize);
  doc.line(centerX, titleDecorY - diamondSize, centerX + diamondSize, titleDecorY);
  doc.line(centerX + diamondSize, titleDecorY, centerX, titleDecorY + diamondSize);
  doc.line(centerX, titleDecorY + diamondSize, centerX - diamondSize, titleDecorY);

  // Title section
  doc.setTextColor(...colors.gold);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATE OF NOTHING', centerX, 48, { align: 'center' });

  // Decorative element below title - elegant line with dots
  const afterTitleY = 55;
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 55, afterTitleY, centerX + 55, afterTitleY);
  // Small circles at line ends
  doc.setFillColor(...colors.goldLight);
  doc.circle(centerX - 55, afterTitleY, 1, 'F');
  doc.circle(centerX + 55, afterTitleY, 1, 'F');
  // Small diamond in center
  doc.setLineWidth(0.4);
  doc.line(centerX - 2, afterTitleY, centerX, afterTitleY - 2);
  doc.line(centerX, afterTitleY - 2, centerX + 2, afterTitleY);
  doc.line(centerX + 2, afterTitleY, centerX, afterTitleY + 2);
  doc.line(centerX, afterTitleY + 2, centerX - 2, afterTitleY);

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

  // Decorative line under name with small circles
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 35, 93, centerX + 35, 93);
  doc.setFillColor(...colors.goldLight);
  doc.circle(centerX - 35, 93, 1, 'F');
  doc.circle(centerX + 35, 93, 1, 'F');

  // Body text
  doc.setTextColor(...colors.cream);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('has successfully acquired', centerX, 103, { align: 'center' });

  // Product name - the Nothing itself
  doc.setTextColor(...colors.gold);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  const productName = order.items.length > 1
    ? 'a Lot of Nothing'
    : order.items[0]?.name || 'NOTHING';
  doc.text(productName, centerX, 118, { align: 'center' });

  // Decorative divider - elegant line with center ornament
  const dividerY = 125;
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 50, dividerY, centerX + 50, dividerY);
  // Center ornament
  doc.setLineWidth(0.4);
  doc.line(centerX - 4, dividerY, centerX, dividerY - 4);
  doc.line(centerX, dividerY - 4, centerX + 4, dividerY);
  doc.line(centerX + 4, dividerY, centerX, dividerY + 4);
  doc.line(centerX, dividerY + 4, centerX - 4, dividerY);

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

  // Decorative dots around seal (drawn as circles)
  doc.setFillColor(...colors.goldLight);
  doc.circle(sealX - 30, sealY - 12, 1.5, 'F');
  doc.circle(sealX + 30, sealY - 12, 1.5, 'F');
  doc.circle(sealX - 30, sealY + 12, 1.5, 'F');
  doc.circle(sealX + 30, sealY + 12, 1.5, 'F');

  // Seal text
  doc.setTextColor(...colors.gold);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('[ NOTHING', sealX, sealY - 4, { align: 'center' });
  doc.text('CAPTURED ]', sealX, sealY + 3, { align: 'center' });

  // Legal disclaimer - subtle at bottom
  doc.setTextColor(...colors.darkGray);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');

  const disclaimer = [
    'This certificate confirms the purchase of absolutely nothing.',
    'For legal purposes, this document acknowledges nothing was received.',
    'All rights to nothing are reserved. The Nothing Store is not responsible for emptiness.',
    'This certificate is printed on premium virtual paper. Nothing physical will be shipped.'
  ];

  let disclaimerY = 230;
  disclaimer.forEach((line) => {
    doc.text(line, centerX, disclaimerY, { align: 'center' });
    disclaimerY += 5;
  });

  // Bottom decorative line with ornaments
  const footerLineY = 258;
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(40, footerLineY, 80, footerLineY);
  doc.line(130, footerLineY, 170, footerLineY);
  // Small diamond in center
  doc.setLineWidth(0.4);
  doc.line(centerX - 3, footerLineY, centerX, footerLineY - 3);
  doc.line(centerX, footerLineY - 3, centerX + 3, footerLineY);
  doc.line(centerX + 3, footerLineY, centerX, footerLineY + 3);
  doc.line(centerX, footerLineY + 3, centerX - 3, footerLineY);

  // Footer
  doc.setTextColor(...colors.gold);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('The Nothing Store', centerX, 268, { align: 'center' });

  doc.setTextColor(...colors.gray);
  doc.setFontSize(7);
  doc.text('Premium Nothing Since Today', centerX, 275, { align: 'center' });

  // Decorative corner circles
  doc.setFillColor(...colors.goldLight);
  doc.circle(35, 35, 1.5, 'F');
  doc.circle(175, 35, 1.5, 'F');
  doc.circle(35, 262, 1.5, 'F');
  doc.circle(175, 262, 1.5, 'F');

  return doc;
}

export default generateCertificatePDF;

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
import { formatPrice } from './currency';

import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import de from './translations/de.json';
import sw from './translations/sw.json';

const translations = {
  en: { ...en.pdf, products: en.products },
  es: { ...es.pdf, products: es.products },
  fr: { ...fr.pdf, products: fr.products },
  de: { ...de.pdf, products: de.products },
  sw: { ...sw.pdf, products: sw.products }
};

export function generateCertificatePDF(order, currency, language = 'en') {
  const doc = new jsPDF();
  const pageWidth = 210;
  const pageHeight = 297;
  const centerX = pageWidth / 2;
  
  const fontFamily = 'times';
  
  const colors = {
    navy: [26, 26, 46],
    gold: [212, 175, 55],
    goldLight: [201, 162, 39],
    cream: [245, 245, 220],
    white: [255, 255, 255],
    gray: [180, 180, 180],
    darkGray: [100, 100, 100],
  };

  const t = translations[language] || translations.en;

  doc.setFillColor(...colors.navy);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(40, 40, 70);
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40, 'F');

  doc.setDrawColor(...colors.gold);
  doc.setLineWidth(1.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  doc.setLineWidth(0.5);
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40);

  const cornerSize = 15;
  const corners = [
    [15, 15],
    [pageWidth - 15, 15],
    [15, pageHeight - 15],
    [pageWidth - 15, pageHeight - 15],
  ];

  corners.forEach(([x, y], i) => {
    const flipX = i % 2 === 1 ? -1 : 1;
    const flipY = i >= 2 ? -1 : 1;
    doc.setDrawColor(...colors.gold);
    doc.setLineWidth(0.8);
    doc.line(x, y + (flipY * cornerSize), x, y);
    doc.line(x, y, x + (flipX * cornerSize), y);
    doc.setFillColor(...colors.gold);
    doc.circle(x, y, 1.5, 'F');
  });

  const titleDecorY = 35;
  doc.setDrawColor(...colors.gold);
  doc.setLineWidth(0.5);
  doc.line(centerX - 35, titleDecorY, centerX - 15, titleDecorY);
  doc.line(centerX + 15, titleDecorY, centerX + 35, titleDecorY);
  doc.setLineWidth(0.4);
  const diamondSize = 3;
  doc.line(centerX - diamondSize, titleDecorY, centerX, titleDecorY - diamondSize);
  doc.line(centerX, titleDecorY - diamondSize, centerX + diamondSize, titleDecorY);
  doc.line(centerX + diamondSize, titleDecorY, centerX, titleDecorY + diamondSize);
  doc.line(centerX, titleDecorY + diamondSize, centerX - diamondSize, titleDecorY);

  doc.setTextColor(...colors.gold);
  doc.setFontSize(28);
  doc.setFont('times', 'bold');
  doc.text(t.title, centerX, 48, { align: 'center' });

  const afterTitleY = 55;
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 55, afterTitleY, centerX + 55, afterTitleY);
  doc.setFillColor(...colors.goldLight);
  doc.circle(centerX - 55, afterTitleY, 1, 'F');
  doc.circle(centerX + 55, afterTitleY, 1, 'F');
  doc.setLineWidth(0.4);
  doc.line(centerX - 2, afterTitleY, centerX, afterTitleY - 2);
  doc.line(centerX, afterTitleY - 2, centerX + 2, afterTitleY);
  doc.line(centerX + 2, afterTitleY, centerX, afterTitleY + 2);
  doc.line(centerX, afterTitleY + 2, centerX - 2, afterTitleY);

  doc.setTextColor(...colors.cream);
  doc.setFontSize(12);
  doc.setFont('times', 'italic');
  doc.text(t.subtitle, centerX, 75, { align: 'center' });

  doc.setTextColor(...colors.white);
  doc.setFontSize(22);
  doc.setFont('times', 'bold');
  doc.text(order.name, centerX, 88, { align: 'center' });

  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 35, 93, centerX + 35, 93);
  doc.setFillColor(...colors.goldLight);
  doc.circle(centerX - 35, 93, 1, 'F');
  doc.circle(centerX + 35, 93, 1, 'F');

  doc.setTextColor(...colors.cream);
  doc.setFontSize(11);
  doc.setFont('times', 'normal');
  doc.text(t.acquired, centerX, 103, { align: 'center' });

  doc.setTextColor(...colors.gold);
  doc.setFontSize(24);
  doc.setFont('times', 'bold');
  const productId = order.items[0]?.id;
  const productName = productId 
    ? (t.products?.[productId]?.name || t.aLotOfNothing)
    : t.aLotOfNothing;
  doc.text(productName, centerX, 118, { align: 'center' });

  const dividerY = 125;
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(centerX - 50, dividerY, centerX + 50, dividerY);
  doc.setLineWidth(0.4);
  doc.line(centerX - 4, dividerY, centerX, dividerY - 4);
  doc.line(centerX, dividerY - 4, centerX + 4, dividerY);
  doc.line(centerX + 4, dividerY, centerX, dividerY + 4);
  doc.line(centerX, dividerY + 4, centerX - 4, dividerY);

  doc.setTextColor(...colors.gray);
  doc.setFontSize(10);
  doc.setFont('times', 'normal');

  const detailsY = 140;
  const lineHeight = 8;

  doc.text(`${t.orderNumber}: ${order.orderId}`, centerX, detailsY, { align: 'center' });
  doc.text(`${t.date}: ${order.date}`, centerX, detailsY + lineHeight, { align: 'center' });
  doc.text(`${t.amount}: ${formatPrice(parseFloat(order.total), currency)}`, centerX, detailsY + (lineHeight * 2), { align: 'center' });

  const sealX = centerX;
  const sealY = 190;
  const sealRadius = 22;

  doc.setDrawColor(...colors.gold);
  doc.setLineWidth(2);
  doc.circle(sealX, sealY, sealRadius);

  doc.setLineWidth(0.5);
  doc.circle(sealX, sealY, sealRadius - 3);

  doc.setFillColor(...colors.goldLight);
  doc.circle(sealX - 30, sealY - 12, 1.5, 'F');
  doc.circle(sealX + 30, sealY - 12, 1.5, 'F');
  doc.circle(sealX - 30, sealY + 12, 1.5, 'F');
  doc.circle(sealX + 30, sealY + 12, 1.5, 'F');

  doc.setTextColor(...colors.gold);
  doc.setFontSize(8);
  doc.setFont('times', 'bold');
  
  const capturedParts = t.captured.split(' ');
  if (capturedParts.length >= 3) {
    doc.text(capturedParts[0], sealX, sealY - 4, { align: 'center' });
    doc.text(capturedParts.slice(1).join(' '), sealX, sealY + 3, { align: 'center' });
  } else {
    doc.text(t.captured, sealX, sealY, { align: 'center' });
  }

  doc.setTextColor(...colors.darkGray);
  doc.setFontSize(7);
  doc.setFont('times', 'italic');

  let disclaimerY = 230;
  t.disclaimer.forEach((line) => {
    doc.text(line, centerX, disclaimerY, { align: 'center' });
    disclaimerY += 5;
  });

  const footerLineY = 258;
  doc.setDrawColor(...colors.goldLight);
  doc.setLineWidth(0.5);
  doc.line(40, footerLineY, 80, footerLineY);
  doc.line(130, footerLineY, 170, footerLineY);
  doc.setLineWidth(0.4);
  doc.line(centerX - 3, footerLineY, centerX, footerLineY - 3);
  doc.line(centerX, footerLineY - 3, centerX + 3, footerLineY);
  doc.line(centerX + 3, footerLineY, centerX, footerLineY + 3);
  doc.line(centerX, footerLineY + 3, centerX - 3, footerLineY);

  doc.setTextColor(...colors.gold);
  doc.setFontSize(9);
  doc.setFont('times', 'normal');
  doc.text(t.storeName, centerX, 268, { align: 'center' });

  doc.setTextColor(...colors.gray);
  doc.setFontSize(7);
  doc.text(t.tagline, centerX, 275, { align: 'center' });

  doc.setFillColor(...colors.goldLight);
  doc.circle(35, 35, 1.5, 'F');
  doc.circle(175, 35, 1.5, 'F');
  doc.circle(35, 262, 1.5, 'F');
  doc.circle(175, 262, 1.5, 'F');

  return doc;
}

export default generateCertificatePDF;

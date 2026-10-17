import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

/**
 * Generate a unique, deterministic invoice number for an order.
 * Format: INV-YYYY-XXXXXXXX (e.g. INV-2026-B2A34F89)
 */
export const generateInvoiceNumber = (order) => {
  if (order.invoiceNumber) {
    return order.invoiceNumber;
  }
  const dateObj = new Date(order.date || order.createdAt || Date.now());
  const year = dateObj.getFullYear();
  const shortId = order._id.toString().slice(-8).toUpperCase();
  return `INV-${year}-${shortId}`;
};

/**
 * Ensures an order has an invoiceNumber and invoiceDate persisted in MongoDB.
 * If not already present, atomically saves them to guarantee consistency across repeated requests.
 */
export const ensureOrderInvoiceDetails = async (order) => {
  if (!order.invoiceNumber) {
    order.invoiceNumber = generateInvoiceNumber(order);
    order.invoiceDate = order.invoiceDate || new Date(order.date || order.createdAt || Date.now());
    await order.save();
  }
  return order;
};

/**
 * Builds a professional, non-overlapping, single-page optimized PDF invoice
 * for the given order and streams it to writableStream (e.g. Express response).
 */
export const buildInvoicePdf = (order, writableStream) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: 'A4',
        bufferPages: true,
        info: {
          Title: `ShopIn Invoice - ${order.invoiceNumber || 'INV'}`,
          Author: 'ShopIn E-Commerce',
          Subject: `Tax Invoice for Order #${order._id}`,
          Keywords: 'ShopIn, Invoice, Tax Invoice, Receipt'
        }
      });

      doc.on('error', reject);
      writableStream.on('finish', resolve);
      writableStream.on('error', reject);

      doc.pipe(writableStream);

      // Color Palette & Design Tokens
      const brandColor = '#0c7c86';
      const brandDark = '#08535a';
      const brandLight = '#e6f6f7';
      const textPrimary = '#0f172a';
      const textSecondary = '#475569';
      const textMuted = '#94a3b8';
      const borderSubtle = '#e2e8f0';
      const cardBg = '#f8fafc';
      const tableWidth = 515.28;

      const invoiceNum = order.invoiceNumber || generateInvoiceNumber(order);
      const invDate = order.invoiceDate
        ? new Date(order.invoiceDate)
        : new Date(order.date || order.createdAt || Date.now());
      const formattedDate = invDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      // 1. Top Decorative Brand Accent Strip
      doc.rect(0, 0, 595.28, 6).fill(brandColor);

      // 2. Header Section (y: 28 to 92)
      // Check logo path: first check frontend assets directly, fallback to backend public
      const frontendLogo = path.resolve('..', 'frontend', 'src', 'assets', 'logo.png');
      const publicLogo = path.resolve('public', 'logo.png');
      const logoPath = fs.existsSync(frontendLogo) ? frontendLogo : (fs.existsSync(publicLogo) ? publicLogo : null);

      let logoDrawn = false;
      const logoSize = 52;
      const logoX = 40;
      const logoY = 28;

      if (logoPath) {
        try {
          doc.save();
          doc.roundedRect(logoX, logoY, logoSize, logoSize, 8).clip();
          doc.image(logoPath, logoX, logoY, {
            width: logoSize,
            height: logoSize,
            fit: [logoSize, logoSize],
            align: 'center',
            valign: 'center'
          });
          doc.restore();
          doc.roundedRect(logoX, logoY, logoSize, logoSize, 8).lineWidth(0.75).strokeColor(borderSubtle).stroke();
          logoDrawn = true;
        } catch {
          logoDrawn = false;
        }
      }

      const brandTextX = logoDrawn ? (logoX + logoSize + 12) : 40;
      doc.fillColor(textPrimary).font('Helvetica-Bold').fontSize(22).text('ShopIn', brandTextX, logoY + 4);
      doc.fillColor(textSecondary).font('Helvetica').fontSize(8.5).text('Your Premium Shopping Destination', brandTextX, logoY + 26);
      doc.fillColor(textMuted).font('Helvetica').fontSize(7.5).text('support@shopin.com  |  www.shopin.com', brandTextX, logoY + 38);

      // Invoice Badge Card (Top Right)
      const badgeW = 185;
      const badgeH = 54;
      const badgeX = 555.28 - badgeW;
      const badgeY = 27;

      doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 6).fillAndStroke(cardBg, borderSubtle);
      doc.fillColor(brandColor).font('Helvetica-Bold').fontSize(11).text('TAX INVOICE', badgeX, badgeY + 8, { width: badgeW - 12, align: 'right' });
      doc.fillColor(textPrimary).font('Helvetica-Bold').fontSize(8.5).text(`Invoice #: ${invoiceNum}`, badgeX, badgeY + 22, { width: badgeW - 12, align: 'right' });
      doc.fillColor(textSecondary).font('Helvetica').fontSize(8).text(`Invoice Date: ${formattedDate}`, badgeX, badgeY + 36, { width: badgeW - 12, align: 'right' });

      // Horizontal Divider Line
      const dividerY = 94;
      doc.strokeColor(borderSubtle).lineWidth(0.75).moveTo(40, dividerY).lineTo(555.28, dividerY).stroke();

      // 3. Two Information Cards (y: 104 to 194)
      const cardY = 104;
      const cardWidth = 248;
      const cardHeight = 90;
      const rightCardX = 555.28 - cardWidth;

      // Card 1: Customer Billed & Shipped To
      doc.roundedRect(40, cardY, cardWidth, cardHeight, 6).fillAndStroke(cardBg, borderSubtle);
      doc.rect(40, cardY, cardWidth, 20).fill(brandLight);
      doc.roundedRect(40, cardY, cardWidth, cardHeight, 6).lineWidth(0.75).strokeColor(borderSubtle).stroke();
      doc.fillColor(brandColor).font('Helvetica-Bold').fontSize(8).text('BILLED & SHIPPED TO', 50, cardY + 6);

      const addr = order.address || {};
      const customerName = `${addr.firstName || ''} ${addr.lastName || ''}`.trim() || 'Valued Customer';

      doc.fillColor(textPrimary).font('Helvetica-Bold').fontSize(9).text(customerName, 50, cardY + 26, { width: cardWidth - 20, lineBreak: false });

      let addrLineY = cardY + 39;
      doc.font('Helvetica').fontSize(8).fillColor(textSecondary);

      if (addr.street) {
        doc.text(addr.street, 50, addrLineY, { width: cardWidth - 20, lineBreak: false });
        addrLineY += 11;
      }

      const cityStateZip = [addr.city, addr.state, addr.zipcode].filter(Boolean).join(', ');
      if (cityStateZip) {
        doc.text(cityStateZip, 50, addrLineY, { width: cardWidth - 20, lineBreak: false });
        addrLineY += 11;
      }

      const contactInfo = [addr.phone && `Tel: ${addr.phone}`, addr.email].filter(Boolean).join('  •  ');
      if (contactInfo) {
        doc.text(contactInfo, 50, addrLineY, { width: cardWidth - 20, lineBreak: false });
      }

      // Card 2: Payment & Order Information
      doc.roundedRect(rightCardX, cardY, cardWidth, cardHeight, 6).fillAndStroke(cardBg, borderSubtle);
      doc.rect(rightCardX, cardY, cardWidth, 20).fill(brandLight);
      doc.roundedRect(rightCardX, cardY, cardWidth, cardHeight, 6).lineWidth(0.75).strokeColor(borderSubtle).stroke();
      doc.fillColor(brandColor).font('Helvetica-Bold').fontSize(8).text('ORDER & PAYMENT DETAILS', rightCardX + 10, cardY + 6);

      let payLineY = cardY + 26;
      const renderPaymentRow = (label, value, isBadge = false) => {
        doc.font('Helvetica-Bold').fontSize(8).fillColor(textSecondary).text(label, rightCardX + 10, payLineY, { width: 85 });
        if (isBadge) {
          doc.roundedRect(rightCardX + 95, payLineY - 1.5, 42, 13, 3).fill('#dcfce7');
          doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#15803d').text('PAID', rightCardX + 95, payLineY + 1, { width: 42, align: 'center' });
        } else {
          doc.font('Helvetica').fontSize(8).fillColor(textPrimary).text(value || '—', rightCardX + 95, payLineY, { width: 140, lineBreak: false });
        }
        payLineY += 14;
      };

      renderPaymentRow('Order ID:', `#${order._id.toString().slice(-8).toUpperCase()}`);
      renderPaymentRow('Payment Mode:', order.paymentMethod || 'Razorpay');
      renderPaymentRow('Payment Status:', 'PAID', true);
      renderPaymentRow('Transaction Ref:', order.razorpayPaymentId || order.razorpayOrderId || 'Verified Online');

      // 4. Products Table (Starts at y: 206)
      let tableY = 206;

      const drawTableHeader = (y) => {
        doc.roundedRect(40, y, tableWidth, 22, 4).fill(brandColor);
        doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(8);
        doc.text('#', 48, y + 7, { width: 20 });
        doc.text('ITEM DESCRIPTION', 72, y + 7, { width: 230 });
        doc.text('SIZE', 305, y + 7, { width: 40, align: 'center' });
        doc.text('QTY', 348, y + 7, { width: 35, align: 'center' });
        doc.text('UNIT PRICE', 386, y + 7, { width: 75, align: 'right' });
        doc.text('AMOUNT', 464, y + 7, { width: 82, align: 'right' });
      };

      drawTableHeader(tableY);
      tableY += 22;

      let subtotal = 0;
      const items = Array.isArray(order.items) ? order.items : [];

      items.forEach((item, index) => {
        // Multi-page overflow check
        if (tableY > 630) {
          doc.addPage();
          doc.rect(0, 0, 595.28, 6).fill(brandColor);
          tableY = 40;
          drawTableHeader(tableY);
          tableY += 22;
        }

        const itemQty = Number(item.quantity) || 1;
        const itemPrice = Number(item.price) || 0;
        const itemTotal = itemPrice * itemQty;
        subtotal += itemTotal;

        const rowH = 24;

        if (index % 2 === 1) {
          doc.rect(40, tableY, tableWidth, rowH).fill('#fafafa');
        }

        doc.strokeColor(borderSubtle).lineWidth(0.5).moveTo(40, tableY + rowH).lineTo(555.28, tableY + rowH).stroke();

        doc.fillColor(textSecondary).font('Helvetica').fontSize(8);
        doc.text(String(index + 1), 48, tableY + 7, { width: 20 });

        doc.fillColor(textPrimary).font('Helvetica-Bold').fontSize(8.5);
        doc.text(item.name || 'Product', 72, tableY + 7, { width: 230, lineBreak: false });

        doc.fillColor(textSecondary).font('Helvetica').fontSize(8);
        doc.text(item.size || '—', 305, tableY + 7, { width: 40, align: 'center' });
        doc.text(String(itemQty), 348, tableY + 7, { width: 35, align: 'center' });
        doc.text(`INR ${itemPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 386, tableY + 7, { width: 75, align: 'right' });

        doc.fillColor(textPrimary).font('Helvetica-Bold').fontSize(8.5);
        doc.text(`INR ${itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 464, tableY + 7, { width: 82, align: 'right' });

        tableY += rowH;
      });

      tableY += 12;

      // Check if summary cards fit on this page
      const sealH = 74;
      if (tableY + sealH > 730) {
        doc.addPage();
        doc.rect(0, 0, 595.28, 6).fill(brandColor);
        tableY = 40;
      }

      // 5. Summary Section
      const summaryW = 240;
      const summaryX = 555.28 - summaryW;
      const deliveryFee = typeof order.amount === 'number' && subtotal > 0
        ? Math.max(0, order.amount - subtotal)
        : 0;
      const grandTotal = Number(order.amount) || (subtotal + deliveryFee);

      // Left Box: Payment Verified Seal
      const sealW = 250;
      doc.roundedRect(40, tableY, sealW, sealH, 6).fillAndStroke('#f0fdf4', '#bbf7d0');

      doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(8.5).text('✓  PAYMENT VERIFIED & CONFIRMED', 52, tableY + 12);
      doc.fillColor(textSecondary).font('Helvetica').fontSize(7.5)
        .text('This order has been verified through Razorpay secure gateway.', 52, tableY + 28, { width: sealW - 24 })
        .text(`Gateway Reference: ${order.razorpayPaymentId || 'Completed'}`, 52, tableY + 41, { width: sealW - 24 })
        .text('* All product prices are inclusive of applicable GST / taxes.', 52, tableY + 54, { width: sealW - 24 });

      // Right Box: Totals Card
      doc.roundedRect(summaryX, tableY, summaryW, sealH, 6).fillAndStroke(cardBg, borderSubtle);

      doc.font('Helvetica').fontSize(8).fillColor(textSecondary).text('Items Subtotal:', summaryX + 14, tableY + 10);
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(textPrimary).text(`INR ${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, summaryX + 110, tableY + 10, { width: summaryW - 124, align: 'right' });

      doc.font('Helvetica').fontSize(8).fillColor(textSecondary).text('Delivery Charges:', summaryX + 14, tableY + 25);
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(textPrimary).text(deliveryFee > 0 ? `INR ${deliveryFee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'FREE', summaryX + 110, tableY + 25, { width: summaryW - 124, align: 'right' });

      doc.strokeColor(borderSubtle).lineWidth(0.75).moveTo(summaryX + 10, tableY + 40).lineTo(summaryX + summaryW - 10, tableY + 40).stroke();

      // Grand Total Highlight
      doc.roundedRect(summaryX + 8, tableY + 46, summaryW - 16, 22, 4).fill(brandLight);
      doc.font('Helvetica-Bold').fontSize(9).fillColor(brandDark).text('TOTAL PAID:', summaryX + 14, tableY + 52);
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(brandColor).text(`INR ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, summaryX + 110, tableY + 51, { width: summaryW - 128, align: 'right' });

      // 6. Professional Footer (Strictly anchored at y: 740, well within A4 841.89pt page)
      const footerY = 740;
      doc.strokeColor(borderSubtle).lineWidth(0.75).moveTo(40, footerY).lineTo(555.28, footerY).stroke();

      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(textPrimary).text('Thank you for shopping with ShopIn!', 40, footerY + 8, { align: 'center', width: tableWidth });
      doc.font('Helvetica').fontSize(7.5).fillColor(textSecondary).text('For questions, support, or order tracking, please contact support@shopin.com  |  Visit shopin.com', 40, footerY + 20, { align: 'center', width: tableWidth });
      doc.font('Helvetica').fontSize(7).fillColor(textMuted).text('This is an authentic computer-generated tax invoice and requires no physical signature.', 40, footerY + 31, { align: 'center', width: tableWidth });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

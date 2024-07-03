export function printLabel(label) {
   const printWindow = window.open('', '_blank');
   printWindow.document.write('<html><head><title>Print</title></head><body>');
   printWindow.document.write(label.outerHTML);
   printWindow.document.write('</body></html>');
   printWindow.print()
   return true
}



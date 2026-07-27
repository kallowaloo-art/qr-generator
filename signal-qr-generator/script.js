let currentQR = null;

function generateQR() {
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const qrcodeDiv = document.getElementById('qrcode');
  
  if (!phoneNumber) {
    alert('Please enter a phone number');
    return;
  }
  
  // Validate phone number format
  if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber.replace(/[^\d+]/g, ''))) {
    alert('Please enter a valid phone number');
    return;
  }
  
  // Clear previous QR code
  qrcodeDiv.innerHTML = '';
  
  // Generate Signal URI
  const signalUri = `signal:${phoneNumber}`;
  
  // Create new QR code
  currentQR = new QRCode(qrcodeDiv, {
    text: signalUri,
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  
  qrcodeDiv.classList.add('show');
  
  // Add download button
  setTimeout(() => {
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download QR Code';
    downloadBtn.onclick = downloadQR;
    qrcodeDiv.appendChild(downloadBtn);
  }, 100);
}

function downloadQR() {
  const canvas = document.querySelector('#qrcode canvas');
  if (canvas) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'signal-qrcode.png';
    link.click();
  }
}

// Allow Enter key to generate QR code
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('phoneNumber').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      generateQR();
    }
  });
});

// script.js - generate a Signal QR using qrcodejs
(function(){
  const input = document.getElementById('signal');
  const btn = document.getElementById('generate');
  const download = document.getElementById('download');
  const container = document.getElementById('qrcode');

  // create QR object placeholder
  let qr;
  function ensureQR(){
    if(!qr){
      qr = new QRCode(container, {width:256, height:256});
    }
  }

  function makeSignalURL(value){
    // normalize: remove spaces
    const v = value.trim();
    return `https://signal.me/#p/${encodeURIComponent(v)}`;
  }

  function generate(){
    const v = input.value.trim();
    if(!v){
      input.focus();
      return;
    }
    const url = makeSignalURL(v);
    ensureQR();
    // QRCode library stores current code inside the container
    qr.clear();
    qr.makeCode(url);

    // wait a tick for library to create image/canvas
    setTimeout(()=>{
      // try to find an image or canvas
      const img = container.querySelector('img');
      const canvas = container.querySelector('canvas');
      let dataURL = null;
      if(img && img.src) dataURL = img.src;
      else if(canvas) dataURL = canvas.toDataURL('image/png');

      if(dataURL){
        download.href = dataURL;
        download.style.display = 'inline-block';
      } else {
        download.style.display = 'none';
      }
    }, 150);
  }

  btn.addEventListener('click', generate);
  input.addEventListener('keyup', function(e){ if(e.key === 'Enter') generate(); });

  // populate sample value if empty
  if(!input.value) input.value = '+15551234567';
})();

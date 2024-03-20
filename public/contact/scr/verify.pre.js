function fetchPublicKey() {
  const keyUri = "https://keys.openpgp.org/vks/v1/by-fingerprint/464DFCD0B1DB6B5ADDC9691F90B6CEB01BE86461";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", keyUri, true);

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          const key = xhr.responseText;
          importPublicKey(key);
        }
      }
    };

    xhr.send();
  });
}

/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/*
Import a PEM encoded RSA private key, to use for RSA-PSS signing.
Takes a string containing the PEM encoded key, and returns a Promise
that will resolve to a CryptoKey representing the private key.
*/
function importPrivateKey(pem) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length,
  );
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-PSS",
      hash: "SHA-256",
    },
    true,
    ["sign"],
  );
}

function importPublicKey(pem) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = "-----BEGIN PGP PUBLIC KEY BLOCK-----";
  const pemFooter = "-----END PGP PUBLIC KEY BLOCK-----";
  
  pem = pem.replace(/(^Comment:.*\n)|^\n|\r\n|\n/igm,"")
  
  let pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length,
  );

  pemContents = pemContents.replace(/^\n|\r\n|\n|\s/igm,"")


  // base64 decode the string to get the binary data
  const binaryDerString = atob(pemContents).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join('')
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-PSS",
      hash: "SHA-256",
    },
    true,
    ["verify", "encrypt"],
  );
}


function verifySignature() {
  const publicKey = fetchPublicKey().then((publicKey) => {

    const body = document.body.outerHTML;
    const start = body.indexOf("<!--signature:") + 14;
    const end = body.indexOf("-->", start);
    const signatureHex = body.substring(start, end);
    const signature = Uint8Array.from(Buffer.from(signatureHex, 'hex'));

    const data = new TextEncoder().encode(body.substr(0, start - 14) + body.substr(end + 3));

    crypto.subtle.verify('RSA-OAEP', publicKey, signature, data).then((isValid) => {

      if (!isValid) {
        console.error('Signature is not valid. Potential tampering detected.');
        // Handle tampering as needed, e.g., refresh the page or notify the user.
      }
    });
  });
}

// Initial verification
verifySignature();

// Periodic verification every 5 seconds (adjust as needed)
setInterval(verifySignature, 5000);
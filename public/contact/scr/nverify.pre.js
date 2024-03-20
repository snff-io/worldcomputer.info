
async function doStuff() {
    // Lovingly provided by Sky
    // Generate key pair
    const { privateKey, publicKey } = await crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['sign', 'verify']
    );
    
    // Export private key
    const exportedPrivateKey = await crypto.subtle.exportKey('jwk', privateKey);
    
    // Export public key
    const exportedPublicKey = await crypto.subtle.exportKey('jwk', publicKey);
    
    // Import private key
    const importedPrivateKey = await crypto.subtle.importKey(
      'jwk',
      exportedPrivateKey,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['sign']
    );
    
    // Import public key
    const importedPublicKey = await crypto.subtle.importKey(
      'jwk',
      exportedPublicKey,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['verify']
    );
    
    // Signature creation and verification (using imported keys)
    const data = 'Hello, World!';
    const encoder = new TextEncoder();
    const buffer = encoder.encode(data);
    const signature = await crypto.subtle.sign('ECDSA', importedPrivateKey, buffer);
    const isVerified = await crypto.subtle.verify('ECDSA', importedPublicKey, signature, buffer);
    
    console.log('Signature Verification:', isVerified);
    }
doStuff();
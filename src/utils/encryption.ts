
// Simple encryption utility for chat messages
export class EncryptionService {
  private key: string;

  constructor() {
    this.key = 'optra-chat-encryption-key-2024';
  }

  async encrypt(text: string): Promise<{ encryptedData: string; iv: string }> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Generate a random IV
    const iv = crypto.getRandomValues(new Uint8Array(16));
    
    // Import the key
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.key),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const cryptoKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: iv,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    // Encrypt the data
    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      data
    );

    return {
      encryptedData: Array.from(new Uint8Array(encryptedData))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(''),
      iv: Array.from(iv)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    };
  }

  async decrypt(encryptedData: string, ivHex: string = ''): Promise<string> {
    const encoder = new TextEncoder();
    
    // If ivHex is empty, use a default value (for backward compatibility)
    if (!ivHex) {
      // Generate a consistent IV from the encrypted data to maintain compatibility
      const ivData = new TextEncoder().encode(encryptedData.substring(0, 16));
      ivHex = Array.from(ivData).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Convert hex strings back to arrays
    const iv = new Uint8Array((ivHex.match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16)));
    const data = new Uint8Array((encryptedData.match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16)));

    // Import the key
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.key),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const cryptoKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: iv,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    try {
      // Decrypt the data
      const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        data
      );

      return new TextDecoder().decode(decryptedData);
    } catch (error) {
      console.error("Decryption error:", error);
      return "Error: Could not decrypt message";
    }
  }
}

export const encryptionService = new EncryptionService();

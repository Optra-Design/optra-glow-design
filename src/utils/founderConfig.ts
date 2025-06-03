
// Secure founder configuration - credentials are encoded/decoded at runtime
export class FounderConfig {
  private static getEncodedCredentials() {
    // Base64 encoded credentials that can be easily changed
    // To update credentials, encode new email:password in base64
    return 'YW5pa2V0aEBvcHRyYS5tZTpMZW5kbXlib29rcw=='; // aniketh@optra.me:Lendmybooks
  }

  static getCredentials() {
    try {
      const decoded = atob(this.getEncodedCredentials());
      const [email, password] = decoded.split(':');
      return { email, password };
    } catch (error) {
      console.warn('Failed to decode founder credentials');
      return { email: '', password: '' };
    }
  }

  static validateFounderCredentials(email: string, password: string): boolean {
    const { email: founderEmail, password: founderPassword } = this.getCredentials();
    return email === founderEmail && password === founderPassword;
  }

  // Method to update credentials (for admin use)
  static encodeCredentials(email: string, password: string): string {
    return btoa(`${email}:${password}`);
  }
}

import * as CryptoJS from 'crypto-js';

export class AccessToken {
  generateAccessToken(data: Record<string, any>): string {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.ACCESS_TOKEN,
    ).toString();

    return encrypted;
  }

  decodeAccessToken(accessToken: string): Record<string, any> {
    try {
      const bytes = CryptoJS.AES.decrypt(accessToken, process.env.ACCESS_TOKEN);

      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return {};
    }
  }
}

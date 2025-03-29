import * as crypto from 'crypto';

export const encryptedToken = (token: string, key: string): string => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decryptToken = (encryptedToken: string, key: string): string => {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    key,
    Buffer.alloc(16, 0)
  );
  let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

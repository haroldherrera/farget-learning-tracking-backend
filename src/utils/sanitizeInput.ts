/* eslint-disable @typescript-eslint/no-explicit-any */
import xss from 'xss';

export const sanitizeInput = <T extends Record<string, any>>(obj: T): T => {
  const sanitized: Record<string, any> = {};

  for (const key in obj) {
    const val = obj[key];
    sanitized[key] = typeof val === 'string' ? xss(val) : val;
  }

  return sanitized as T;
};

require('dotenv/config');
import * as NodeGeoCoder from 'node-geocoder';

export function env(key: string, default_value: any) {
  const value = process.env[key];
  return value === undefined ? default_value : value;
}

export function requestBuilder(data: any, message: string, success: boolean) {
  return {
    data: data,
    message: message,
    success: success,
  };
}

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

export const geocoder = NodeGeoCoder(options);

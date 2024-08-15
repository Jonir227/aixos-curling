import { describe, expect, it } from 'vitest';
import { getData, getHeaders, getMethod, getUrl } from './axiosConfigToUrl';

describe('getMethod', () => {
  it('should return GET when method is not provided', () => {
    const config = {};
    expect(getMethod(config)).toBe('GET');
  });
  it('should return POST when method is provided', () => {
    const config = {
      method: 'POST',
    };
    expect(getMethod(config)).toBe('POST');
  });
});

describe('getUrl', () => {
  it('should return empty string when url is not provided', () => {
    const config = {};
    expect(getUrl(config)).toBe('');
  });
  it('should return url when baseURL is not provided', () => {
    const config = {
      url: '/data',
    };
    expect(getUrl(config)).toBe('/data');
  });
  it('should return baseURL + url when baseURL is provided', () => {
    const config = {
      url: '/data',
      baseURL: 'https://test.com',
    };
    expect(getUrl(config)).toBe('https://test.com/data');
  });
  it('should return baseURL + url when baseURL is provided with trailing slash', () => {
    const config = {
      url: '/data',
      baseURL: 'https://test.com/',
    };
    expect(getUrl(config)).toBe('https://test.com/data');
  });
});

describe('getHeaders', () => {
  it('should return empty string when headers is not provided', () => {
    const config = {};
    expect(getHeaders(config)).toBe('');
  });
  it('should return headers when headers is provided', () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    expect(getHeaders(config)).toBe('-H "Content-Type: application/json"');
  });
  it('should return headers when headers is provided with multiple keys', () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Test': 'test',
      },
    };
    expect(getHeaders(config)).toBe(
      '-H "Content-Type: application/json" -H "X-Test: test"'
    );
  });
  it('should filter headers when headers is provided with undefined value', () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Test': undefined,
      },
    };
    expect(getHeaders(config)).toBe('-H "Content-Type: application/json"');
  });
});

describe('getData', () => {
  it('should return empty string when data is not provided', () => {
    const config = {};
    expect(getData(config)).toBe('');
  });
  it('should return data when string data is provided', () => {
    const config = {
      data: 'data',
    };
    expect(getData(config)).toBe("-d 'data'");
  });
  it('should return data when object data is provided', () => {
    const config = {
      data: {
        data: 'data',
      },
    };
    expect(getData(config)).toBe('-d \'{"data":"data"}\'');
  });
});

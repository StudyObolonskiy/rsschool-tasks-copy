import { QueryParams } from '../models/query-params';

export class RestService {
  private baseUrl = 'http://127.0.0.1:3000';

  public async get(url: string, queryParams?: QueryParams): Promise<Response> {
    const fullURL = this.createUrl(url, queryParams);

    return fetch(fullURL);
  }

  public async post<T>(url: string, data: T): Promise<Response> {
    const fullURL = this.createUrl(url);
    return fetch(fullURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  public async put<T>(url: string, data: T): Promise<Response> {
    const fullURL = this.createUrl(url);
    return fetch(fullURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  public async delete(url: string): Promise<Response> {
    const fullURL = this.createUrl(url);
    return fetch(fullURL, { method: 'DELETE' });
  }

  private createUrl(url: string, queryParams?: QueryParams): string {
    let URL = `${this.baseUrl}${url}`;
    if (queryParams) {
      URL += Object.keys(queryParams).reduce((acc: string, key: string, id: number) => `${acc}${id === 0 ? '' : '&'}${key}=${queryParams[key]}`, '?');
    }
    return URL;
  }
}

export const restService = new RestService();

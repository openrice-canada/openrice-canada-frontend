/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class AxiosApiClientBuilder {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization:
          sessionStorage.getItem("jwt") &&
          `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
  }

  public withResourceName(path = ""): this {
    this.client.defaults.baseURL += path;
    return this;
  }

  public withCredentials(bool: boolean): this {
    this.client.defaults.withCredentials = bool;
    return this;
  }

  public withTimeout(timeout: number): this {
    this.client.defaults.timeout = timeout;
    return this;
  }

  public build(): AxiosApiClient {
    return new AxiosApiClient(this.client);
  }
}

class AxiosApiClient {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private handleResponse<T>(response: AxiosResponse<any>): T {
    const { data } = response;
    return data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return this.handleResponse(response);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return this.handleResponse(response);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return this.handleResponse(response);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return this.handleResponse(response);
  }
}

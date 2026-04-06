const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export { BASE_URL };

export class HttpError extends Error {
  status: number;
  body: any;

  constructor(status: number, message: string, body: any) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = BASE_URL;
  }

  private getHeaders(contentType?: string | null): HeadersInit {
    const headers: HeadersInit = {};

    // null означає, що браузер сам встановить тип (напр. для FormData)
    if (contentType !== null) {
      headers["Content-Type"] = contentType || "application/json";
    }
    headers["Accept"] = "application/json";

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ detail: "Unknown error" }));
      throw new HttpError(
        response.status,
        errorData.detail || "An error occurred",
        errorData
      );
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T;
    }
    return null as unknown as T;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: this.getHeaders(),
      credentials: "include",
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, data?: any): Promise<T> {
    let body: any;
    let contentType: string | undefined | null;

    if (data === undefined || data === null) {
      body = undefined;
      contentType = null;
    } else if (data instanceof FormData) {
      body = data;
      contentType = null; // Браузер сам поставить multipart/form-data з boundary
    } else if (data instanceof URLSearchParams) {
      body = data;
      contentType = "application/x-www-form-urlencoded";
    } else {
      body = JSON.stringify(data);
      contentType = "application/json";
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders(contentType),
      body: body,
      credentials: "include",
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, data: any): Promise<T> {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.getHeaders(
        isFormData ? null : "application/json"
      ) as HeadersInit,
      body: isFormData ? data : JSON.stringify(data),
      credentials: "include",
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: this.getHeaders(),
      credentials: "include",
    });
    return this.handleResponse<T>(response);
  }
}

const api = new ApiService();
export default api;

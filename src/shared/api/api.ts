export const API_URL = import.meta.env.VITE_API_URL;

export class HttpError extends Error {
  status: number;
  body: any; // Тіло відповіді з помилкою

  constructor(status: number, message: string, body: any) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

export class ApiService {
  private baseURL: string;
  private headers: Record<string, string>;

  /**
   * Створює екземпляр сервісу.
   * @param baseURL Базовий URL вашого API (напр., 'http://127.0.0.1:8000')
   */
  constructor() {
    this.baseURL = API_URL;
    // Встановлюємо базові заголовки. Їх можна розширити для JWT-токенів.
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Приватний помічник для виконання всіх запитів.
   * @param path Кінцева точка API (напр., '/users/')
   * @param options Налаштування 'fetch' (метод, тіло, заголовки)
   * @returns Проміс з розпарсеними даними (generic T)
   */
  private async request<T>(path: string, options: RequestInit): Promise<T> {
    const url = `${this.baseURL}${path}`;

    // Можна додати логіку для додавання токена авторизації до заголовків
    // const token = localStorage.getItem('token');
    // if (token) {
    //   headers['Authorization'] = `Bearer ${token}`;
    // }

    try {
      const response = await fetch(url, { ...options, headers: this.headers });

      // Перевіряємо, чи запит успішний
      if (!response.ok) {
        let errorBody;
        try {
          // Намагаємося прочитати тіло помилки (FastAPI часто повертає JSON)
          errorBody = await response.json();
        } catch (e) {
          // Якщо тіло не JSON, повертаємо текст
          errorBody = await response.text();
        }

        // Генеруємо кастомну помилку
        const message = errorBody.detail || response.statusText;
        throw new HttpError(response.status, message, errorBody);
      }

      // Якщо відповідь 204 No Content, повертаємо null
      if (response.status === 204) {
        return null as T;
      }

      // Парсимо успішну відповідь як JSON
      return (await response.json()) as T;
    } catch (error) {
      // Обробляємо помилки мережі або наші кастомні помилки
      console.error("API request error:", error);
      throw error; // Передаємо помилку далі для обробки у сервісі/компоненті
    }
  }

  /**
   * Виконує GET-запит.
   * @param path Кінцева точка API
   * @param params (Опційно) Об'єкт для query-параметрів
   * @returns Проміс з даними
   */
  public get<T>(path: string, params?: Record<string, string>): Promise<T> {
    let fullPath = path;
    if (params) {
      const queryParams = new URLSearchParams(params);
      fullPath = `${path}?${queryParams.toString()}`;
    }
    return this.request<T>(fullPath, { method: "GET" });
  }

  /**
   * Виконує POST-запит.
   * @param path Кінцева точка API
   * @param body Дані (об'єкт), які будуть відправлені як JSON
   * @returns Проміс з даними
   */
  public post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * Виконує PUT-запит.
   * @param path Кінцева точка API
   * @param body Дані (об'єкт), які будуть відправлені як JSON
   * @returns Проміс з даними
   */
  public put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  /**
   * Виконує DELETE-запит.
   * @param path Кінцева точка API
   * @returns Проміс з даними (часто null або { success: true })
   */
  public delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "DELETE" });
  }
}

export const api = new ApiService();

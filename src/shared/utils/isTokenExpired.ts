export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      // Це не схоже на JWT
      return true;
    }
    const payloadBase64 = parts[1];
    // Декодування Base64 URL Safe та парсинг JSON
    const payload = JSON.parse(
      atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"))
    );

    // Перевірка часу прострочення (exp)
    if (payload.exp) {
      const now = Math.floor(Date.now() / 1000); // Поточний час у секундах Unix
      return payload.exp < now;
    }
    // Якщо немає exp, припускаємо, що прострочений (або не валідний для перевірки)
    return true;
  } catch (error) {
    console.error("Помилка декодування токена:", error);
    return true; // Вважаємо, що прострочений/невалідний, якщо не вдалося декодувати
  }
}

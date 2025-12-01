import { AuthHooks } from "@/entities/auth/hooks";
import { showToast } from "@/shared/utils/showToast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login } = AuthHooks.useLoginMutation();

  const navigate = useNavigate();

  // Функція для оновлення полів введення
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обробка відправки форми
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(
      {
        username: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (response) => {
          showToast("success", "You successfuly entered your account.");
          localStorage.setItem("access-token", response.access_token);
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Вхід в акаунт
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Електронна пошта
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition duration-200"
          >
            Увійти
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Ще не маєте акаунту?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Зареєструватися
          </a>
        </p>
      </div>
    </div>
  );
}

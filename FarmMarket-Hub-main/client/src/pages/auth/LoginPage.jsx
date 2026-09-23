import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login: loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      loginUser(response.data);

      toast.success(response.message);

      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded mb-3"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="text-red-500 mb-2">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded mb-3"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="text-red-500 mb-2">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
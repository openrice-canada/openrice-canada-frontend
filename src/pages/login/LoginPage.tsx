import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authSlice";
import { AppDispatch } from "../../store";

import TextInput from "../../components/Input/TextInput";

function LoginPage() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const userLogin = async (user: { username: string; password: string }) => {
    dispatch(login(user));
    enqueueSnackbar("Login successfully", { variant: "success" });
    setTimeout(() => {
      navigate("/");
      navigate(0);
    }, 1000);
  };

  return (
    <form
      className="h-screen flex flex-col gap-6 justify-center max-w-sm mx-auto px-4"
      onSubmit={handleSubmit((user) =>
        userLogin(user as { username: string; password: string })
      )}
    >
      <p className="text-3xl font-bold">Log in to Openrice</p>
      <p>
        New to Openrice? <Link to="/sign-up">Sign-up</Link>
      </p>
      <Controller
        name="username"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextInput
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <button
        type="submit"
        className="bg-[#000000] px-4 py-2 rounded-md text-[#ffffff] font-bold"
      >
        Log In
      </button>
    </form>
  );
}

export default LoginPage;

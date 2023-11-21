import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/auth/authSlice";
import { AppDispatch, IRootState } from "../../store";

import TextInput from "../../components/input/TextInput";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const loginSuccess = useSelector(
    (state: IRootState) => state.auth.loginSuccess
  );
  const message = useSelector((state: IRootState) => state.auth.message);

  const userLogin = async (user: { username: string; password: string }) => {
    dispatch(loginThunk(user));
  };

  useEffect(() => {
    if (loginSuccess) {
      enqueueSnackbar("Login successfully", { variant: "success" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (loginSuccess === false) {
      enqueueSnackbar(`${message} You may try again`, {
        variant: "error",
      });
    }

    setTimeout(() => {
      closeSnackbar();
    }, 2000);
  }, [loginSuccess, navigate, message]);

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
        className="bg-black px-4 py-2 rounded-md text-white font-bold hover:scale-105 duration-500"
      >
        Log In
      </button>
    </form>
  );
}

export default LoginPage;

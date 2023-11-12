import { useForm, Controller } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";
import { useNavigate } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authSlice";
import { useEffect } from "react";
import { AppDispatch, IRootState } from "../../store";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const dispatch = useDispatch<AppDispatch>();
  const registerSuccess = useSelector(
    (state: IRootState) => state.auth.registerSuccess
  );
  const message = useSelector((state: IRootState) => state.auth.message);

  const userRegister = async (user: {
    email: string;
    username: string;
    password: string;
  }) => {
    dispatch(register(user));
  };

  useEffect(() => {
    if (registerSuccess) {
      enqueueSnackbar("Sign up successfully", { variant: "success" });
      setTimeout(() => {
        navigate("/");
        navigate(0);
      }, 1000);
    } else if (registerSuccess === false) {
      enqueueSnackbar(message, {
        variant: "error",
      });
    }

    setTimeout(() => {
      closeSnackbar();
    }, 2000);
  }, [registerSuccess, navigate, message]);

  return (
    <form
      className="h-screen flex flex-col gap-6 justify-center max-w-sm mx-auto px-4"
      onSubmit={handleSubmit((user) =>
        userRegister(
          user as { email: string; username: string; password: string }
        )
      )}
    >
      <p className="text-3xl font-bold">Sign up for Openrice</p>
      <p>
        By continuing, you agree to Openrice’s Terms of Service and acknowledge
        Openrice’s Privacy Policy.
      </p>
      <Controller
        name="email"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
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
        Sign up
      </button>
    </form>
  );
};

export default SignUpPage;

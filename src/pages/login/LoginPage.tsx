import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/Input/TextInput";
import { postUserAuth } from "../../api/auth";
import { useContext } from "react";
import { UserContext } from "../../App";
import { enqueueSnackbar } from "notistack";

function LoginPage() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const userLogin = async (user: { email: string; password: string }) => {
    const response = await postUserAuth(user);
    if (response.message) {
      console.error(response.message);
    } else {
      sessionStorage.setItem("jwt", response.token || "");
      if (response.userEntity) {
        sessionStorage.setItem("userInfo", JSON.stringify(response.userEntity));
        context?.setUserInfo(response.userEntity);
      }
      enqueueSnackbar("Login successfully", { variant: "success" });
      setTimeout(() => {
        navigate("/");
        navigate(0);
      }, 1000);
    }
  };

  return (
    <form
      className="h-screen flex flex-col gap-6 justify-center max-w-sm mx-auto px-4"
      onSubmit={handleSubmit((user) =>
        userLogin(user as { email: string; password: string })
      )}
    >
      <p className="text-3xl font-bold">Log in to Openrice</p>
      <p>
        New to Openrice? <Link to="/sign-up">Sign-up</Link>
      </p>
      <Controller
        name="emailOrUsername"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextInput
            label="Email Or Username"
            type="text"
            placeholder="Enter your email or username"
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

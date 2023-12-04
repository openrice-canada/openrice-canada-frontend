/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { AppDispatch, IRootState } from "../store";
import {
  registerThunk,
  updateMessage,
  updateRegisterStatus,
} from "../redux/auth/authSlice";
import TextInput from "../components/utils/inputs/TextInput";
import FileInput from "../components/utils/inputs/FileInput";
import { fileTypeToExtension } from "../utils/fileTypeToExtension";
import { register } from "../api/auth/authApiIndex";
import { uploadUserProfilePicture } from "../utils/uploadImageService";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  photo?: any;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      photo: "",
    },
  });
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const dispatch = useDispatch<AppDispatch>();
  const registerSuccess = useSelector(
    (state: IRootState) => state.auth.registerSuccess
  );
  const message = useSelector((state: IRootState) => state.auth.message);

  useEffect(() => {
    if (registerSuccess) {
      enqueueSnackbar("Sign up successfully", { variant: "success" });
      setTimeout(() => {
        navigate("/");
        navigate(0);
      }, 1000);
    } else if (registerSuccess === false && message) {
      enqueueSnackbar(message, {
        variant: "error",
      });
    }

    setTimeout(() => {
      closeSnackbar();
    }, 2000);
  }, [registerSuccess, navigate, message]);

  useEffect(() => {
    setTimeout(() => {
      if (message) {
        dispatch(updateMessage(""));
      }
    }, 2000);
  }, [dispatch, message]);

  const userRegister = async (user: RegisterForm) => {
    if (user.photo) {
      const res = await register(
        { username: user.username, email: user.email, password: user.password },
        fileTypeToExtension[user.photo.type]
      );

      if (res.message) {
        dispatch(updateRegisterStatus(false));
        dispatch(updateMessage(res.message));
      }

      if (res.user && res.user.user_id) {
        dispatch(updateRegisterStatus(true));
        sessionStorage.setItem("jwt", res.token as string);
        await uploadUserProfilePicture(
          user.photo,
          res.user.user_id,
          fileTypeToExtension[user.photo.type]
        );
      }
    } else {
      dispatch(
        registerThunk({
          username: user.username,
          email: user.email,
          password: user.password,
        })
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <form
      className="h-screen flex flex-col gap-6 justify-center max-w-sm mx-auto px-4"
      onSubmit={handleSubmit((user) => userRegister(user))}
    >
      <div className="text-3xl font-bold">Sign up for Openrice</div>
      <div>
        By continuing, you agree to Openrice’s Terms of Service and acknowledge
        Openrice’s Privacy Policy.
      </div>
      {selectedImage && (
        <div>
          <div className="text-sm font-semibold">Preview</div>
          <div className="mb-1 shadow-md rounded-md">
            <img
              src={selectedImage as string}
              alt="Preview"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
      <Controller
        name="username"
        control={control}
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
        name="email"
        control={control}
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
        name="password"
        control={control}
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
      <Controller
        control={control}
        name="photo"
        render={({ field }) => (
          <FileInput
            onChange={(e) => {
              if (e.target.files) {
                const selectedFile = e.target.files[0];
                field.onChange(selectedFile);
                handleImageChange(e);
              }
            }}
            label="Profile Picture"
            type="file"
            className="form-control"
            placeholder=""
          />
        )}
      />
      <button
        type="submit"
        className="bg-black px-4 py-2 rounded-md text-white font-bold hover:scale-105 duration-500"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignUpPage;

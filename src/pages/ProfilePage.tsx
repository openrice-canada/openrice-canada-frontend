/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { getCurrentUser } from "../api/auth/authApiIndex";
import { CurrentLoginUserInfo } from "../api/auth/authType";
import { AppDispatch, IRootState } from "../store";
import { PrimeVue } from "../assets/index";
import TextInput from "../components/utils/inputs/TextInput";
import FileInput from "../components/utils/inputs/FileInput";
import SelectInput from "../components/utils/inputs/selectInput/SelectInput";
import {
  updateCurrentUserProfilePicture,
  updateUserProfileThunk,
} from "../redux/auth/authSlice";
import { fileTypeToExtension } from "../utils/fileTypeToExtension";
import { uploadUserProfilePicture } from "../utils/uploadImageService";

export interface UpdateProfileForm {
  username: string;
  email: string;
  role: string;
  password: string;
  confirmPassword?: string;
  photo?: any;
  profile_picture_url?: string;
}

const userRoles = ["User", "Admin"];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const photoRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: IRootState) => state.auth.currentUser);
  const updateProfileSuccess = useSelector(
    (state: IRootState) => state.auth.updateProfileSuccess
  );
  const message = useSelector((state: IRootState) => state.auth.message);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      if (sessionStorage.getItem("jwt")) {
        const res = await getCurrentUser();
        if (!res.user) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [user, navigate]);

  useEffect(() => {
    if (updateProfileSuccess) {
      enqueueSnackbar("Profile is updated successfully", {
        variant: "success",
      });
      setTimeout(() => {
        navigate(0);
      }, 3000);
    } else if (updateProfileSuccess === false && message) {
      enqueueSnackbar(message, {
        variant: "error",
      });
    }

    setTimeout(() => {
      closeSnackbar();
    }, 2000);
  }, [updateProfileSuccess, navigate, message]);

  const { handleSubmit, control } = useForm<UpdateProfileForm>();

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

  const loadDefaultImage = () => {
    dispatch(
      updateCurrentUserProfilePicture({
        ...(user as CurrentLoginUserInfo),
        profile_picture_url: `${process.env.PUBLIC_URL}/error.svg`,
      })
    );
  };

  const updateProfile = async (profile: UpdateProfileForm) => {
    setLoading(true);
    if (user?.user_id) {
      if (profile.username.length > 2) {
        if (profile.password === "" && profile.confirmPassword === "") {
          dispatch(
            updateUserProfileThunk({
              userID: user.user_id,
              profile: {
                username: profile.username,
                email: profile.email,
                role: profile.role,
              },
              fileExtension: profile.photo
                ? fileTypeToExtension[profile.photo.type]
                : "",
            })
          );
        } else if (
          profile.password !== "" &&
          profile.password.length > 2 &&
          profile.password === profile.confirmPassword
        ) {
          dispatch(
            updateUserProfileThunk({
              userID: user.user_id,
              profile: {
                username: profile.username,
                email: profile.email,
                role: profile.role,
                password: profile.password,
              },
              fileExtension: profile.photo
                ? fileTypeToExtension[profile.photo.type]
                : "",
            })
          );
        } else if (
          profile.password === "" ||
          profile.password.length <= 2 ||
          profile.confirmPassword === "" ||
          (profile.confirmPassword && profile.confirmPassword.length <= 2)
        ) {
          enqueueSnackbar(
            "The minimum length of password or that of password confirm is 3",
            {
              variant: "error",
            }
          );
        } else {
          enqueueSnackbar("The password and password confirm are different", {
            variant: "error",
          });
        }

        if (profile.photo) {
          await uploadUserProfilePicture(
            profile.photo,
            user.user_id,
            fileTypeToExtension[profile.photo.type]
          );
        }
      } else {
        enqueueSnackbar("The minimum length of username is 3", {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("You haven't login yet", { variant: "error" });
      setTimeout(() => {
        navigate(`/`);
        navigate(0);
      }, 1000);
    }

    setTimeout(() => {
      closeSnackbar();
    }, 2000);
    setLoading(false);
  };

  return user && !loading ? (
    <form
      className="flex flex-col gap-3 px-6 w-100 mx-auto"
      onSubmit={handleSubmit((profile) => {
        updateProfile(profile);
      })}
    >
      <div className="w-full flex items-center flex-col gap-2">
        {selectedImage ? (
          <div className="w-40 h-40 border-2 border-gray-700 rounded-full overflow-hidden">
            <img
              src={selectedImage as string}
              className="object-cover min-h-full min-w-full"
            />
          </div>
        ) : user.profile_picture_url ? (
          <div className="w-40 h-40 border-2 border-gray-700 rounded-full overflow-hidden">
            <img
              src={user.profile_picture_url}
              className="object-cover"
              onError={loadDefaultImage}
            />
          </div>
        ) : (
          <div className="w-40 h-40 rounded-full bg-blue-400 flex items-center justify-center border-1 border-gray-700">
            <img src={PrimeVue} />
          </div>
        )}
        <div
          className="font-bold text-sm text-yellow-500 hover:text-orange-600 cursor-pointer"
          onClick={() => {
            if (photoRef.current) {
              photoRef.current?.click();
            }
          }}
        >
          change your profile picture
        </div>
      </div>
      <Controller
        defaultValue=""
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
            label="Restaurant Cover Photo"
            type="file"
            labelClassName="hidden"
            className="hidden"
            placeholder=""
            fileInputRef={photoRef}
          />
        )}
      />
      <Controller
        defaultValue={user.username}
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            label="Name"
            type="text"
            placeholder="Update username"
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        defaultValue={user.email}
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            label="Name"
            type="email"
            placeholder="Update email"
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        defaultValue={user.role}
        name="role"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectInput
            label="User Role"
            placeholder="Select role"
            value={field.value as string}
            onChange={field.onChange}
            optionList={userRoles.map((role) => {
              return { label: role, value: role };
            })}
          />
        )}
      />
      <Controller
        defaultValue=""
        name="password"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Password"
            type="password"
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        defaultValue=""
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Password Confirm"
            type="password"
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
      <div className="flex flex-col items-center mb-2 text-sm">
        <button
          type="submit"
          className="bg-black px-4 py-2 rounded-md text-white font-bold hover:bg-opacity-70"
        >
          Update
        </button>
      </div>
    </form>
  ) : (
    <></>
  );
};

export default ProfilePage;

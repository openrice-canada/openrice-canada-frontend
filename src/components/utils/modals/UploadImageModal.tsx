import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { IoClose } from "react-icons/io5";

import { AppDispatch, IRootState } from "../../../store";
import { createMenuPhotoThunk } from "../../../redux/photo/photoSlice";
import { uploadImage } from "../../../utils/uploadImageService";
import FileInput from "../inputs/FileInput";

interface UploadImageModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  restaurant_id?: string;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({
  show,
  setShow,
  modalRef,
  restaurant_id,
}) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: IRootState) => state.auth.currentUser);

  const fileTypeToExtension: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf",
  };

  const uploadMenuPhoto = async () => {
    let imageName;
    if (user?.user_id) {
      if (image && image?.type) {
        const randomID = uuid();
        imageName = `${randomID}.${fileTypeToExtension[image?.type]}`;

        dispatch(
          createMenuPhotoThunk({
            imagePrefix: process.env.REACT_APP_IMAGE_PREFIX as string,
            restaurantID: restaurant_id as string,
            imageName,
            photoCategory: "Menu",
          })
        );
        await uploadImage(
          image as File,
          restaurant_id as string,
          "menus",
          "",
          imageName
        );

        enqueueSnackbar("Menu photo is added successfully", {
          variant: "success",
        });
        setShow(false);
        setTimeout(() => {
          navigate(`/restaurant/id/${restaurant_id}`);
          navigate(0);
        }, 1000);

        setTimeout(() => {
          closeSnackbar();
        }, 2000);
      }
    } else {
      enqueueSnackbar("You haven't login yet", { variant: "error" });
      setShow(false);
      setTimeout(() => {
        navigate(`/restaurant/id/${restaurant_id}`);
        navigate(0);
      }, 1000);

      setTimeout(() => {
        closeSnackbar();
      }, 2000);
    }
  };

  return show ? (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <div className="relative w-1/4 min-w-[400px] my-6 mx-auto z-40">
        <div
          className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          ref={modalRef}
        >
          <div className="flex items-center justify-between p-2 px-4 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-lg font-semibold">Create New Review</h3>
            <button
              className="p-2 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none rounded-full hover:bg-gray-200 focus:outline-none"
              onClick={() => setShow(false)}
            >
              <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none">
                <IoClose size={20} />
              </span>
            </button>
          </div>
          <div className="p-4 flex flex-col justify-center">
            <FileInput
              onChange={(e) => {
                if (e.target.files) {
                  const selectedFile = e.target.files[0];
                  setImage(selectedFile);
                }
              }}
              type="file"
              className="form-control"
              placeholder=""
            />
            <div className="w-full flex justify-center">
              <button
                className="border-slate-600 border-1 hover:bg-slate-600 hover:text-white font-bold py-1 px-4 mt-4 rounded w-[40%]"
                onClick={uploadMenuPhoto}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default UploadImageModal;

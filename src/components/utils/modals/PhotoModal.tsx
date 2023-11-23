import { IoClose } from "react-icons/io5";

const PhotoModal: React.FC<{
  selectedImage: string;
  closePopUp: () => void;
  imageRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ selectedImage, closePopUp, imageRef }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-xl" ref={imageRef}>
        <div className="flex items-center justify-end p-2 px-4 border-b border-solid border-slate-200 rounded-t">
          <button
            className="p-2 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={closePopUp}
          >
            <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none">
              <IoClose size={20} />
            </span>
          </button>
        </div>
        <div className="p-4">
          <img
            src={selectedImage}
            alt="popup"
            className="max-w-full m-2 rounded-md"
            width={500}
            height={"auto"}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;

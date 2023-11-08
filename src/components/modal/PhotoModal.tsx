const PhotoModal: React.FC<{
  selectedImage: string;
  closePopUp: () => void;
  imageRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ selectedImage, closePopUp, imageRef }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-4" ref={imageRef}>
        <img src={selectedImage} alt="popup" className="max-w-full max-h-96" />
        <button onClick={closePopUp} className="translate-x-[23rem]">
          Close
        </button>
      </div>
    </div>
  );
};

export default PhotoModal;

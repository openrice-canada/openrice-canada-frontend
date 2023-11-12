const PhotoModal: React.FC<{
	selectedImage: string;
	closePopUp: () => void;
	imageRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ selectedImage, closePopUp, imageRef }) => {
	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70'>
			<div className='bg-white p-4 rounded-xl' ref={imageRef}>
				<img
					src={selectedImage}
					alt='popup'
					className='max-w-full max-h-96 m-2'
				/>
				<div className="flex justify-end px-2">
					<button onClick={closePopUp}>Close</button>
				</div>
			</div>
		</div>
	);
};

export default PhotoModal;

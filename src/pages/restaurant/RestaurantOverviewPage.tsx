import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoChatbubbleOutline, IoStar } from "react-icons/io5";

import { AppDispatch, IRootState } from "../../store";
import { getRestaurantThunk } from "../../redux/restaurant/restaurantSlice";
import { getReviewsThunk } from "../../redux/review/reviewSlice";
import {
  getMenuPhotosThunk,
  getReviewPhotosThunk,
  updateMenuPhotos,
  updateReviewPhotos,
} from "../../redux/photo/photoSlice";
import useOnClickOutside from "../../components/hooks/useOnClickOutside";
import RestaurantOverviewButton from "../../components/utils/buttons/RestaurantOverviewButton";
import ReviewCard from "../../components/utils/cards/ReviewCard";
import RestaurantDetailSkeletonLoader from "../../components/skeletonLoader/RestaurantDetailSkeletonLoader";
import ErrorPage from "../error/ErrorPage";
import UploadButton from "../../components/utils/buttons/UploadButton";
import UploadImageModal from "../../components/utils/modals/UploadImageModal";
import CreateReviewModal from "../../components/utils/modals/CreateReviewModal";
import PhotoModal from "../../components/utils/modals/PhotoModal";

function isUUID(id: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(id);
}

const RestaurantOverviewPage: React.FC = () => {
  const { id } = useParams();

  const [page, setPage] = useState("Reviews");
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    photo_url: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const imageRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLDivElement>(null);
  const modalRef = useRef<null | HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const restaurantDetail = useSelector(
    (state: IRootState) => state.restaurant.restaurant
  );
  const reviews = useSelector((state: IRootState) => state.review.reviews);
  const reviewPhotos = useSelector(
    (state: IRootState) => state.photo.reviewPhotos
  );
  const menuPhotos = useSelector((state: IRootState) => state.photo.menuPhotos);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      if (!id || !isUUID(id)) return;
      dispatch(getRestaurantThunk(id));
    };

    const fetchRestaurantReview = async () => {
      if (!id || !isUUID(id)) return;
      dispatch(getReviewsThunk(id));
    };

    const fetchReviewPhotos = async () => {
      if (!id || !isUUID(id)) return;
      dispatch(getReviewPhotosThunk(id));
    };

    const fetchMenuPhotos = async () => {
      if (!id || !isUUID(id)) return;
      dispatch(getMenuPhotosThunk(id));
    };

    setLoading(true);
    fetchRestaurantDetail();
    fetchRestaurantReview();
    fetchReviewPhotos();
    fetchMenuPhotos();
    setLoading(false);
  }, [id, dispatch]);

  const openPopUp = (image: string, imageID: string) => {
    setSelectedImage({ id: imageID, photo_url: image });
    setPopUpOpen(true);
  };

  const closePopUp = () => {
    setPopUpOpen(false);
  };

  useOnClickOutside(imageRef, () => setPopUpOpen(false));
  useOnClickOutside(formRef, () => setShowCreateReviewModal(false));
  useOnClickOutside(modalRef, () => setShowUploadImageModal(false));

  const loadDefaultImage = (type: string, id: string) => {
    if (type === "review") {
      dispatch(
        updateReviewPhotos(
          reviewPhotos.map((reviewPhoto) =>
            reviewPhoto.review_photo_id === id
              ? {
                  ...reviewPhoto,
                  photo_url: `${process.env.PUBLIC_URL}/error.svg`,
                }
              : reviewPhoto
          )
        )
      );
    } else if (type === "menu") {
      dispatch(
        updateMenuPhotos(
          menuPhotos.map((menuPhoto) =>
            menuPhoto.menu_photo_id === id
              ? {
                  ...menuPhoto,
                  photo_url: `${process.env.PUBLIC_URL}/error.svg`,
                }
              : menuPhoto
          )
        )
      );
    }
  };
  const buttons = ["Reviews", "Photos", "Menus"];

  return !restaurantDetail && loading ? (
    <RestaurantDetailSkeletonLoader />
  ) : !restaurantDetail && !loading ? (
    <ErrorPage />
  ) : (
    restaurantDetail && (
      <>
        <CreateReviewModal
          show={showCreateReviewModal}
          setShow={setShowCreateReviewModal}
          formRef={formRef}
          restaurant_id={id}
        />
        <UploadImageModal
          show={showUploadImageModal}
          setShow={setShowUploadImageModal}
          modalRef={modalRef}
          restaurant_id={id}
        />
        <div className="max-w-5xl mx-auto px-3 py-3">
          <div className="flex font-semibold justify-between">
            <div className="flex flex-col lg:flex-row gap-8 pr-1">
              <div className="relative w-[400px] h-auto shrink-0 rounded-md overflow-hidden">
                {restaurantDetail && (
                  <img
                    src={restaurantDetail.cover_image_url}
                    alt=""
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{restaurantDetail.name}</h1>
                {restaurantDetail.averageRating && (
                  <div className="flex gap-2 font-normal items-center">
                    <div>rating</div>
                    <div>{restaurantDetail.averageRating.toPrecision(3)}</div>
                    <div className="flex gap-1">
                      {Array.from({
                        length: Math.round(restaurantDetail.averageRating),
                      }).map((_, index) => (
                        <span className="text-yellow-400" key={index}>
                          {<IoStar size={12} />}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-lg font-semibold">
                  {restaurantDetail?.address}
                </div>
                <div>{restaurantDetail.intro}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-16">
              {buttons.map((button, index) => (
                <RestaurantOverviewButton
                  button={button}
                  key={index}
                  active={page === button}
                  setActive={setPage}
                />
              ))}
            </div>
          </div>
          {page === "Reviews" && (
            <>
              <div className="flex gap-4 items-center my-4">
                <h1 className="text-2xl font-bold">Reviews</h1>
                <div className="flex gap-4">
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-50"
                    onClick={() => setShowCreateReviewModal(true)}
                  >
                    <IoChatbubbleOutline size={20} />
                  </button>
                </div>
              </div>
              {reviews.length === 0 && <div>No review in this restaurant</div>}
              {reviews.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((review) => (
                    <ReviewCard {...review} key={review.review_id} />
                  ))}
                </div>
              )}
            </>
          )}
          {page === "Photos" && (
            <>
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold my-4">Photos</h1>
              </div>
              {reviewPhotos.length === 0 && (
                <div>No review photos in this restaurant</div>
              )}
              {reviewPhotos.length > 0 && (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                  {reviewPhotos.map((reviewPhoto, index) => (
                    <div
                      className="shadow-md rounded-lg cursor-pointer h-fit bg-white hover:bg-slate-200"
                      onClick={() =>
                        openPopUp(
                          reviewPhoto.photo_url,
                          reviewPhoto.review_photo_id
                        )
                      }
                      key={`review photo ${index}`}
                    >
                      <img
                        src={reviewPhoto.photo_url}
                        width="350"
                        height="200"
                        className="object-cover w-full h-auto rounded-lg"
                        onError={() =>
                          loadDefaultImage(
                            "review",
                            reviewPhoto.review_photo_id
                          )
                        }
                      />
                    </div>
                  ))}
                  {popUpOpen && selectedImage && selectedImage.photo_url && (
                    <PhotoModal
                      selectedImage={selectedImage.photo_url}
                      imageRef={imageRef}
                      closePopUp={closePopUp}
                      imageID={selectedImage.id}
                    />
                  )}
                </div>
              )}
            </>
          )}
          {page === "Menus" && (
            <>
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold my-4">Menus</h1>
                <UploadButton showUploadImageModal={setShowUploadImageModal} />
              </div>
              {menuPhotos.length === 0 && (
                <div>No menu photos are provided for this restaurant</div>
              )}
              {menuPhotos.length > 0 && (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                  {menuPhotos.map((menuPhoto, index) => (
                    <div
                      className="shadow-md rounded-lg cursor-pointer h-fit bg-white hover:bg-slate-200"
                      onClick={() =>
                        openPopUp(menuPhoto.photo_url, menuPhoto.menu_photo_id)
                      }
                      key={`menu photo ${index}`}
                    >
                      <img
                        src={menuPhoto.photo_url}
                        width="350"
                        height="200"
                        className="object-cover w-full h-auto rounded-lg"
                        onError={() =>
                          loadDefaultImage("menu", menuPhoto.menu_photo_id)
                        }
                      />
                    </div>
                  ))}
                  {popUpOpen && selectedImage && selectedImage.photo_url && (
                    <PhotoModal
                      selectedImage={selectedImage.photo_url}
                      imageRef={imageRef}
                      closePopUp={closePopUp}
                      imageID={selectedImage.id}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </>
    )
  );
};

export default RestaurantOverviewPage;

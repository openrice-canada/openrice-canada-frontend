import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChatbubbleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { getRestaurantThunk } from "../../redux/restaurant/restaurantSlice";
import { getReviewsThunk } from "../../redux/reviews/reviewsSlice";

import useOnClickOutside from "../../components/hooks/useOnClickOutside";
import RestaurantOverviewButton from "../../components/utils/buttons/RestaurantOverviewButton";
import ReviewCard from "../../components/utils/cards/ReviewCard";
import AddReviewModal from "../../components/utils/modals/AddReviewModal";
import RestaurantDetailSkeletonLoader from "../../components/loader/RestaurantDetailSkeletonLoader";
import PhotoModal from "../../components/utils/modals/PhotoModal";
import ErrorPage from "../error/ErrorPage";

function isUUID(id: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(id);
}

const RestaurantOverviewPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState("Reviews");
  const [isShownAddReviewModal, setIsShownAddReviewModal] = useState(false);
  const [photos, setPhotos] = useState<{ id: string; src: string }[]>([]);
  const [menus, setMenus] = useState<{ id: string; src: string }[]>([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const imageRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const restaurantDetail = useSelector(
    (state: IRootState) => state.restaurant.restaurant
  );
  const reviews = useSelector((state: IRootState) => state.review.reviews);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      if (!id || !isUUID(id)) return;
      dispatch(getRestaurantThunk(id));
    };

    const fetchRestaurantReview = async () => {
      if (!id || !isUUID(id)) return;
      dispatch(getReviewsThunk(id));
    };

    fetchRestaurantDetail();
    fetchRestaurantReview();
  }, [id, dispatch]);

  useEffect(() => {
    if (id === "8879942f-fce4-41d2-8aab-3faeb8d8c909") {
      setPhotos(
        reviews.map((review) => ({
          id: review.review_id,
          src: `${process.env.REACT_APP_IMAGE_PREFIX}/photos/${id}/${review.review_id}.jpg`,
        }))
      );
      setMenus(
        reviews
          .map((review) => ({
            id: review.review_id,
            src: `${process.env.REACT_APP_IMAGE_PREFIX}/menus/${id}/${review.review_id}.jpg`,
          }))
          .sort((a, b) => a.id.localeCompare(b.id))
      );
    }
  }, [id, reviews]);

  useEffect(() => {
    if (!id || !isUUID(id)) {
      navigate("error");
    }
  }, [id, navigate]);

  const openPopUp = (image: string) => {
    setSelectedImage(image);
    setPopUpOpen(true);
  };
  const closePopUp = () => {
    setPopUpOpen(false);
  };
  useOnClickOutside(imageRef, () => setPopUpOpen(false));
  useOnClickOutside(formRef, () => setIsShownAddReviewModal(false));

  const loadDefaultImage = (type: string, id: string) => {
    if (type === "photo") {
      setPhotos(
        photos.map((photo) =>
          photo.id === id
            ? { id, src: `${process.env.PUBLIC_URL}/error.svg` }
            : photo
        )
      );
    } else if (type === "menu") {
      setMenus(
        menus.map((menu) =>
          menu.id === id
            ? { id, src: `${process.env.PUBLIC_URL}/error.svg` }
            : menu
        )
      );
    }
  };

  const buttons = ["Reviews", "Photos", "Menus"];
  if (!restaurantDetail) return null;

  return !id || !isUUID(id) ? (
    <ErrorPage />
  ) : (
    <>
      <AddReviewModal
        isShown={isShownAddReviewModal}
        setIsShown={setIsShownAddReviewModal}
        formRef={formRef}
        restaurant_id={id}
      />
      <div className="max-w-5xl mx-auto px-3 py-3">
        <div className="flex font-semibold justify-between">
          <div className="flex flex-col lg:flex-row gap-8 pr-1">
            <div className="relative w-[400px] h-auto shrink-0 rounded-md overflow-hidden">
              {restaurantDetail && (
                <img
                  src={`${process.env.REACT_APP_IMAGE_PREFIX}/coverImageUrl/${restaurantDetail.restaurant_id}.jpg`}
                  alt=""
                  width="object-cover"
                />
              )}
            </div>
            {!restaurantDetail ? (
              <RestaurantDetailSkeletonLoader />
            ) : (
              <div>
                <h1 className="text-2xl font-bold">{restaurantDetail.name}</h1>
                <div>{restaurantDetail.averageRating}</div>
                <div className="text-lg font-semibold">
                  {restaurantDetail?.address}
                </div>
                <div>{restaurantDetail.intro}</div>
              </div>
            )}
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
                  onClick={() => setIsShownAddReviewModal(true)}
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
              <button
                type="submit"
                className="border-gray-700 h-full w-20 flex justify-center items-center rounded-md text-lg px-12 py-2 border-2 hover:bg-gray-700 hover:text-white"
              >
                upload
              </button>
            </div>
            {photos.length === 0 && <div>No photos in this restaurant</div>}
            {photos.length > 0 && (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {photos.map((photo, index) => (
                  <div
                    className="shadow-md rounded-lg cursor-pointer h-fit bg-white hover:bg-slate-200"
                    onClick={() => openPopUp(photo.src)}
                    key={`photo${index}`}
                  >
                    <img
                      src={photo.src}
                      width="350"
                      height="200"
                      className="object-cover w-full h-auto rounded-lg"
                      onError={() => loadDefaultImage("photo", photo.id)}
                    />
                  </div>
                ))}
                {popUpOpen && (
                  <PhotoModal
                    selectedImage={selectedImage}
                    imageRef={imageRef}
                    closePopUp={closePopUp}
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
              <button
                type="submit"
                className="border-gray-700 h-full w-20 flex justify-center items-center rounded-md text-lg px-12 py-2 border-2 hover:bg-gray-700 hover:text-white"
              >
                upload
              </button>
            </div>
            {menus.length === 0 && (
              <div>No menu photos are provided for this restaurant</div>
            )}
            {menus.length > 0 && (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {menus.map((menu, index) => (
                  <div
                    className="shadow-md rounded-lg cursor-pointer h-fit bg-white hover:bg-slate-200"
                    onClick={() => openPopUp(menu.src)}
                    key={`menu${index}`}
                  >
                    <img
                      src={menu.src}
                      width="350"
                      height="200"
                      className="object-cover w-full h-auto rounded-lg"
                      onError={() => loadDefaultImage("menu", menu.id)}
                    />
                  </div>
                ))}
                {popUpOpen && (
                  <PhotoModal
                    selectedImage={selectedImage}
                    imageRef={imageRef}
                    closePopUp={closePopUp}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantOverviewPage;

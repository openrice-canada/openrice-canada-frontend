import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantDetail } from "../../api/restaurant/restaurantApiIndex";
import { Restaurant } from "../../api/restaurant/RestaurantType";
import { IoChatbubbleOutline } from "react-icons/io5";
import RestaurantOverviewButton from "../../components/button/RestaurantOverviewButton";
import ReviewCard from "../../components/card/ReviewCard";
import { Review } from "../../api/review/ReviewType";
import { getReviewsByRestaurantId } from "../../api/review/reviewApiIndex";
import AddReviewModal from "../../components/modal/AddReviewModal";
import RestaurantDetailSkeletonLoader from "../../components/loader/RestaurantDetailSkeletonLoader";
import PhotoModal from "../../components/modal/PhotoModal";
import useOnClickOutside from "../../components/hooks/useOnClickOutside";

function isUUID(id: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(id);
}

const RestaurantOverviewPage: React.FC = () => {
  const { id } = useParams();
  const [restaurantDetail, setRestaurantDetail] = useState<Restaurant>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState("Reviews");
  const [isShownAddReviewModal, setIsShownAddReviewModal] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [menus, setMenus] = useState<string[]>([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const imageRef = useRef<null | HTMLDivElement>(null);
  const formRef = useRef<null | HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      if (!id || !isUUID(id)) return;
      const data = await getRestaurantDetail(id);
      if (data) {
        setRestaurantDetail(data);
      }
    };

    const fetchRestaurantReview = async () => {
      if (!id || !isUUID(id)) return;
      const data = await getReviewsByRestaurantId(id);
      setReviews(data);
    };

    fetchRestaurantDetail();
    fetchRestaurantReview();
  }, [id]);

  useEffect(() => {
    setPhotos(
      reviews.map(
        (review) =>
          `${process.env.REACT_APP_IMAGE_PREFIX}/reviews/${id}/${review.review_id}.jpg`
      )
    );
    setMenus(
      reviews
        .map(
          (review) =>
            `${process.env.REACT_APP_IMAGE_PREFIX}/menus/${id}/${review.review_id}.jpg`
        )
        .sort((a, b) => a.localeCompare(b))
    );
  }, [id, reviews]);

  const openPopUp = (image: string) => {
    setSelectedImage(image);
    setPopUpOpen(true);
  };
  const closePopUp = () => {
    setPopUpOpen(false);
  };
  useOnClickOutside(imageRef, () => setPopUpOpen(false));
  useOnClickOutside(formRef, () => setIsShownAddReviewModal(false));

  const buttons = ["Reviews", "Photos", "Menus"];
  if (!restaurantDetail) return null;

  return (
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
                <div>{restaurantDetail.rating}</div>
                <div className="text-lg font-semibold">
                  {restaurantDetail?.address}
                </div>
                <div className="text-justify">{restaurantDetail.intro}</div>
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
              <h1 className="text-2xl font-bold">Review</h1>
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
            <h1 className="text-2xl font-bold my-4">Photos</h1>
            {photos.length === 0 && <div>No photos in this restaurant</div>}
            {photos.length > 0 && (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {photos.map((photo, index) => (
                  <div
                    className="shadow-md rounded-lg cursor-pointer bg-white hover:bg-slate-200 hover:scale-110 transition duration-500"
                    onClick={() => openPopUp(photo)}
                    key={`photo${index}`}
                  >
                    <img
                      src={photo}
                      width="350"
                      height="200"
                      className="object-cover w-full h-auto rounded-lg"
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
            <h1 className="text-2xl font-bold my-4">Menus</h1>
            {menus.length === 0 && (
              <div>No menu photos are provided for this restaurant</div>
            )}
            {menus.length > 0 && (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {menus.map((menu, index) => (
                  <div
                    className="shadow-md rounded-lg cursor-pointer bg-white hover:bg-slate-200 hover:scale-110 transition duration-500"
                    onClick={() => openPopUp(menu)}
                    key={`menu${index}`}
                  >
                    <img
                      src={menu}
                      width="350"
                      height="200"
                      className="object-cover w-full h-auto rounded-lg"
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

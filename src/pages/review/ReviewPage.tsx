import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  IoCashOutline,
  IoPerson,
  IoStar,
  IoThumbsUpSharp,
  IoTime,
} from "react-icons/io5";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { getReviewThunk } from "../../redux/review/reviewSlice";

function isUUID(id: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(id);
}

const ReviewRow = ({ text, icon }: { text: string; icon: React.ReactNode }) => (
  <div className="my-2 flex gap-2 items-center">
    <div>{icon}</div>
    <h1 className="text-sm truncate">{text}</h1>
  </div>
);

const ReviewPage: React.FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const review = useSelector((state: IRootState) => state.review.review);
  const restaurant = useSelector(
    (state: IRootState) => state.restaurant.restaurant
  );
  const reviewPhotos = useSelector(
    (state: IRootState) => state.photo.reviewPhotos
  );

  useEffect(() => {
    const fetchReview = async () => {
      if (!id || !isUUID(id)) return;
      dispatch(getReviewThunk(id));
    };
    fetchReview();
  }, [id, dispatch]);

  return (
    <div className="container justify-center mb-8 px-4 gap-8 mx-auto mt-10">
      <div className="relative">
        <img
          src={restaurant?.cover_image_url}
          alt="hero"
          className="w-full h-80 object-cover rounded-lg mb-4 grayscale-[50%]"
        />
        <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold whitespace-nowrap tracking-wide">
          {review?.restaurantName}
        </p>
      </div>
      <div className="justify-center mb-8 grid grid-cols-1 gap-8 mx-auto md:grid-cols-3 mt-10">
        <div className="col-span-2 rounded-md shadow-md h-80">
          {review && (
            <h1 className="font-bold text-4xl text-center pt-70">
              {review.title}
            </h1>
          )}
          <div>
            {review && (
              <div className="p-4" key={review.restaurant_id}>
                <div>{review.content}</div>
                <ReviewRow
                  text={
                    "Created at " +
                    format(new Date(review.created_at), "dd MMM yyyy HH:mm:ss")
                  }
                  icon={<IoTime />}
                />
                <div className="h-40">
                  <div className="mb-1">Photos</div>
                  <img
                    src={
                      reviewPhotos.filter(
                        (reviewPhoto) => reviewPhoto.review_id === id
                      )[0].photo_url
                    }
                    alt="review photo"
                    className="object-cover h-[100%] w-auto rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 col-span-2 rounded-md shadow-md md:col-span-1">
          {review && (
            <>
              <h5 className="border-b border-orange-500 my-2 text-lg">User</h5>
              <ReviewRow text={review.username} icon={<IoPerson />} />
              <h5 className="border-b border-orange-500 my-2 text-lg">
                Rating
              </h5>
              <div className="flex gap-2 items-start">
                <div>{<IoThumbsUpSharp />}</div>
                {Array.from({ length: review.rating }).map((rating, idx) => (
                  <span key={idx} className="text-yellow-400">
                    {<IoStar />}
                  </span>
                ))}
              </div>
              <h5 className="border-b border-orange-500 my-2 text-lg">
                Visited Date
              </h5>
              <ReviewRow
                text={format(new Date(review.created_at), "dd MMM yyyy")}
                icon={<IoTime />}
              />
              <h5 className="border-b border-orange-500 my-2 text-lg">
                Spending
              </h5>
              <ReviewRow
                text={`$${review.spending}`}
                icon={<IoCashOutline />}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

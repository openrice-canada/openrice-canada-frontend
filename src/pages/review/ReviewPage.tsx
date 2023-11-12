import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Review } from "../../api/review/ReviewType";
import { getReviewByReviewId } from "../../api/review/reviewApiIndex";
import {
  IoCashOutline,
  IoPerson,
  IoStar,
  IoThumbsUpSharp,
  IoTime,
} from "react-icons/io5";
import { format } from "date-fns";

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
  const [review, setReview] = useState<Review>();
  // const [userList, setUserList] = useState<User[]>([]);
  // const fetchUserList = async () => {
  //   const data = await getUserList();
  //   setUserList(data);
  // };

  useEffect(() => {
    const fetchReview = async () => {
      if (!id || !isUUID(id)) return;
      const data = await getReviewByReviewId(id);
      if (data) {
        setReview(data);
      }
    };
    fetchReview();
    // fetchUserList();
  }, [id]);

  return (
    <div className="container justify-center mb-8 px-4 gap-8 mx-auto mt-10">
      <div className="relative">
        <img
          src={`${process.env.REACT_APP_IMAGE_PREFIX}/coverImageUrl/${review?.restaurant_id}.jpg`}
          alt="hero"
          className="w-full h-80 object-cover rounded-lg mb-4 grayscale-[50%]"
        />
        <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold whitespace-nowrap tracking-wide">
          {review?.restaurantName}
        </p>
      </div>
      <div className="container justify-center mb-8 grid grid-cols-1 gap-8 mx-auto sm:grid-cols-1 md:grid-cols-3 mt-10">
        <div className="col-span-2 rounded-md shadow-md">
          {review && (
            <h1 className="font-bold text-4xl text-center pt-70">
              {review.title}
            </h1>
          )}
          <div>
            {review && (
              <div className="p-4" key={review.restaurant_id}>
                <p className="text-justify">{review.content}</p>
                <ReviewRow
                  text={
                    "Created at " +
                    format(new Date(review.created_at), "dd MMM yyyy HH:mm:ss")
                  }
                  icon={<IoTime />}
                />
              </div>
            )}
          </div>
          {/* <div className="mt-3"> */}
          {/* {userList.map((user) => ( */}
          {/* <div key={user.userId}>
            <p>{user.username}</p> */}
          {/* <div> */}
          {/* <p>{user.username}</p> */}
          {/* <div className="text-center"> */}
          {/* <textarea className="border border-black px-3 py-2 rounded-md max-w-xl w-full h-40"></textarea> */}
          {/* </div> */}
          {/* </div> */}
          {/* ))} */}
          {/* </div> */}
        </div>
        <div className="p-4 col-span-2 h-fit rounded-md shadow-md md:col-span-1">
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
        {/* <div className="relative"> */}
        {/* <img
          src={process.env.PUBLIC_URL + "/restaurant.jpeg"}
          alt="hero"
          className="w-full"
        /> */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-black"></div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ReviewPage;

import { Link } from "react-router-dom";
import { Review } from "../../api/review/ReviewType";
import {
  IoRestaurant,
  IoChatbubbleEllipsesSharp,
  IoTime,
  IoThumbsUpSharp,
  IoStar,
  IoPerson,
} from "react-icons/io5";
import { format } from "date-fns";

type ReviewCardProps = Review;

const ReviewRow = ({ text, icon }: { text: string; icon: React.ReactNode }) => (
  <div className="flex gap-2 items-center">
    <div>{icon}</div>
    <h1 className="text-sm truncate">{text}</h1>
  </div>
);

const ReviewCard: React.FC<ReviewCardProps> = (props: ReviewCardProps) => {
  return (
    <Link to={`/review/${props.review_id}`} className="rounded-md shadow-lg hover:bg-slate-200">
      <div className="flex flex-col gap-1 px-4 py-6">
        <ReviewRow text={props.username} icon={<IoPerson />} />
        <ReviewRow text={props.title} icon={<IoRestaurant />} />
        <ReviewRow text={props.content} icon={<IoChatbubbleEllipsesSharp />} />
        <ReviewRow text={props.created_at} icon={<IoTime />} />
        <div className="flex gap-2 items-start">
          <div>{<IoThumbsUpSharp />}</div>
          {Array.from({ length: props.rating }).map((_, index) => (
            <span className="text-yellow-400" key={index}>
              {<IoStar />}
            </span>
          ))}
        </div>
        <ReviewRow
          text={
            "Created at " +
            format(new Date(props.created_at), "dd MMM yyyy HH:mm:ss")
          }
          icon={<IoTime />}
        />
      </div>
    </Link>
  );
};

export default ReviewCard;

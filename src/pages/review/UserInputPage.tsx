import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextareaInput } from "../../components/input/TextareaInput";

function UserInput() {
  const { handleSubmit, control } = useForm();
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= rating ? "text-yellow-400" : "text-gray-400";
      stars.push(
        <span
          key={i}
          className={`text-6xl cursor-pointer ${starClassName}`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return <div className="flex justify-center items-center">{stars}</div>;
  };

  return (
    <form
      className="h-screen flex flex-col gap-6 justify-center max-w-2xl mx-auto px-4"
      onSubmit={() => {
        handleSubmit((data) => {
          console.log(data);
        });
      }}
    >
      <p className="text-3xl font-bold">
        What is your comment on the restaurant?
      </p>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextareaInput
            placeholder=""
            value={field.value}
            onChange={field.onChange}
            className="border border-black px-3 py-2 rounded-md"
          />
        )}
      />
      <p className="text-3xl font-bold">How would you rate this restaurant?</p>
      {renderStars()}
      <button
        type="submit"
        className="bg-[#000000] px-4 py-2 rounded-md text-[#ffffff] font-bold"
      >
        Submit
      </button>
    </form>
  );
}

export default UserInput;

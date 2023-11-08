import { useEffect, useRef, useState } from "react";
// import { getUserList } from "../../api/user";
import { User } from "../../api/user/UserType";
import useOnClickOutside from "../../components/hooks/useOnClickOutside";

const MenuPage = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const imageRef = useRef<null | HTMLDivElement>(null);

  const [userList, setUserList] = useState<User[]>([]);
  // const fetchUserList = async () => {
  //   const data = await getUserList();
  //   setUserList(data);
  // };

  useEffect(() => {
    setUserList([]);
    // fetchUserList();
  }, []);

  // Function to open the pop-up and set the selected image
  const openPopUp = (image: string) => {
    setSelectedImage(image);
    setPopUpOpen(true);
  };

  // Function to close the pop-up
  const closePopUp = () => {
    setPopUpOpen(false);
  };
  useOnClickOutside(imageRef, () => setPopUpOpen(false));

  return (
    <div>
      <h1 className="text-center pt-20 font-bold text-4xl pb-20">Menu Page</h1>
      <div className="grid grid-cols-5 max-w-4xl mx-auto">
        <img
          src={process.env.PUBLIC_URL + "/menu1.png"}
          alt="menu1"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu1.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu2.png"}
          alt="menu2"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu2.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu1.png"}
          alt="menu1"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu1.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu2.png"}
          alt="menu2"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu2.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu1.png"}
          alt="menu1"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu1.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu2.png"}
          alt="menu2"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu2.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu1.png"}
          alt="menu1"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu1.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu2.png"}
          alt="menu2"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu2.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu1.png"}
          alt="menu1"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu1.png")}
        />
        <img
          src={process.env.PUBLIC_URL + "/menu2.png"}
          alt="menu2"
          className="p-3"
          onClick={() => openPopUp(process.env.PUBLIC_URL + "/menu2.png")}
        />
      </div>
      <div className="flex mt-3">
        {userList &&
          userList.length > 0 &&
          userList.map((user) => (
            <div key={user.userId}>
              <p>{user.username}</p>
              <div className="text-center">
                <textarea className="border border-black px-3 py-2 rounded-md max-w-xl w-full h-40"></textarea>
              </div>
            </div>
          ))}
      </div>
      {/* Pop-up container */}
      {popUpOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-4" ref={imageRef}>
            <img
              src={selectedImage}
              alt="popup"
              className="max-w-full max-h-96"
            />
            <button onClick={closePopUp} className="translate-x-96">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;

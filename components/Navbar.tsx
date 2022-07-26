import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import useAuthStore from "../store/authStore";
import { createOrGetUser } from "../utils";
import logo from "../utils/tiktik-logo.png";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4  ">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            src={logo}
            layout="responsive"
            alt="logo"
            className="cursor-pointer"
          />
        </div>
      </Link>

      <div className="">SEARCH</div>

      <div className="">
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className=" rounded-full cursor-pointer"
                    src={userProfile?.image}
                    alt="user-profile"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

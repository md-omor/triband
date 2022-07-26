import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { createOrGetUser } from "../utils";
import logo from "../utils/tiktik-logo.png";

const Navbar = () => {
  const user = false;
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
        {user ? (
          <div className="">Logged In</div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

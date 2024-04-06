import React from "react";
import TextWithHover from "./TextWithHover";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  // Accessing cookies for authentication
  const [cookies, setCookie] = useCookies(["token"]);

  return (
    <nav className=" w-full h-1/10 bg-black flex items-center justify-end ">
      <div className="w-1/2 flex h-full">
        <div className="w-3/5 flex justify-end items-center gap-10">
          {/* Conditional rendering based on authentication */}
          {cookies.token ? (
            <>
              <TextWithHover displayText={"Logout"} />
            </>
          ) : (
            <>
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
            </>
          )}
          <div className="h-1/2 border-r border-white"></div>
        </div>

        <div className="w-2/5 flex justify-evenly h-full items-center">
           {/* Conditional rendering based on authentication  */}
          {cookies.token ? (
            <>
              <Link to={"/uploadsong"}>
                <TextWithHover displayText={"Upload Song"} />
              </Link>

              <Link
                to="/home"
                className="bg-green-500 w-10 h-10 flex items-center justify-center rounded-full font-bold cursor-pointer text-black"
              >
                NS
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="text-gray-500 font-semibold hover:text-white"
              >
                Sign up
              </Link>
              <Link
                to={"/login"}
                className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

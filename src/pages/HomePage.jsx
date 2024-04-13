import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AddAccount from "../components/AddAccount";
import { useState } from "react";
import SearchBox from "../components/SearchBox";
import PropTypes from "prop-types";


const MyButton = styled(Button)`
  margin-top: 20px;
  text-transform: ${(props) => props.texttransform || "capitalize"};
  width: ${(props) => props.width || "40%"};
  border: 1px solid black;
  margin-bottom: ${(props) => props.margin || "0ps"};
  &:active {
    background-color: #563636;
    transform: scale(0.98);
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {
      background-color: #563636;
      color: white;
    }
    100% {
      background-color: #563636;
      color: white;
    }
  }
`;

export default function HomePage({ userId, userName }) {
  const [toggle, setToggle] = useState(true);
  

  const clickHandler = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="shadow-sm shadow-black-400 m-auto mt-2 p-4 lg:w-4/12 md:w-8/12 sm:w-4/4 flex flex-col justify-center items-center ">
        <MyButton variant="text" width="80%" onClick={clickHandler}>
          Search an account
        </MyButton>
        <MyButton
          variant="text"
          width="80%"
          margin="30px"
          onClick={clickHandler}
        >
          Add an account
        </MyButton>
      </div>
      <div className="shadow-sm shadow-black-400 m-auto p-1 lg:w-8/12 md:w-5/12 sm:w-3/4  flex flex-col justify-center items-center">
        {toggle && "search" ? (
          <SearchBox userId={userId} userName={userName} />
        ) : (
          <AddAccount userId={userId} userName={userName} />
        )}
        {/* <SearchBox /> */}
      </div>
    </>
  );
}


// Prop Types validation
HomePage.propTypes = {
  userId: PropTypes.string.isRequired, // setValue prop is required and must be a function
  userName: PropTypes.string.isRequired, // setValue prop is required and must be a function
};
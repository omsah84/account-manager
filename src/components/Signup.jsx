import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFirebase, database } from "../context/firebase";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

const MyTextField = styled(TextField)`
  width: 90%;
  margin-top: 5px;
`;

const MyButton = styled(Button)`
  margin-top: 20px;
  text-transform: ${(props) => props.texttransform || "capitalize"};
  width: ${(props) => props.width || "40%"};
`;

const data = {
  name: "",
  username: "",
  email: "",
  password: "",
};

function Signup({ setValue }) {
  const firebase = useFirebase();
  const db = database();

  const [signupdata, setSignupData] = useState(data);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupdata, [name]: value });
  };

  const createUserProfile = async (userId) => {
    await addDoc(collection(db, "users"), {
      uid: userId,
      name: signupdata.name,
      username: signupdata.username,
      email: signupdata.email,
    });
  };

  const userSignup = () => {
    firebase
      .signupUserWithEmailAndPassword(signupdata.email, signupdata.password)
      .then((userCredential) => {
        setSuccess(true);
        setError("");
        createUserProfile(userCredential.user.uid);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  return (
    <>
      <Box className="shadow-sm shadow-black-400 m-auto lg:w-4/12 md:w-5/12 sm:w-3/4 mt-2 p-4 flex flex-col justify-center items-center ">
        <AccountCircleIcon style={{ fontSize: "100px" }} />
        <Typography color="blue">Create an account</Typography>
        <MyTextField
          id="standard-basic"
          name="name"
          value={signupdata.name}
          onChange={onChangeHandler}
          label="Name"
          variant="standard"
          required
        />
        <MyTextField
          id="standard-basic"
          name="username"
          value={signupdata.username}
          onChange={onChangeHandler}
          label="Username"
          variant="standard"
          required
        />
        <MyTextField
          id="standard-basic"
          name="email"
          value={signupdata.email}
          onChange={onChangeHandler}
          label="Email"
          variant="standard"
          required
        />
        <MyTextField
          id="standard-basic"
          name="password"
          value={signupdata.password}
          onChange={onChangeHandler}
          label="Password"
          variant="standard"
          required
        />
        <MyButton
          variant="contained"
          texttransform="capitalize"
          onClick={userSignup}
        >
          Sign up
        </MyButton>
        <MyButton variant="text" width="80%" onClick={() => setValue("login")}>
          Already have an account
        </MyButton>
        {success && true ? (
          <Typography color="blue">Successfully login</Typography>
        ) : (
          <></>
        )}
        {error && true ? (
          <Typography color="red">Something wrong.</Typography>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

// Prop Types validation
Signup.propTypes = {
  setValue: PropTypes.func.isRequired, // setValue prop is required and must be a function
};

export default Signup;

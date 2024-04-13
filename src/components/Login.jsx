import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useFirebase, database } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

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
  username: "",
  email: "",
  password: "",
};

function Login({ setValue, getUserCredential }) {
  const firebase = useFirebase();
  const db = database();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const getUserId = (uid, uname) => {
    users.map((data, index) => {
      if (data.uid === uid) {
        const username = users[index].username;
        if (username === uname) {
          navigate("/home");
          getUserCredential(uid, username);
        } else {
          setError(true);
        }
      }
    });

    // console.log(users[ed].username)
    // console.log(idx);
  };

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const userLogin = () => {
    firebase
      .signinUserWithEmailAndPassword(loginData.email, loginData.password)
      .then((userCredential) => {
        getUserId(userCredential.user.uid, loginData.username);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("error", errorCode);
        setError(true);
      });
  };

  return (
    <>
      <Box className="shadow-sm shadow-black-400 m-auto mt-2 p-4 lg:w-4/12 md:w-5/12 sm:w-3/4 flex flex-col justify-center items-center ">
        <AccountCircleIcon style={{ fontSize: "100px" }} />
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          remember username and accountname must be lowercase!
        </Alert>
        <Typography color="blue">Welcome back!</Typography>
        <MyTextField
          id="standard-basic"
          name="username"
          value={loginData.username}
          onChange={onChangeHandler}
          label="Username"
          variant="standard"
          required
        />
        <MyTextField
          id="standard-basic"
          name="email"
          value={loginData.email}
          onChange={onChangeHandler}
          label="Email"
          variant="standard"
          required
        />
        <MyTextField
          id="standard-basic"
          name="password"
          value={loginData.password}
          onChange={onChangeHandler}
          label="Password"
          variant="standard"
          required
        />
        <MyButton
          variant="contained"
          texttransform="capitalize"
          onClick={userLogin}
        >
          Login
        </MyButton>
        <MyButton variant="text" width="80%" onClick={() => setValue("signup")}>
          Create an account
        </MyButton>
        {error && true ? (
          <Alert severity="error">Fail to login!</Alert>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

// Prop Types validation
Login.propTypes = {
  setValue: PropTypes.func.isRequired, // setValue prop is required and must be a function
  getUserCredential: PropTypes.func.isRequired, // setValue prop is required and must be a function
};

export default Login;

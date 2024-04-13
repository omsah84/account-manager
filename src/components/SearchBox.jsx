import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../context/firebase";
import PropTypes from "prop-types";
import KeyValuePairs from "./KeyValuePairs";
import Alert from "@mui/material/Alert";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SearchBox({ userId, userName }) {
  const [searchQuery, setSearchQuery] = useState("");
  const db = database();
  const [queryData, setQueryData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [eMessage, setEMessage] = useState(false);

  // Function to get field values from a subdocument
  const getSubdocumentFieldValues = async (
    db,
    mainCollection,
    docId,
    subcollection,
    subdocId
  ) => {
    try {
      // Reference to the subdocument
      const subDocRef = doc(db, mainCollection, docId, subcollection, subdocId);

      // Get the subdocument
      const subDocSnap = await getDoc(subDocRef);

      if (subDocSnap.exists()) {
        // Access the field values
        const data = subDocSnap.data();
        setQueryData(data.keyValuePairs);
        setIsSuccess(true);
        console.log(queryData);
      } else {
        console.log("No such subdocument!");
        setEMessage(true);
      }
    } catch (error) {
      console.error("Error getting subdocument:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement the search logic here
    getSubdocumentFieldValues(
      db,
      "userAccountData",
      userName,
      searchQuery,
      userId
    );
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        onSubmit={handleSearch}
      >
        <Search sx={{ width: "100%" }}>
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
      </Paper>
      {eMessage ? <Alert severity="success" sx={{marginTop:"10px"}}>No such information!</Alert> : <></>}
      {isSuccess ? <KeyValuePairs data={queryData} /> : <></>}
    </>
  );
}

export default SearchBox;

// Prop Types validation
SearchBox.propTypes = {
  userId: PropTypes.string.isRequired, // setValue prop is required and must be a function
  userName: PropTypes.string.isRequired, // setValue prop is required and must be a function
};

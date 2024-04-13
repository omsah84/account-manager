import { useState } from "react";
import { Container, TextField, Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { database } from "../context/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import PropTypes from "prop-types";

function AddAccount({ userId, userName }) {
  const [accountName, setAccountName] = useState("");
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

  const db = database();

  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleKeyValuePairChange = (index, event) => {
    const newKeyValuePairs = keyValuePairs.map((pair, i) => {
      if (i === index) {
        return { ...pair, [event.target.name]: event.target.value };
      }
      return pair;
    });
    setKeyValuePairs(newKeyValuePairs);
  };

  const addKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };

  const removeKeyValuePair = (index) => {
    const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(newKeyValuePairs);
  };

  // Function to create the schema
  const createUserAccountData = async (
    db,
    userName,
    accountName,
    keyValuePairs
  ) => {
    // Reference to the main collection 'users' and document 'user123'
    const userDocRef = doc(db, "userAccountData", userName);

    // Set the main document (this step is optional if you only want to create subcollections)
    await setDoc(userDocRef, {
      /* document fields, if any */
    });

    // Reference to the subcollection 'accountData' within 'user123'
    const accountDataCollectionRef = collection(userDocRef, accountName);

    // Reference to the subdocument 'account456' within 'accountData'
    const accountDataDocRef = doc(accountDataCollectionRef, userId);

    // Set the subdocument with fields
    await setDoc(accountDataDocRef, {
      keyValuePairs,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    createUserAccountData(db, userName, accountName, keyValuePairs);
    console.log({ accountName, keyValuePairs });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Account Name"
          value={accountName}
          onChange={handleAccountNameChange}
          margin="normal"
          required
        />
        {keyValuePairs.map((pair, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label="Key"
              name="key"
              value={pair.key}
              onChange={(event) => handleKeyValuePairChange(index, event)}
              style={{ marginRight: "10px" }}
              required
              sx={{ width: "40%" }}
            />
            <TextField
              label="Value"
              name="value"
              value={pair.value}
              onChange={(event) => handleKeyValuePairChange(index, event)}
              required
              sx={{ width: "50%" }}
            />
            <IconButton onClick={() => removeKeyValuePair(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={addKeyValuePair}
          >
            Add Key-Value Pair
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            sx={{ width: "200px", textAlign: "center" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default AddAccount;

// Prop Types validation
AddAccount.propTypes = {
  userId: PropTypes.string.isRequired, // setValue prop is required and must be a function
  userName: PropTypes.string.isRequired, // setValue prop is required and must be a function
};

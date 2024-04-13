import { Typography, List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";


const KeyValuePairs = ({ data }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom sx={{marginTop:"25px"}}>
        Informations:
      </Typography>
      <List className="flex lg:flex-row md:flex-row sm:flex-col flex-col">
        {data.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${item.key}:`} secondary={item.value} sx={{textTransform:"lowercase"}}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default KeyValuePairs;


// Prop Types validation
KeyValuePairs.propTypes = {
  data: PropTypes.object.isRequired, // setValue prop is required and must be a function
};
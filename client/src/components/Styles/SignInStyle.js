import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  signInBttn: {
    background: "#dc4c4c !important",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black !important",
    padding: "0 30px",
    borderColor: "black",
    fontColor: "black !important",
  },
  textField: {
    "& label.Mui-focused": {
      color: "#dc4c4c",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#dc4c4c",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#dc4c4c",
      },
      "&:hover fieldset": {
        borderColor: "#dc4c4c",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#dc4c4c",
      },
    },
  },
  container: {
    borderStyle: "solid",
    borderColor: "#dc4c4c",
    backgroundColor: "#FFFFFF",
    paddingBottom: "20px",
    marginTop: "10%",
  },
  select: {
    "&:focus": {
      borderColor: "#dc4c4c !important",
    },
    "&:before": {
      borderColor: "#dc4c4c !important",
    },
    "&:after": {
      borderColor: "#dc4c4c !important",
    },
  },
});

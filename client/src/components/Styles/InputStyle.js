import { makeStyles } from "@mui/styles";

export const useStylesInput = makeStyles({
  inputForm: {
    "&:before": {
      borderBottom: "1px solid #dc4c4c  !important",
    },
    "&:after": {
      borderBottom: "2px solid #dc4c4c  !important",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid #dc4c4c !important",
    },
  },
  formButton: {
    background: "#dc4c4c !important",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black !important",
    padding: "0 30px",
    borderColor: "black",
    fontColor: "black !important",
  },
  bttn: {
    border: 0,
    borderRadius: 3,

    color: "black !important",
    padding: "0 30px",
    borderColor: "black",
    fontColor: "black !important",
  },
});

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  sideMenuLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "40px",
    "&:hover": {
      color: "#dc4c4c",
    },
  },
  menuItemLink: {
    color: "black",
    textDecoration: "none",
    fontSize: "25px",
    "&:hover": {
      color: "white",
    },
  },
  icon: {
    "& svg": {
      fontSize: "40px",
    },
  },
  menu: {
    backgroundColor: "#dc4c4c",
    display: "flex",
    justifyContent: "space-between",
  },
});

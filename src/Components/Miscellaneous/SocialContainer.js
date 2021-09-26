import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    padding: "0",
    margin: "60px 0",
    borderRadius: "20px",
  },
  icon: {
    width: "35px",
    margin: "0 5px",
  },
  iconf: {
    width: "45px",
    margin: "0 5px",
  },
  social: {
    display: "inline-block",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
  },
  socialContainer: {
    margin: "20px 0",
    display: "inline",
  },
});

function SocialContainer() {
  const classes = useStyles();
  return (
    <div className={classes.socialContainer}>
      <Link to="/facebook" className={classes.social}>
        <img
          className={classes.iconf}
          src="../images/facebook.svg"
          alt="userIcon"
        />
      </Link>
      <Link to="/facebook" className={classes.social}>
        <img
          className={classes.icon}
          src="../images/google-plus.svg"
          alt="userIcon"
        />
      </Link>
      <Link to="/facebook" className={classes.social}>
        <img
          className={classes.icon}
          src="../images/twittericon.svg"
          alt="userIcon"
        />
      </Link>
    </div>
  );
}

export default SocialContainer;

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { requestSignIn } from "../store/action/signInAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Miscellaneous/Loader";
import { setLoaderValue } from "../store/action/loaderAction";
import SocialContainer from "../Components/Miscellaneous/SocialContainer";

const useStyles = makeStyles({
  container: {
    padding: "0",
    margin: "60px 0",
    borderRadius: "20px",
  },
});

function LoginPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { loader } = useSelector((store) => store.loaderStore);
  const { errorMessage, token } = useSelector((store) => store.signInStore);
  console.log(loader, "===loader");
  console.log(errorMessage, "===errorMessage");

  const [cred, setCred] = useState([]);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setLoaderValue(true));
    dispatch(requestSignIn(cred));
    console.log(cred, "===credential");
  };
  useEffect(() => {
    history.push("/");
  }, [history, token]);

  useEffect(() => {
    history.push("/signin");
  }, [history, errorMessage]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <Grid container spacing={0}>
            <Grid item xs={false} lg={2}></Grid>
            <Grid item xs={false} lg={4} className={classes.container}>
              <img
                className={styles.image}
                src="../images/loginimg.jpg"
                alt="Login display"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <form className={styles.formContainer}>
                <h1 className={styles.header}>Sign in</h1>
                <SocialContainer />
                <span>or use your account </span>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                  defaultValue={cred.email}
                  onChange={(e) => setCred({ ...cred, email: e.target.value })}
                  autoComplete="on"
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                  defaultValue={cred.password}
                  onChange={(e) =>
                    setCred({ ...cred, password: e.target.value })
                  }
                  autoComplete="on"
                />
                {errorMessage ? (
                  <p className={styles.error}>{errorMessage}! Try Again.</p>
                ) : null}
                <Link to="/signup">Forgot your password?</Link>
                <p className={styles.para}>
                  Don't have a account? <Link to="/signup">Sign Up!</Link>
                </p>
                <button className={styles.button} onClick={handleLogin}>
                  Sign In
                </button>
              </form>
            </Grid>
            <Grid item xs={false} lg={2}></Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default LoginPage;

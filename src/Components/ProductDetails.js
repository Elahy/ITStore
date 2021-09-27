import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "./Miscellaneous/Loader";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { requestProductDetails } from "../store/action/productAction";
import { setLoaderValue } from "../store/action/loaderAction";
import AddToCart from "../Components/Cart/AddToCart";
import SocialContainer from "./Miscellaneous/SocialContainer";

const useStyles = makeStyles({
  root: {
    minHeight: "90vh",
  },
  imgCard: {
    marginTop: "20%",
  },
  description: {
    textAlign: "justify",
    maxHeight: "400px",
    // border: "1px solid black",
    overflow: "auto",
    padding: "5% 2% 5% 0",
  },
  buttton: {
    color: "#e00067",
    borderColor: "#e00067",
    margin: "2% 4%",
    display: "block",
    padding: "8px 15px",
  },
  image: {
    maxWidth: "500px",
    maxHeight: "500px",
    margin: "10% 0",
    paddingLeft: "20%",
    // border: "1px solid black",
    // borderRadius: "5%",
  },
  image2: {
    maxWidth: "100px",
    maxHeight: "100px",
    // marginLeft: "45%",
    margin: "5% 5% 5% 45%",
    border: "1px solid #808080",
    borderRadius: "5%",
  },
  cardBody: {
    margin: "5%",
  },
  butttons: {
    display: "flex",
  },
  socialMedia: {
    marginLeft: "45%",
  },
});

function ProductList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    console.log("===Console in useEffect1");
    dispatch(setLoaderValue(true));
    dispatch(requestProductDetails(param.id));
    console.log("===Console in useEffect2");
  }, [dispatch, param.id]);

  const { currentProduct } = useSelector((store) => store.productStore);
  console.log(currentProduct, "===currentProduct");
  const { loaderStore } = useSelector((store) => store);

  const buttonHandler = () => {
    history.push("/products");
  };
  console.log(loaderStore, "===loderStore");

  return (
    <>
      {loaderStore.loader ? (
        <Loader />
      ) : (
        <>
          <Grid container className={classes.root}>
            <Grid item xs={false} lg={2}></Grid>
            <Grid item xs={false} lg={4}>
              <Card className={classes.imgCard}>
                <CardMedia
                  className={classes.image}
                  component="img"
                  alt={currentProduct?.title}
                  image={`https://fake-comb.herokuapp.com${currentProduct?.image}`}
                  title={currentProduct?.title}
                />
                <CardMedia
                  className={classes.image2}
                  component="img"
                  alt={currentProduct?.title}
                  image={`https://fake-comb.herokuapp.com${currentProduct?.image}`}
                  title={currentProduct?.title}
                />
              </Card>
            </Grid>
            <Grid item xs={false} lg={4}>
              <div className={classes.imgCard}>
                <CardContent className={classes.cardBody}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {currentProduct?.title}
                  </Typography>

                  <Typography variant="h6" color="textSecondary" component="p">
                    Type: {currentProduct?.category?.name}
                  </Typography>
                  <Typography variant="h5" color="textPrimary" component="p">
                    Price: {currentProduct?.price}Tk
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="p">
                    Product Details:
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    color="textSecondary"
                    component="p"
                    className={classes.description}
                  >
                    {currentProduct?.description}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="p">
                    {currentProduct?.stock} Pices Available
                  </Typography>
                  <div className={classes.butttons}>
                    <AddToCart product={currentProduct} />
                    <Button
                      onClick={buttonHandler}
                      className={classes.buttton}
                      size="medium"
                      variant="outlined"
                      color="primary"
                    >
                      Go Back
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Grid>
          </Grid>
          <div className={classes.socialMedia}>
            <p> Share on Social Media! </p>
            <SocialContainer />
          </div>
        </>
      )}
    </>
  );
}

export default ProductList;

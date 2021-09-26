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
import { requestProductDetails } from "../store/action/productAction";
import { setLoaderValue } from "../store/action/loaderAction";
import AddToCart from "../Components/Cart/AddToCart";

const useStyles = makeStyles({
  root: {
    width: "67%",
    alignContent: "center",
    margin: "2% 16%",
    display: "flex",
    minHeight: "90vh",
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
    margin: "5%",
  },
  cardBody: {
    margin: "5%",
  },
  butttons: {
    display: "flex",
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
        <Grid container>
          <Grid item xs={false} lg={2}></Grid>
          <Grid item xs={false} lg={4}>
            <CardMedia
              className={classes.image}
              component="img"
              alt={currentProduct?.title}
              image={`https://fake-comb.herokuapp.com${currentProduct?.image}`}
              title={currentProduct?.title}
            />
          </Grid>
          <Grid item xs={false} lg={4}>
            <CardContent className={classes.cardBody}>
              <Typography gutterBottom variant="h5" component="h2">
                {currentProduct?.title}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                color="textSecondary"
                component="p"
              >
                {currentProduct && currentProduct.description}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Type: {currentProduct && currentProduct.category.name}
              </Typography>
              <Typography variant="h5" color="textPrimary" component="p">
                Price: {currentProduct && currentProduct.price}Tk
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
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductList;

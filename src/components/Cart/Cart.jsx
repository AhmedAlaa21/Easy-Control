import React from "react";
import { Typography, Button, Grid, Container } from "@material-ui/core";
import useStyles from "./styles";
import { Audio } from "react-loader-spinner";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();
  //will display cart or empty cart according to this.
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link to="/" className={classes.link}>
        start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            onClick={handleEmptyCart}
            size="large"
            color="secondary"
            type="button"
            variant="contained"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component= {Link}
            to="/checkout"
            size="large"
            color="primary"
            type="button"
            variant="contained"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items)
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperClass={classes.audio}
      />
    );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;

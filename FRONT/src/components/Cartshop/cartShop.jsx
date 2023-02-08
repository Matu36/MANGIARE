import { useState} from "react";
//import { useEffect } from "react";
import { useSelector } from "react-redux";
//Components
import Item from "./Item/item";
import CartList from "./CartList/cartList";
import Navbar from "./SearchBarCarrito/searchBarCarrito";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";


const Apcp = () => {

    const ingredientsValues = useSelector(
        (state) => state.searchValuesIngredients
      );

  const { isLoading, error, data } = ingredientsValues || {}; 
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const getTotalItems = (cartItems) =>
    cartItems.reduce((acum, i) => acum + i.amount, 0);
  const handleAddItemToCart = (item) => {
    setCartItems((prev) => {
      // Search the item in the array
      const isItemInTheCart = prev.find((i) => i.id === item.id);
      if (isItemInTheCart) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, amount: i.amount + 1 } : i
        );
      }
      return [...prev, { ...item, amount: 1 }];
    });
  };
  const handleRemoveItemFromCart = (id) => {
    setCartItems((prev) => {
      const foundItem = prev.find((i) => i.id === id);
      if (foundItem) {
        if (foundItem.amount === 1) {
          const newArray = prev.filter((i) => i.id !== id);
          return newArray;
        } else {
          return prev.map((i) =>
            i.id === id ? { ...i, amount: i.amount - 1 } : i
          );
        }
      } else {
        return prev;
      }
    });
  };
  if (isLoading) return <LinearProgress />;
  if (error) return error.message;

  return (
    <>
      <Navbar
        getTotalItems={getTotalItems(cartItems)}
        setCartOpen={setCartOpen}
      ></Navbar>
      <div className="main">
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <CartList
            cartItems={cartItems}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
          />
        </Drawer>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid key={item.id} item xs={12} sm={4}>
              <Item item={item} handleAddItemToCart={handleAddItemToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
export default Apcp;
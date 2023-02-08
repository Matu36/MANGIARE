import Button from "@material-ui/core/Button";
const CartItem = ({ item, handleAddItemToCart, handleRemoveItemFromCart }) => {
  return (
    <aside>
      <div className="itemCart">
        <div>
          <h3>{item.title}</h3>
          <div className="itemInfo">
            <p>Precio: ${item.price}</p>
            <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          </div>
          <div className="buttons">
            <Button onClick={ () => handleRemoveItemFromCart(item.id)} size="small" disableElevation variant="contained">
              -
            </Button>
            <p> {item.amount} </p>
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => handleAddItemToCart(item)}
            >
              +
            </Button>
          </div>
        </div>
        <img src= {item.image} alt="IMG" />
      </div>
    </aside>
  );
};
export default CartItem;
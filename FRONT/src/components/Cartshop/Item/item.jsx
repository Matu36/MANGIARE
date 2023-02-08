import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
export default function Item({item, handleAddItemToCart }) {
    const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={item.title}
          height="200"
          image={item.image}
          title={item.title}
        />
        <CardContent>
          {item.description}
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="secondary">
          $ {item.price}
        </Button>
        <Button size="small" color="primary" onClick = { () => handleAddItemToCart(item)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
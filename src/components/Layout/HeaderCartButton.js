import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
const HeaderCartButton = props => {
   const [buttonIsHighlighted, setbuttonIsHighlighted] = useState(false);

   const cartCtx = useContext(CartContext);

   const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0);
   const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''} `;

   const { items } = cartCtx;

   useEffect(() => {
      if (items.length === 0) return;

      setbuttonIsHighlighted(true);
      const timer = setTimeout(() => setbuttonIsHighlighted(false), 300);

      return () => {
         clearTimeout(timer);
      };
   }, [items]);

   return (
      <button className={btnClasses} onClick={props.onClick}>
         <span className={classes.icon}>
            <CartIcon />
         </span>
         <span>Your Cart</span>
         <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
   );
};

export default HeaderCartButton;

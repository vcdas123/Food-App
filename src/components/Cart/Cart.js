import { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = props => {
   const cartCtx = useContext(CartContext);
   const [hasError, setHasError] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState();
   const [isCheckout, setIsCheckout] = useState(false);
   const [orderId, setOrderId] = useState();

   const hasItems = cartCtx.items.length > 0;
   const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

   const cartItemRemoveHandler = id => {
      cartCtx.removeItem(id);
   };
   const cartItemAddHandler = item => {
      cartCtx.addItem({ ...item, amount: 1 });
   };

   const orderHandler = value => {
      setIsCheckout(value);
   };

   const cartButtons = (
      <div className={classes.actions}>
         <button onClick={props.onHideCart} className={classes['button--alt']}>
            Close
         </button>
         {hasItems && (
            <button className={classes.button} onClick={orderHandler.bind(null, true)}>
               Order
            </button>
         )}
      </div>
   );
   const cartItems = (
      <ul className={classes['cart-items']}>
         {cartCtx.items.map(item => (
            <CartItem
               key={item.id}
               name={item.name}
               amount={item.amount}
               price={item.price}
               onRemove={cartItemRemoveHandler.bind(null, item.id)}
               onAdd={cartItemAddHandler.bind(null, item)}
            />
         ))}
      </ul>
   );

   // Order Handler
   const confirmOrder = async userData => {
      setIsSubmitting(true);
      try {
         const res = await fetch(
            'https://moreoncustomhooks-default-rtdb.firebaseio.com/orders.json',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  user: userData,
                  order: {
                     totalAmount: cartCtx.totalAmount.toFixed(2),
                     items: cartCtx.items,
                  },
               }),
            }
         );

         if (!res.ok) throw new Error('Order not placed....Try Again!');

         const data = await res.json();
         setOrderId(data.name);
         console.log(data.name);

         cartCtx.resetCart();
      } catch (error) {
         console.error(error.message);
         setHasError(true);
      }
      setIsSubmitting(false);
   };

   // Conditional Contents
   const defaultContent = (
      <Fragment>
         {cartItems}
         <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>
         {isCheckout && <Checkout onCancel={props.onHideCart} confirmOrder={confirmOrder} />}
         {!isCheckout && cartButtons}
      </Fragment>
   );
   const errorContent = <p className={classes.orderText}>Order not placed...Try Again!</p>;
   const placingOrderContent = (
      <p className={classes.orderText}>Please wait order is in processing...</p>
   );
   const orderPlacedContent = (
      <p className={classes.orderText}>{`Order placed successfully! (OrderID: ${orderId})`}</p>
   );
   const orderPlacedBtn = (
      <div className={classes.actions}>
         <button onClick={props.onHideCart}>Close</button>
      </div>
   );

   // Returned component
   return (
      <Modal onClick={props.onHideCart}>
         {!(isSubmitting === false) && defaultContent}
         {hasError && errorContent}
         {isSubmitting && placingOrderContent}
         {isSubmitting === false && orderPlacedContent}
         {isSubmitting === false && orderPlacedBtn}
      </Modal>
   );
};

export default Cart;

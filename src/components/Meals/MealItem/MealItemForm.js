import React, { useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
   // const [amountIsValid, setAmountIsValid] = useState(true);
   const quantityInputRef = useRef();

   const submitHandler = e => {
      e.preventDefault();
      const enteredQuantity = +quantityInputRef.current.value;
      // if (
      //   enteredQuantity === 0 ||
      //   enteredQuantity < 1 ||
      //   enteredQuantity > 5
      // ) {
      //   setAmountIsValid(false);
      //   return;
      // }

      props.onAddToCart(enteredQuantity);
   };
   return (
      <form className={classes.form} onSubmit={submitHandler}>
         <Input
            ref={quantityInputRef}
            label="Amount"
            input={{
               id: 'amount',
               type: 'number',
               min: '1',
               max: '5',
               step: '1',
               defaultValue: '1',
            }}
         />
         <button>+ Add</button>
         {/* {!amountIsValid && <p>Please enter a valid amount (1-5)</p>} */}
      </form>
   );
};

export default MealItemForm;

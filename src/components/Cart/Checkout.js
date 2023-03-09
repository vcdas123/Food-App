import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const checkStrInput = value => value.trim() !== '';
const checkEmail = email => email.trim().includes('@');
const checkNumber = num => num.trim().length === 10;
const isPostalCode = code => +code.trim().length === 6;
const classMaker = condition =>
   condition ? classes.control : `${classes.control} ${classes.invalid}`;

const Checkout = props => {
   // Custom Hooks for Extracting Valid input Data
   const {
      value: entName,
      isValid: isNameValid,
      valChangeHandler: nameChanger,
      reset: nameResetter,
   } = useInput(checkStrInput);

   const {
      value: entStreet,
      isValid: isStreetValid,
      valChangeHandler: streetChanger,
      reset: streetResetter,
   } = useInput(checkStrInput);

   const {
      value: entPostalCode,
      isValid: isPostalCodeValid,
      valChangeHandler: postalCodeChanger,
      reset: postalCodeResetter,
   } = useInput(isPostalCode);

   const {
      value: entCity,
      isValid: isCityValid,
      valChangeHandler: cityChanger,
      reset: cityResetter,
   } = useInput(checkStrInput);
   const {
      value: entNumber,
      isValid: isNumberValid,
      valChangeHandler: numberChanger,
      reset: numberResetter,
   } = useInput(checkNumber);
   const {
      value: entEmail,
      isValid: isEmailValid,
      valChangeHandler: emailChanger,
      reset: emailResetter,
   } = useInput(checkEmail);

   // Classes
   const nameClasses = classMaker(isNameValid);
   const streetClasses = classMaker(isStreetValid);
   const postalCodeClasses = classMaker(isPostalCodeValid);
   const cityClasses = classMaker(isCityValid);
   const numberClasses = classMaker(isNumberValid);
   const emailClasses = classMaker(isEmailValid);

   // FormValidation for Button
   const formValidation =
      checkStrInput(entName) &&
      checkStrInput(entStreet) &&
      isPostalCode(entPostalCode) &&
      checkStrInput(entCity) &&
      checkNumber(entNumber) &&
      checkEmail(entEmail);

   // Submit handler
   const confirmSubmitHandler = event => {
      event.preventDefault();
      nameResetter();
      streetResetter();
      postalCodeResetter();
      cityResetter();
      numberResetter();
      emailResetter();

      props.confirmOrder({
         name: entName,
         email: entEmail,
         phone: entNumber,
         street: entStreet,
         postalCode: entPostalCode,
         city: entCity,
      });
   };

   return (
      <form className={classes.form} onSubmit={confirmSubmitHandler}>
         <div className={nameClasses}>
            <label htmlFor="name">Your Name</label>
            <input
               type="text"
               id="name"
               value={entName}
               onChange={nameChanger}
               onBlur={nameChanger}
               placeholder="Put your name..."
            />
         </div>
         <div className={streetClasses}>
            <label htmlFor="street">Street</label>
            <input
               type="text"
               id="street"
               value={entStreet}
               onChange={streetChanger}
               onBlur={streetChanger}
               placeholder="Put your street..."
            />
         </div>
         <div className={postalCodeClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input
               type="number"
               id="postal"
               value={entPostalCode}
               onChange={postalCodeChanger}
               onBlur={postalCodeChanger}
               placeholder="Put your 6 digit postal code..."
            />
         </div>
         <div className={cityClasses}>
            <label htmlFor="city">City</label>
            <input
               type="text"
               id="city"
               value={entCity}
               onChange={cityChanger}
               onBlur={cityChanger}
               placeholder="Put your city..."
            />
         </div>
         <div className={numberClasses}>
            <label htmlFor="number">Mobile Number</label>
            <input
               type="number"
               id="number"
               value={entNumber}
               onChange={numberChanger}
               onBlur={numberChanger}
               placeholder="Put your 10 digit number..."
               max="9999999999"
            />
         </div>
         <div className={emailClasses}>
            <label htmlFor="email">Email</label>
            <input
               type="email"
               id="email"
               value={entEmail}
               onChange={emailChanger}
               onBlur={emailChanger}
               placeholder="Put your email..."
            />
         </div>
         <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
               Cancel
            </button>
            <button className={classes.submit} disabled={!formValidation}>
               Confirm
            </button>
         </div>
      </form>
   );
};

export default Checkout;

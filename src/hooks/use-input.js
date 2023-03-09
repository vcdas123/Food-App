import { useState } from 'react';

const useInput = checkFn => {
   const [entVal, setEntVal] = useState('');
   const [isValid, setIsValid] = useState(true);

   const valChangeHandler = event => {
      setEntVal(event.target.value);
      if (checkFn(event.target.value)) setIsValid(true);
      else setIsValid(false);
   };

   const reset = () => {
      setEntVal('');
      setIsValid(true);
   };

   return {
      value: entVal,
      isValid,
      valChangeHandler,
      reset,
   };
};

export default useInput;

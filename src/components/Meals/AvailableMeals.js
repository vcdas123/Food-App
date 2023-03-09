import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useCallback, useEffect, useState } from 'react';

const AvailableMeals = () => {
   const [meals, setMeals] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState();

   const sendReq = useCallback(async () => {
      try {
         const res = await fetch('https://moreoncustomhooks-default-rtdb.firebaseio.com/meals.json');
         if (!res.ok) throw new Error('Request Failed.....');
         const mealData = await res.json();

         const formattedMealsArray = Object.values(mealData);
         formattedMealsArray.forEach((meal, index) => (meal.id = `m${index + 1}`));

         setMeals(formattedMealsArray);
      } catch (err) {
         setError(err.message || 'Something went wrong😭.....');
      }
      setIsLoading(false);
   }, []);

   useEffect(() => {
      sendReq();
   }, [sendReq]);

   if (isLoading)
      return (
         <section className={classes.MealsLoading}>
            <p>Loading...</p>
         </section>
      );

   const mealsList = meals.map(meal => (
      <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
   ));
   return (
      <section className={classes.meals}>
         <Card>
            <ul>{mealsList}</ul>
            {error && <p className={classes.errorText}>Failed To Fetch Meal Data!</p>}
         </Card>
      </section>
   );
};

export default AvailableMeals;

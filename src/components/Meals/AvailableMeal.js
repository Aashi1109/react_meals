import React, { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";

import Card from "../UI/Card";

import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";


const AvailableMeal = () => {
  const { isLoading, error, sendRequest: fetchMeals } = useHTTP();
  const [initMeals, setInitMeals] = useState([]);

  const mealsList = (mealsData) => {
    const loadedMeals = [];
    for (const key in mealsData) {
      if (Object.hasOwnProperty.call(mealsData, key)) {
        loadedMeals.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
      }
    }

    return setInitMeals(loadedMeals);
  };
  useEffect(() => {
    fetchMeals(
      {url: "https://react-meals-5b7e8-default-rtdb.firebaseio.com/meals.json"},
      mealsList
    );
  }, [fetchMeals]);

  let content = null;
  if (isLoading) {
    content = <p>Loading available meals ...</p>;
  } else if (error) {
    content = error;
  } else {
    content = initMeals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    ));
  }
  // console.log(content);

  return <Card className={styles["meals"]}>{content}</Card>;
};

export default AvailableMeal;

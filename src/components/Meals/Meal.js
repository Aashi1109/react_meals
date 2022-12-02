import React, { Fragment } from 'react'
import AvailableMeal from './AvailableMeal'
import MealSummary from './MealSummary'

const Meal = () => {
  return (
    <Fragment>
        <MealSummary/>
        <AvailableMeal/>
    </Fragment>
  )
}

export default Meal
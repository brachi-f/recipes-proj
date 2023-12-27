import axios from "axios"
import { useEffect, useState } from "react"
import Recipe from "./recipes/recipe"

const recipeList = []
const App = () => {
    useEffect(() => {
        axios.get(`http://localhost:8080/api/recipe`).then(x => {
            x.data.forEach(element => recipeList.push(element))
            recipeCake = recipeList[1]
            console.log(recipeList)
            console.log(recipeCake)
        })}, [])
    return <>
        {recipeCake?<Recipe {...recipeCake} />:<hr/>}</>
}
export default App;
export let recipeCake = recipeList.at(0);

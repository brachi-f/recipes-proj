import axios from "axios"
import { useEffect, useState } from "react"
import Recipe from "./recipes/recipe"
import RecipeList from "./recipes/recipesList"

const App = () => {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/api/recipe').then(x => setRecipes(x.data))
    }, [])
    console.log(recipes[0])
    return <>
    {/* <Recipe recipe={recipes[0]}/>
        {recipes.map((rec,index) => {
            <Recipe recipe={recipes[index]} />
            // console.log("calling to recipe");
            // console.log("recipe = "+rec);
            // console.log(recipes[index]);
        })} */}
        <RecipeList/>
    </>
}
export default App;

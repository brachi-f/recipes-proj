import axios from "axios";
import { useState, useEffect } from "react";


export default (recipeId) => {
    const [categoryList, setCategoryList] = useState([]);
    const [recipe, setRecipe] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/category`)
            .then(c => {
                setCategoryList(c.data);
            });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(re => {
                console.log(recipeId)
                setRecipe(re.data[recipeId]);
                console.log(recipe)
            })
    }, [])
    const difficulties = ["", "", ""]
    return <>
        <h2>{recipe?.Name}</h2>
        <img src={recipe?.Img} />
        <h3>{recipe?.Description}</h3>
        <p>{categoryList?.find(c => c.Id == recipe?.CategoryId)}</p>
        <p>{difficulties[recipe?.Difficulty]}</p>
        <p>{recipe?.Duration} דקות</p>
    </>
}
import axios from "axios";
import { useState, useEffect } from "react";


export default ({recipeId}) => {
    const [categoryList, setCategoryList] = useState([]);
    const [recipe, setRecipe] = useState();
    const [recipeList, setRecipeList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/category`)
            .then(c => {
                setCategoryList(c.data);
            });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(re => {
                setRecipeList(re.data)
                console.log(recipeList)
            })
    }, [])
    useEffect(()=>{
        setRecipe(recipeList.find(r=>r.Id==recipeId))
    },recipeList)
    const difficulties = ["קל", "בינוני", "קשה"]
    return <>
        <h2>{recipe?.Name}</h2>
        <img src={recipe?.Img} />
        <h3>{recipe?.Description}</h3>
        <p>{categoryList?.find(c => c.Id == recipe?.CategoryId)}</p>
        <p>{difficulties[recipe?.Difficulty]}</p>
        <p>{recipe?.Duration} דקות</p>
    </>
}
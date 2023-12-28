import axios from "axios";
import { useState, useEffect } from "react";


export const difficulties = [{ id: 1, name: "קל" }, { id: 2, name: "בינוני" }, { id: 3, name: "קשה" }]
export default ({recipe}) => {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/category`)
            .then(c => {
                setCategoryList(c.data);
            });
    }, [])
    return <>
        <h2>{recipe.Name}</h2>
        <img src={recipe.Img} alt="תמונה" />
        <h3>{recipe.Description}</h3>
        <p>{categoryList?.find(c => c.Id === recipe.CategoryId)?.Name}</p>
        <p>{difficulties.find(d => d.id === recipe.Difficulty)?.name}</p>
        <p>{recipe.Duration} דקות</p>
    </>

}

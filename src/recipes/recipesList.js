import { useEffect } from "react";
import { useState } from "react";
import Recipe, { difficulties } from "./recipe"
import axios from "axios";


const RecipeList = () => {
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [categoty, setCategoty] = useState();
    const [duration, setDuration] = useState();
    const [userId, setUserId] = useState();
    const [difficulty, setDifficulty] = useState();
    useEffect(() => {
        axios.get('http://localhost:8080/api/recipe').then(x => setRecipes(x.data))
        axios.get('http://localhost:8080/api/category').then(x => setCategories(x.data))
    }, [])
    return <>
        <p>קטגוריה</p>
        <select defalutValue='0' onChange={(event) => setCategoty(event.target.value)} >
            <option value={0}>קטגוריה</option>
            {categories.map((categoty) =>
                <option key={categoty.Id} value={categoty.Id}>{categoty.Name}</option>
            )}
        </select>
        <p>משך זמן</p>
        <input onChange={(e) => setDuration(e.target.value)} placeholder="משך זמן מקסימלי" />
        <p>רמת קושי</p>
        <select defalutValue='0' onChange={(e) => setDifficulty(e.target.value)}>
            <option value="0">רמת קושי</option>
            {difficulties.map((dif) =>
                <option key={dif.id} value={dif.name}>{dif.name}</option>
            )}
        </select>
        <input placeholder={userId} onChange={(e) => setUserId(e.target.value)} />
        <hr />
        {recipes.map((r) =>
            <div key={r.Id}>
                {(!categoty|| parseInt(categoty)===0 || parseInt(categoty) === r.CategoryId) &&
                    (!userId || parseInt(userId) === r.UserId) &&
                    (!duration || parseInt(duration) >= parseInt(r.Duration)) &&
                    (!difficulty || r.Difficulty === difficulty) ? (
                    <Recipe recipe={r} />
                ) : <></>}
            </div>
        )}
    </>


}
export default RecipeList;
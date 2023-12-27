import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import axios from "axios"

const schema = yup.object({
    CategoryId: yup.number().integer().required(),
    Name: yup.string().max(20).required(),
    Img: yup.string().url().required(),
    Duration: yup.number().integer().required(),
    Difficulty: yup.number().integer().positive().required(),
    Description: yup.string().min(3).max(30).required(),
    Instructions: yup.array().of(
        yup.object().shape({
            Instruction: yup.string()
        })
    ).required(),
    Ingrident: yup.array().of(
        yup.object().shape({
            Name: yup.string().required(),
            Count: yup.number().positive(),
            Type: yup.string()
        })
    ).required()
})
    .required()

export default ({ IdRecipe }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { fields: InstructionsFields, append: InstructionsAppend, remove: InstructionsRemove } = useFieldArray({
        control,
        name: "Instructions",
    });
    const { fields: IngridentFields, append: IngridentAppend, remove: IngridentRemove } = useFieldArray({
        control,
        name: "Ingrident",
    });

    const [categoryList, setCategoryList] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/category`)
            .then(c => {
                // console.log(c.data)
                setCategoryList(c.data);
                // console.log(categoryList);
            });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(r => {
                setRecipeList(r.data);
                // console.log(recipeList);
                // console.log(recipeList[1]);
            });
            
    }, [])
    useEffect (()=>{
        recipe?.Ingrident?.map((ing)=>IngridentAppend(ing))
        recipe?.Instructions?.map((ins)=>InstructionsAppend(ins))
    },recipe)

    const onSubmit = (data) => console.log(data)



    return <>
        <button onClick={() => {
            console.log(recipeList[IdRecipe])
            setRecipe(recipeList[IdRecipe])
            console.log(categoryList);
            console.log(recipeList);
            console.log(recipe)
            console.log(IdRecipe)
        }}>lists</button>
        <h2>הוספת מתכון</h2>
        <h2>עריכת מתכון</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("CategoryId")} defaultValue={recipe?.CategoryId ? recipe.CategoryId : -1} name="categoryId" id="categoryId">
                <option value="-1" disabled>קטגוריה</option>
                {categoryList?.map((category) =>
                    <option key={category.Id} value={category.Id}>{category.Name}</option>
                )}
            </select>
            <input {...register("Name")} value={recipe?.Name ? recipe.Name : "שם המתכון"} />
            <input {...register("Img")} value={recipe?.Img ? recipe.Img : "url של תמונה מתאימה"} />
            <input {...register("Duration")} value={recipe?.Duration ? recipe.Duration : "זמן הכנה בדקות"} />
            <select {...register("Difficulty")} defaultValue={recipe?.Difficulty ? recipe.Difficulty : 0} name="difficulty">
                <option disabled>רמת קושי</option>
                <option value="1">קל</option>
                <option value="2">בינוני</option>
                <option value="3">קשה</option>
            </select>
            <h4>רכיבים</h4>
            
            {IngridentFields?.map((ingrident, index) => 
                <div key={index}>
                    <input {...register(`Ingrident.${index}.Name`)} value={ingrident?.Name} placeholder="שם מוצר" />
                    <input {...register(`Ingrident.${index}.Count`)} value={ingrident?.Count} placeholder="כמות" />
                    <input {...register(`Ingrident.${index}.Type`)} value={ingrident?.Type} placeholder="סוג" />
                    <p onClick={() => IngridentRemove(index)}>מחק מוצר</p>
                </div>
            )}
            <p onClick={() => IngridentAppend({})}>הוסף מוצר</p>
        </form>
    </>
}
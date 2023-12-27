import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import axios from "axios"
import Recipe from "./recipe"

const schema = yup.object({
    CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
    Name: yup.string().required("חובה להכניס שם"),
    Img: yup.string().url().required("חובה להכניס כתובת URL של תמונה"),
    Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("חובה להכניס משך זמן"),
    Difficulty: yup.number().integer().positive().required().min(1, "חובה לבחור רמת קושי"),
    Description: yup.string().required("חובה להכניס תיאור"),
    Instructions: yup.array().of(
        yup.object().shape({
            Instruc: yup.string().required("חובה להכניס הוראה")
        })
    ),
    Ingrident: yup.array().of(
        yup.object().shape({
            Name: yup.string().required("הכנס שם"),
            Count: yup.number("הכנס מספר").positive("כמות לא יכולה להיות שלילית").required("הכנס כמות"),
            Type: yup.string().required("הכנס סוג")
        })
    )
})

export default ({ IdRecipe, isNew }) => {
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
                setCategoryList(c.data);
            });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(r => {
                setRecipeList(r.data);
            });
        if (isNew)
            setRecipe(recipeList[IdRecipe])
    }, [])
    useEffect(() => {
        recipe?.Ingrident?.map((ing) => IngridentAppend(ing))
        recipe?.Instructions?.map((ins) => {
            InstructionsAppend({ Instruc: ins })
        })
    }, recipe)
    const onSubmit = (data) => {
        //alert(JSON.stringify(data))
        let recipeToSend = {
            Id: IdRecipe,
            Name: data.Name, UserId: 999, CategoryId: data.CategoryId, Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingrident: data.Ingrident, Instructions: data.Instructions
        }
        let responseRecipe;
        if (isNew) {
            axios.post(`http://localhost:8080/api/recipe`, recipeToSend)
                .then(res => responseRecipe = res)
        }
        else {
            axios.post(`http://localhost:8080/api/recipe/edit`, recipeToSend)
                .then(res => responseRecipe = res)
        }
    }
    return <>
        {isNew ? <h2>הוספת מתכון</h2> : <h2>עריכת מתכון</h2>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("CategoryId")} name="CategoryId">
                <option value={0} disabled>קטגוריה</option>
                {categoryList?.map((category) => <>
                    <option /*key={category.Id}*/ value={category.Id}>{category.Name}</option></>
                )}
            </select>
            <p>{errors.CategoryId?.message}</p>
            <input {...register("Name")} defaultValue={recipe?.Name ? recipe.Name : ""} placeholder="שם המתכון " />
            <p>{errors.Name?.message}</p>
            <input {...register("Img")} defaultValue={recipe?.Img ? recipe.Img : ""} placeholder="url של תמונה מתאימה" />
            <p>{errors.Img?.message}</p>
            <input {...register("Description")} defaultValue={recipe?.Description ? recipe.Description : ""} placeholder="תיאור קצר" />
            <p>{errors.Description?.message}</p>
            <input {...register("Duration")} defaultValue={recipe?.Duration} placeholder="זמן הכנה בדקות" />
            <p>{errors.Duration?.message}</p>
            <select {...register("Difficulty")} name="Difficulty" >
                <option value="0" disabled>רמת קושי</option>
                <option value="1">קל</option>
                <option value="2">בינוני</option>
                <option value="3">קשה</option>
            </select>
            <p>{errors.Difficulty?.message}</p>
            <h4>רכיבים</h4>
            {IngridentFields?.map((ingrident, index) =>
                <div key={index}>
                    <input {...register(`Ingrident.${index}.Name`)} defaultValue={ingrident?.Name} placeholder="שם מוצר" />
                    <p>{errors[`Ingrident.${index}.Name`]?.message}</p>
                    <input {...register(`Ingrident.${index}.Count`)} defaultValue={ingrident?.Count} placeholder="כמות" />
                    <p>{errors[`Ingrident.${index}.Count`]?.message}</p>
                    <input {...register(`Ingrident.${index}.Type`)} defaultValue={ingrident?.Type} placeholder="סוג" />
                    <p>{errors[`Ingrident.${index}.Type`]?.message}</p>
                    <p onClick={() => IngridentRemove(index)}>מחק מוצר</p>
                </div>
            )}
            <p onClick={() => IngridentAppend({ Name: null, Count: null, Type: null })}>הוסף מוצר</p>
            <h4>הוראות הכנה</h4>
            {InstructionsFields?.map((instruction, index) =>
                <div key={index}>
                    <input {...register(`Instructions.${index}.Instruc`)} defaultValue={instruction?.Instruc ? instruction.Instruc : ""} placeholder="הוראת הכנה" />
                    <p>{errors.Instructions?.message}</p>
                    {console.log(errors)}
                    <p onClick={() => InstructionsRemove(index)}>מחק הוראה</p>
                </div>
            )}
            <p onClick={() => InstructionsAppend({ Instruc: null })}>הוסף הוראה</p>
            <input type="submit" >שמירת המתכון</input>
        </form>
    </>
}
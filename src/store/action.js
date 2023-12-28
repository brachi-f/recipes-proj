import axios from "axios";

export const SET_USER="SET_USER";
export const ADD_RECIPE="ADD_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const ADD_CATEGORY="ADD_CATEGORY"; 
export const GET_CATEGORIES = "GET_CATEGORIES"

// export const fetchRecipes = () => {
//     return (dispatch) => {
//       axios.get('http://localhost:8080/api/recipe')
//         .then(data => {
//           dispatch({ type: actionsName.SET_RECIPES, recipes: data.recipes });
//         })
//     };
//   };
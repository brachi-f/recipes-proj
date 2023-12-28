import axios from 'axios';
import * as actionsName from './action';
import { act } from 'react-dom/test-utils';

const storeState = {
    user: null,
    recipes: axios.get('http://localhost:8080/api/recipe'),
    categories: axios.get(`http://localhost:8080/api/category`)
}
function reducer(state = storeState, action) {
    switch (action.type) {
        case actionsName.ADD_CATEGORY:
            {
                let categories = state.categories;
                axios.post(`http://localhost:8080/api/category`, action.category)
                    .then(c => categories = c.data)
                return categories;
            }
        case actionsName.GET_CATEGORIES:
            {
                return ({
                    ...state.categories
                })
            }
        case actionsName.ADD_RECIPE:
            {
                let recipes = state.recipes;
                axios.post('http://localhost:8080/api/recipe',action.recipe)
                .then(r=> recipes = r.data);
                return recipes;
            }
        case actionsName.DELETE_RECIPE:
            {
                let success;
                axios.delete(`http://localhost:8080/api/recipe/delete/:id`,action.recipeId)
                .then(x=>success = x)
                return success
            }
        case actionsName.SET_USER:
            {
                return ({
                    ...state, user: action.pyload
                })
            }
            
    }
}
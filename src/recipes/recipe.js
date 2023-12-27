import axios from "axios";
import { useState, useEffect } from "react";


const Recipe = (props) => {
    const {Id, Name, UserId, CategoryId, Img, Duration, Difficulty, Description,
        Ingrident, Instructions } = props;
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/category`)
            .then(c => {
                setCategoryList(c.data);
            });
    }, [])
    const difficulties = ["קל", "בינוני", "קשה"]
    return <>
        <h2>{Name}</h2>
        <img src={Img} />
        <h3>{Description}</h3>
        <p>{categoryList?.find(c => c.Id == CategoryId)}</p>
        <p>{difficulties[Difficulty]}</p>
        <p>{Duration} דקות</p>
    </>

}
export default Recipe;
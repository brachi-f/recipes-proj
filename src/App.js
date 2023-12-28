import Home from "./homePage"
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import Sighin from './sighin';
import Categories from "./categories/categories"
const App = () => {
    return <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sighin" element={<Sighin />} />
            <Route path="/category" element={<Categories />}/>
        </Routes>
    </>
}
export default App;

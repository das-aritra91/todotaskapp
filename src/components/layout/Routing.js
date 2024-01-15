import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Complete from '../pages/Complete';
import Trash from '../pages/Trash';
import MuiTab from '../controls/Tab';

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <MuiTab />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/complete' element={<Complete />}></Route>
                    <Route path='/trash' element={<Trash />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing;
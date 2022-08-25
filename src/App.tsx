import React, {useEffect} from 'react';
import './App.css';
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import {Route, Routes} from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import {useTypedSelector} from "./hooks/useTypesSelector";

function App() {
    const log = useTypedSelector(state => state.auth.auth)
  return (
    <div>
        <Routes>
            {log ? (
                <Route path='/contacts' element={<ContactsPage/>}></Route>
            ) : (
                <Route path='/' element={<LoginPage/>}></Route>
            )}
        </Routes>
    </div>
  );
}

export default App;

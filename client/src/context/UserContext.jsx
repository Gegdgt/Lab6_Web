import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [username, setUser] = useState(null); 
    const [is_creator, setCreator] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        const storedCreator = localStorage.getItem('is_creator');
        if (storedUser) {
            setUser(storedUser);
            setCreator(storedCreator === 'true' || storedCreator === true || storedCreator === 'True'); // convierte string "true"/"True" o booleano true a boolean
        }
    }, []);

    const login = (userData, creatorData) => {
        localStorage.setItem('username', userData); 
        localStorage.setItem('is_creator', creatorData);
        setUser(userData); 
        setCreator(creatorData);
    };

    const logout = () => {
        localStorage.removeItem('username'); 
        localStorage.removeItem('is_creator'); // elimina el is_creator del localStorage
        setUser(null); 
        setCreator(null);
    };

    return (
        <UserContext.Provider value={{ username, is_creator, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
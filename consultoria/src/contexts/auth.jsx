// import { createContext, useEffect, useState } from "react";
// import { json } from "react-router-dom";

// export const AuthContext = createContext({});

// export const AuthProvider =({children}) =>{
//   const [user, setUser] = useState();

//   useEffect(() =>{
//     const userToken = localStorage.getItem("user_token");
//     const userStorage = localStorage.getItem("users_db");

//     if (userToken && userStorage){
//       const hasUser = JSON.parse(userStorage)?.filter((user) => user.email === JSON.parse(userToken).email);

//     if(hasUser) setUser(hasUser[0])
//     }
//   },[]);

//   const signin = (email, password) => {
//     const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

//     const hasUser = usersStorage?.filter((user) => user.email === email);

//     if (hasUser?.length) {
//       if (hasUser[0].email === email && hasUser[0].password === password) {
//         const token = Math.random().toString(36).substring(2);
//         localStorage.setItem("user_token", JSON.stringify({ email, token }));
//         setUser({ email, password });
//         return;
//       } else {
//         return "E-mail ou senha incorretos";
//       }
//     } else {
//       return "Usuário não cadastrado";
//     }
//   };

//   const signout = () => {
//     setUser(null);
//     localStorage.removeItem("user_token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, signed: !!user, signin, signout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// /*autenticação */
// /**Ela é usada para gerenciar os estados dos seus componentes dentro de uma aplicação web sem precisar usar algum pacote para isso.
//  * área reservada do sistema disponível para gravar determinadas informações globais. Por exemplo um User
//  */

import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.find(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser);
    }
  }, []);

  // Simulando um banco de dados de usuários mocado
  const mockUsers = [
    {
      id: 1,
      name: "Usuário de Teste 1",
      email: "ana.br@hotmail.com",
      password: "senha123",
    },
    {
      id: 2,
      name: "Usuário de Teste 2",
      email: "usuario2@teste.com",
      password: "123456",
    },
  ];

  // Salvando os usuários no localStorage ao inicializar o AuthProvider
  useEffect(() => {
    localStorage.setItem("users_db", JSON.stringify(mockUsers));
  }, []);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));

    const hasUser = usersStorage?.find((user) => user.email === email);

    if (hasUser) {
      if (hasUser.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem(
          "user_token",
          JSON.stringify({ email, token })
        );
        setUser(hasUser);
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};


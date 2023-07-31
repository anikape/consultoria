import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider =({children}) =>{
  const [user, setUser] = useState();

  useEffect(() =>{
    const userToken = localStorage.getItem("user_token");
    const userStorage = localStorage.getItem("users_db");

    if (userToken && userStorage){
      const hasUser = JSON.parse(userStorage)?.filter((user) => user.email === JSON.parse(userToken).email);

    if(hasUser) setUser(hasUser[0])
    }
  },[]);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
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
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*autenticação */
/**Ela é usada para gerenciar os estados dos seus componentes dentro de uma aplicação web sem precisar usar algum pacote para isso.
 * área reservada do sistema disponível para gravar determinadas informações globais. Por exemplo um User
 */
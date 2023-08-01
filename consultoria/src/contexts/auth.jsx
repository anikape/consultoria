import { createContext, useEffect, useState } from "react";

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

 
  useEffect(() => {
    localStorage.setItem("users_db", JSON.stringify(mockUsers));
  }, []);

  const signin = (email, password) => {
    const hasUser = mockUsers.find((user) => user.email === email);

    if (hasUser) {
      if (hasUser.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
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
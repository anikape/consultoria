import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "@pages/Home";
import Singin from "@pages/Signin";
import Redefine from "@pages/Redefine";
import Client from "@pages/Client";
import EntrepriseProfile from "@pages/EnterpriseProfile";
import DocumentsPage from "@pages/DocumentsPage";
import Verification from "@pages/Verification";
import Adm from "@pages/Adm";
import CadastroAdm from "@pages/CadastroAdm";
import { RequireAuth } from "@contexts/Auth/RequireAuth";
import { Loading } from "@components/Loading";
import { AuthContext } from "@contexts/Auth/AuthContext";
import Password from "@pages/Password";
import ResetPassword from "@pages/ResetPassword";
import Sucess from "@pages/Sucess";
import SucessCadastro from "@pages/SucessCadastro";
import ClientProfile from "@pages/ClientProfile";
import AdminAuth from "@pages/AdminAuth";

const Private = ({ Item, signed }) => {
  return signed ? <Item /> : <Navigate to="/" />;
};

Private.propTypes = {
  Item: PropTypes.elementType.isRequired,
  signed: PropTypes.bool.isRequired,
};

const RoutesApp = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Singin />} />
        <Route path="/redefine" element={<Redefine />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/password" element={<Password />} />
        <Route path="/admin/reset-password/:id" element={<ResetPassword />} />
        <Route path="/sucess" element={<Sucess />} />
        <Route path="/sucessCadastro" element={<SucessCadastro />} />
        <Route
          path="/Adm"
          element={
            <RequireAuth>
              <Private Item={Adm} signed={authenticated} />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Private Item={Home} signed={authenticated} />
            </RequireAuth>
          }
        />

        <Route
          path="/client"
          element={
            <RequireAuth>
              <Private Item={Client} signed={authenticated} />
            </RequireAuth>
          }
        />

        <Route
          path="/clientProfile/:id"
          element={
            <RequireAuth>
              <Private Item={ClientProfile} signed={authenticated} />
            </RequireAuth>
          }
        />
        <Route
          path="/AdminAuth"
          element={
            <RequireAuth>
              <Private Item={AdminAuth} signed={authenticated} />
            </RequireAuth>
          }
        />

        <Route
          path="/entrepriseProfile/:id"
          element={<Private Item={EntrepriseProfile} signed={authenticated} />}
        />

        <Route
          path="/DocumentsPage"
          element={
            <RequireAuth>
              <Private Item={DocumentsPage} signed={authenticated} />
            </RequireAuth>
          }
        />

        <Route
          path="/CadastroAdm"
          element={
            <RequireAuth>
              <Private Item={CadastroAdm} signed={authenticated} />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;

import { Fragment } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import PropTypes from 'prop-types'; // Importa o PropTypes
import Home from "../../pages/Home"
import Singin from "../../pages/Singin"
import Redifine from "../../pages/Redifine";
// import Client from "../../pages/clients";

const Private =({Item}) =>{
  const signed = true;
  /**define a autenticação */

  return signed > 0 ? <Item /> : <Singin />;

}

// Declaração das propriedades esperadas
Private.propTypes = {
  Item: PropTypes.elementType.isRequired,
};

const RoutesApp = () =>{

  return(
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />}  />
          <Route path="/" element={<Singin />} />
          <Route path="*" element={<Singin />} />
          {/** path=* ao tentar acessar qualquer pagina privada diretamente pelo link, vai ser rediredionado para o singin*/}
          <Route path="/redifine" element={<Redifine />} />
          {/* <Route path="/Client" element={<Client />} /> */}

        </Routes>
      </Fragment>
    </BrowserRouter>
  )

};

export default RoutesApp;

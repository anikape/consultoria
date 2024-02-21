import React, { useState } from 'react';

const DocumentModal = ({ show, handleClose,company }) => {
  const [formData, setFormData] = useState({
    nome: '',
    dataEmissao: '',
    dataVencimento: '',
    empresa: '',
    tipoDocumento: '',
    arquivo: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      arquivo: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    handleClose();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Cadastro de Documentos</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" onChange={handleInputChange} value={formData.nome} />

          <label htmlFor="dataEmissao">Data de Emissão:</label>
          <input type="date" id="dataEmissao" name="dataEmissao" onChange={handleInputChange} value={formData.dataEmissao} />

          <label htmlFor="dataVencimento">Data de Vencimento:</label>
          <input type="date" id="dataVencimento" name="dataVencimento" onChange={handleInputChange} value={formData.dataVencimento} />

          <select id="empresa" name="empresa" onChange={handleInputChange}>
          <option value="">Selecione uma empresa</option>
          {/* {company.map(empresa => (
            <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>
          ))} */}
        </select>

          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
          <select id="tipoDocumento" name="tipoDocumento" onChange={handleInputChange} value={formData.tipoDocumento}>
            <option value="">Selecione um tipo de documento</option>
            <option value="Alvará de Localização e Funcionamento">Alvará de Localização e Funcionamento</option>
            <option value="Auto de Vistoria de Corpo de Bombeiros">Auto de Vistoria de Corpo de Bombeiros</option>
            <option value="ANTT">ANTT</option>
            {/* Adicione outras opções aqui... */}
          </select>

          <label htmlFor="arquivo">Escolher Arquivo:</label>
          <input type="file" id="arquivo" name="arquivo" onChange={handleFileChange} />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default DocumentModal;

import React from 'react';

const EntrepriseProfile = ({ clients }) => {
  return (
    <div>
      {clients.map(client => (
        <div key={client.id}>
          <h2>{client.name}</h2>
          {client.entreprise.map(entreprise => (
            <div key={entreprise.cpfCnpj}>
              <h3>{entreprise.razaoSocial}</h3>
              {entreprise.documents.map(document => (
                <div key={document.name}>
                  <details>
                    <summary>{document.name}</summary>
                    <p>Data de Emissão: {document.issuanceDate}</p>
                    <p>Data de Validade: {document.expirationDate}</p>
                  </details>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default EntrepriseProfile;
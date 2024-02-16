export const documentType = (type) => {
  const types = {
    ALF: "Alvará de Localização e Funcionamento",
    AVCB: "Auto de Vistoria de Corpo de Bombeiros",
    ANTT: "ANTT",
    CNPJ: "Cartão CNPJ",
    CS: "Contrato Social",
    CTF: "Cadastro Técnico Federal – IBAMA (CTF)",
    CAR: "Cadastro Ambiental Rural (CAR)",
    IEF: "Certificado IEF",
    "CR Ex": "CR Exército (controlados)",
    "CR PC": "CR Polícia Civil (controlados)",
    "CRL PF": "CRL e CRF Policia Federal (controlados)",
    LA: "Licenciamento Ambiental",
    LO: "Licença de Operação",
    DMR: "Declaração de Movimentação de Resíduos",
  };

  return types[type.toUpperCase()] || "Nenhum tipo cadastrado";
};

export const mask = {
  CNPJ: (value) => {
    return value
      .replace(/\D+/g, "") // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2") // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura os dois últimos 2 números, com um - antes dos dois números
  },

  CPF: (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  },
  Phone: (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
  },
};

export const formatCpfCnpj = (value) => {
    if (!value) return ''
    
  const cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos

  if (cleanedValue.length <= 11) {
    cleanedValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
    console.log(cleanedValue)
    return cleanedValue
  } else {
    // CNPJ
    cleanedValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
    
      console.log(cleanedValue)
    
    return cleanedValue
  }
};

function divide(a, b) {
  if (b === 0) {
    throw new Error("Divisão por zero não é permitida");
  }
  return a / b;
}

function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    throw new Error("JSON inválido");
  }
}

export { divide, parseJSON };
// Desafio do aluno: Usar .toThrow() e verificar a mensagem de erro específica.   
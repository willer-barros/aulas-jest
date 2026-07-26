function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 0) reject("ID inválido");
      else resolve({ id, data: "Dados carregados" });
    }, 100);
  });
}

async function fetchUser(id) {
  const response = await fetchData(id);
  return response;
}

export { fetchData, fetchUser };
// Desafio do aluno: Usar async/await no teste e esperar a resolução da Promise.   
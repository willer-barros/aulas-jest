// Simula uma chamada externa que o aluno deverá mockar no teste
export const externalAPI = {
  getData: () => "Dado real"
};

export function process_data() {
  return externalAPI.getData().toUpperCase();
}
// Desafio do aluno: Usar jest.fn() ou jest.mock() para simular a API retornando um valor falso controlado.   
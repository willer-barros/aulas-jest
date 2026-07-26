import { sum, subtract } from "../src/aula_1.js";

describe("Aula 1 - Operações Básicas", () => {
  test("deve somar dois números positivos", () => {
    // Arrange
    const a = 10;
    const b = 5;
    
    // Act
    const result = sum(a, b);
    
    // Assert
    expect(result).toBe(15);
  });

  test("deve subtrair dois números", () => {
    expect(subtract(10, 5)).toBe(5);
  });
  
  // Tarefa: Adicione um teste para números negativos
});   
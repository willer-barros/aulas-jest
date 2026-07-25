import aula_1 from "../src/aula_1.js"

//declaro a funcao test() para executar o teste
test("Aplicar Desconto", () =>{
    const result = aula_1.aplicarDesconto(10,5)
    expect(result).toEquals(5);
})
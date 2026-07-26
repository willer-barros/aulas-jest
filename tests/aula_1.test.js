import sum from "../src/aula_1.js"

//declaro a funcao test() para executar o teste
test("Aplicar soma", () =>{
    const result = sum(10,5)
    expect(result).toEqual(15)
})
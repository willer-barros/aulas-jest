# 🧪 Guia de Estudos: Testes Unitários com Jest

O **Jest** é um framework de testes JavaScript focado em simplicidade e velocidade, ideal para testar pequenos blocos de código (funções, componentes, classes) de forma isolada.

## 🚀 Introdução Rápida

### O Ciclo do Teste (AAA)
Todo teste bem estruturado segue três passos fundamentais:
1. **Arrange (Preparar):** Configura as variáveis, dados de entrada e o estado necessário.
2. **Act (Agir):** Executa a função ou método que está sendo testado.
3. **Assert (Verificar):** Compara o resultado obtido com o resultado esperado.

### Entendendo as Cores no Terminal
Ao rodar `npm test`, o Jest fornece feedback visual imediato:
- 🔴 **Vermelho:** Falha (**FAIL**). O teste executou, mas o resultado não foi o esperado (erro de lógica) ou houve um erro de sintaxe.
- 🟢 **Verde:** Sucesso (**PASS**). O teste executou e todas as asserções foram verdadeiras.
- 🟡 **Amarelo:** Aviso ou Cobertura Parcial. Geralmente indica que o código foi executado, mas a cobertura de testes (coverage) está abaixo do ideal ou há testes ignorados (`test.skip`).

### Metas de Cobertura (Coverage)
Para projetos reais, a métrica de cobertura de código é vital:
- **Ideal:** 100% do código crítico testado.
- **Mínimo Aceitável:** 80% (focando em regras de negócio principais).
- *Dica: 100% de cobertura não garante 0 bugs, mas reduz drasticamente regressões.*

---

## 🛠️ Configuração Inicial

Se ainda não configurou, instale o Jest como dependência de desenvolvimento:

```bash
npm install --save-dev jest   
``

No seu package.json, garanta que o script de teste esteja assim:

"scripts": {
  "test": "jest"
}

(Nota: Se usar módulos ES6, lembre-se de usar node --experimental-vm-modules node_modules/jest/bin/jest.js)

📚 Principais Funções e Sintaxe
1. Agrupamento (describe)
Usado para organizar testes em blocos lógicos (ex: por função ou módulo).

describe('Calculadora de Soma', () => {
  // testes aqui dentro
});

2. Declaração do Teste (test ou it)
Ambos fazem a mesma coisa. it lê-se melhor em frases ("it should sum...").

test('deve retornar a soma de dois números', () => {
  // lógica do teste
});

3. Asserções (expect)
O coração do teste. Verifica se o valor retornado corresponde ao esperado.

expect(resultado).toBe(15);

🔍 Matchers Mais Utilizados (Cheat Sheet)
Além do .toBe(), o Jest oferece diversos comparadores:

Matcher	Descrição	Exemplo
.toBe(valor)	Igualdade estrita (===) para primitivos.	expect(1 + 1).toBe(2)
.toEqual(obj)	Igualdade profunda para objetos e arrays.	expect({a:1}).toEqual({a:1})
.toBeTruthy()	Verifica se o valor é "verdadeiro".	expect("texto").toBeTruthy()
.toBeFalsy()	Verifica se o valor é "falso" (null, 0, undefined).	expect(null).toBeFalsy()
.toBeNull()	Verifica estritamente se é null.	expect(valor).toBeNull()
.toBeUndefined()	Verifica se é undefined.	expect(variavel).toBeUndefined()
.toBeGreaterThan(n)	Maior que.	expect(10).toBeGreaterThan(5)
.toContain(item)	Verifica se um array ou string contém o item.	expect([1,2]).toContain(2)
.toThrow()	Verifica se uma função lança um erro.	expect(fn).toThrow()

⏳ Testando Código Assíncrono
Muitas funções em JS são assíncronas (Promises, async/await). O Jest precisa esperar a resolução.

Usando async/await (Recomendado)
test('deve buscar dados do usuário', async () => {
  const user = await buscarUsuario(1);
  expect(user.name).toBe('Willer');
});

Usando Promises (.then)
test('deve buscar dados do usuário', () => {
  return buscarUsuario(1).then(user => {
    expect(user.name).toBe('Willer');
  });
});

💡 Boas Práticas para Alunos
Nomes Descritivos: O nome do teste deve explicar o que ele faz.
❌ test('soma', ...)
✅ test('deve retornar a soma correta quando os números são positivos', ...)
Um Conceito por Teste: Cada bloco test() deve verificar apenas uma coisa. Se falhar, você saberá exatamente o que quebrou.
Independência: Os testes não devem depender da ordem de execução. Um teste não pode alterar o estado global e quebrar o próximo.
Teste o Falho Primeiro: Ao criar uma nova função, escreva o teste esperando que ele falhe (Vermelho) antes de implementar a lógica. Isso valida que seu teste realmente funciona.
🏃‍♂️ Como Rodar
No terminal, na pasta do projeto:

npm test

Para ver a cobertura de código em tempo real:

npm test -- --coverage
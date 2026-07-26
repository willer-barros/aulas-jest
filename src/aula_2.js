function isAdult(age){
    return age >=18;
}

function canLogin(user, pass){
    return user === "admin" && pass === "1234";
}

export { isAdult, canLogin}
// Desafio do aluno: Usar .toBeTruthy(), .toBeFalsy() e testar bordas (ex: 17 vs 18 anos).
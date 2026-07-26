function getUser(id){
    return { id, name: "Willer", role: "admin"};
}

function filterActiveUsers(users){
    return users.filter(u => u.active);
}

export {getUser, filterActiveUsers}
// Desafio do aluno: Usar .toEqual() para objetos e .toContain() para arrays.
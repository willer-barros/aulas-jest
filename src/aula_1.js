function aplicarDesconto(valor, desconto){
    return valor - desconto;
}

function  validacaoCpf(cpf){
    const verificaCpf = cpf.length(11)
    return verificaCpf
}

export {aplicarDesconto}
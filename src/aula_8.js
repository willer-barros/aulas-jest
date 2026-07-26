async function processarPagamento(valor, cartao) {
    if(!valor || valor <= 0){
        throw new Error("Valor de pagamento deve ser maior que zero")
    }

    if(!cartao || !cartao.numero || !cartao.cvv){
        throw new Error("Dados do cartao incompletos")
    }

    if(cartao.numero.endsWith("0000")){
        return{
            sucesso: false,
            status: "RECUSADO",
            motivo: "Transacao nao autorizada pela operadora"
        }
    }

    return{
        sucesso: true,
        status: "APROVADO",
        tansacaoId: `TX-${Math.floor(Math.random() * 1000000)}`
    }
}

export default processarPagamento
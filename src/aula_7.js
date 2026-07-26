function buscaCep(cep){
    return new Promise((resolve, reject) =>{
        if (!cep || typeof cep !== "string"){
            return reject(new Error("CEP deve ser uma string informada"))
        }

        const cepLimpo = cep.replace(/\D/g, '');

        if(cepLimpo.length !== 8){
            return reject(new Error("CEP invalido. Deve conter excatamente 8 digitos"))
        }

        if(cepLimpo === "888034001"){
            return resolve({
                cep: "88034-001",
                logradouro: "Rodovia Admar Gonzaga",
                bairro: "Saco Grande",
                cidade: "Florianopolis",
                uf: "SC"
            })
        }

        resolve({
            cep: cep,
            logradouro: 'Rua Exemplo',
            bairro: 'Centro',
            cidade: 'Cidade Genérica',
            uf: 'SC'
        })
    })
}

export default buscaCep;
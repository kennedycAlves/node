const fs = require('fs')
const path = require('path')

//caminho é o caminho pelo o qual o arquivo está vindo

//nomeDoArquivo é será o nome do pet

//NovoCaminho recebe o path onde todas novas imagem estarão criadas mais o nome do novo arquivo

//callbackImagemCriada será uma função que será executada após a criação do novo arquivo e retornará path juntamente com novo do novo arquivo
// essa callback  irá alem de retornar o path e novo do arquivo, irá executar as ações de gravação no banco de dados

//module.exports torna essa função acessivel para os demais arquivos. 

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {

    //devifinindo os tipos aceitáveis de imagens
    const tiposValidos = ['.jpg', '.png', '.jpeg']

    //pegando a extenção do arquivo, passamos o path todo, mas ele consegue identificar mesmo assim
    const tipo = path.extname(caminho)

    //Validando de o tipo recebido está contido em tiposValidos
    //o indexOf varre o array procurando pela parâmetros setado, quando retorna 0 é pq encontrou
    //quando retorna -1, é pq não encontrou
    //Então tipoValido receberá um valor int 0 ou -1
    //=== 0 essa parte vai perguntar se ele não é igual a 0, e retornará true, caso não, retornará false

    const tipoValido = tiposValidos.indexOf(tipo) !== -1


    if(tipoValido){
        console.log('if '+tipoValido)
        const NovoCaminho =  `./assets/imagens/${nomeDoArquivo}${tipo}`

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(NovoCaminho))
            .on('finish', () => callbackImagemCriada(false, NovoCaminho))

       

    }else{
        
        console.log('Else ' + tipoValido)
        const erro = 'Arquivo não permitido'
        
        callbackImagemCriada(erro)  

        

    }

    

}
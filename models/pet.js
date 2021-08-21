const conexao = require('../infraestrutura/conexao')

//Importanto a função  uploadDearquivos
const uploadDearquivos = require('../arquivos/uploadDearquivos')

class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'

        uploadDearquivos(pet.imagem, pet.nome, (erro,NovoCaminho) => {

            if(erro){
            
                res.status(400).json({erro})

            }else{

                const novoPet = {nome: pet.nome, imagem: NovoCaminho}

                conexao.query(query, novoPet, erro => {
                    
                    if(erro) {
    
                        console.log(erro)
    
                        res.status(400).json(erro)
    
                    } else {
    
                        res.status(200).json(novoPet)
                        
                    }
                })
            }
        })
       
    }
}
module.exports = new Pet()
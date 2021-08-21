const conexao = require('../infraestrutura/conexao')

const moment = require('moment') //Utilizamos o modulo moment para formatação de data

class Atendimento {

    adiciona(atendimento, res) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS') //quando passamos moment() vazio, ele passa a data e hora atual 

        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') //quando passamos o valor recebido que sera convertido(atendimento.data), 
        //devemos passar o formato que ele está chegando(DD/MM/YYYY) e convertemos com .format

        
        ///Validações de regras de negócio
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValida = atendimento.cliente.length >= 5 

        //Retorno de mensagens de validação
        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValida,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(e => !e.valido)// erros recebe todos o error que valido for false
        const existemErros = erros.length

        if(existemErros > 0){

            res.status(400).json(erros)//Devolvendo status erro

        } else{

            const atendimentoDatado = {...atendimento, dataCriacao, data} //Aqui estamos agragando ao objeto atendimento, dataCriacao e data, essa junção é recebida por atendimentoDatado

            const sql = 'INSERT INTO atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }


    lista(res){

        const sql = ('SELECT * FROM Atendimentos')

        conexao.query(sql, (erro, resultados) => {

            if(erro){

                res.status(400).json(erro)

            }else{
                res.status(200).json(resultados)
            }

        })


    }


    listaById(id, res){

        const sql = (`SELECT * FROM Atendimentos WHERE id = ${id}`)

        conexao.query(sql, (erro, resultados) => {

            if(erro){

                res.status(400).json(erro)

            }else{

                const resultado = resultados[0]

                res.status(200).json(resultado)
            }

        })


    }

    altera(id, valores, res){

        const sql = "UPDATE Atendimentos SET ? WHERE id = ?"

        conexao.query(sql, [valores, id],(erro, resultado) => {

            if(erro){

                res.status(400).json(erro)

            }else{

                res.status(200).json({...valores,id})

            }


        })



    }

    deleta(id, res){

        const sql = "DELETE FROM Atendimentos WHERE id=?"

        conexao.query(sql, id,(erro, resultado) => {

            if(erro){

                res.status(400).json(erro)

            }else{

                res.status(200).json(id)

            }


        })



    }

    ValorServico(id, valor, res){

        const sql = "UPDATE Atendimentos SET ? WHERE id = ?"

        conexao.query(sql, [valor,id],(erro, resultado) => {

            if(erro){

                res.status(400).json(erro)

            }else{

                res.status(200).json(valor)

            }


        })



    }



}
    
module.exports = new Atendimento
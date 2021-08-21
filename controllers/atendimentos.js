
//res - retorna uma mensagem para o cliente

//req - recebe algo do cliente

// rec.body recebe o body do post feito pelo cliente, onde ocntem o jason

const Atendimento = require('../models/atendimentos')

const moment = require('moment')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {

        Atendimento.lista(res)
        
    })

    app.get('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id)

        Atendimento.listaById(id, res)
        
    })

    app.post('/atendimentos', (req, res) => {

        const atendimento = req.body

        // console.log(atendimento)
        Atendimento.adiciona(atendimento , res)

    })

    app.patch('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id)

        const valores = req.body

        if(valores.data){
            
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') 
        }

        Atendimento.altera(id, valores, res)

        

    })


    app.delete('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)

        

    })

    app.put('/atendimentos/:id', (req, res) => {

        

        const id = parseInt(req.params.id)

        const valor = req.body

        valorServico = parseFloat(valor.servico)

        Atendimento.ValorServico(id, valorServico, res)

        

    })

}
const express = require('express') // habilita o servidor

const consign = require('consign') //imposta o app para dentro de todas as controllers

const bodyParser = require('body-parser') //Inporte que possibilita pegar o body json de recs



module.exports = () => {
    const app = express()
    
    app.use(bodyParser.urlencoded({extended: true})) // habilita o envio de formulário padrão navegador
    app.use(bodyParser.json()) // habilita o envio de rec's json

    consign()
        .include('controllers')
        .into(app)

    return app

}
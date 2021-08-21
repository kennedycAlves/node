class Tabelas {
    init(conexao) {

        this.conexao = conexao

        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, cliente varchar(50) NOT NULL, pet varchar(20), data datetime NOT NULL, dataCriacao datetime NOT NULL, servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text)'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }


    criarPets(){
        const query = 'CREATE TABLE IF NOT EXISTS Pets(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, nome varchar(50), imagem varchar(200))'

        this.conexao.query(query, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Pets foi criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas
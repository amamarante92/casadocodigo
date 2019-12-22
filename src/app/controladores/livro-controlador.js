const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const templates = require('../views/templates');

class LivroControlador{

    static rotas(){
        return {
            autenticadas: '/livros*',
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        };
    }

    lista(){
        return function (req, resp) {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => resp.marko(
                    templates.livros.lista,
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
        }
    }

    busca(){
        return  function (req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
    
            livroDao.buscaPorId(id)
                .then(livro =>
                    resp.marko(
                        templates.livros.form,
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
        }
    }

    atualiza(){
        return function (req, resp) {
            console.log(req.body);
            const livroDao = new LivroDao(db);
    
            livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
        }
    }

    salva(validationResult){
        return function (req, resp) {
            console.log(req.body);
            const livroDao = new LivroDao(db);
    
            const erros = validationResult(req);
    
            if (!erros.isEmpty()) {
                return resp.marko(
                    templates.livros.form,
                    { 
                        livro: req.body,
                        errosValidacao: erros.array()
                    }
                );
            }
    
            livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
        }
    }

    apaga(){
        return function (req, resp) {
            const id = req.params.id;
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = LivroControlador;
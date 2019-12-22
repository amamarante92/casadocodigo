const { check, validationResult } = require('express-validator/check');
const LivroControlador = require('../controladores/livro-controlador');
const Livro = require('../modelos/livro');
const livroControlador = new LivroControlador();

const BaseControlador = require('../controladores/base-controlador');

module.exports = (app) => {
    const livroRotas = LivroControlador.rotas();

    app.use(livroRotas.autenticadas, function(req, resp, next){
        if(req.isAuthenticated()){
            next(); //se autenticado, deixa a requisição seguir em frente
        }else{
            resp.redirect(BaseControlador.rotas().login);
        }
    });

    app.route(livroRotas.lista)
        .get(livroControlador.lista())
        .post(Livro.validacoes(check), livroControlador.salva(validationResult))
        .put(livroControlador.atualiza());

    app.get(livroRotas.cadastro, function (req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get(livroRotas.edicao, livroControlador.busca());

    app.delete(livroRotas.delecao, livroControlador.apaga());
}
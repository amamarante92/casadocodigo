
const { check, validationResult } = require('express-validator/check');

const LivroControlador = require('../controladores/livro-controlador');
const BaseControlador = require('../controladores/base-controlador');
const livroControlador = new LivroControlador();
const Livro = require('../modelos/livro');

module.exports = (app) => {

    const livroRotas = LivroControlador.rotas();
    const baseRotas = BaseControlador.rotas();

    app.get(baseRotas.home , function (req, resp) {
        resp.marko(
            require('../views/base/home/home.marko')
        );
    });

    app.get(livroRotas.lista, livroControlador.lista());

    app.get(livroRotas.cadastro, function (req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get(livroRotas.edicao, livroControlador.busca());

    app.post(livroRotas.lista, Livro.validacoes(check), livroControlador.salva(validationResult));

    app.put(livroRotas.lista, livroControlador.atualiza());

    app.delete(livroRotas.delecao, livroControlador.apaga());
};
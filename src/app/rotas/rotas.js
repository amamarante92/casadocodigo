
const { check, validationResult } = require('express-validator/check');

const LivroControlador = require('../controladores/livro-controlador');
const BaseControlador = require('../controladores/base-controlador');
const livroControlador = new LivroControlador();

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

    app.post(livroRotas.lista, [
        check('titulo').isLength({ min: 5 })
        .withMessage('O título precisa ter no mínimo 5 caracteres'),
        check('preco').isCurrency().withMessage('O preço precisa ser um valor monetário válido')
    ], livroControlador.salva(validationResult));

    app.put(livroRotas.lista, livroControlador.atualiza());

    app.delete(livroRotas.delecao, livroControlador.apaga());
};
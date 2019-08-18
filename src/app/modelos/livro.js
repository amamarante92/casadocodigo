class Livro {
    static validacoes(check){
        return [
            check('titulo').isLength({ min: 5 })
            .withMessage('O título precisa ter no mínimo 5 caracteres'),
            check('preco').isCurrency().withMessage('O preço precisa ser um valor monetário válido')
        ];
    }
}

module.exports = Livro;
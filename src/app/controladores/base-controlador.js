const LivroControlador = require('./livro-controlador');
const templates = require('../views/templates');

class BaseControlador {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        };
    }

    home(){
        return function (req, resp){
            resp.marko(
                templates.base.home
            );
        }
    }

    login(){
        return function (req, resp){
            resp.marko(
                templates.base.login
            );
        }
    }

    efetuarLogin(){
        return function (req, resp, next){
            //lógica de login
            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, info)=>{
                //se houver informações, continua na página de login
                if (info){
                    return resp.marko(templates.base.login);
                }

                //se houver erro, cai no tratamento de erros
                if(erro){
                    return next(erro);
                }

                // aqui o login foi efetuado con sucesso
                // chama-se a função de serializar a sessão
                req.login(usuario, (erro)=>{
                    //se houver erros no processo de serialização
                    if(erro) {
                        return next(erro)
                    }
                    
                    //se o login for efetuado com sucesso
                    return resp.redirect(LivroControlador.rotas().lista);
                });
            })(req, resp, next);
        }
    }
}

module.exports = BaseControlador;
import LocalizedStrings from "localized-strings";

const strings = new LocalizedStrings({
  ptBR: {
    components: {
      loginForm: {
        inputs: {
          email: "E-mail",
          password: "Senha"
        },
        buttons: {
          login: "Entrar",
        },
        warnings: {
          emailIsRequired: "E-mail é obrigatório!",
          passwordIsRequired: "Senha é obrigatória!",
          invalidUsernameOrPassword: "Usuário ou senha inválidos!"
        }
      },
    },
    sections: {},
    actions: {
      toSend: "Enviar",
      toGoBack: "Voltar",
      toEnter: "Entrar",
      toGoOut: "Sair",
    },
    alerts: {},
  },
});

export default strings;
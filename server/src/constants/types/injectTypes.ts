const InjectTYPES = {
  services: {
    UserService: Symbol('UserService'),
    BotService: Symbol('BotService'),
  },
  repositories: {
    UserRepository: Symbol('Userepository'),
  },
  Axios: {
    AxiosInstance: Symbol('AxiosInstance'),
  },
};

export default InjectTYPES;

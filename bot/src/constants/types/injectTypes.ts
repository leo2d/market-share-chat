const InjectTYPES = {
  services: {
    QuoteService: Symbol('QuoteService'),
    RabbitMQService: Symbol('RabbitMQService'),
    StooqService: Symbol('StooqService'),
  },
  repositories: {},
  Axios: {
    AxiosInstance: Symbol('AxiosInstance'),
  },
};

export default InjectTYPES;

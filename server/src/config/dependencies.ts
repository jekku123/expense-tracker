const controllers = {
  AuthController: Symbol.for('AuthController'),
  UserController: Symbol.for('UserController'),
  TransactionController: Symbol.for('TransactionController'),
};

const services = {
  AuthService: Symbol.for('AuthService'),
  UserService: Symbol.for('UserService'),
  TransactionService: Symbol.for('TransactionService'),
  TokenService: Symbol.for('TokenService'),
  Logger: Symbol.for('Logger'),
};

export const INTERFACE_TYPE = {
  ...controllers,
  ...services,
};

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
  UserService: Symbol.for('UserService'),
  AuthService: Symbol.for('AuthService'),
  TransactionService: Symbol.for('TransactionService'),
  UserController: Symbol.for('UserController'),
  TransactionController: Symbol.for('TransactionController'),
  AuthController: Symbol.for('AuthController'),
  Logger: Symbol.for('Logger'),
  TokenService: Symbol.for('TokenService'),
};

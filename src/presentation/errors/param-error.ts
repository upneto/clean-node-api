export class MissingParamError extends Error {
  constructor (paramName: string) {
    super('Missing Param: ' + paramName)
    this.name = 'MissingParamError'
  }
}

export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super('Imnvalid Param Error: ' + paramName)
    this.name = 'InvalidParamError'
  }
}

export class InvalidEmailError extends Error {
  constructor (paramName: string) {
    super('Invalid Email Param: ' + paramName)
    this.name = 'InvalidEmailError'
  }
}

export class ServerError extends Error {
  constructor (message?: string) {
    super(message || 'Server Internal Error')
    this.name = 'ServerError'
  }
}

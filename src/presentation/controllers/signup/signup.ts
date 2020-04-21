import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount } from './signup-imports'
import { MissingParamError, InvalidEmailError, InvalidParamError } from '../../errors/param-error'
import { badRequest, serverInternalError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidation: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidation = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requesredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requesredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValidEmail = this.emailValidation.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidEmailError('email'))
      }
      // Adiciona conta
      const account = await this.addAccount.add({
        email,
        name,
        password
      })
      return ok(account)
    } catch (e) {
      console.error(e)
      return serverInternalError(e)
    }
  }
}

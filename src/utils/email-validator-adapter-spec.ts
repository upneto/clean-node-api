import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSur = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator return false', () => {
    const sut = makeSur()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator return true', () => {
    const sut = makeSur()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })

  test('Should return true if validator return true', () => {
    const sut = makeSur()
    const isEmail = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(isEmail).toHaveBeenCalledWith('any_email@email.com')
  })
})

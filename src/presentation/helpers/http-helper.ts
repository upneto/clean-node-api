import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/param-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverInternalError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.message)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

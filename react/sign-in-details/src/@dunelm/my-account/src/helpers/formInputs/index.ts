import * as Yup from 'yup'

export const emailValidation = {
  email: Yup.string().email('Invalid email').required('Email is required')
}

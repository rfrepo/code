export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber
    ? `(${phoneNumber.slice(2, 5)}) ${phoneNumber.slice(
        5,
        8
      )}-${phoneNumber.slice(8)}`
    : phoneNumber
}

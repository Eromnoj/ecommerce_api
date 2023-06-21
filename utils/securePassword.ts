import bcrypt from 'bcrypt'

const encryptPassword = async (password:string ):Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, salt)
  return encryptedPassword
}

const comparePassword = async (submittedPassword:string, encryptedPassword:string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(submittedPassword, encryptedPassword)
  return isMatch
}

export {
  encryptPassword,
  comparePassword
}
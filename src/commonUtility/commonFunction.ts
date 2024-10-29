import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Database from '../database';

const hashPassword = async function (password: any) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async function (
  enteredPassword: any,
  storedHashedPassword: string,
) {
  return await bcrypt.compare(enteredPassword, storedHashedPassword);
};

const generateLoginHash = async (email: any, password: any) => {
  const hash = crypto.createHash('sha256');
  const dataToHash = email + password;
  hash.update(dataToHash);
  return hash.digest('hex');
};

const genrateNextId = async (
  dbContext: Database,
  collectionName: string,
  columnName: string,
) => {
  const data = await dbContext.find(collectionName, {});
  const lastId = Math.max(...data.map((item: any) => item[columnName]), 0);
  return lastId ? lastId + 1 : 1;
};

export { hashPassword, generateLoginHash, comparePassword, genrateNextId };

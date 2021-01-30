const User = require('./user');
const { error } = require('./constants');

const DEFAULT_OPTION = {
  properties : ['name', 'age', 'email']
};

class Database {
   
  static users = [];

  static addUser(user) {
    const { name, age, email } = user;
    const validation = this.isValid(user);
    if(!validation.valid) throw new Error(validation.error);
    const newUser = new User(name, age, email);
    this.users.push(newUser);
    return newUser;
  }

  static verifyUniqueEmail(email){
    return !!this.users.find(user => user.email === email); 
  }

  static verifyProperties(user, properties = DEFAULT_OPTION.properties){
    const objProperties = Object.keys(user);
    const haveAllProperties = objProperties.map(property => properties.includes(property));
    return haveAllProperties.every((property => property === true ));
  }

  static isValid(user){

    const haveAllProperties = this.verifyProperties(user);
    if(!haveAllProperties){
      return {
        error: error.USER_PROPERTIES_ERROR_MESSAGE,
        valid: false,
      }
    }

    const emailExists = this.verifyUniqueEmail(user.email);
    if(emailExists){
      return {
        error: error.USER_EMAIL_UNIQUE_ERROR_MESSAGE,
        valid: false
      }
    }
   
    return { valid: true }
  } 
};

module.exports = Database;



class User {
  constructor(name, age, email){
    this.name = name;
    this.email = email;
    this.birthDay = new Date().getFullYear() - age;
  }
}

module.exports = User;
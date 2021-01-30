
class CreateUserService { 

  constructor(){
    this.users = [];
  }
  execute(user) {

    const emailExists  = this.verifyEmailIsInUse(user.email);
    if(emailExists){
      this.hasError('Email already exists.')
    }
    this.users.push(user)
  }

  verifyEmailIsInUse(email){
    return !!this.users.find(user => user.email === email);
  }

  hasError(error){
    // throw new Error(error)
    console.log(error)
  }
};

module.exports = CreateUserService;
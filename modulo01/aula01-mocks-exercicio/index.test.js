const { rejects, deepStrictEqual } = require('assert')
const Database = require('./src/database');
const { error } = require('./src/constants');

(async () => {
  // {
  //   const users = require('./mocks/users-email-invalid.json');
  //   const rejection = new Error(error.USER_EMAIL_UNIQUE_ERROR_MESSAGE);
  //   const result = users.map(user => Database.addUser(user));
  //   console.log('result', result)
  //   rejects(result, rejection);
  // }

  // {
  //   const users = require('./mocks/users-properties-invalid.json');
  //   const rejection = new Error(error.USER_PROPERTIES_ERROR_MESSAGE);

  // }

  {
    const users = require('./mocks/users-valid.json');
    const result = users.map(user => Database.addUser(user));
    const resultExpected = [
      {
        name: 'Otavio',
        email:'otavio@exemplo.com.br',
        birthDay: 1995
     },
     {
       name:"Tulio",
       email:"tulio@exemplo.com.br",
       birthDay: 1992
     }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(resultExpected));
  }
})();
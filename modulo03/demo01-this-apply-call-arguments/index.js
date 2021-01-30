'use strict';

const { watch, promises: { readFile }} = require('fs');

 
class File {
  
  watch(event, filename){
    this.showContent(filename)
  }

  async showContent(filename){
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();

// dessa forma, ele ignora o 'this' da classe File
// o this na função watch vai direcionar para a função - ERROR
// watch(__filename, file.watch(file))

// o bind passa o contexto que vc deseja para o this
// alternativa para nao herdar o this da função
// podemos deixar explicito qual é o contexto que a função deve seguir
// o bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
watch(__filename, file.watch.bind(file));

// ou assim porém menos usual
//watch(__filename, (event, filename) => file.watch(event, filename))

// funciona como um middleware, quando o showContent é executado, a funcionalidade é substituída
// call e apply fazem a mesma coisa, só mudam na forma de chamar a função
file.watch.call({ showContent: () => console.log('call: hey sinon!')}, null, __filename);
file.watch.apply({ showContent: () => console.log('call: hey sinon!')},[ null, __filename]);
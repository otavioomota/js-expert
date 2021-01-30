import database from '../database.json';
import Person from './person.js';

import { save } from './repository.js';

import TerminalController from './terminalController.js';
const DEFAULT_LANGUAGE = 'pt-br';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop(){
  try {
    const answer = await terminalController.question();
    if(answer === STOP_TERM){
      terminalController.closeTerminal()
      console.log('process finished.')
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
    await save(person);
    return mainLoop();
  } catch(error){
    console.error('Deu ERROR ***', error);
    return mainLoop();
  }
};

await mainLoop();
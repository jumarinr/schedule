import Enlaces from '../../collections/enlaces';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const readEnlaces = new ValidatedMethod({
  name: 'readEnlaces',
  validate: null,
  run() {
    return Enlaces.find({}).fetch();
  }
});

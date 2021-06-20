import Enlaces from '../../collections/enlaces';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const readEnlaces = new ValidatedMethod({
  name: 'readEnlaces',
  validate: null,
  run() {
    this.unblock();
    return Enlaces.find({}).fetch();
  }
});

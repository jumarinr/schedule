import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Enlaces from '../../collections/enlaces';

const readEnlaces = new ValidatedMethod({
  name: 'readEnlaces',
  validate: null,
  run() {
    this.unblock();

    return Enlaces.find({}).fetch();
  },
});

export default readEnlaces;

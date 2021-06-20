import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Meteor } from 'meteor/meteor';
import Canciones from '../../collections/canciones';

const readCancionesByUser = new ValidatedMethod({
  name: 'readCancionesByUser',
  validate: null,
  run() {
    this.unblock();

    const userId = Meteor.userId();

    return Canciones.find({ userId }).fetch();
  },
});

export default readCancionesByUser;

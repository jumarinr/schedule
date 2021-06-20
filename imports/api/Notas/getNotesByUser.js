import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

import Notas from '../../collections/notas';

const getNotesByUser = new ValidatedMethod({
  name: 'getNotesByUser',
  validate: null,
  run() {
    this.unblock();
    const userId = Meteor.userId();

    const notas = Notas.find({ userId }).fetch();

    return {
      notas,
      status: 200,
    };
  },
});

export default getNotesByUser;

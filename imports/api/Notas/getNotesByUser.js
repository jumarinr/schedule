import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import Notas from '../../collections/notas';

export const getNotesByUser = new ValidatedMethod({
  name: 'getNotesByUser',
  validate: null,
  run() {
    this.unblock();
    const userId = Meteor.userId();

    return { notas: Notas.find({ userId }).fetch(), status: 200 };
  }
});

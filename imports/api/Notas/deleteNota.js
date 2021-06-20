import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

import Notas from '../../collections/notas';

export const deleteNota = new ValidatedMethod({
  name: 'deleteNota',
  validate: new SimpleSchema({
    // prueba: {type: String},
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    this.unblock();
    const borrarNota = Notas.remove({
      _id
    });
    console.log(borrarNota);
    return borrarNota;
  }
});

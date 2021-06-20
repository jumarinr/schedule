import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import Notas from '../../collections/notas';

const deleteNota = new ValidatedMethod({
  name: 'deleteNota',
  validate: new SimpleSchema({
    // prueba: {type: String},
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    this.unblock();
    return Notas.remove({ _id });
  },
});

export default deleteNota;

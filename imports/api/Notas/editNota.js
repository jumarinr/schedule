import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import Notas from '../../collections/notas';

const editNota = new ValidatedMethod({
  name: 'editNota',
  validate: new SimpleSchema({
    // prueba: {type: String},
    titulo: { type: String },
    descripcion: { type: String },
    _id: { type: String },
  }).validator(),
  run({ titulo, descripcion, _id }) {
    this.unblock();

    return Notas
      .update({
        _id,
      }, {
        $set: {
          titulo,
          descripcion,
          updatedAt: new Date(),
        },
      });
  },
});

export default editNota;

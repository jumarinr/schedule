import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';

import Notas from '../../collections/notas';

const addNote = new ValidatedMethod({
  name: 'addNote',
  validate: new SimpleSchema({
    // prueba: {type: String},
    titulo: { type: String },
    descripcion: { type: String },
  }).validator(),
  run({ titulo, descripcion }) {
    this.unblock();
    const userId = Meteor.userId();

    return Notas.insert({
      titulo,
      descripcion,
      userId,
      createdAt: new Date(),
    });
  },
});

export default addNote;

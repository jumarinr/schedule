import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

import Notas from '../../collections/notas';

export const addNote = new ValidatedMethod({
  name: 'addNote',
  validate: new SimpleSchema({
    // prueba: {type: String},
    titulo: { type: String },
    descripcion: { type: String }
  }).validator(),
  run({ titulo, descripcion }) {
    this.unblock();
    const userId = Meteor.userId();

    const insertNota = Notas.insert({
      titulo,
      descripcion,
      userId,
      createdAt: new Date()
    });
    console.log(insertNota);
    return insertNota;
  }
});

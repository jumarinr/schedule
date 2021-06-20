import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import Canciones from '../../collections/canciones';

const insertCancionByUser = new ValidatedMethod({
  name: 'insertCancionByUser',
  validate: new SimpleSchema({
    // prueba: {type: String},
    name: { type: String },
    src: { type: String },
    portada: { type: String },
    artist: { type: String },
  }).validator(),
  run(data) {
    this.unblock();
    const userId = Meteor.userId();

    const consultaRepetida = Canciones.findOne({ src: data.src, userId });

    if (consultaRepetida) {
      throw new Meteor.Error('Canción ya existe en su libreria');
    }

    const insertoCancion = Canciones.insert({
      ...data,
      userId,
      fechaCreacion: new Date(),
    });

    return {
      status: insertoCancion ? 200 : 400,
      insertoCancion: !!insertoCancion,
    };
  },
});

export default insertCancionByUser;

import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import Canciones from "../../collections/canciones";

export const insertCancionByUser = new ValidatedMethod({
  name: "insertCancionByUser",
  validate: new SimpleSchema({
    // prueba: {type: String},
    name: { type: String },
    src: { type: String },
    portada: { type: String },
    artist: { type: String }
  }).validator(),
  run(data) {
    const userId = Meteor.userId();

    const consultaRepetida = Canciones.findOne({ src: data.src, userId });
    if (!consultaRepetida) {
      const insertoCancion = Canciones.insert({
        ...data,
        userId,
        fechaCreacion: new Date()
      });

      return {
        status: insertoCancion ? 200 : 400,
        insertoCancion: insertoCancion ? true : false
      };
    } else {
      throw new Meteor.Error("Canción ya existe en su libreria");
    }
  }
});

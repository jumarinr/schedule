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
    portada: { type: String }
  }).validator(),
  run(data) {
    const userId = Meteor.userId();

    const insertoCancion = Canciones.insert({
      ...data,
      userId,
      fechaCreacion: new Date()
    });

    return {
      status: insertoCancion ? 200 : 400,
      insertoCancion: insertoCancion ? true : false
    };
  }
});

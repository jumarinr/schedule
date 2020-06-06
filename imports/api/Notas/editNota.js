import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";

import Notas from "../../collections/notas";

export const editNota = new ValidatedMethod({
  name: "editNota",
  validate: new SimpleSchema({
    // prueba: {type: String},
    titulo: { type: String },
    descripcion: { type: String },
    _id: { type: String }
  }).validator(),
  run({ titulo, descripcion, _id }) {
    const userId = Meteor.userId();

    const updateNota = Notas.update(
      { _id },
      { $set: { titulo, descripcion, updatedAt: new Date() } }
    );
    console.log(updateNota);
    return updateNota;
  }
});

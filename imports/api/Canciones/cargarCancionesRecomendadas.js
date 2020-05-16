import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import Canciones from "../../collections/canciones";

export const cargarCancionesRecomendadas = new ValidatedMethod({
  name: "cargarCancionesRecomendadas",
  validate: null,
  run() {
    const userId = Meteor.userId();

    return Canciones.find({ userId: { $exists: false } }).fetch();
  }
});

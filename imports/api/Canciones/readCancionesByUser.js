import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import Canciones from "../../collections/canciones";

export const readCancionesByUser = new ValidatedMethod({
  name: "readCancionesByUser",
  validate: null,
  run() {
    const userId = Meteor.userId();

    return Canciones.find({ userId }).fetch();
  }
});

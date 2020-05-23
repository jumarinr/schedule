import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import Fotos from "../../collections/fotos";

export const getImagenesByUser = new ValidatedMethod({
  name: "getImagenesByUser",
  validate: null,
  run() {
    const userId = Meteor.userId();

    return { fotos: Fotos.find({ userId }).fetch(), status: 200 };
  }
});

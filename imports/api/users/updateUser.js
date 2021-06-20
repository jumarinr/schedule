import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from "meteor/meteor";


export const updateUser = new ValidatedMethod({
    name: 'updateUser',
    validate: new SimpleSchema({
      // prueba: {type: String},
      userData: {type: Object, blackbox: true}
    }).validator(),
    run({userData}) {
      this.unblock();
      const _id = Meteor.userId();
      Meteor.users.update({_id},{$set: {...userData, updateAt: new Date()}})
      return Meteor.users.findOne({_id}, {fields: {services: 0}})

    }
});

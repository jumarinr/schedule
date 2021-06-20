import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';


export const findUserById = new ValidatedMethod({
  name: 'findUserById',
  validate: null,
  run() {
    this.unblock();
    const _id = Meteor.userId();
    return Meteor.users.findOne({_id}, {fields: {services: 0} });

  }
});

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

import Fotos from '../../collections/fotos';

const insertFotoByUser = new ValidatedMethod({
  name: 'insertFotoByUser',
  validate: new SimpleSchema({
    // prueba: {type: String},
    img: { type: String },
    title: { type: String },
  }).validator(),
  run({ img, title }) {
    this.unblock();
    const userId = Meteor.userId();

    return Fotos.insert({
      img,
      title,
      userId,
      createdAt: new Date(),
    });
  },
});

export default insertFotoByUser;

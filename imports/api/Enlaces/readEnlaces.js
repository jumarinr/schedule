import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from "meteor/meteor";
import Enlaces from '../../collections/enlaces';


export const readEnlaces = new ValidatedMethod({
    name: 'readEnlaces',
    validate: null,
    run() {
      return Enlaces.find({}).fetch()

    }
});

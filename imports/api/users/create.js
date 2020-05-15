import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';
import { Meteor } from "meteor/meteor";


export const registroUsuario = new ValidatedMethod({
    name: 'registroUsuario',
    validate: new SimpleSchema({
        email: { type: String },
        password: { type: String },
        nombre: { type: String},
    }).validator(),
    run({ email, password, nombre  }) {


    }
});

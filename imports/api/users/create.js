import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';


export const metodoPruebat = new ValidatedMethod({
    name: 'metodoPruebat',
    validate: new SimpleSchema({
        // todoId: { type: String },
        constante: { type: String }
    }).validator(),
    run({ constante }) {

    }
});
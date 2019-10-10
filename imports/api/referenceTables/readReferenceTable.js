import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';


export const readReferenceTable = new ValidatedMethod({
    name: 'readReferenceTable',
    validate: new SimpleSchema({
        // todoId: { type: String },
        name: { type: String }
    }).validator(),
    run({ name }) {

    }
});

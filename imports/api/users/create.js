import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';


export const registroUsuario = new ValidatedMethod({
    name: 'registroUsuario',
    validate: new SimpleSchema({
        email: { type: String },
        password: { type: String },
        nombre: { type: String, optional : true },
    }).validator(),
    run({ email, password }) {
      console.log(this.user);
      const isCreated = Accounts.createUser({
        email,
        password
      })
      console.log(isCreated);
      return isCreated
    }
});

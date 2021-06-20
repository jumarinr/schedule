import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

const registroUsuario = new ValidatedMethod({
  name: 'registroUsuario',
  validate: new SimpleSchema({
    email: { type: String },
    password: { type: String },
    nombre: { type: String },
  }).validator(),
  run({ email, password, nombre }) {

  },
});

export default registroUsuario;

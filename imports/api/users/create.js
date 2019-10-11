import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import Trabajadores from '../../collections/trabajadores'

export const metodoPruebat = new ValidatedMethod({
    name: 'metodoPruebat',
    validate: new SimpleSchema({
        // todoId: { type: String },
        nombre: { type: String },
        correo: {type: String}
    }).validator(),
    run({ nombre, correo }) {
        try {
            Trabajadores.insert({
                nombre,
                correo
            })
            array[0].error();
            return constante;            
        } catch (error) {
            return new Meteor.Error(error)
        }

    }
});
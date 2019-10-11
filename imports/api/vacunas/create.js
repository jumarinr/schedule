import {
    ValidatedMethod
} from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import Vacunas from '../../collections/vacunas'

export const insertarVacuna = new ValidatedMethod({
    name: 'insertarVacuna',
    validate: new SimpleSchema({
        // todoId: { type: String },
        nombre: {
            type: String
        },
        descripcion: {
            type: String
        },
        periodicidad: {
            type: Number
        },
        prestadorServicio: {
            type: String
        }

    }).validator(),
    run({
        nombre,
        descripcion,
        periodicidad,
        prestadorServicio,
    }) {
        try {
            let busquedaDeVacuna = Vacunas.findOne({
                nombre
            });
            if (busquedaDeVacuna) {
                throw new Meteor.Error("Ya hay una vacuna con este nombre");
            }
            const _id = Vacunas.insert({
                nombre,
                descripcion,
                periodicidad,
                prestadorServicio,

            })
            return {
                status: 200,
                data: Vacunas.findOne({
                    _id
                })
            };
        } catch (error) {
            throw new Meteor.Error(error.message)
        }

    }
});
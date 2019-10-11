import {ValidatedMethod} from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import Trabajadores from '../../collections/trabajadores'

export const insertarTrabajador = new ValidatedMethod({
    name: 'insertarTrabajador',
    validate: new SimpleSchema({
        // todoId: { type: String },
        areaTrabajo: {type: String},
        registradoPor: {type: String, optional: true},
        detallesVacunacion: {type: Array},
        'detallesVacunacion.$': {type: String},
        tipoIdentificacion: {type: String},
        nivelDeRiesgoLaboral: {type: String},
        identificacion: {type: String},
        nombres: {type: String},
        correo: {type: String},
        apellidos: {type: String},
        fechaNacimiento: {type: Date},
        direccion: {type: String},
        telefono: {type: String}, 
        celular: {type: String, optional: true},
        contactoAllegado: {type: String},

    }).validator(),
    run(data) {
        console.log(data)
        try {
            let trabajador = Trabajadores.findOne({identificacion: data.identificacion})
            if(trabajador){
                throw new Meteor.Error("Ya se encuentra un trabajador con esta identificación registrado.")
            }else{
                const _id =  Trabajadores.insert(data);
                return  {
                    status: 200,
                    data: Trabajadores.findOne({_id})
                }
            }
        } catch (error) {
            throw new Meteor.Error(error.message)
        }

    }
});
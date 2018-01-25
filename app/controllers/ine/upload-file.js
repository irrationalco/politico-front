import Ember from 'ember';
import { task } from 'ember-concurrency';
import config from '../../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service(),

    triedUpload: false,

    succesfulUpload: false,

    errorString: '',

    downloadCSVFile: function (filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    },

    fileUploader: task(function* (file) {
        let response = yield file.upload(config.localhost + '/api/voters/file_upload/' + this.get('session.currentUser').id, { accepts: 'text/csv' });
        
        this.set('triedUpload', true);
        this.set('succesfulUpload', response.status === 201);
        if (response.status === 201) {
            //succes
        } else if (response.status === 206) {
            //errores en algunos datos
            //regreso el csv con errores
            this.downloadCSVFile('filas invalidas.csv', response.body);
            this.set('errorString', 'Se encontraron datos invalidos en el archivo, se empezará su descarga inmediatamente');
        } else if (response.status === 204) {
            //el archivo tiene problemas 
            this.set('errorString', 'No se puede procesar el archivo, verifique que sea tenga un formato valido');
        } else {
            //algun otro error en el camino al server
            this.set('errorString', 'Hubo un error al subir el archivo, verifique su conección a internet');
        }
    }).enqueue(),

    actions: {
        uploadFile(file) {
            this.get('fileUploader').perform(file);
        },
        downloadFormatFile() {
            this.downloadCSVFile('archivo de formato.csv,Numero de la credencial de elector,Vigencia de la credencial de elector,Nombre,pellido Paterno,Apellido Materno,Sexo,Dia de nacimiento,Mes de nacimiento,nio de nacimiento,Clave de elector,curp,Seccion Electoral,Calle,Numero exterior,Numero Interior,olonia,Clave de la localidad,Localidad,Clave de municipio,Municipio,lave de estado,Estado,Codigo postal,Telefono fijo,Telefono celular,Correo Electronico,orreo electronico alternativo,Cuenta Facebook,Ultimo Grado de estudios,cupacion Actual,Organizacion a la que pertenece,Cargos partidarios que ha tenido,Pertenece a la estructura del partido,Ha sido candidata(o),Cargo de eleccion popular,Año de eleccion,Resulto electa(o),Via de eleccion,Notas');
        }
    }
});
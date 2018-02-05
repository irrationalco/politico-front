// Fast_jsonapi doesn't refactor underscores to hyphens which ember's JsonApi serializer expects to,
// so unless it is fixed in the future, we have to create a serializer whenever we use fast_jsonapi for a model
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    sectionCode:   'section_code',
    muniCode:      'muni_code',
    stateCode:     'state_code',
    districtCode:  'district_code',
    total:         'total',
    year:          'year',
    hombres:       'hombres',
    mujeres:       'mujeres',
    hijos:         'hijos',
    entidadNac:    'entidad_nac',
    entidadInm:    'entidad_inm',
    entidadMig:    'entidad_mig',
    limitacion:    'limitacion',
    analfabetismo: 'analfabetismo',
    educacionAv:   'educacion_av',
    pea:           'pea',
    noServSalud:   'no_serv_salud',
    matrimonios:   'matrimonios',
    hogares:       'hogares',
    hogaresJefa:   'hogares_jefa',
    hogaresPob:    'hogares_pob',
    auto:          'auto'
  }
});
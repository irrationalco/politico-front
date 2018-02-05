import DS from 'ember-data';

export default DS.Model.extend({
  sectionCode:    DS.attr('number'),
  muniCode:       DS.attr('number'),
  stateCode:      DS.attr('number'),
  districtCode:   DS.attr('number'),
  total:          DS.attr('number'),
  year:           DS.attr('number'),
  hombres:        DS.attr('number'),
  mujeres:        DS.attr('number'),
  hijos:          DS.attr('number'),
  entidadNac:     DS.attr('number'),
  entidadInm:     DS.attr('number'),
  entidadMig:     DS.attr('number'),
  limitacion:     DS.attr('number'),
  analfabetismo:  DS.attr('number'),
  educacionAv:    DS.attr('number'),
  pea:            DS.attr('number'),
  noServSalud:    DS.attr('number'),
  matrimonios:    DS.attr('number'),
  hogares:        DS.attr('number'),
  hogaresJefa:    DS.attr('number'),
  hogaresPob:     DS.attr('number'),
  auto:           DS.attr('number')
});

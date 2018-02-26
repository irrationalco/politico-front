import DS from 'ember-data';

export default DS.Model.extend({
  sectionCode:  DS.attr('number'),
  muniCode:     DS.attr('number'),
  stateCode:    DS.attr('number'),
  districtCode: DS.attr('number'),
  forecastType: DS.attr('number'),
  pan:          DS.attr('number'),
  pconv:        DS.attr('number'),
  pes:          DS.attr('number'),
  ph:           DS.attr('number'),
  pmc:          DS.attr('number'),
  pmor:         DS.attr('number'),
  pna:          DS.attr('number'),
  ppm:          DS.attr('number'),
  prd:          DS.attr('number'),
  pri:          DS.attr('number'),
  psd:          DS.attr('number'),
  psm:          DS.attr('number'),
  pt:           DS.attr('number'),
  pvem:         DS.attr('number')
});

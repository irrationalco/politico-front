import Ember from 'ember';
import d3 from "npm:d3";
import { task } from 'ember-concurrency';

const { isEmpty } = Ember;
const { service } = Ember.inject;
const { oneWay } = Ember.computed;


export default Ember.Component.extend({
	partiesManager: service("parties"),
	store:          service(),
	cartography:    service(),

	forecasts: null,

	scaleExtent: 	[1 << 12, 1 << 26.5],
	centerCoords: [-102, 23],

	selectedParties:         oneWay("partiesManager.selectedParties"),
	states:                  oneWay('cartography.states'),
	municipalities:          oneWay('cartography.municipalities'),
	municipalitiesBorders:   oneWay('cartography.municipalitiesBorders'),
	federalDistricts:        oneWay('cartography.federalDistricts'),
	federalDistrictsBorders: oneWay('cartography.federalDistrictsBorders'),
	sections:                oneWay('cartography.sections'),

	projection: d3.geoMercator().scale(1 / (2 * Math.PI)).translate([0,0]),

	path: Ember.computed('projection', function() {
		return d3.geoPath().projection(this.get('projection'));
	}),

	// Defining Zoom Behaviour
	zoom: Ember.computed('scaleExtent', function() {
		return d3.zoom().scaleExtent(this.get('scaleExtent'))
			.on('zoom', () => {
				this.zoomed();
			});
	}),

  didInsertElement() {
		this._super(...arguments);

		let width = Ember.$("#forecast-map").width();
		let height = Ember.$('#forecast-map').height();

		this.set('width', width);
		this.set('height', height);

		// Initializing SVG on the html element
		this.set('svg', d3.select("#forecast-map").append("svg")
			.attr("class", "svg-map")
			.attr("width", this.get('width'))
			.attr("height", this.get('height')));
			
		this.get('svg').append("rect")
			.attr("class", "map-background")
			.attr("width", this.get('width'))
			.attr("height", this.get('height'));

		// Defining layers
		this.set('statesLayer', this.get('svg').append('g'));
	},

	didReceiveAttrs(){
		this._super(...arguments);

		let stateForecasts = {};

		this.get('forecasts').forEach(element => {
			stateForecasts[element.get('stateCode')] = element;
		});

		this.set('stateForecasts', stateForecasts);

		this.get('renderStates').perform();
	},

	renderStates: task(function * () {
		if (isEmpty(this.get('states'))) { yield this.get('cartography.loadStatesData').perform(); }


		let emberContext = this;
		let statesLayer = this.get('statesLayer');
		let states = this.get('states');
		let partiesManager = this.get('partiesManager');


		statesLayer.selectAll("path")
			.data(states)
			.enter().append("path")
			.attr("d", this.get('path'))
			.style('fill', function(d){
				let forecast = emberContext.get('stateForecasts')[d.properties.state_code];

				// TODO: Pick right color of dominating party
				return (forecast.get('pan') > forecast.get('pri')) ? partiesManager.colors.PAN : partiesManager.colors.PRI;
			})
			.attr("class", "feature");

		this.zoomToCoordinates(this.get('centerCoords'), 14000, this.get('svg'));
	}),

	zoomed() {
		let transform = d3.event.transform;
		this.set('transform', transform);

		this.get('statesLayer')
			.attr("transform", transform)
			.style("stroke-width", 0.7 / transform.k);
	},

	zoomToCoordinates(coordinates, zoomValue) {
		let projection = this.get('projection');
		let center = projection(this.get('centerCoords'));


		this.get('svg').call(this.get('zoom').transform, d3.zoomIdentity
			.translate(this.get('width') / 2, this.get('height') / 2)
			.scale(zoomValue)
			.translate(-center[0], -center[1]));
	},
});
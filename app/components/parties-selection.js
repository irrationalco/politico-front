import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
	partiesManager: service("parties"),

	temporalParties: Ember.computed('selectedParties', function() {
		return this.get('selectedParties').map(item => { return item; });
	}),

	parties: Ember.computed.alias('partiesManager.parties'),
	selectedParties: Ember.computed.oneWay('partiesManager.selectedParties'),

	actions: {
		addParty(item) { console.log(item); },

		removeParty(item) { console.log(item); },

		setSelectedParties() {
			this.get('partiesManager').setSelectedParties(this.get('temporalParties'));			
		}
	} 
});


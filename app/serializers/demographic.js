// Explicitly telling the serializer to look for underscores not hyphens,
// Fast_jsonapi doesn't refactor underscores to hyphens which ember's JsonApi serializer expects to,
// so unless it is fixed in the future, we have to create a serializer whenever we use fast_jsonapi for a model
import Ember from 'ember';
import DS from 'ember-data';

var underscore = Ember.String.underscore;

export default DS.JSONAPISerializer.extend({
    keyForAttribute: function(attr) {
        return underscore(attr);
    },

    keyForRelationship: function(rawKey) {
        return underscore(rawKey);
    }
});

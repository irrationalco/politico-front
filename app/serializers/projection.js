// Slowly migrating all models to the fastjsonapi, when all models use fastjson api, we can create just an application.js serializer

// Explicitly telling the serializer to look for underscores not hyphens,
// since fast_jsonapi doesn't decapitalize attributes like AMS did, 
// also fast_jsonapi doesn't refactor underscores to hyphens which ember's JsonApi serializer expects to
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
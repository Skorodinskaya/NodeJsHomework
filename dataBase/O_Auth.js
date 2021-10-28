const {Schema, model} = require('mongoose');
const MD = require('./ModelDefinition');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },

    refresh_token: {
        type: String,
        required: true,
        trim: true
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },


},MD.gentelmenClub);

oAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model('o_auth', oAuthSchema);

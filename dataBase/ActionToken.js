const {Schema, model} = require('mongoose');

const {FORGOT_PASSWORD} = require('/configs');

console.log(FORGOT_PASSWORD);

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },

    token_type: {
        type: String,
        required: true,
        enum: [],
        trim: true
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },


}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

actionTokenSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model('action_token', actionTokenSchema);

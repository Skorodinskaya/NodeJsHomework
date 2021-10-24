const {Schema, model} = require('mongoose');

const userRoles = require('../configs/user_roles_enum');
const {passwordService} = require('../service');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    }
};

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashPassword});
    }
};

userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.role} How are you?`;
});

module.exports = model('user', userSchema);

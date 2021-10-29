const {Schema, model} = require('mongoose');

const userRoles = require('../configs/user_roles_enum');
const passwordService = require('../service/password.service');
const MD = require('./ModelDefinition');

const userSchema = new Schema({
    ...MD.NEP,
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },

    is_active: {
        type: Boolean,
        default: false,
        // required:true
    },

    age: {
        type: Number,
    },

    avatar: {
        type: String
    }
}, MD.gentelmenClub);

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

userSchema.virtual('fullName')
    .get(function() {
        return `${this.name} ${this.role} How are you?`;
    });

module.exports = model('user', userSchema);

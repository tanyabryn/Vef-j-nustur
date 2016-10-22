const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    token: String,
    // Gera validation 'a /etta'
    enum: ['f', 'm']
});

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    punchCount: {
        type: Number,
        default: 10
    }
});

const PunchSchema = new mongoose.Schema({
    company_id: {
        type:  mongoose.Schema.Types.ObjectId, ref: 'CompanySchema',
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'UsersSchema',
        required: true
    },
    created: {
        type: Date,
        default: new  Date()
    },
    used: {
        type: Boolean,
        default: false
    }
});

const UserEntity = mongoose.model("Users", UsersSchema);
const PunchEntity = mongoose.model("Punches", PunchSchema);

const entities = {
    User: UserEntity,
    Punch: PunchEntity
};

module.export = entities;
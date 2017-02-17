// Require library
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');


// Create Schema
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: String,
    age: String,
    location: String,
    saleAmount: Number,
    income: Number,
    password: String,
    email: { type: String, required: true, unique: true },
    admin: Boolean
    created_at: Date,
    updated_at: Date
});

// Encryption
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.hash(user.password, null, null, function(err, hash){
            if (err){
                next();
            }
            user.password = hash;
            next();
        });
    }
    next();
});

// Compare encryption
userSchema.methods.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
        callback(isMatch);
    });
};
var Salesman = mongoose.model('users', userSchema);


// Connect to Mongodb
mongoose.connect('mongodb://localhost/mongoose-bcrypt-test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('We are connected to the database!')
});

// CREATE TEST USER
var Admin = new Salesman({
    name: "Admin",
    lastName: "Admin"
    bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    age: 27,
    location: "Zandvoort",
    saleAmount: 0,
    income: 0,
    password: "password",
    email: "admin@admin.com",
    admin: true,
});

// SAVE user to database
Admin.save(function(err, data){
    if(err) console.log(err);
    else console.log ('Sucess:' , data);
});

//Export database
module.exports = Salesman;
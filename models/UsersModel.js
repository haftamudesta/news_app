import mongoose, {models} from "mongoose";

const userSchema=new mongoose.Schema({
        name:{
                type:String,
                require:true,
                trim:true
        },
        email:{
                type:String,
                require:true,
                trim:true
        },
        password:{
                type:String,
                require:true,
                trim:true
        },
        image:{
                type:String,
                require:true,
        },
        role:{
                type:String,
                require:true,
                default:"user",
                enum:{
                        values:["user","admin","superAdmin"],
                        message:"{VALUE} is not supported"
                }
        }
},{timestamps:true})

userSchema.virtual('confirmPassword')
  .get(function() {
    return this._confirmPassword;
  })
  .set(function(value) {
    this._confirmPassword = value;
  });

userSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords do not match');
  }
  next();
});
userSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
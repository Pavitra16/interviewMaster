const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true, "token is required"],
    }
},
{
    timestamps:true
}
)

const tokenBlacklistModel = mongoose.models.blacklistTokens || mongoose.model("blacklistTokens", blacklistTokenSchema);

module.exports = tokenBlacklistModel;
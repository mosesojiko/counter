// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    terms: { type: String },
    phone: { type: String },
    address: { type: String },
    isBanned: { type: Boolean, default: false },
    isActive: {type: Boolean, default: true},
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU",
    },
    picture: {type: String},
    storeDetails: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      description: { type: String },
      imageUrl: { type: String },
      country: { type: String },
      userStore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mosgandastores",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema)
// eslint-disable-next-line no-undef
module.exports = User;
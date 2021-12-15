/* eslint-disable no-undef */
const mongoose = require ('mongoose');

const storeSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    description: { type: String },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU",
    },
    isPosted: { type: Boolean, default: false },
    creatorId: { type: String },
    creatorName: { type: String },
    creatorAddress: { type: String },
    creatorEmail: {type: String},
    creatorPhone: { type: String },
    creatorImage: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Mosgandastore = mongoose.model('Mosgandastore', storeSchema);
// eslint-disable-next-line no-undef
module.exports = Mosgandastore;
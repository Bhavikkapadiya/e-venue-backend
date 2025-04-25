const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const venueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categories: [
      {
        type: [String],
        // enum: categories,
      },
    ],
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
      },
    },
    contact_no: {
      type: Number,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    rent: {
      type: Number,
    },
    added_by: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

// add plugin that converts mongoose to json
venueSchema.plugin(toJSON);
venueSchema.plugin(paginate);

venueSchema.index({
  location: '2dsphere',
});

// venueSchema.pre('save', async function (next) {
//   const user = this;
//   next();
// });

/**
 * @typedef User
 */
const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;

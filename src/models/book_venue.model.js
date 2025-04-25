const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookVenueSchema = mongoose.Schema(
  {
    venue_id: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    start_date_time: {
      type: Date,
      default: Date.now,
    },
    end_date_time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

bookVenueSchema.plugin(toJSON);
bookVenueSchema.plugin(paginate);

const BookVenue = mongoose.model('BookVenue', bookVenueSchema);

module.exports = BookVenue;

const { Venue } = require('../models');
const { BookVenue } = require('../models');
// const ApiError = require('../utils/ApiError');

const queryVenues = async (filter, options) => {
  const longitude = filter.location || { lng: 0 };
  const latitude = filter.location || { lat: 0 };
  const geoType = filter.location || { type: 'Point' };

  const venues = await Venue.aggregate([
    {
      $geoNear: {
        near: {
          type: geoType.type,
          coordinates: [longitude.lng, latitude.lat],
        },
        distanceField: 'distance',
        maxDistance: 0.003,
        spherical: true,
      },
    },
    {
      $match: {
        categories: {
          $in: [options.category, '$categories'],
        },
      },
    },
    {
      $addFields: {
        id: { $toString: '$_id' },
      },
    },
    {
      $lookup: {
        from: 'bookvenues',
        localField: 'id',
        foreignField: 'venue_id',
        as: 'details',
      },
    },
    {
      $unwind: {
        path: '$details',
      },
    },
    {
      $match: {
        $or: [
          {
            $or: [
              {
                'details.start_date_time': {
                  $lte: new Date(options.start_date_time),
                },
              },
              {
                'details.start_date_time': {
                  $gte: new Date(options.start_date_time),
                },
              },
            ],
          },
          {
            $or: [
              {
                'details.end_date_time': {
                  $lte: new Date(options.end_date_time),
                },
              },
              {
                'details.end_date_time': {
                  $gte: new Date(options.end_date_time),
                },
              },
            ],
          },
        ],
      },
    },
  ]);

  // const venues = await Venue.paginate(filter, options);
  return venues;
};

const getVenueById = async (id) => {
  return Venue.findById(id);
};

const bookVenue = async (venueBody) => {
  return BookVenue.create(venueBody);
};

module.exports = {
  queryVenues,
  bookVenue,
  getVenueById,
};

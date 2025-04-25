const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { venueService } = require('../services');
const { emailService } = require('../services');

const getVenues = catchAsync(async (req, res) => {
  const filter = pick(req.body, ['location']);
  const options = pick(req.body, ['category', 'start_date_time', 'end_date_time']);
  const result = await venueService.queryVenues(filter, options);

  res.send(result);
});

const bookVenue = catchAsync(async (req, res) => {
  const getVenue = await venueService.getVenueById(req.body.venue_id);
  if (!getVenue) {
    res.status('404').send('Venues doesnt exists');
  }
  const venue = await venueService.bookVenue(req.body);
  await emailService.bookingEmail(req.body.email, getVenue.name, req.body.name);
  res.status(httpStatus.CREATED).send(venue);
});

module.exports = {
  getVenues,
  bookVenue,
};

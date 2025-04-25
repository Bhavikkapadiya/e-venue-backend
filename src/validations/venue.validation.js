const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getVenues = {
  body: Joi.object().keys({
    location: Joi.object(),
    category: Joi.string(),
    start_date_time: Joi.string(),
    end_date_time: Joi.string(),
  }),
};

const bookVenue = {
  body: Joi.object().keys({
    name: Joi.string(),
    venue_id: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    start_date_time: Joi.string(),
    end_date_time: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getVenues,
  getUser,
  updateUser,
  deleteUser,
  bookVenue,
};

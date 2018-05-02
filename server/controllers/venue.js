

var Venue = require('../models/Venue.js');
var User = require('../models/User');
const yelp = require('yelp-fusion');
 
const client = yelp.client(process.env.YELP_TOKEN);


exports.getVenues = function(req, res) {
  var searchLocation = req.query.loc || 'Ann Arbor';

  if (req.isAuthenticated() && req.user) {
    User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $set: {
          searchLocation: searchLocation,
        },
      }
    ).exec(function(err, result) {
      if (err) return console.error(err);
    });
  }

  client
    .search({ category_filter: 'bars', location: searchLocation })
    .then(data => {
      return data.businesses.map(venue => {
        return {
          name: venue.name,
          id: venue.id,
          url: venue.url,
          image_url: venue.image_url,
          address: venue.location.display_address,
          snippet_text: venue.snippet_text,
        };
      });
    })
    .then(venues => {
      var userId;

      if (req.isAuthenticated() && req.user) {
        userId = req.user._id.toString();
      }

      return Promise.all(
        venues.map(venue => {
          return new Promise(function(resolve, reject) {
            Venue.find({ venueId: venue.id }).exec(function(err, result) {
              if (err) return console.error(err);

              if (result.length > 0) {
                venue.numberAttending = result[0].usersAttending.length;

                if (userId) {
                  venue.isAttending = result[0].usersAttending
                    .map(rsvp => rsvp.userId)
                    .includes(userId);
                }
              } else {
                venue.numberAttending = 0;
                venue.isAttending = false;
              }
              resolve(venue);
            });
          });
        })
      );
    })
    .then(venues => {
      res.json(venues);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.postRsvp = function(req, res) {
  var { venueId, date, isAttending } = req.body;
  var userId = req.user._id.toString();

  if (isAttending) {
    Venue.findOneAndUpdate(
      {
        venueId: venueId,
      },
      {
        $addToSet: {
          usersAttending: {
            userId: userId,
            date: date,
          },
        },
      },
      {
        upsert: true,
      }
    ).exec(function(err, result) {
      if (err) return console.error(err);

      res.sendStatus(200);
    });
  } else {
    Venue.findOneAndUpdate(
      {
        venueId: venueId,
      },
      {
        $pull: {
          usersAttending: {
            userId: userId,
          },
        },
      },
      {
        upsert: true,
      }
    ).exec(function(err, result) {
      if (err) return console.error(err);

      res.sendStatus(200);
    });
  }
};

exports.deleteRsvps = function(req, res) {
  var userId = req.user._id.toString();

  Venue.update(
    {},
    {
      $pull: {
        usersAttending: {
          userId: userId,
        },
      },
    },
    {
      multi: true,
    }
  ).exec(function(err, result) {
    if (err) return console.error(err);

    res.sendStatus(200);
  });
};

var User       = require('../models/user');
var Topic      = require('../models/topic');

function topicCreate(req, res) {
  var topic = new Topic(req.body.topic);
  console.log(topic);
  topic.save(function(err,topic){
  if (err) return res.status(500).json({ error: 'Error'});
    res.json(topic);
    User.findById( topic.user, function(err, user) {
      if (err) return res.status(500).json({ error: 'Error'});
      user.topics.push(topic)
      user.save()
    });
  });
}

function topicsIndex(req, res) {
  Topic.find(function(err, topics){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ topics: topics });
  });
}

function topicsShow(req, res){
  Topic.findById(req.params.id).populate("user").exec(function(err, topic){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ topic: topic });
  });
}

module.exports = {
  topicCreate:  topicCreate,
  topicsIndex:  topicsIndex,
  topicsShow:   topicsShow
};

// module.exports = {
//   create: locationsCreate,
//   index: locationsIndex,
//   show: locationsShow,
//   update: locationsUpdate,
//   delete: locationsDelete,
//   locationsCreate: locationsCreate,
//   locationsByUser: locationsByUser
// };


// function usersShow(req, res){
//   User.findById(req.params.id).populate("topics").exec(function(err, user){
//     if (err) return res.status(404).json({message: 'Something went wrong.'});
//     res.status(200).json({ user: user });
//   });
// }

// function locationsCreate(req, res) {
//     var location = new Location(req.body.location);
//     console.log("LOCATIONNNNNN" + location)
//       location.save(function(err,location){
//         if (err) return res.status(500).json({ error: 'Error'});
//           res.json(location);
//           User.findById( req.params.id, function(err, user) {
//             if (err) return res.status(500).json({ error: 'Error'});
//
//             user.locations.push(location)
//             //BUG TO FIX LATER
//             user.save()
//             console.log(user);
//             // else {
//             //   user.locations.push(location);
//             //   user.save(function(err,user){
//             //     if(err) return res.json(err);
//             //       res.json(user);
//             //   });
//             // }
//           });
//     });
// }
// //mishal test
// function locationsByUser(req, res) {
//
//   User.findById( req.params.id, function(err, user) {
//     if (err) return res.status(500).json({ error: 'Error'});
//     }).populate('locations')
//       .exec(function(err, user){
//           if (err) return res.status(500).json({ error: 'Error'});
//           res.json(user);
//           //console.log(location);
//     })
//
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
// function locationsShow(req, res) {
//   Location.findById(req.params.id, function(err, location) {
//     if(err) return res.status(500).json({ message: err });
//     return res.status(200).json({ location: location });
//   });
// }
//
// function locationsUpdate(req, res) {
//   Location.findOneAndUpdate({_id: req.params.id} , req.body, {new: true} , function(err, location){
//     if (err) return res.status(500).json({ error: 'Error'});
//       res.json(location)
//   });
// }
//
// function locationsDelete(req, res) {
//   Location.findByIdAndRemove(req.params.id, function(err) {
//     if(err) return res.status(500).json({ message: err });
//     return res.status(204).send();
//   });
// }
//

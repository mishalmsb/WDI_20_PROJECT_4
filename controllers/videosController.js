// var User       = require('../models/user');
// var Topic      = require('../models/video');

// function topicCreate(req, res) {
//   var topic = new Topic(req.body.topic);
//   topic.save(function(err,topic){
//   if (err) return res.status(500).json({ error: 'Error'});
//     res.json(topic);
//     User.findById( topic.user, function(err, user) {
//       if (err) return res.status(500).json({ error: 'Error'});
//       user.topics.push(topic)
//       user.save()
//     });
//   });
// }

// function topicsIndex(req, res) {
//   // Topic.find(function(err, topics){
//   //   if (err) return res.status(404).json({message: 'Something went wrong.'});
//   //   res.status(200).json({ topics: topics });
//   // });
//   Topic.find({}).populate("user").exec(function(err, topics){
//     if (err) return res.status(404).json({message: 'Something went wrong.'});
//     res.status(200).json({ topics: topics });

//   });
// }

// function topicsShow(req, res){
//   Topic.findById(req.params.id).populate("user").exec(function(err, topic){
//     if (err) return res.status(404).json({message: 'Something went wrong.'});
//     res.status(200).json({ topic: topic });

//   });
// }

// function topicsUpdate(req, res){
//   Topic.findByIdAndUpdate({ _id: req.params.id }, req.body.topic, function(err, topic){
//     if (err) return res.status(500).send(err);
//     if (!topic) return res.status(404).send(err);
//     res.status(200).send(topic);
//   });
// }

// module.exports = {
//   topicCreate:  topicCreate,
//   topicsIndex:  topicsIndex,
//   topicsShow:   topicsShow,
//   topicsUpdate: topicsUpdate,
// };


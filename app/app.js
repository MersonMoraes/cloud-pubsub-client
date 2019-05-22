const express = require('express');
const app = express();
var router = express.Router();

const {PubSub} = require('@google-cloud/pubsub');

const PORT = 8080;
const HOST = '0.0.0.0';
const projectId = 'hello-world-4736435';

async function listAllTopics(res) {
  
    // Creates a client
    const pubsub = new PubSub({projectId});
  
    // Lists all topics in the current project
    const [topics] = await pubsub.getTopics();
    var topicsStr = '<p> Topíco: ';
    topics.forEach(topic => topicsStr = topicsStr + topic.name);
    topicsStr = topicsStr + '</p>';
    
    res.send(topicsStr);
    // [END pubsub_list_topics]
  }
  

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });
  
router.post('/publish', function(req, res){
    listAllTopics(res);
});

app.use("/", router);

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});
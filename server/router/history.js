const express = require('express')
const router = express.Router()

var vision = require('@google-cloud/vision');

var visionClient = vision({
  projectId: 'first-app-178213',
  keyFilename: '../First-App-b4d9df73301c.json'
});

const visionHelper = (req, res, next) => {
  //add
  var gambar = req.body.gambar
  // var gambar = ``

  // OK NOW we can use two input, pake gstorage, or pake link biasa=
  // var gcsImageUri = 'gs://hacktivrunner/runner2.jpg';
  var imageUri = gambar;
  var source = {
      // gcsImageUri : gcsImageUri
      imageUri : imageUri
  };
  var image = {
      source : source
  };
  var type = vision.v1.types.Feature.Type.WEB_DETECTION;
  var featuresElement = {
      type : type
  };
  var features = [featuresElement];
  var requestsElement = {
      image : image,
      features : features
  };
  console.log('sampai sini')
  req.vision = [requestsElement];
  next()
}

//==========

router.post('/api', visionHelper, (req, res) => {
  visionClient.batchAnnotateImages({requests: req.vision})
  .then(function(responses) {
      var response = responses[0];
      console.log(response);
      // doThingsWith(response)
      res.send(response.responses[0].textAnnotations[0].description)
  })
  .catch(function(err) {
      console.error(err);
  });
})



module.exports = router

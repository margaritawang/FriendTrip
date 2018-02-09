const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const upload = multer();
require('dotenv').config();
const atob = require('atob');
//const Blob = require('blob');

AWS.config.region = "us-east-1";
AWS.config.accessKeyId = process.env.accessKeyID;
AWS.config.secretAccessKey = process.env.secretAccessKey;

const rekognition = new AWS.Rekognition({
  region: "us-east-1"
});

function indexFaces(bitmap, name) {
  return new Promise((resolve, reject) => {
    rekognition.indexFaces({
      'CollectionId': 'users',
      'DetectionAttributes': ['ALL'],
      'ExternalImageId': name,
      'Image': {
        'Bytes': bitmap
      },
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

const FACE_COLLECTION = 'users';
function createCollection() {
  // Index a dir of faces
  rekognition.createCollection({
    "CollectionId": FACE_COLLECTION
  }, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data); // successful response
    }
  });
}
function getBinary(encodedFile) {
        var base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
        var b64 = "SGVsbG8gV29ybGQ=";
        var binaryImg = atob(b64);
        var length = binaryImg.length;
        var ab = new ArrayBuffer(length);
        var ua = new Uint8Array(ab);
        for (var i = 0; i < length; i++) {
          ua[i] = binaryImg.charCodeAt(i);
        }
        return ab;
      }
//endpoints
module.exports = (datahelper) => {
  router.post('/saveimage/:id', upload.single('data'), (req, res, next) => {
    indexFaces(req.file.buffer, req.params.id);
    return res.status(200).send("Uploading to AWS");
  });

  router.post('/face/compare', upload.single('file'), (req, res) => {
    let buffer = req.body.file;
    let bitmap = buffer.split(',')[1];
    console.log('bitmap--------', bitmap);
    let bit = new Buffer(bitmap, 'base64');
    //console.log("bitmap------------------",bitmap);
    rekognition.searchFacesByImage({
      'CollectionId': 'users',
      'FaceMatchThreshold': 70,
      'Image': {
        'Bytes': bit
      },
      'MaxFaces': 1
    }, (err, data) => {
      console.log("AWS face data", data);
      if (err) {
        return res.send({error: 'Invalid face'});
      }
      if (data.FaceMatches.length === 0){
        return res.send({error: 'Invalid face'});
      }
      else {
        if (data.FaceMatches[0].Similarity) {
          let sim = data.FaceMatches[0].Similarity;
          console.log("similarty------------------", sim);
          datahelper.getUserByEmail("s@s").
          then((data) => {
            console.log("db matched user data", data[0]);
            let user = {
              user: data[0].email,
              id: data[0].id
            }
            return res.send(JSON.stringify(user));
          }).
          catch((err) => {
            return res.send({error: 'Invalid face'});
          })
        } else if (ata.FaceMatches[0].Similarity) {
          return res.send({error: 'Invalid face'});
        }
      }
    })
  })
  return router;
}

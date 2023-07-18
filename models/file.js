const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');

const fileSchema = new mongoose.Schema({
    originalname: {
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    mimetype: {
        type: String,
        required: true,
        minlength:5,
        maxlength:100
    },
    filename: {
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    }
  });
  
  const File = mongoose.model('File', fileSchema);

  function validateFile(file){
    const schema = Joi.object({
        originalname:Joi.string().min(5).max(100).required(),
        mimetype: Joi.string().min(5).max(100).required(),
        filename: Joi.string().min(5).max(100).required()
    });

    return schema.validate({
        originalname:file.originalname,
        mimetype:file.mimetype,
        filename:file.filename
    })
  }

  exports.File = File;
  exports.fileSchema = fileSchema;
  exports.validateFile = validateFile;
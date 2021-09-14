const fs = require('fs');
const path_ = require('path');
const fsPromises = fs.promises;
const util = require('util');
const AWS = require('aws-sdk');


class BaseStorageBackend {
    async save(file, path) {
        throw Error('not implemented');
    }

    async read(path) {
        throw Error('not implemented');
    }
}

class FileStorageBackend extends BaseStorageBackend {
    constructor(MEDIA_PATH) {
        super();
        this.MEDIA_PATH = MEDIA_PATH;
    }

    async save(file, path) {
        const _result = await file.mv(path_.resolve(this.MEDIA_PATH, path))
        return {
            name: file.name,
            mimetype: file.mimetype,
            uri: path_.resolve('/media', path),
        };
    }

    async read(path) {
        return await fsPromises.readFile(path);
    }
}

class S3StorageBackend extends BaseStorageBackend {
    constructor(){
        super();
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }

    async save(file, path) {
        const data = await fsPromises.readFile(file.tempFilePath)
        const params = {
            Bucket: 'project-messenger',
            Key: path,
            Body: data
        };
        const s3_data = await this.s3.upload(params).promise();
        return {
            name: file.name,
            mimetype: file.mimetype,
            uri: s3_data.Location,
        };
    }

    async read(path) {
        return null;
    }
}

module.exports = {
    FileStorageBackend,
    S3StorageBackend
};

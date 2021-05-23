const { v4: uuid } = require('uuid');
const appRoot = require('app-root-path');

exports.saveFilesToRoom = (roomId, files) => {
    const result = [];
    for (const fileKey in files) {
        const file = files[fileKey];
        const ext = file.name.split('.').pop();
        const newFileName = `${Date.now()}.${uuid()}.${ext}`;
        const uri = ['', 'media', roomId, newFileName].join('/');
        const absPath = `${appRoot}/src${uri}`;
        result.push({
            name: file.name,
            mimetype: file.mimetype,
            uri
        });
        file.mv(absPath);
    }
    return result;
};

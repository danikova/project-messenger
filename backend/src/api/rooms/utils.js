const { v4: uuid } = require('uuid');
const path = require('path');
const appRoot = require('app-root-path');

exports.saveFilesToRoom = async (roomId, files) => {
    const result = [];
    for (const fileKey in files) {
        try {
            const file = files[fileKey];
            const ext = file.name.split('.').pop();
            const newFileName = `${Date.now()}.${uuid()}.${ext}`;
            const uri = ['', 'media', roomId, newFileName].join('/');
            const absPath = path.join(appRoot.path, 'backend', 'src', uri);
            await file.mv(absPath);
            result.push({
                name: file.name,
                mimetype: file.mimetype,
                uri,
            });
        } catch {}
    }
    return result;
};

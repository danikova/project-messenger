const { v4: uuid } = require('uuid');
const path = require('path');
const { DEFAULT_STORAGE } = require('../../services/variables');
const { error } = require('../../services/colored.logger');

exports.saveFilesToRoom = async (roomId, files) => {
    const result = [];
    for (const fileKey in files) {
        try {
            const file = files[fileKey];
            const ext = file.name.split('.').pop();
            const newFileName = `${Date.now()}.${uuid()}.${ext}`;
            const data = await DEFAULT_STORAGE.save(
                file,
                path.join(roomId.toString(), newFileName),
            );
            result.push(data);
        } catch (err) {
            error(err);
        }
    }
    return result;
};

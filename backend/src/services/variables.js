const { FileStorageBackend, S3StorageBackend } = require('./storage.backends');
const path = require('path');
const appRoot = require('app-root-path');

const MEDIA_PATH = path.join(appRoot.path, 'backend', 'media');
const FRONTEND_PATH = path.join(appRoot.path, 'frontend', 'build');
const DEFAULT_STORAGE = process.env.AWS_ACCESS_KEY
    ? new S3StorageBackend()
    : new FileStorageBackend(MEDIA_PATH);

module.exports = {
    DEFAULT_STORAGE,
    MEDIA_PATH,
    FRONTEND_PATH,
};

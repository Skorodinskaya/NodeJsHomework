const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require('../configs/constants');
const {ErrorHandler, errorMessages} = require('../errors');
module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if(!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if(!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(errorMessages.NOT_SUPPORTED_FORMAT.message, errorMessages.NOT_SUPPORTED_FORMAT.status);
            }

            if(size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`${name}`+ errorMessages.FILE_TOO_BIG.message, errorMessages.FILE_TOO_BIG.status);
            }

        } catch (e) {
            next(e);
        }
    }
};

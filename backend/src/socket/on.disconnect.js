const { info } = require("../services/colored.logger");

module.exports = function (sc) {
    return async (data) => {
        info(`user disconnected: ${sc.socket.user._id}`);
        await sc.leaveAllRoom();
        sc.inActivateUser();
    };
};

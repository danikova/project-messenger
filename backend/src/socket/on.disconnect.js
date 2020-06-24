module.exports = function (sc) {
    return async (data) => {
        await sc.leaveAllRoom();
        sc.inActivateUser();
    };
};

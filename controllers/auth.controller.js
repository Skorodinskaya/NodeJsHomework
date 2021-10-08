module.exports = {
    loginController: (res, req) => {
        try {
            res.json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    }
};

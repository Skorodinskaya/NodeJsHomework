module.exports = {
    loginController: (req, res) => {
        try {
            res.json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    }
};

function requireAuth(req, res, next) {




    if (!req.session.uuid) {
        req.session.auth = false;

        res.redirect('/');

    }else{
        next();

    }
}



module.exports  = requireAuth;
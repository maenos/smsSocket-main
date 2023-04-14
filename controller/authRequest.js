
const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');
const user = db.user;
const bcrypt = require('bcrypt');
const saltRounds = 10;


async function hash(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function comparePasswords(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const auth = async (req, res) => {


    try {



        let username = req.body.userName;
        let password = req.body.userPassword;
        let plainpassword = password;

        password = await hash(password);

        if (req.body === undefined || req.body === '' || Object.keys(req.body).length == 1) {

            req.flash('error', '1');
            res.redirect('/');

        }


        if (username == '' || password == '') {
            req.flash('error', '1');
            res.redirect('/');
        }






        const [users, created] = await user.findOrCreate({
            where: { username: username },
            defaults: {
                username: username,
                password: password,
                uuid: uuidv4(),
                online:false
            }
        });
        if (created) {


            req.flash('error', '4');

            req.session.uuid = users.uuid;
            req.session.auth = true
            res.redirect('/users');

        } else {



            const match = await comparePasswords(plainpassword, users.password);

            if (match) {
                req.flash('error', '3');
                req.session.uuid = users.uuid;
                req.session.auth = true
                
                res.redirect('/users');
            } else {

                req.flash('error', '2');
              
                res.redirect('/');
            }



        }







    } catch (error) {
        console.log(error)
    }


}


module.exports = { auth };
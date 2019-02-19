var sql = require('../db/db');
var mail = require('./mail');

const User = {
    getAll: (req, res, next) => {
        sql.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({
            "status": 500,
            "error": error,
            "response": null
            }))
        } else {
            res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
            }))
        }
        });
    },

    getUser: (req, res, next) => {
        sql.query('SELECT * FROM users WHERE name=?', [req.params.name], (err, results, fields) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
        })
    },

    inscription: (req, res, next) => {
        var PostData = req.body;
        sql.query('SELECT * FROM users WHERE login=?, email=?', [PostData.login, PostData.email], (err, results, fields) => {
        if (results.length > 0) {
            res.send(JSON.stringify({
            "status": 500,
            "error": err,
            "response": 'user already exists'
            }))
        } else {
            let token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            let link = req.protocol + '://' + req.get('host') + '/api/users/verifyMail?name=' + PostData.name + '&token=' + token;
            if (!PostData.firstName || !PostData.lastName || !PostData.login || !PostData.password){
                res.send(JSON.stringify({
                    "status": 500,
                    "error": err,
                    "response": 'Infos are missing'
                    })) 
            }
            mail.inscription(link)
            PostData.token = token;
            sql.query('INSERT INTO users SET ?', PostData, (error, results, fields) => {
            if (error) throw error;
            res.send(JSON.stringify(results));
            })
        }
        })
    },

    verifyMail: (req, res, next) => {
        sql.query('SELECT token FROM users WHERE name=?', req.query.name, (err, results) => {
        if (results[0].token !== req.query.token){

            res.send(JSON.stringify({
            "status": 500,
            "error": err,
            "response": "L'url transmis ne correspond a rien. Deso Wola"
            }))

        } else {

            sql.query('UPDATE users SET validEmail=1 WHERE token=?', req.query.token, (error, results) => {
            if (error) throw error;
            res.send("User confirmed");
            })
        }
        })
    },

    deleteUser: (req, res, next) => {
        var DeleteData = req.body;
        sql.query('DELETE FROM users WHERE name=?', DeleteData.name, (error, results, fields) => {
        if (error) throw error;
        res.send(JSON.stringify(results));
        })
    }
}

module.exports = User;
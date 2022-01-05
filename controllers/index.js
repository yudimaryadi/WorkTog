router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    let data = {
        
        uname: req.body.uname,
        upass: req.body.upass
    }
    EncryptedUser.create(data)
        .then((result) => {
            res.redirect('/')
        })
        .catch((err) => {
            res.send(err)
        });
})
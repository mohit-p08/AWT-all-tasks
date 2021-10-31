const express = require('express');

const PORT = 5000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.render('profilepage');
});

app.post('/profilepage', (req, res) => {
    console.log(req.body);

    res.redirect('displayprofile');
});

app.post('/displayprofile', (req, res) => {
    console.log(req.body);

    res.render('displayprofile', {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        address: req.body.address,
        institute: req.body.institute,
        department: req.body.department,
        semester: req.body.sem,
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
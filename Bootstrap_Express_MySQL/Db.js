const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const hbs = require('express-handlebars');
require('dotenv').config();

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: '',
    database: process.env.DATABASE
})

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/db-insert-course', (req, res) => {
    res.render('addCourse.hbs', { status: '' });
});

app.post('/db-insert-course', async (req, res) => {
    const { courseId, courseName, deptName, instName, uniName } = req.body;
    console.log(req.body);
    var inst = "";
    instName.map((uni) => {
        inst = inst + uni + "  ";
    })
    console.log(inst);
    await con.query(`insert into courses (course_id, course_name, institute_name, dept_name, uni_name) values ("${courseId}", "${courseName}", "${inst}", "${deptName}", "${uniName}");`, (err, result) => {
        if (err) {
            res.render('addCourse.hbs', { status: 'Error Occured' })
        } else {
            res.render('addCourse.hbs', { status: 'Created successfully' })
        }
    });
});

app.get('/get-courses', async (req, res) => {
    await con.query('select * from courses', (err, result) => {
        res.render('getCourse.hbs', { data: result });
    });
});

app.get('/db-edit-course/:id', async (req, res) => {
    await con.query(`select * from courses where id=${req.params.id}`, (err, result) => {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.render('editCourse.hbs', { course: result[0] });
        }
    })
});

app.post('/db-edit-course/:id', async (req, res) => {
    const { courseId, courseName, deptName, instName, uniName } = req.body;
    console.log(req.body);
    var inst = "";
    instName.map((uni) => {
        inst = inst + uni + "  ";
    })
    console.log(inst);
    await con.query(`update courses set course_id = "${courseId}", course_name = "${courseName}", dept_name = ${deptName}, institute_name = "${inst}", uni_name = ${uniName} where id=${req.params.id};`, (err, result) => {
        console.log(result);
        res.redirect('/get-courses');
    });
});

app.get('/db-delete-course/:id', async (req, res) => {
    await con.query(`delete from courses where id = ${req.params.id};`, (err, result) => {
        res.redirect('/get-courses');
    })
});

app.listen(3232, () => {
    console.log('server running on port 3232');
});

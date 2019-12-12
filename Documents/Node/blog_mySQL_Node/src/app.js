const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');



// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');

const db = mysql.createConnection({         // info in 'session' tab
    host:'127.0.0.1',                       // in Workbench
    user: 'root',
    password: 'password',
    port: 3306,             //mySQL port
    database: 'BlogTables'
});

db.connect((err) => {
    if(err) {
        console.log(err); 
    } else{
        console.log('MySQLBlog Connected');  
    }
})

app.get('/', (req, res) => {
    let object= []
        
    
    db.query("SELECT * FROM posts", (err, result) => {
        result.forEach(element => {                         //creates object for each post with empty array for comments
            object.push({
                post:element,
                comments: []
            });    

            object.forEach(post => {
                console.log(post)
            });
        });
        

    db.query("SELECT * FROM comments", (err, result) => {
        for (let i = 0; i < object.length; i++) {                       // cycles through array of posts
            result.forEach(element => {                                 // assigns comments to correct posts
                if(element.post_id == object[i].post.id){
                    object[i].comments.push(element)
                }  
            });
                        
        }
        

        if (err){
            console.log("error in query while retreving posts");  
        } else{
            
            res.render('index', {                       
                data:object
            })  
        }
    })
    })
});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err){
            console.log("error in query while retreving table");  
        } else{
            res.render('users', {                       
                data:result
            })  
        }
    })
});

// app.get('/post', (req, res) => {
//     db.query("SELECT * FROM posts", (err, result) => {
//         if (err){
//             console.log("error in query while retreving table");  
//         } else{
//             res.render('users', {                       
//                 post:result
//             })  
//         }
//     })
// });

app.get('/register', (req, res) =>{         // reroutes to register page, once submit button pressed
    res.render(
        'register'
    )
})

app.get('/post', (req, res) =>{         // reroutes to posts page, once submit button pressed
    res.render(
        'post'
    )
})

app.get('/comment', (req, res) =>{         // reroutes to posts page, once submit button pressed
    res.render(
        'comment'
    )
})

app.post('/register', (req, res) => {
    const name = req.body.theUserName;
    const email = req.body.theUserEmail;

    let sql = 'INSERT INTO users SET user_name = ?, email = ?';          // sequence of variables has to match the array (? used for security reasons)
    let user = [name, email];

    let sqlEmailCheck = 'SELECT email FROM users WHERE email = ?'           // looks to see if an email exists that = an exiting email

    db.query(sqlEmailCheck, email, (err, result) => {          // returns array of result
        if(err){
            console.log("Error code: " + err);
        } else {
            if (result.length > 0) {                                        // if array has any content - the email exists already and isn't re-added
                res.send('<h1>Sorry, That email has been taken!</h1>')
            } else {
                db.query(sql, user, (err, result) => {          // adds entry to db, if it is a unique email address
                    if(err){
                        console.log("Error code: " + err);
                    } else {
                        res.send(
                            '<h1>User Registered</h1>'
                        )
                    }
                })
            }
        }
    });
});

app.post('/post', (req, res) => {
    const postContent = req.body.postContent;
    const userId = req.body.userId;
    const title = req.body.title;
    const method = req.body._method;

    let sql = 'INSERT INTO posts SET content = ?, user_id = ?, title = ?';          // sequence of variables has to match the array (? used for security reasons)
    let user = [postContent, userId, title];

    let sqlUserCheck = `SELECT id FROM users WHERE id = ?` 

    db.query(sqlUserCheck, userId, (err, result) => {          // compares entered user id to user ids registered on user table
        
        if(err){
            console.log("Error code: " + err);
        } else {
            if (result.length == 1) {   
                if(method == 'PUT'){
                    db.query(sql, user, (err, response)=>{
                        if(err){
                            console.log('There is an error in your query ' + err);
                            
                        } else{
                            res.send(
                                '<h1>Post Registered</h1>'
                            )
                        }
                    })
                }
                }else {                                    // if id exists - the post isn't added
                res.send('<h1>Sorry, That ID is not registered!</h1>')
            }
        }
    })
 
    // db.query("SELECT * FROM posts", (err, result) => {
    //     if (err){
    //         console.log("error in query while retreving table");  
    //     } else{
    //         res.render("post", {                       
    //             post:result
    //         })  
    //     }
    // })
});

app.post('/comment', (req, res) => {
    const userCommentId = req.body.userCommentId;
    const userCommentCont = req.body.userCommentCont;
    const commentPostId = req.body._commentPostId;

    let sqlUserCheck = `SELECT id FROM users WHERE id = ?`;

    let sql = 'INSERT INTO comments SET content = ?, user_id = ?, post_id = ?';          // sequence of variables has to match the array (? used for security reasons)
    let user = [userCommentCont, userCommentId, commentPostId];

    db.query(sqlUserCheck, userCommentId, (err, result) => {          // compares entered user id to user ids registered on user table
        if(err){
            console.log("Error code: " + err);
        } else {
            if (result.length == 1){ 
                db.query(sql, user, (err, response)=>{
                    if (err) {
                        console.log('There is an error in your query ' + err);
                    }else{
                        res.send('<h1>Post Registered</h1>')
                    }
                    
                })
            }
        }
    })
})



app.listen(3001, ()=> {
    console.log("Server is running");
})

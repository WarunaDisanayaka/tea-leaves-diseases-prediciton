import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const app= express();
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["POST","GET","PUT","DELETE"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());

// Database connection
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

});

con.connect(function(err){
    if (err) {
        console.log("Error in Connection",err);
    }else{
        console.log("Connected");
    }
});

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.json({Error:"You are no Authenticated"})
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decode)=>{
            if (err) return res.json({Error:"Token wrong"});
            next();
        })
    }
}

app.get('/dashboard',verifyUser,(req,res)=>{
    return res.json({Status:"Success"})
})


// Login API
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE username=? OR email=?";
    const { username, email, password } = req.body;

    con.query(sql, [username, email], (err, result) => {
        if (err) {
            return res.json({ Error: "Error in Server" });
        }

        if (result.length > 0) {
            // Check the password by comparing the hashed password in the database
            const storedPassword = result[0].password;

            bcrypt.compare(password, storedPassword, (bcryptErr, bcryptRes) => {
                if (bcryptErr) {
                    return res.json({ Error: "Error in password comparison" });
                }

                if (bcryptRes) {
                    // Passwords match; create and send a JWT token
                    const id = result[0].id;
                    const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Status: "Error", Error: "Invalid password" });
                }
            });
        } else {
            return res.json({ Status: "Error", Error: "User not found" });
        }
    });
});


app.get('/logout',(req,res)=>{
   res.clearCookie('token');
   return res.json({Status:"Sucess"})
});

  app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM VoterInformation WHERE id = ?";
    con.query(sql,[id],(err,result)=>{
        if (err) return res.json({Error:"Get employee error in sql"});
        return res.json({Status:"Success",Result:result});
    })
})


// Define an endpoint to retrieve data from the database
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM production';
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  app.post('/register', (req, res) => {
    const { username, email, phone, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.json({ Status: "Error", Error: "Password and Confirm Password do not match" });
    }

    // Check if the email is already in use
    const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
    con.query(checkEmailQuery, [email], (emailCheckError, emailCheckResult) => {
        if (emailCheckError) {
            return res.json({ Status: "Error", Error: "Error in Database", DatabaseError: emailCheckError.message });
        }
        if (emailCheckResult.length > 0) {
            return res.json({ Status: "Error", Error: "Email is already in use" });
        }

        // Hash the password before storing it in the database
        bcrypt.hash(password, 10, (hashError, hashedPassword) => {
            if (hashError) {
                return res.json({ Status: "Error", Error: "Error hashing password" });
            }

            // Insert the user's information into the database
            const insertUserQuery = "INSERT INTO user (username, email, phone, password) VALUES (?, ?, ?, ?)";
            const values = [username, email, phone, hashedPassword];

            con.query(insertUserQuery, values, (insertError, insertResult) => {
                if (insertError) {
                    console.error('Database Error:', insertError);
                    return res.json({ Status: "Error", Error: "Error in Database", DatabaseError: insertError.message });
                } else {
                    return res.json({ Status: "Success", Message: "Registration successful" });
                }
            });
        });
    });
});


app.post('/savePrediction', verifyUser, (req, res) => {
  const {predictedDisease, remedy, duration } = req.body;

  const sql = "INSERT INTO predicted_diseases (predicted_disease, remedy, duration) VALUES (?, ?, ?)";
  const values = [predictedDisease, remedy, duration];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.json({ Status: "Error", Error: "Error in Database", DatabaseError: err.message });
    } else {
      return res.json({ Status: "Success", Message: "Prediction data saved successfully" });
    }
  });
});
  

// Add a new endpoint to retrieve prediction data
app.get('/getPredictions', verifyUser, (req, res) => {
  const sql = "SELECT * FROM predicted_diseases"; // Adjust the query as needed

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.json({ Status: "Error", Error: "Error in Database", DatabaseError: err.message });
    } else {
      return res.json({ Status: "Success", Result: result });
    }
  });
});


// Contact form submission endpoint
app.post('/contactUs',verifyUser, (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
  const values = [name, email, subject, message];

  con.query(sql, values, (err, result) => {
      if (err) {
          console.error('Database Error:', err);
          return res.json({ Status: 'Error', Error: 'Error in Database', DatabaseError: err.message });
      } else {
          return res.json({ Status: 'Success', Message: 'Your message has been sent successfully!' });
      }
  });
});

// Server starting
app.listen(8081,()=>{
    console.log("Running");
});
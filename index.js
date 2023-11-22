// To connect with your mongoDB database
const mongoose = require('mongoose');
const m=require('./Module');
const m1=new m();
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://cyber0bravo:%40123%40krishna@anonymous.kd2th5b.mongodb.net/yourDB-name?retryWrites=true&w=majority', {

	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log('Connected to yourDB-name database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
var text="";

app.get("/", (req, resp) => {

	resp.send(text);
	// You can check backend is working or not by
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});
app.post("/sendMail", (req,res) =>{
	let Sender='cyber0bravo@gmail.com';
	let psw='wbgbgxszpddnpbvu';
	

User.find( function(err,docs){
	var Sendmails=[];
	if(err){
		res.send(err);
	}else{
		for (let i = 0; i <docs.length; i++) {
			let obj=docs[i];

			text='<h1>Hello, '+obj.name+'</h1><br/>'+
	'<p> This is message '+req.body.msg+'</p><br/>Sending time '+req.body.time+'<br/>Sending Date '+req.body.date;

			let result=m1.PrintData(Sender,obj.email,req.body.sub,text,psw);
			if(result === true){
				Sendmails.push(obj.email);
			}
		  }
	}
	res.send(Sendmails);
})

});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);

		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.get("/display", (req,res) =>{
	
User.find( function(err,docs){
	var mails_Info=[];
	if(err){
		res.send(err);
	}else{
		for (let i = 0; i <docs.length; i++) {
			mails_Info.push({name: docs[i].name , email: docs[i].email});
		  }
		  
	}
	res.send(mails_Info);
	
});
});

app.listen(5000);

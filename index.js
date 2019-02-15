const express = require("express");
const app = express();
const body_parser = require('body-parser');
const urlencoded_parser = body_parser.urlencoded({extended:false});
var Client = require('node-rest-client').Client;
var client = new Client();
app.set('view engine','ejs');

app.get('/displayall',(req,res)=>{
    client.get("http://3.17.147.3:3500/products", function (data, response) {
        //console.log(data)
        res.render('allresults.ejs',{search:data});
    });
});

app.get('/delete',(req,res)=>{
    _id = req.query.id;
    client.delete("http://3.17.147.3:3500/products/"+_id, function (data, response) {
        //console.log(response)
        res.redirect('/displayall');
    });
});

app.post('/addproducts',urlencoded_parser,(req,res)=>{
    ppname = req.body.pname;
    pprice = req.body.price;
    pstock = req.body.stock;
    var args = {
        data: { name: ppname, price:pprice, stock:pstock },
        headers: { "Content-Type": "application/json" }
    };
    
    client.post("http://3.17.147.3:3500/products", args, function (data, response) {
        // parsed response body as js object
        //console.log(data);
        res.redirect('/displayall');
        // raw response
        //console.log(response);
    });
});

app.get('/edit',(req,res)=>{
    _id = req.query.id;
    client.get("http://3.17.147.3:3500/products/"+_id, function (data, response) {
        //console.log(data)
        res.render('updatecontact.ejs',{search:data});
    });
});

app.post('/finalupdate',urlencoded_parser,(req,res)=>{
    ppname = req.body.pname;
    pprice = req.body.price;
    pstock = req.body.stock;
    pid = req.body.productid;
    var args = {
        data: { name: ppname, price:pprice, stock:pstock },
        headers: { "Content-Type": "application/json" }
    };
    
    client.put("http://3.17.147.3:3500/products/"+pid, args, function (data, response) {
        // parsed response body as js object
        console.log(data);
        res.redirect('/displayall');
        // raw response
        //console.log(response);
    });
});


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});



app.listen(8088);

/* 

var Client = require('node-rest-client').Client;

var client = new Client();

// direct way
client.get("http://3.17.147.3:8080/products", function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
});

// registering remote methods

client.registerMethod("jsonMethod", "http://3.17.147.3:8080/products/2", "GET");

client.methods.jsonMethod(function (data, response) {
	console.log("***************** Indirect Way ****************");
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
});

var Client = require('node-rest-client').Client;

var client = new Client();

// set content-type header and data as json in args parameter
var args = {
    data: { name: "Ann Oliver", phone: "00353 77665544" },
    headers: { "Content-Type": "application/json" }
};

client.post("http://3.17.147.3:8080/products", args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
});

//PUT

args = {
    data: { name: "Charlene O'Dean", phone: "00353 888999" },
    headers: { "Content-Type": "application/json" }
};

client.put("http://3.17.147.3:8080/products/5", args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    // raw response
    //console.log(response);
});*/
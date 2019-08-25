var express = require("express")
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var home_image = [
		{tag:"farm", name: "Morning sun and grass", image: "https://drive.google.com/uc?id=1XeQRBMFsipIahRwqWimSyLGf2UdqI_zb"},
		{tag:"farm", name: "Orange Blossom", image: "https://drive.google.com/uc?id=1M6RmMCsJ28_7UuABTX5SkeJBEXafluJO"},
		{tag:"farm", name: "Morning dew", image: "https://drive.google.com/uc?id=14R4BdDsHTaarwi8Yi9RscjA5CEpPycfo"},
		{tag:"farm", name: "Orange", image: "https://drive.google.com/uc?id=1fkskORoeY-98u8D7yrRm9Aqhz70cfiXR"},
		{tag:"farm", name: "Fresh Grass", image: "https://drive.google.com/uc?id=15FsxNxBZLReT2Y3CBruk_BmFMKpf1e9Y"},
		{tag:"farm", name: "Fresh Grass2", image: "https://drive.google.com/uc?id=1cVek3Hj5THe3Hu0yXVoMymp422eeDXZj"},
		{tag:"farm", name: "Flower", image:"https://drive.google.com/uc?id=1PU90-gBq_VCxqBRK1c2TZW2rYJSUq5sY"},
		{tag:"cafe", name: "Cozy and colorful cafe", image:"https://drive.google.com/uc?id=1am2GyAiUNaH5ZPT8rfqS0NqOCdBLq2qS"},
		{tag:"cafe", name: "Professional Barista", image:"https://drive.google.com/uc?id=1j9Cvk745Dr5eB33zjQf65VW28AI5wp7P"},
		{tag:"cafe", name: "Hot and Iced Coffee", image:"https://drive.google.com/uc?id=1xdZcqjMcWtI0qvGV6a_IYPYbSuQn2Vxv"},
		{tag:"cafe", name: "Fresh fruit and vegetable juice", image: "https://drive.google.com/uc?id=1iE9cY5m0CoHpQV5mppAxK0C88LcCgPpq"},
		{tag:"cafe", name: "Homemade Pasta with locally produced flour", image: "https://drive.google.com/uc?id=19b-W9qBYc_rLH9WATJzGBX2hNB6yBdAW"},
		{tag:"cafe", name: "Lunch of the day", image: "https://drive.google.com/uc?id=1n9SI9tXxYuva2kwljRH6S5mKxjTmeV7J"},
		{tag:"cafe", name: "One cake a day, keep bikini body away", image: "https://drive.google.com/uc?id=1kRQbjanUu2m1oHniNtaZbXrciBvQrond"},
		{tag:"cafe", name: "Irresistible simple chocolate cake", image: "https://drive.google.com/uc?id=1MTHCU8t-_KRV7L8zb0cik4AsRZr9n8w8"},
		{tag:"cafe", name: "New!!! Summer Fruit Jelly", image: "https://drive.google.com/uc?id=1O3FfnbihRZsXipYaKgoZzQtz32117U8z"}
	]

var products = [
	{id: 1, order: 0, stock: 10, name: "Orange 350 Baht/Box" , price: "350" , image: "https://drive.google.com/uc?id=1OaNNE2e5gQk9HnvAogOTFxhGkeq2YdZW", 
	 att: "Designed by lifeforstock / Freepik"},
	{id: 2, order: 0, stock: 10, name: "Pineapple 250 Baht/Box" , price: "250", image: "https://drive.google.com/uc?id=14yJHdEmNX1fLvsLdEWYk2jGVfon3bxkD", 
	 att: "Designed by dashu83 / Freepik"},
	{id: 3, order: 0, stock: 10, name: "Strawberry 350 Baht/Box" , price: "350", image: "https://drive.google.com/uc?id=14h1UOSIO-Gp9-C7DGLzNSYzwQwJYo_o0", 
	 att: "Designed by Valeria_Aksakova / Freepik"},
	{id: 4, order: 0, stock: 10, name: "Grape: Red and White 260 Baht/Box" , price: "260", image: "https://drive.google.com/uc?id=1aKGn7wbH0DU964VoA-8hBJAJZvvZeIqd", att: "Designed by jannoon028 / Freepik"},
	{id: 5, order: 0, stock: 10, name: "Low Sugar Jam 180 Baht/Jar" , price: "180", image: "https://drive.google.com/uc?id=1IMV8TxypLrOUL3AlBV8d5RHvLj4Tt18L", 
	 att: "Designed by Freepik"},
	{id: 6, order: 0, stock: 10, name: "Sun-Dried Raisin 350 Baht/Pack" , price: "350", image: "https://drive.google.com/uc?id=1S2R-m3tEB6sqIyr4vUT94YL28IqjKimf", att: "Designed by topntp26 / Freepik"},
	{id: 7, order: 0, stock: 10, name: "Organic Wine 800 Baht/Bottle" , price: "800", image: "https://drive.google.com/uc?id=1_NiSdF0YgqrmFMlfNLV5vZtip4cXmsS0", 
	 att: "Designed by Freepik"},
	{id: 8, order: 0, stock: 10, name: "Mixed Rice 250 Baht/Pack" , price: "250", image: "https://drive.google.com/uc?id=1tgxM9124UVtARypjrUx0bkALyORR3h2c", 
	 att: "Designed by rawpixel.com / Freepik"},
	{id: 9, order: 0, stock: 10, name: "Heart-Shaped Herb Extract 2,000 Baht/Bottle" , price: "2000",image: "https://drive.google.com/uc?id=1VRE2aYiHS3Kg6DALgqU42RoBxTzRYGXF", att: "Designed by Freepik"}
	
]

app.get("/", function(req,res){
	res.render("home.ejs", {home_image:home_image});
});

app.get("/farm", function(req,res){
	var farm_map = {name:"Map", image: "https://drive.google.com/uc?id=1iOYoHN669h_dlxILKHTzuqOSuW1FNX1w"}
	res.render("farm.ejs", {farm_map:farm_map});
});

app.get("/cafe", function(req,res){
	 var farm_map = {name:"Map", image: "https://drive.google.com/uc?id=1iOYoHN669h_dlxILKHTzuqOSuW1FNX1w"}
	res.render("cafe.ejs", {home_image:home_image, farm_map:farm_map, });
});

app.get("/onlineorder", function(req,res){
	res.render("onlineorder.ejs", {products:products});
});

app.get("/visit", function(req,res){
	res.render("visit.ejs");
});

app.listen(3000, process.env.IP, function(){
	console.log("Listen to port 3000");
});
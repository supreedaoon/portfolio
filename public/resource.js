var img = {};

// list of images and related information 

img.home_image = [
		{tag:"farm", name: "Morning sun and grass", image: "https://drive.google.com/uc?id=1dRz1V6mmqg8R8mMlrlW_WtSvFE5XIJAw"},
		{tag:"farm", name: "Morning dew", image: "https://drive.google.com/uc?id=1V5SUSRFavMkNjXH-NZqry2PgXAEZMTPJ"},
		{tag:"farm", name: "Fresh Grass", image: "https://drive.google.com/uc?id=1nYkSVpQNIRKCFOvzQgQUbV_5vZM9-hZ4"},
		{tag:"farm", name: "Orange Blossom", image: "https://drive.google.com/uc?id=15-aHecBVE2S7CJS-5WFa1fpDQyWEO-yF"},
		{tag:"farm", name: "Orange", image: "https://drive.google.com/uc?id=15ci5gLmbWuPlh66obt03V5jM_4kHx15S"},
		{tag:"farm", name: "Fresh Grass2", image: "https://drive.google.com/uc?id=1KgVFI9Fbh-qtYpmXJIPe7Dx4gvvx3G5H"},
		{tag:"farm", name: "Flower", image:"https://drive.google.com/uc?id=1wW6aqUVeeXeuYFb97aFZKfq_ISylSwry"},
		{tag:"cafe", name: "Cozy and colorful cafe", image:"https://drive.google.com/uc?id=1B65wPFmlfy6iP_k99BXFPngkA0VBMAmz"},
		{tag:"cafe", name: "Hot and Iced Coffee", image:"https://drive.google.com/uc?id=1OZ2e-ZbDZEMhA26N3CSUol9AELIjBgEA"},
		{tag:"cafe", name: "Fresh fruit and vegetable juice", image: "https://drive.google.com/uc?id=1MrQixy20RePWQC7kKjHUGXvGE5iUayGZ"},
		{tag:"cafe", name: "Professional Barista", image:"https://drive.google.com/uc?id=1jnr2CYQ3TtM7vv8MBlYv3EtL-BZyc4nm"},
		{tag:"cafe", name: "Homemade Pasta with locally produced flour", image: "https://drive.google.com/uc?id=138zUpW1WPUoootY6d-2ACqTX0E_tfVAn"},
		{tag:"cafe", name: "One cake a day, keep bikini body away", image: "https://drive.google.com/uc?id=1_tLdFKLMkOKjzM6gF05lp80e5G0RDXx1"},
		{tag:"cafe", name: "Irresistible simple chocolate cake", image: "https://drive.google.com/uc?id=1WuYoLU4bx49jHSYBdW3stmyln0UMK7An"},
		{tag:"cafe", name: "New!!! Summer Fruit Jelly", image: "https://drive.google.com/uc?id=1cgd3OGcFWMQXc6KYb6BfARkhncRqXYf_"}
		
	];
img.products = [
	{index: 0, name: "Sokovian Orange" , price: "350" , image: "https://drive.google.com/uc?id=1hxumjnYKtA1VBLFTL9DzFnYQK6d7xnti", 
	 att: "Designed by lifeforstock / Freepik", desc:"Orange is the happiest color.", author:"Frank Sinatra" },
	{index: 1, name: "Wakandan Pineapple" , price: "250", image: "https://drive.google.com/uc?id=1ZwUyqa3FX031JEC3-OkvuaJEqu3joa6l", 
	 att: "Designed by dashu83 / Freepik" , desc:"When life gives you lemons, sell them and buy a pineapple. How to better your life 101", author:"Davin Turney"},
	{index: 2, name: "Area-51 Strawberry" , price: "350", image: "https://drive.google.com/uc?id=1K3EnYKdYhKgb48K6AxBLn42zkvVweBZi", 
	 att: "Designed by Valeria_Aksakova / Freepik", desc:"Reunited with strawberry, raspberry and blueberry, I am berry, berry happy to be back working with JELL-O", author:"Bill Cosby"},
	{index: 3, name: "Dionysus Grape" , price: "260", image: "https://drive.google.com/uc?id=1QczPdwI5N20E1tOAGOTspbEt_Xkse0OU", att: "Designed by jannoon028 / Freepik", desc:"The juice of the grape is the liquid quintessence of concentrated sunbeams", author:"Thomas Love Peacock"},
	{index: 4, name: "Jotunheimian Jam" , price: "180", image: "https://drive.google.com/uc?id=1baSrjgrGyqr8idGlg80QQEw_bcgxCRPL", 
	 att: "Designed by Freepik", desc:"When I'm in the mood for room service, my favorite order is a peanut-butter-and-jelly sandwich", author:"Pharrell Williams"},
	{index: 5, name: "Alfheimian Raisin" , price: "350", image: "https://drive.google.com/uc?id=1nnTQBMh4FxWKGgX1D8YL5lmbSAw7jsMW", att: "Designed by topntp26 / Freepik", desc:"Acting in Star Wars, I felt like a raisin in a giant fruit salad, and I didn't even know who the cantaloupes were", author:"Mark Hamill"},
	{index: 6, name: "Asgardian Wine" , price: "800", image: "https://drive.google.com/uc?id=1O9gHsKzsQsUXFPaL7hpFFkGQLI98qZc1", 
	 att: "Designed by Freepik", desc:"Where there is no wine there is no love", author:"Euripides"},
	{index: 7, name: "Midgardian Rice" , price: "250", image: "https://drive.google.com/uc?id=1C_JlQZW_thZP_1eQjQluSTcqTJUgnWsy", 
	 att: "Designed by rawpixel.com / Freepik", desc:"If you give me rice, I'll eat today; if you teach me how to grow rice, I'll eat every day", author:"Mahatma Gandhi"},
	{index: 8, name: "Heart-Shaped Herb Extract" , price: "2000",image: "https://drive.google.com/uc?id=1hYyub2xL9lJp7amCld6sVcpnJc_tGWNK", att: "Designed by Freepik", desc:"Yibambe Yibambe Yibambe!!!", author:"Wakandan Warriors"}
];

module.exports = img;
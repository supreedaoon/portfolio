var img = {};

// list of images and related information 

img.home_image = [
		{tag:"farm", name: "Morning sun and grass", image: "https://drive.google.com/uc?id=1gDLAmf7fA1qHwb0bmhDZBzTjXjK1V5Th"},
		{tag:"farm", name: "Morning dew", image: "https://drive.google.com/uc?id=1Yj7g8AadFPlmI5NrotZ-LXCVhCQhDPk2"},
		{tag:"farm", name: "Fresh Grass2", image: "https://drive.google.com/uc?id=127cL7cqgGJsp7Fx1kXivwwhtF172zhYM"},
		{tag:"farm", name: "Orange Blossom", image: "https://drive.google.com/uc?id=1dbMD1gUrKMmNBcpfhoxSSnpnclu7_Idk"},
		{tag:"farm", name: "Orange", image: "https://drive.google.com/uc?id=13PV3N_6fM-jp_Jz9ycR76Tg0yo6uTs_v"},
		{tag:"farm", name: "Fresh Grass", image: "https://drive.google.com/uc?id=1oVVwo9nK7-XqbDxsp8XLu2Cq9dMhw5Nx"},
		{tag:"farm", name: "Flower", image:"https://drive.google.com/uc?id=1CzB3-G5IMJDqVg8PsJWD5Fm24zP6z491"},
		{tag:"cafe", name: "Cozy and colorful cafe", image:"https://drive.google.com/uc?id=10TJqmwJwHI2tMrYt0kegerrzgPQ_mG1z"},
		{tag:"cafe", name: "Hot and Iced Coffee", image:"https://drive.google.com/uc?id=152qU3aT1J60PX7gqZ9I9PnikRgUrJice"},
		{tag:"cafe", name: "Fresh fruit and vegetable juice", image: "https://drive.google.com/uc?id=1LhtqoQMLx9xRU9Hth0FBed_TDSz_ydw-"},
		{tag:"cafe", name: "Professional Barista", image:"https://drive.google.com/uc?id=1Z9dUu4LXI6Uxj_vT007y2wGtodfgfof9"},
		{tag:"cafe", name: "Homemade Pasta with locally produced flour", image: "https://drive.google.com/uc?id=1R8IA7NqzDdkhSNCEgQbJeMCxwiRZPceL"},
		{tag:"cafe", name: "One cake a day, keep bikini body away", image: "https://drive.google.com/uc?id=16ESkyCN4YGYhtrwcnsSWmeHAGrYak_3K"},
		{tag:"cafe", name: "Irresistible simple chocolate cake", image: "https://drive.google.com/uc?id=1suDpw4L01Oc18RF_wHvJ0R77Mk-MHkLM"},
		{tag:"cafe", name: "New!!! Summer Fruit Jelly", image: "https://drive.google.com/uc?id=1CDtKLCjQmi7Bzli87pmWhpAAAgM5rnyK"}
		
	];
img.products = [
	{index: 0, name: "Sokovian Orange" , price: "350" , image: "https://drive.google.com/uc?id=1c3jqVVaNJd9w7i8YjRKIQtRdxoEwkycG", 
	 att: "Designed by lifeforstock / Freepik", desc:"Orange is the happiest color.", author:"Frank Sinatra" },
	{index: 1, name: "Wakandan Pineapple" , price: "250", image: "https://drive.google.com/uc?id=1K-XOe2Al3djBptFxwEALOqlGuKzdDLjo", 
	 att: "Designed by dashu83 / Freepik" , desc:"When life gives you lemons, sell them and buy a pineapple. How to better your life 101", author:"Davin Turney"},
	{index: 2, name: "Area-51 Strawberry" , price: "350", image: "https://drive.google.com/uc?id=1e_r5mjQFUKyhCemc7RLdonBPaTslnqTu", 
	 att: "Designed by Valeria_Aksakova / Freepik", desc:"Reunited with strawberry, raspberry and blueberry, I am berry, berry happy to be back working with JELL-O", author:"Bill Cosby"},
	{index: 3, name: "Dionysus Grape" , price: "260", image: "https://drive.google.com/uc?id=15-Rgua90ScXG2XoTiAF6Ny-VC-jUuVE0", att: "Designed by jannoon028 / Freepik", desc:"The juice of the grape is the liquid quintessence of concentrated sunbeams", author:"Thomas Love Peacock"},
	{index: 4, name: "Jotunheimian Jam" , price: "180", image: "https://drive.google.com/uc?id=1eZlVOi5V5kuYBWbXgxppBlxxE0TDTN8p", 
	 att: "Designed by Freepik", desc:"When I'm in the mood for room service, my favorite order is a peanut-butter-and-jelly sandwich", author:"Pharrell Williams"},
	{index: 5, name: "Alfheimian Raisin" , price: "350", image: "https://drive.google.com/uc?id=1qhfISip9PwtaordaooVzbxRAHs_pv3Sz", att: "Designed by topntp26 / Freepik", desc:"Acting in Star Wars, I felt like a raisin in a giant fruit salad, and I didn't even know who the cantaloupes were", author:"Mark Hamill"},
	{index: 6, name: "Asgardian Wine" , price: "800", image: "https://drive.google.com/uc?id=19Rva-6hOc8IIAtyoYPbf8c1l4vRkBHfG", 
	 att: "Designed by Freepik", desc:"Where there is no wine there is no love", author:"Euripides"},
	{index: 7, name: "Midgardian Rice" , price: "250", image: "https://drive.google.com/uc?id=1hBnkLEezl3yCr4sYG_PnZ-6jyenuqjmw", 
	 att: "Designed by rawpixel.com / Freepik", desc:"If you give me rice, I'll eat today; if you teach me how to grow rice, I'll eat every day", author:"Mahatma Gandhi"},
	{index: 8, name: "Heart-Shaped Herb Extract" , price: "2000",image: "https://drive.google.com/uc?id=1hYyub2xL9lJp7amCld6sVcpnJc_tGWNK", att: "Designed by Freepik", desc:"Yibambe Yibambe Yibambe!!!", author:"Wakandan Warriors"}
];

module.exports = img;
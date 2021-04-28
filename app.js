var context;
var shape = new Object();
var USERS = {
	//username:password
	"bob":"asd1234",
	"bob2":"bob",
	"bob3":"ttt",
	"k":"k"	
}
$(document).ready(function() {
	context=canvas.getContext("2d");
	strik_music = document.getElementById( "targetSound" );
	game_music=document.getElementById( "game_music" );
//-------------------------------------------------------LOGIN-------------------------------------------------------
	$("#contact_form_login").validate({
		// Specify validation rules
		rules: {
			n_loginName: {
				required: true,
			},
			n_loginPassword: {
				required: true,
				validateUseraccount: true
			}
		},
		messages: {
			n_loginName: {
				required: "Username is messing."
			},
			n_loginPassword: {
				required: "Password Username is messing.",
				validateUseraccount: "Username or password is not valid."
			}
		},
		submitHandler: function () {
			randomSetting();
			Login();
			let form = $("#contact_form_login");
			form[0].reset();
		}
		});
	
//-------------------------------------------------------SINGUP-------------------------------------------------------
	$("#contact_form_singup").validate({
		// Specify validation rules
		rules: {
			n_singUpName: {
			required: true,
			lettersonly: true
			},
			n_singUpLastName: {
				required: true,
				lettersonly: true
			},
			n_singUpUserName:{
				required: true,
				validateUserName: true
			},
			n_singUpEmail: {
				required: true,
				// Specify that email should be validated
				// by the built-in "email" rule
				email: true
			},
			n_singUpPassword: {
				required: true,
				minlength: 6,
				pwcheck: true
			}
		},
		messages: {
			n_singUpName: {
				required: "Please enter valid name.",
				lettersonly: "letter only."
			},
			n_singUpLastName: {
				required: "Please enter valid last name.",
				lettersonly: "letter only."
			},
			n_singUpUserName: {
				required: "Please enter a Username.",
				validateUserName:"try new user name this one has taken"
			},
			singUpEmail: {
				required: "Please enter an email address.",
				email: "Please enter a valid email."
			},
			n_singUpPassword: {
				required: "Please enter a password.",
				pwcheck:"tye new one "
			}
		},
		submitHandler: function() {
			singeUp();
			let form = $("#contact_form_singup");
			form[0].reset();	},
		
	});
//-------------------------------------------------------GAME_SETTING_FORM-------------------------------------------------------

	$("#form_Game_settings").validate({
		rules: {
			setting_b_right: {
				notEqualTo: ['#setting_b_down',"#setting_b_left","#setting_b_up"]
			},
			setting_b_up: {
				notEqualTo: ['#setting_b_down',"#setting_b_left"]
			},
			setting_b_down: {
				notEqualTo: ["#setting_b_left"]
			},
		
		},

		submitHandler: function () {
			show_func('game_mode');
			Start();
		}
	});
});
//-------------------------------------------------------MORE-RULES-------------------------------------------------------

$(function() {
	jQuery.validator.addMethod('pwcheck', function(value,element) {
		return this.optional(element) || /\d/.test(value) &&/[a-z]/i.test(value);
		});
	jQuery.validator.addMethod('validateUseraccount', function (password,element) {

		var username = document.getElementById("id_loginName").value;	
		if(USERS[username]==password) {
			return true;
		}
		else {
			return false;
		}
	});
	jQuery.validator.addMethod('validateUserName', function (element) {

		var username = document.getElementById("id_singUpUserName").value;	
		if(USERS[username]==null) {
			return true;
		}
		else {
			return false;
		}
	});
	jQuery.validator.addMethod("equal_key", function(value, element, param) {
		return value != document.getElementById(param).value;
	});
	jQuery.validator.addMethod("notEqualTo",
		function(value, element, param) {
			value = $.trim(value);
			for (i = 0; i < param.length; i++) {
				if (value == $.trim($(param[i]).val())) { 
					return false; }
			}
			return true;
		},
		"Please enter a diferent value."
	);

});


function Login() {
	username_name= document.getElementById("id_loginName").value;
	show_func('Game_settings');
};

function singeUp() {
	var username_in = document.getElementById("id_singUpUserName").value;
	var password_in = document.getElementById("id_singUpPassword").value;
	USERS[username_in]=password_in;
	show_func("login_form");

};
function show_func(val) {
	hide_all();
	game_music.pause();
	game_music.currentTime = 0;
	document.getElementById(val).style.display='block';
	if(val!='game_mode' && val!="Game_settings"){
		restartGame();
	}
};
function hide_all() {
	document.getElementById('Game_settings').style.display='none';
	document.getElementById('login_form').style.display='none';
	document.getElementById('signup_form').style.display='none';
	document.getElementById('welcome').style.display='none';
	document.getElementById('game_mode').style.display='none';
	document.getElementById("pacman_h").style.marginLeft = "40%";

};


function openDialog() {
    document.getElementById("aboutModal").style.display= "block";
}

///---------------------------------------------GAME-SETTING-PAGE-------------------------------------------------------
var game_time;
var point_5_ball;
var point_15_ball;
var point_25_ball;
var up_key_code;
var down_key_code;
var left_key_code;
var right_key_code;

var key_up = "Arrow Up";
var key_down = "Arrow Down";
var key_left = "Arrow Left";
var key_right = "Arrow Right";
var number_of_balls;
var username_name;
//-------------------------------------------KETBOARD---------------------------------------------------------------
function GameSetting(info){
	$(document).keypress(function(event){
			Selected_key = event.keyCode;
			switch(info) {
				case "up":
					key_placement_check(Selected_key,"up");
					up_key_code = Selected_key;
					break;
				case "down":
					key_placement_check(Selected_key,"down");
					down_key_code = Selected_key;
					break;
				case "left":
					key_placement_check(Selected_key,"left");
					left_key_code = Selected_key;
					break;
				case "right":
					key_placement_check(Selected_key,"right");
					right_key_code = Selected_key;
					break;
			  }
			$(document).unbind();
		}
	);
}
function key_placement_check(key_code,key)
{
	if (key=="left" && key_code!=37){
		key_left= String.fromCharCode(key_code);
		document.getElementById("setting_b_left").value=key_left;
		
	}
	if (key=="up" && key_code!=38){
		key_up= String.fromCharCode(key_code);
		document.getElementById("setting_b_up").value=key_up;

	}
	if (key=="right" && key_code!=39){
		key_right= String.fromCharCode(key_code);
		document.getElementById("setting_b_right").value=key_right;
	}
	if (key=="down" && key_code!=40){
		key_down= String.fromCharCode(key_code);
		document.getElementById("setting_b_down").value=key_down;

	}
}

//-------------------------------------------------COLOR-AND--BALLS------------------------------------------------
function setting_color(point)
{
	if(point === "5"){
		point_5_ball = document.getElementById('color_5').value;
	}
	else if(point === "15"){
		point_15_ball = document.getElementById('color_15').value;
	}
	else if(point === "25"){
		point_25_ball = document.getElementById('color_25').value;
	}
}



function GameSetting_time(time){
	game_time=parseInt(time);
}
function GameSetting_monsters(val){
	monsters_amount=parseInt(val);
}
function num_balls(val_ball){
	number_of_balls=parseInt(val_ball);
}
// --------------------------------------RANDOM--SETTING-----------------------------------------
function randomSetting()
{
	//KEY
	left_key_code= 37;// Left
	up_key_code= 38; // Up
	right_key_code= 39; // Right
	down_key_code= 40; // Down	key_down = " Down";
	//BALL 
	number_of_balls = Math.floor(Math.random() * (90-50) + 50);
	document.getElementById('balls_num').value =number_of_balls;
	document.getElementById('B_range').value =number_of_balls;

	//COLOR
	point_5_ball =getRandomColor();
	document.getElementById('color_5').value =point_5_ball;

	point_15_ball =getRandomColor();
	document.getElementById('color_15').value =point_15_ball;

	while(point_5_ball==point_15_ball){
		point_15_ball =getRandomColor();
		document.getElementById('color_15').value =point_15_ball;
	}

	point_25_ball =getRandomColor();
	document.getElementById('color_25').value =point_25_ball;

	while(point_5_ball==point_25_ball||point_15_ball==point_25_ball ){
		point_25_ball =getRandomColor();
		document.getElementById('color_25').value =point_25_ball;
	}
	//TIME
	game_time= Math.floor(Math.random() * (180) )+ 60;
	document.getElementById('setting_game_time').value =game_time;
	//Monsters
	monsters_amount = Math.floor(Math.random() * 3 )+ 1;
	document.getElementById('monsters').value = monsters_amount;

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

////-----------------------------------------------!!GAME- PAGE!!----------------------------------------------------- 
var board;
var board_size = 17;
var cell_w;
var cell_h;

var player_user_name;
var height;
var width;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval_game;
var interval_monsters;
var interval_more_life;
var interval_more_time;
var pacmen_in_board;
var number_of_balls;
var walls_amount;
var prize;

const pacman_position ={startX : 0, startY : 0,lives : 5,img_pac:null};
const blinky_position ={startX : 0, startY : 0 ,rotation:0};
const clyde_position ={startX : 0, startY : 0,rotation:0};
const pinky_position ={startX : 0, startY : 0,rotation:0};
const inky_position ={startX : 0, startY : 0,rotation:0};

const life_position ={startX : 0, startY : 0,img_life:null};
const time_position ={startX : 0, startY : 0,img_clook:null};
const Prize_position ={startX : board_size/2, startY : board_size/2,rotation:0};

var monsters;
var monsters_amount;
var strik_music;

var blinky;
var clyde;
var pinky;
var inky;

var pc_U_img=new Image();
var pc_D_img=new Image();
var pc_R_img=new Image();
var pc_L_img=new Image();
var wall= new Image();
wall.src='pacman/wall.jpg';

var point_in_game;
var show_time_life;
var show_time_clook;
var flag_Prize=true;
const square_type = {
	empty_cell: '0',
	point_5_cell: '5',
	point_15_cell: '15',
	point_25_cell: '25',
	wall_cell: '1',
	blinky_1: '8',
	clyde_2: '9',
	pinky_3: '10',
	inky_4: '11',
	Pacman: '12',
	Prize:'13',
	Life:"14",
	Time:'16',
};


function Start() {
	document.getElementById("pacman_h").style.marginLeft = "2%";
	initGame();
	initializationBoard();
	initializationPoin();
	monster();
	pacman_start_point();
	Prize_start_point();
	more_life_point();
	more_time();
	game_music.play();
	game_music.volume = 0.2;
	Draw();
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval_game = setInterval(UpdatePosition, 100);
	interval_monsters= setInterval(UpdatePositionMonster, 1000);
	interval_more_life=setInterval(more_life_point,18000);
	interval_more_time=setInterval(more_time,18000);

}
function initGame(){
	score = 0;
	start_time = new Date();
	monsters_amount = parseInt(document.getElementById('monsters').value);
	game_time = parseInt(document.getElementById('setting_game_time').value);
	//color
	point_5_ball = document.getElementById('color_5').value;
	point_15_ball = document.getElementById('color_15').value;
	point_25_ball = document.getElementById('color_25').value;
	show_setting();	
}

function show_setting(){
	document.getElementById("set_val").innerHTML = 
	"UserName: "+ username_name+ "<br>"+
	"Lives: "+pacman_position.lives.toString()+ "<br>"+
	"UP: "+key_up+ "<br>"+ "DONW: "+key_down+ "<br>"+
	 "LEFT:"+key_left+ '<br>'+
	 "RIGHT:"+key_right+ '<br>'+
	 "Game Duration:" +game_time.toString()+ '<br>'+
	 "Number Of Monsters:" + monsters_amount.toString()+ '<br>';
//color
	document.getElementById('selected_5_points').value = point_5_ball;
	document.getElementById('selected_15_points').value = point_15_ball;
	document.getElementById('selected_25_points').value = point_25_ball;


}
function initializationBoard() {
	height = canvas.height;
	width = canvas.width;
	board = new Array();
	for (let i = 0; i < board_size; i++) {
		board[i] = new Array();
		for (let j = 0; j < board_size; j++) {
			board[i][j] = square_type.empty_cell;
			if(i == 0 || i== board_size - 1|| j == 0 ||  j== board_size - 1) {
					board[i][j] = square_type.wall_cell;
				}
		}
	}
	board[2][2]=square_type.wall_cell;
	board[3][2]=square_type.wall_cell;
	board[2][3]=square_type.wall_cell;
	board[2][4]=square_type.wall_cell;
	board[4][2]=square_type.wall_cell;

	board[6][1]=square_type.wall_cell;
	board[6][2]=square_type.wall_cell;
	board[6][3]=square_type.wall_cell;

	board[8][2]=square_type.wall_cell;
	board[8][3]=square_type.wall_cell;
	board[8][4]=square_type.wall_cell;
	board[9][4]=square_type.wall_cell;
	board[10][4]=square_type.wall_cell;
	board[10][3]=square_type.wall_cell;
	board[10][2]=square_type.wall_cell;

	board[13][1]=square_type.wall_cell;
	board[13][2]=square_type.wall_cell;
	board[13][3]=square_type.wall_cell;

	board[1][7]=square_type.wall_cell;
	board[2][7]=square_type.wall_cell;
	board[3][7]=square_type.wall_cell;

	board[6][7]=square_type.wall_cell;
	board[7][7]=square_type.wall_cell;
	board[8][7]=square_type.wall_cell;


	board[11][7]=square_type.wall_cell;
	board[11][8]=square_type.wall_cell;
	board[12][8]=square_type.wall_cell;
	board[13][8]=square_type.wall_cell;

	board[6][10]=square_type.wall_cell;
	board[7][10]=square_type.wall_cell;


	// board[6][11]=square_type.wall_cell;
	// board[7][11]=square_type.wall_cell;
	board[8][10]=square_type.wall_cell;

	board[10][1]=square_type.wall_cell;
	board[1][10]=square_type.wall_cell;
	board[2][10]=square_type.wall_cell;
	board[3][10]=square_type.wall_cell;
	board[4][10]=square_type.wall_cell;
	board[4][11]=square_type.wall_cell;
	board[4][12]=square_type.wall_cell;

	board[6][14]=square_type.wall_cell;
	board[7][14]=square_type.wall_cell;
	board[7][15]=square_type.wall_cell;

	board[12][12]=square_type.wall_cell;
	board[11][12]=square_type.wall_cell;
	board[11][13]=square_type.wall_cell;
	board[11][14]=square_type.wall_cell;
	board[13][12]=square_type.wall_cell;

}


function monster(){
	if(monsters_amount>=1){
		blinky_position.startX=1;
		blinky_position.startY=1;
		board[1][1]=square_type.blinky_1;
		blinky=new Image();
		blinky.src='pacman/2.png'; 

	}
	if(monsters_amount>=2){
		clyde_position.startX=1;
		clyde_position.startY=board_size-2;
		board[1][board_size-2]=square_type.clyde_2;
		clyde= new Image();
		clyde.src='pacman/4.png';

	}
	if(monsters_amount>=3){

		pinky_position.startX=board_size-2;
		pinky_position.startY=board_size-2;
		board[board_size-2][board_size-2]=square_type.pinky_3;
		pinky=new Image();
		pinky.src='pacman/5.png';


	}
	if(monsters_amount==4){
		inky_position.startX=board_size-2;
		inky_position.startY=1;
		board[board_size-2][1]=square_type.inky_4;
		inky= new Image();
		inky.src='pacman/3.png';

	}

}


function initializationPoin() {
	let random;
	let food_5 = Math.floor(0.6 * number_of_balls);
	let food_15 = Math.floor(0.3 * number_of_balls);
	let food_25 = Math.floor(0.1 * number_of_balls);
	let food_remain = food_5 + food_15 + food_25;
	let i;
	let j;
	while(food_remain > 0)
	{
		random = Math.floor(Math.random()*2) + 1;
		if(food_5==0|| food_15==0 ||food_25==0){
			random = Math.floor(Math.random()*1) + 1;
		}
		var position = findRandomEmptyCell();
		i=position[0];
		j=position[1];

		if(food_remain > 0 && board[i][j] == square_type.empty_cell)
		{	
			if (random==1 && food_5>0 || food_15<=0 && food_25<=0 ){
				board[i][j]=square_type.point_5_cell;
				food_5--;
			}
			else if (random==2 && food_15>0 || food_5<=0 && food_25<=0){
				board[i][j]=square_type.point_15_cell;
				food_15--;

			}
			else if(random==3 && food_25>0||food_5<=0 && food_15<=0) {
				board[i][j]=square_type.point_25_cell;
				food_25--;
			}
			food_remain = food_5 + food_15 + food_25;
		}
	}

}



function pacman_start_point(){
	pc_U_img.src='pacman/pacma_up.png';
	pc_D_img.src='pacman/pacma_D.png';
	pc_L_img.src='pacman/pacma_L.png';
	pc_R_img.src='pacman/pacma_R.png';
	pacman_position.img_pac=pc_R_img;
	let position = findRandomEmptyCell();
	board[position[0]][position[1]] = square_type.Pacman;
	pacman_position.startX=position[0];
	pacman_position.startY=position[1];

}
prize= new Image();
prize.src='pacman/g1.png';
function Prize_start_point(){
	Prize_position.startX=Math.round((board_size-2)/2);
	Prize_position.startY=Math.round((board_size-2)/2);
	board[Prize_position.startX][Prize_position.startY] = square_type.Prize;
}

life_position.img_life= new Image();
life_position.img_life.src='pacman/med.png';

function more_life_point(){
	show_time_life=new Date();
	let position = findRandomEmptyCell();
	board[position[0]][position[1]] = square_type.Life;
	life_position.startX=position[0];
	life_position.startY=position[1];
}

time_position.img_clook= new Image();
time_position.img_clook.src='pacman/clook.png';
function more_time(){
	show_time_clook=new Date();
	let position = findRandomEmptyCell();
	board[position[0]][position[1]] = square_type.Time;
	time_position.startX=position[0];
	time_position.startY=position[1];
}

function check_bonus(){
	if(life_position.startX == pacman_position.startX && life_position.startY == pacman_position.startY){
		let cur_live=pacman_position.lives
		pacman_position.lives=cur_live+1;
		board[life_position.startX][life_position.startY]=square_type.Pacman;
		life_position.startX=1000;
		life_position.startY=1000;
		window.clearInterval(interval_more_life);
	}
	if(time_position.startX == pacman_position.startX && time_position.startY == pacman_position.startY){
		let cur_time=game_time;
		game_time=cur_time+10;
		board[time_position.startX][time_position.startY]=square_type.Pacman;
		time_position.startX=1000;
		time_position.startY=1000;
		window.clearInterval(interval_more_time);
	}
}

function findRandomEmptyCell() {
	var i = Math.floor(Math.random() * (board_size - 1) + 1);
	var j = Math.floor(Math.random() * (board_size - 1) + 1);
	while (board[i][j] != square_type.empty_cell) {
		i = Math.floor(Math.random() * (board_size - 1) + 1);
		j = Math.floor(Math.random() * (board_size - 1) + 1);
	}
	return [i, j];
}


function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

function Draw() {
	canvas.width = canvas.width; //clean board
	cell_h = (height / board_size);
	cell_w = (width / board_size);
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblStrike.value=5-pacman_position.lives;
	point_in_game=0;
	let min_radius = Math.min(cell_h, cell_w)
	for (let i = 0; i < board_size; i++) {
		for (let j = 0; j < board_size; j++) {
			let center = new Object();
			center.y = (i + (0.5)) * cell_h;
			center.x = (j + (0.5)) * cell_w;

			if (board[i][j] == square_type.Pacman) {
				context.drawImage(pacman_position.img_pac, center.x - cell_w / 2, center.y - cell_h / 2, cell_h*0.7, cell_h*0.7);

			} else if (board[i][j] == square_type.point_5_cell) {
				context.beginPath();
				context.arc(center.x, center.y, (min_radius/6), 0, 2 * Math.PI); // circle
				context.fillStyle = point_5_ball; //color
				context.fill();
				point_in_game++;

			} else if (board[i][j] == square_type.point_15_cell) {

				context.beginPath();
				context.arc(center.x, center.y, (min_radius*0.2), 0, 2 * Math.PI); // circle
				context.fillStyle = point_15_ball; //color
				context.fill();
				point_in_game++;

			} else if (board[i][j] == square_type.point_25_cell) {
				context.beginPath();
				context.arc(center.x, center.y, (min_radius*0.25), 0, 2 * Math.PI); // circle
				context.fillStyle = point_25_ball; //color
				context.fill();
				point_in_game++;

			}
			else if(board[i][j] == square_type.blinky_1) {
				//clyde.onload=function(){
					context.drawImage(blinky, center.x - cell_w*0.5, center.y - cell_h*0.5, cell_h, cell_h);
				//}			
			}
			else if(board[i][j]==square_type.clyde_2) {
				//blinky.onload=function(){
					context.drawImage(clyde, center.x - cell_w*0.5, center.y - cell_h*0.5, cell_h, cell_h);
				//}
			}
			else if(board[i][j] == square_type.pinky_3) {
				//pinky.onload=function(){
					context.drawImage(pinky, center.x - cell_w*0.5, center.y - cell_h *0.5, cell_h, cell_h);
				//}			
			}
			else if (board[i][j] == square_type.inky_4){
				//inky.onload=function(){
					context.drawImage(inky, center.x - cell_w *0.5, center.y - cell_h*0.5, cell_h, cell_h);
				//}			
			}
			else if(board[i][j]==square_type.Prize) {
					context.drawImage(prize, center.x - cell_w*0.5, center.y - cell_h*0.5, cell_h, cell_h);
				//}
			}
			else if (board[i][j] == square_type.wall_cell) {
			
				context.drawImage(wall, center.x - cell_w*0.5, center.y - cell_h*0.5, cell_h, cell_h);
			}
			else if (board[i][j] == square_type.Life) {
				let curr_time_life=new Date();
				let time_pass_life=(curr_time_life-show_time_life)/1000;
				if (time_pass_life<6){
					context.drawImage(life_position.img_life, center.x - cell_w *0.5, center.y - cell_h *0.5, cell_h, cell_h);
				}
				else{
					board[i][j]=square_type.empty_cell;
				}
			}
			else if (board[i][j] == square_type.Time) {
				let curr_time_clook=new Date();
				let time_pass_clook=(curr_time_clook-show_time_clook)/1000;
				if (time_pass_clook<7){
					context.drawImage(time_position.img_clook, center.x - cell_w *0.5, center.y - cell_h*0.5, cell_h, cell_h);
				}
				else{
					board[i][j]=square_type.empty_cell;
				}
			}

		}
	}
	console.log(point_in_game)
}

window.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
	  case 37: // Left
	  case 38: // Up
	  case 39: // Right
	  case 40: // Down
	  
	}
  }, false);

function check_score(){
	if (board[pacman_position.startX][pacman_position.startY] == square_type.point_5_cell) {
		score+=5;
		point_in_game=point_in_game-1;
	}
	if (board[pacman_position.startX][pacman_position.startY] == square_type.point_15_cell) {
		score+=15;
		point_in_game=point_in_game-1;

	}
	if (board[pacman_position.startX][pacman_position.startY] == square_type.point_25_cell) {
		score+=25;
		point_in_game=point_in_game-1;

	}
	if (board[pacman_position.startX][pacman_position.startY] == square_type.Prize||PrizeStrikePacman()) {
		score+=50;
		board[Prize_position.startX][Prize_position.startY]=square_type.empty_cell;
		flag_Prize=false;
		Prize_position.startX=20000;
		Prize_position.startY=20000;

		
	}

}
function GetKeyPressed() {
	if (keysDown[up_key_code]) {
		return 1//up;
	}
	if (keysDown[down_key_code]) {
		return 2;// Down
	}
	if (keysDown[left_key_code]) {
		return 3;//left
	}
	if (keysDown[right_key_code]) {
		return 4;// Right
	}
}
function UpdatePosition() {
	var cant_go_pacman=[square_type.inky_4,square_type.pinky_3,square_type.clyde_2,square_type.blinky_1];
	board[pacman_position.startX][pacman_position.startY] = square_type.empty_cell;
	var x = GetKeyPressed();
	if (x == 1) {
		if (pacman_position.startX > 0 && board[pacman_position.startX - 1][pacman_position.startY] != square_type.wall_cell) {
			pacman_position.startX--;
			pacman_position.img_pac=pc_U_img;	
		}
	}
	if (x == 2) {
		if (pacman_position.startX < board_size-1 && board[pacman_position.startX + 1][pacman_position.startY] != square_type.wall_cell) {
			pacman_position.startX++;
			pacman_position.img_pac=pc_D_img;	
		}

	}
	if (x == 3) {
		if (pacman_position.startY > 0 && board[pacman_position.startX][pacman_position.startY - 1] != square_type.wall_cell) {
			pacman_position.startY--;
			pacman_position.img_pac=pc_L_img;	

		}
	}
	if (x == 4) {
	
		if (pacman_position.startY < board_size-1 && board[pacman_position.startX][pacman_position.startY + 1] != square_type.wall_cell) {
			pacman_position.startY++;
			pacman_position.img_pac=pc_R_img;	
		}
	}
	check_score();
	if (cant_go_pacman.includes(board[pacman_position.startX][pacman_position.startY])||monsterStrikePacman()) {
		score=score-10;
		strik_music.play();
		pacman_position.lives=pacman_position.lives-1;
		if (monsters_amount>=1){
			board[blinky_position.startX][blinky_position.startY]=square_type.empty_cell;
		}
		if(monsters_amount>=2){
			board[clyde_position.startX][clyde_position.startY]=square_type.empty_cell;
		}
		if(monsters_amount>=3){
			board[pinky_position.startX][pinky_position.startY]=square_type.empty_cell;
		}
		if(monsters_amount==4){
			board[inky_position.startX][inky_position.startY]=square_type.empty_cell;
		}
		monster();
		board[pacman_position.startX][pacman_position.startY]=square_type.empty_cell;
		pacman_start_point();		
	}
	check_bonus();
	board[pacman_position.startX][pacman_position.startY] = square_type.Pacman;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (game_time-time_elapsed<=0)
	{
		if(score<100){	
			window.alert("You are better than "+ score.toString() +"points");
		}
		else{
			window.alert("Winner!!");

		}
		window.clearInterval(interval_game);
		window.clearInterval(interval_monsters);
		window.clearInterval(interval_more_life);
		window.clearInterval(interval_more_time);
	}
	if (pacman_position.lives==0){
		window.alert("Game completed- you lost :( ");
		window.clearInterval(interval_game);
		window.clearInterval(interval_monsters);
		window.clearInterval(interval_more_life);
		window.clearInterval(interval_more_time);
	}
	if (point_in_game==0){
		window.alert("Winner!!");
		window.clearInterval(interval_game);
		window.clearInterval(interval_monsters);
		window.clearInterval(interval_more_life);
		window.clearInterval(interval_more_time);

	}
	else {
		show_setting();
		Draw();
	}
}

const P ={startX : 0, startY : 0,rotation:0};
var add_x;
var add_y;
function slant(add_x,add_y){
	if (add_x==-1 && add_y==-1){
		P.startX-=1;
	}
	else if (add_x==1 && add_y==1){
		P.startX+=1;
	}
	else if (add_x==-1 && add_y==1){
		P.startX-=1;
	}
	else if (add_x==1 && add_y==-1){
		P.startX+=1;
	}
	else{
		P.startX +=  Math.round(Math.cos(P.rotation));
		P.startY +=  Math.round(Math.sin(P.rotation));
	}

}

var last_cell_1=square_type.empty_cell;
var last_cell_2=square_type.empty_cell;
var last_cell_3=square_type.empty_cell;
var last_cell_4=square_type.empty_cell;
var last_cell_prize=square_type.empty_cell;
function UpdatePositionMonster(){
	if(monsters_amount>=1){
		P.rotation = Math.atan2(pacman_position.startY - blinky_position.startY, pacman_position.startX- blinky_position.startX);
		P.startX=blinky_position.startX;
		P.startY=blinky_position.startY;
		add_x =  Math.round(Math.cos(P.rotation)); 
		add_y =  Math.round(Math.sin(P.rotation)) ;
		slant(add_x,add_y);
		if (board[P.startX][P.startY]!= square_type.wall_cell){
			board[blinky_position.startX][blinky_position.startY]=last_cell_1;
			blinky_position.startX=P.startX;
			blinky_position.startY=P.startY;
			last_cell_1=board[blinky_position.startX][blinky_position.startY];
			if (last_cell_1==square_type.Pacman||last_cell_1==square_type.clyde_2||last_cell_1==square_type.pinky_3||last_cell_1==square_type.inky_4||last_cell_1==square_type.Prize||last_cell_1==square_type.Time||last_cell_1==square_type.Life){
				last_cell_1=square_type.empty_cell;
			}
			board[blinky_position.startX][blinky_position.startY]=square_type.blinky_1;	
		}
		else{
			strike_wall_cell(blinky_position,square_type.blinky_1,last_cell_1);
		}
	}
	if(monsters_amount>=2){
		P.rotation = Math.atan2(pacman_position.startY - clyde_position.startY, pacman_position.startX- clyde_position.startX);
		P.startX=clyde_position.startX;
		P.startY=clyde_position.startY;
		add_x =  Math.round(Math.cos(P.rotation)); 
		add_y =  Math.round(Math.sin(P.rotation)) ;
		slant(add_x,add_y);
		if (board[P.startX][P.startY]!= square_type.wall_cell){
			board[clyde_position.startX][clyde_position.startY]=last_cell_2;
			clyde_position.startX=P.startX;
			clyde_position.startY=P.startY;
			last_cell_2=board[clyde_position.startX][clyde_position.startY];
			if (last_cell_2==square_type.Pacman||last_cell_2==square_type.blinky_1||last_cell_2==square_type.pinky_3||last_cell_2==square_type.inky_4||last_cell_2==square_type.Prize||last_cell_2==square_type.Time||last_cell_2==square_type.Life){
				last_cell_2=square_type.empty_cell;
			}
			board[clyde_position.startX][clyde_position.startY]=square_type.clyde_2;	
		}
		else{
			strike_wall_cell(clyde_position,square_type.clyde_2,last_cell_2);
		}
	}
	if(monsters_amount>=3){
		P.rotation = Math.atan2(pacman_position.startY - pinky_position.startY, pacman_position.startX- pinky_position.startX);
		P.startX=pinky_position.startX;
		P.startY=pinky_position.startY;
		add_x =  Math.round(Math.cos(P.rotation)); 
		add_y =  Math.round(Math.sin(P.rotation)) ;
		slant(add_x,add_y);
		if (board[P.startX][P.startY]!= square_type.wall_cell){
			board[pinky_position.startX][pinky_position.startY]=last_cell_3;
			pinky_position.startX=P.startX;
			pinky_position.startY=P.startY;
			last_cell_3=board[pinky_position.startX][pinky_position.startY];
			if (last_cell_3==square_type.Pacman||last_cell_3==square_type.blinky_1||last_cell_3==square_type.clyde_2||last_cell_3==square_type.inky_4||last_cell_3==square_type.Prize||last_cell_3==square_type.Time||last_cell_3==square_type.Life){
				last_cell_3=square_type.empty_cell;
			}
			board[pinky_position.startX][pinky_position.startY]=square_type.pinky_3;	
		}
		else{
			strike_wall_cell(pinky_position,square_type.pinky_3,last_cell_3);
		}
	}
	if(monsters_amount==4){
		P.rotation = Math.atan2(pacman_position.startY - inky_position.startY, pacman_position.startX- inky_position.startX);
		P.startX=inky_position.startX;
		P.startY=inky_position.startY;
		add_x =  Math.round(Math.cos(P.rotation)); 
		add_y =  Math.round(Math.sin(P.rotation)) ;
		slant(add_x,add_y);
		if (board[P.startX][P.startY]!= square_type.wall_cell){
			board[inky_position.startX][inky_position.startY]=last_cell_4;
			inky_position.startX=P.startX;
			inky_position.startY=P.startY;
			last_cell_4=board[inky_position.startX][inky_position.startY];
			if (last_cell_4==square_type.Pacman||last_cell_4==square_type.blinky_1||last_cell_4==square_type.clyde_2||last_cell_4==square_type.pinky_3||last_cell_4==square_type.Prize||last_cell_4==square_type.Time||last_cell_4==square_type.Life){
				last_cell_4=square_type.empty_cell;

			}
			board[inky_position.startX][inky_position.startY]=square_type.inky_4;	
		}
		else{
			strike_wall_cell(inky_position,square_type.inky_4,last_cell_4);

		}
	}
	if(flag_Prize){
		strike_wall_cell(Prize_position,square_type.Prize,last_cell_prize);
		if (last_cell_prize==square_type.Pacman||last_cell_prize==square_type.blinky_1||last_cell_prize==square_type.clyde_2||last_cell_prize==square_type.pinky_3||last_cell_prize==square_type.inky_4||last_cell_prize==square_type.Time||last_cell_prize==square_type.Life){
			last_cell_prize=square_type.empty_cell;

		}
	}
	Draw();
}


function strike_wall_cell(monster, new_cell, last){
	var random_cell=[board[monster.startX-1][monster.startY],board[monster.startX+1][monster.startY],board[monster.startX][monster.startY-1],board[monster.startX][monster.startY+1]]
	var random_index= Math.floor(Math.random() *4); 
	while (random_cell[random_index]==square_type.wall_cell){
		random_index= Math.floor(Math.random()*4); 	
	}
	board[monster.startX][monster.startY]=last;
	if (random_index==0){
		monster.startX-=1;
		last=board[monster.startX][monster.startY];
		board[monster.startX][monster.startY]=new_cell;
	}
	else if (random_index==1){
		monster.startX=monster.startX+1;
		last=board[monster.startX][monster.startY];
		board[monster.startX][monster.startY]=new_cell;

	}
	else if (random_index==2){
		monster.startY=monster.startY-1;
		last=board[monster.startX][monster.startY];
		board[monster.startX][monster.startY]=new_cell;

	}
	else if (random_index==3){
		monster.startY=monster.startY+1;
		last=board[monster.startX][monster.startY];
		board[monster.startX][monster.startY]=new_cell;
	}
}


function monsterStrikePacman() {
	var i=0;
	var monster_list=[blinky_position,clyde_position,pinky_position,inky_position];
	for (i = 0; i < monsters_amount ; i++) {
		if(monster_list[i].startX == pacman_position.startX && monster_list[i].startY == pacman_position.startY) {
			return true;
		}
	}
	return false;
}
function PrizeStrikePacman() {
	for (let i = 0; i < monsters_amount ; i++) {
		if(Prize_position.startX == pacman_position.startX && Prize_position.startY == pacman_position.startY) {
			return true;
		}
	}
	return false;
}

function restartGame(){

	last_cell_1=square_type.empty_cell;
	last_cell_2=square_type.empty_cell;
	last_cell_3=square_type.empty_cell;
	last_cell_4=square_type.empty_cell;
	last_cell_prize=square_type.empty_cell;
	window.clearInterval(interval_game);
	window.clearInterval(interval_monsters);
	window.clearInterval(interval_more_life);
	window.clearInterval(interval_more_time);
	canvas.width = canvas.width; //clean board
	start_time = null;
	monsters_amount = null;
	point_5_ball = null;
	point_5_ball = null;
	point_5_ball = null;
	board = null;
	number_of_balls=50;
	time_elapsed = 0;
	score = 0;
	lblScore.value = 0;
	lblTime.value = 0;
	username_name=null;
	game_time=0;
	game_music.pause();
	game_music.currentTime = 0;
	pacman_position.lives=5;
	point_in_game=0;
	key_up = "Arrow Up";
	key_down = "Arrow Down";
	key_left = "Arrow Left";
	key_right = "Arrow Right";
	document.getElementById("setting_b_left").value=key_left;
	document.getElementById("setting_b_up").value=key_up;
	document.getElementById("setting_b_right").value=key_right;
	document.getElementById("setting_b_down").value=key_down;

}


function NewGame(){
	restartGame();
	Login();
}

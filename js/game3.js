/*-------------INITIALIZE GAMEBOARD----------------*/
//create gameboard
var board=[[0,0,0],
           [0,0,0],
           [0,0,0]];

var blank;

var imgPath = "pictures/panda/";

document.getElementById("fullPic").src = imgPath+"full.jpg";

//randomize gameboard
randomize();
/*-------------------------------------------------*/

//swaps clicked block with empty spot
function swap(position){
	//check if blank is clicked
	if(position==blank)
		return;

	var imgNum = getBoardFromPos(position);

	var pi = 0;
	var pj = position;
	while(pj>3){
		pj-=3;
		pi++;
	}
	pj--;
	var bi = 0;
	var bj = blank;
	while(bj>3){
		bj-=3;
		bi++;
	}
	bj--;

	var posSRC = imgPath+imgNum+".jpg";
	var blankSRC = imgPath+"blank.jpg";

	//check if clicked tile is next to blank
	//check right
	if((position%3 != 0) && position+1 == blank){
		console.log("move this to the right");
		//swap the innerHTML's
		document.getElementById((position+1)+"").src = posSRC;
		document.getElementById(position).src=blankSRC;
		var temp = board[bi][bj];
		board[bi][bj] = board[pi][pj];
		board[pi][pj] = temp;
		blank = position;
	}
	//check left
	else if((position%3 != 1) && position-1 == blank){
		console.log("move this to the left");
		//swap the innerHTML's
		document.getElementById((position-1)+"").src = posSRC;
		document.getElementById(position).src=blankSRC;
		var temp = board[bi][bj];
		board[bi][bj] = board[pi][pj];
		board[pi][pj] = temp;
		blank = position;
	}
	//check top
	else if((position>3) && position-3 == blank){
		console.log("move this up");
		//swap the innerHTML's
		document.getElementById((position-3)+"").src = posSRC;
		document.getElementById(position).src=blankSRC;
		var temp = board[bi][bj];
		board[bi][bj] = board[pi][pj];
		board[pi][pj] = temp;
		blank = position;
	}
	//check bot
	else if((position<7) && position+3 == blank){
		console.log("move this down");
		//swap the innerHTML's
		document.getElementById((position+3)+"").src = posSRC;
		document.getElementById(position).src=blankSRC;
		var temp = board[bi][bj];
		board[bi][bj] = board[pi][pj];
		board[pi][pj] = temp;
		blank = position;
	}


	//after swapping, check if user has won
	var i;
	var match=0;
	for(i=0; i<3; i++){
		for(j=0; j<3; j++){
			if(board[i][j] == (i*3) + (j+1))
				match++;
		}
	}
	console.log(match);
	if(match==9){
		document.getElementById("9").src = imgPath+"9.jpg";
		//freeze all buttons (end game)
		for(i=1;i<10;i++){
			document.getElementById(i+"").disabled=true;
			document.getElementById("t"+i).style.border = "none";
			document.getElementById("board").style.border = "5px solid green";
		}
	
	}
}

function randomize(){
	var i,j;
	var index = 0;
	//setup solved state
	for(i=0; i<3; i++){
		for(j=0; j<3; j++){
			index++;
			board[i][j] = index;
		}
	}
	//make a random number of moves
	var min = 20;
	var max = 50;
	var r = Math.floor(Math.random()*(max-min+1)+min);
	blank = 9;
	for(i=0; i<r; i++){
		var adj = getRandomAdjacent(blank);
		var temp = getBoardFromPos(adj);
		setBoard(adj, getBoardFromPos(blank));
		setBoard(blank, temp);
		blank = adj;
	}
	//if the board starts out solved, make a move
	var match=0;
	for(i=1; i<3; i++){
		for(j=0; j<3; j++){
			if(board[i][j]==(i*3)+(j+1))
				match++;
		}
	}
	if(match==9){
		console.log("extra random");
		var adj = getRandomAdjacent(9);
		var temp = getBoardFromPos(adj);
		setBoard(adj, getBoardFromPos(9));
		setBoard(9, temp);
		blank = adj;
	}

	updateBoard();
}

function getBoardFromPos(pos){
	var i = 0;
	var j = pos;
	while(j>3){
		j-=3;
		i++;
	}
	j--;
	return board[i][j];
}

function setBoard(pos, newVal){
	var i = 0;
	var j = pos;
	while(j>3){
		j-=3;
		i++;
	}
	j--;
	board[i][j] = newVal;
}

function getRandomAdjacent(pos){
	var possibilities = [];
	//right
	if(pos%3 != 0){
		possibilities.push(pos+1);
	}
	//left
	if(pos%3 != 1){
		possibilities.push(pos-1);
	}
	//top
	if(pos>3){
		possibilities.push(pos-3);
	}
	//bot
	if(pos<7){
		possibilities.push(pos+3);
	}

	var r = Math.floor(Math.random() * possibilities.length);

	return possibilities[r];
}

//checks if gameboard already contains certain value
function contains(r){
	var i,j;
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			if(board[i][j]!=null && board[i][j]==r){
				return true;
			}
		}
	}
	return false;
}

//updates/initialize board
function updateBoard(){
	var i,j;
	var btnindex=0;
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			btnindex++;
			var fullPath = imgPath+board[i][j];
			var tempSRC = fullPath+".jpg";
			document.getElementById(btnindex+"").src=tempSRC;
			if(board[i][j]==9){
				tempSRC = imgPath+"blank.jpg";
				document.getElementById(btnindex+"").src=tempSRC;
				//document.getElementById(btnindex+"").active=false;
			}
		}
	}
}
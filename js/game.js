/*-------------INITIALIZE GAMEBOARD----------------*/
//create gameboard
var board=[[0,0,0],
           [0,0,0],
           [0,0,0]];
//randomize gameboard
randomize();
/*-------------------------------------------------*/


//swaps clicked block with empty spot
function swap(position){
	//check if blank is clicked
	if(document.getElementById(position+"").innerHTML==""){
		return;
	}
	//check if clicked tile is next to blank
	//check right
	if((position % 3!=0) && document.getElementById((position+1)+"").innerHTML==""){
		console.log("move this to the right");
		//swap the innerHTML's
		document.getElementById((position+1)+"").innerHTML=document.getElementById(position).innerHTML;
		document.getElementById(position).innerHTML="";
	}
	//check left
	if((position % 3 !=1) && document.getElementById((position-1)+"").innerHTML==""){
		console.log("move this to the left");
		//swap the innerHTML's
		document.getElementById((position-1)+"").innerHTML=document.getElementById(position).innerHTML;
		document.getElementById(position).innerHTML="";
	}
	//check top
	if((position>=4) && document.getElementById((position-3)+"").innerHTML==""){
		console.log("move this up");
		//swap the innerHTML's
		document.getElementById((position-3)+"").innerHTML=document.getElementById(position).innerHTML;
		document.getElementById(position).innerHTML="";
	}
	//check bot
	if((position<=6) && document.getElementById((position+3)+"").innerHTML==""){
		console.log("move this down");
		//swap the innerHTML's
		document.getElementById((position+3)+"").innerHTML=document.getElementById(position).innerHTML;
		document.getElementById(position).innerHTML="";
	}


	//after swapping, check if user has won
	var i;
	var match=0;
	for(i=1;i<9;i++){//check every slot and see if they match the position id
		if(document.getElementById(i+"").innerHTML==i){
			match++;
		}
	}
	if(match==8){
		//alert("Congratulations! You have won!");
		//freeze all buttons (end game)
		for(i=1;i<10;i++){//check every slot and see if they match the position id
			document.getElementById(i+"").disabled=true;
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
	var blank = 9;
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
			if(board[i][j]==match+1)
				match++;
		}
	}
	if(match==9){
		var adj = getRandomAdjacent(9);
		var temp = getBoardFromPos(adj);
		setBoard(adj, getBoardFromPos(9));
		setBoard(9, temp);
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
			document.getElementById(btnindex+"").innerHTML=board[i][j];
			if(board[i][j]==9){
				document.getElementById(btnindex+"").innerHTML="";
				document.getElementById(btnindex+"").active=false;
			}
		}
	}
}
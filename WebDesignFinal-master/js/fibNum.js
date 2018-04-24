function fibFunction(){
	var index;
	do{
		index = prompt("Please Enter A Number Greater Than 0");
		if (index === null) {
			return;
		}
		else if(isNaN(index) || index == ''){
			alert("You Enter Not A Number");
		}
		else if(index < 1){
			alert("You Enter Less Than 1");
		}
	}while(isNaN(index) || index < 1);
	if(index == 1){
		document.getElementById("result").innerHTML = "The Fibonacci Number at Index "+index+" is: "+0;
	}
	else if(index == 2){
		document.getElementById("result").innerHTML = "The Fibonacci Number at Index "+index+" is: "+1;
	}
	var i;
	var fibNum = [];
	fibNum[0] = 0;
	fibNum[1] = 1;
	for(i=2;i<index;i++){
		fibNum[i] = fibNum[i-1]+fibNum[i-2];
	}
	document.getElementById("result").innerHTML = "The Fibonacci Number at Index "+index+" is: "+fibNum[index-1];
	return;
}
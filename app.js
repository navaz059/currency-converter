var arrayRates = [];
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function getDropDown(arrayRates){
	for (var i = 0 ; i < arrayRates.length ; i++) {
		var x = document.getElementById("currencyList");
		var option = document.createElement("option");
		option.text = arrayRates[i].unit;
		option.value = arrayRates[i].rate;
		x.add(option);
	}
}

function getConvertList(arrayRates,unit,rate,number){
	for (var i = 0 ; i < arrayRates.length ; i++) {
		if(unit !== arrayRates[i].unit){
			var node = document.createElement("LI");
			var value = (number*(arrayRates[i].rate))/rate;
			value = value.toFixed(3);
			var rateDiff = (arrayRates[i].rate - rate)/(rate);
			rateDiff = rateDiff.toFixed(2);
			var span1 = document.createElement('span');
			span1.setAttribute('class','money-value');
			node.appendChild(span1);
			span1.innerHTML = value;
			var span2 = document.createElement('span');
			span2.setAttribute('class','unit-value');
			node.appendChild(span2);
			span2.innerHTML = arrayRates[i].unit;
			var span3 = document.createElement('span');
			span3.setAttribute('class','diff-value');
			node.appendChild(span3);
			span3.innerHTML = rateDiff+"%";
			document.getElementById("myList").appendChild(node);	
		}
	}	
}

function numberChange(){
	var number = document.getElementById("myNumber").value;
	var ul = document.getElementById("myList");
	ul.innerHTML = '';
	var list = document.getElementById( "currencyList");
	var unit = list.options[list.selectedIndex].text;
	var value = list.options[list.selectedIndex].value;
	getConvertList(arrayRates,unit,value,number)
}

function unitChange(node){
	//when unit changed remove all elements of ul and add again with Calculation
	var number = document.getElementById("myNumber").value;
	var ul = document.getElementById("myList");
	ul.innerHTML = '';
	var unit = node.options[node.selectedIndex].text;
	getConvertList(arrayRates,unit,node.value,number)
}

var client = new HttpClient();

client.get('http://api.fixer.io/latest', function(response) {
	var result = JSON.parse(response);
	var rates = result.rates;
	var obj = {};
	obj["unit"] = "EUR";
  	obj["rate"] = 1;
	arrayRates.push(obj);  	
	for (var key in rates) {
  		if (rates.hasOwnProperty(key)) {
  			var temp = {};
  			temp["unit"] = key;
  			temp["rate"] = rates[key];
  			arrayRates.push(temp);
    	}
	}
	getDropDown(arrayRates);
	var defaultNumber = document.getElementById("myNumber").value;
	var defaultUnit = arrayRates[0].unit;
	var defaultValue = arrayRates[0].rate;
	getConvertList(arrayRates,defaultUnit,defaultValue,defaultNumber);
});
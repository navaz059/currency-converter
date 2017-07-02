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

function myFunction(node){
	console.log(node.value);
	var number = document.getElementById("myNumber").value;
	alert(number);
}

var client = new HttpClient();

client.get('http://api.fixer.io/latest', function(response) {
	console.log(response);
	var result = JSON.parse(response);
	var rates = result.rates;
	var arrayRates = [{"unit":"EUR",
						"rate":1}];
	for (var key in rates) {
  		if (rates.hasOwnProperty(key)) {
  			var temp = {};
  			temp["unit"] = key;
  			temp["rate"] = rates[key];
  			arrayRates.push(temp);
    	}
	}
	
	for (var i = 0 ; i < arrayRates.length ; i++) {
		var node = document.createElement("LI");
		var textnode = document.createTextNode(arrayRates[i].unit+" : "+arrayRates[i].rate);
		node.appendChild(textnode);
		document.getElementById("myList").appendChild(node);
		var x = document.getElementById("currencyList");
		var option = document.createElement("option");
		option.text = arrayRates[i].unit;
		option.value = arrayRates[i].rate;
		x.add(option);
	}
});
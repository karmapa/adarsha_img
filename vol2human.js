var bu=["འདུལ་བ།","འབུམ།","ཁྲི་བརྒྱད།","ཁྲི་པ།","བརྒྱད་སྟོང་།","ཤེས་རབ་སྣ་ཚོགས།","མདོ་སྡེ།"];
var range=[13   ,33     ,36          ,38,39,40,63];
var letter=["ཀ","ཁ","ག","ང","ཅ","ཆ","ཇ","ཉ","ཏ","ཐ","ད","ན","པ","ཕ","བ","མ","ཙ","ཚ","ཛ","ཝ","ཞ","ཟ","འ"];

var vol2human = function(vol){
	for(var j=0; j<range.length; j++){
		if( vol > range[j] && vol <= range[j+1] ) {
			return [bu[j+1],letter[vol-range[j]-1]];
		}
		if(vol <= range[0]){
			return [bu[0],letter[vol-1]];
		}
	}
}

for(var i=1; i<64; i++){
	console.log(i,vol2human(i));

}

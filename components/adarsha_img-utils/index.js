//var othercomponent=Require("other"); 
//new module filename must be added to scripts section of ./component.js and export here
var  parseVolPage= function(str){
    str=str || "";
    var s=str.match(/(\d+)[@.](\d+)([abcd]*)(\d*)/);
    //var s=str.match(/(\d+)[@.](\d+)([abcd])(\d*)-*(\d*)([abcd]*)(\d*)/);
    if(!s){
      console.log("error!",str);
      return null;
    }
    return {vol:parseInt(s[1]),page:parseInt(s[2]),side:s[3] || "x",line:parseInt(s[4]||"1")};
    //return {vol:parseInt(s[1]),page:parseInt(s[2]),side:s[3],line:parseInt(s[4]||"1"),page2:parseInt(s[5]),side2:s[6],line2:parseInt(s[7]||"1")};
}

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

module.exports={parseVolPage:parseVolPage,vol2human:vol2human};
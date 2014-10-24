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
module.exports={parseVolPage:parseVolPage};
/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
var searchbar=Require("searchbar"); 
var fromsutra=Require("fromsutra"); 
var corressutras=Require("corressutras"); 
var dataset=Require("dataset"); //{dataset.hPedurma};
var api=Require("dataset").api;
var sutraimage=Require("sutraimage");
var longnames={"J":"Lijiang","D":"Derge","H":"Lhasa"};
var mappings={"J":dataset.jPedurma,"D":dataset.dPedurma,"H":dataset.hPedurma};
var main = React.createClass({
  getInitialState: function() {
    return {corres:[],res:[],volpage:""};
  },
  componentDidMount: function() {
    if(window.location.hash){
      var v=window.location.hash.substr(1);
      {this.search(v,"J")}
    }
  },

  search: function(volpage,from){
    var out=[];
    for(var to in mappings){
      if(mappings[from].rcode != mappings[to].rcode){
        var res = api.dosearch(volpage,mappings[from],mappings[to]);
        //res = [版本縮寫,[[經號],[範圍],[對照經號],[對照範圍],[對照行],[K經號]]]
        res[1]=res[1] || [[0],[0],[0],[0],[0],[0]];
        out.push({
          toRecen:longnames[to],
          toJing:res[1][0][0],
          corresLine:res[1][4][0]
        });
      }     
    }
    this.setState({volpage:volpage, fromRecen:longnames[from], KJing:res[1][5][0], fromJing:res[1][0][0], corres:out });   
  },

  nextpage: function() {
    var page=this.state.volpage.replace(/(\d+).(\d+)([ab])/g,function(m,m1,m2,m3){//m1函 m2頁 m3面
      if(m3 == "a"){
        return m1+"."+m2+"b";
      }
      if(m3 == "b"){
        var newpage=parseInt(m2)+1;
        return m1+"."+newpage+"a";
      }
    });
    this.setState({volpage:page});
  },
  prevpage: function() {
    var page=this.state.volpage.replace(/(\d+).(\d+)([ab])/g,function(m,m1,m2,m3){//m1函 m2頁 m3面
      if(m3 == "a"){
        var newpage=m2-1;
        if(newpage <0) newpage=0;
        return m1+"."+newpage+"b";
      }
      if(m3 == "b"){
        return m1+"."+m2+"a";
      }
    });
    this.setState({volpage:page});
  },
  render: function() {
    return (
      <div>      
        <fromsutra nextpage={this.nextpage} prevpage={this.prevpage} volpage={this.state.volpage} fromRecen={this.state.fromRecen} KJing={this.state.KJing} fromJing={this.state.fromJing} />
        <corressutras corres={this.state.corres} />
      </div>
    );
  }
});
module.exports=main;
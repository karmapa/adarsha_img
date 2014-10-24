/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
var utils=Require("utils"); 
var sutraimage=Require("sutraimage");

var recension = React.createClass({
  getInitialState: function() {
    var p=this.props.line;
    var pa=utils.parseVolPage(p.substr(0,p.length-1));
    var page=this.snap2realpage(pa);
    return {volpage:page,recen:this.props.recen};
  },
  goNext: function() {
    var p=this.refs.pg.getDOMNode().innerHTML;
    var page=p.replace(/(\d+).(\d+)([ab])/g,function(m,m1,m2,m3){//m1函 m2頁 m3面
      if(m3 == "a"){
        return m1+"."+m2+"b";
      }
      if(m3 == "b"){
        var newpage=parseInt(m2)+1;
        return m1+"."+newpage+"a";
      }
    });
    console.log(page);
    this.setState({volpage:utils.parseVolPage(page),recen:this.props.recen});
  },
  goPrev: function(e) {    
    var page=this.refs.pg.getDOMNode().innerHTML;
    console.log(this.props.recen[0],page);
  },
  snap2realpage: function(id){
    if(id.side == "c"){
      id.side=id.side.replace("c","b");
    }
    else if(id.side == "d"){
      id.page=id.page+1;
      id.side="a";
    }
    return id;
  },
  render: function() {
    var c=utils.parseVolPage(this.props.line);
    var corresLine=this.snap2realpage(c);
    var realpage=corresLine.vol+"."+corresLine.page+corresLine.side;
        return(
      <div>
        <span className="recen">{this.props.recen}</span>
        <span ref="pg">{realpage}</span>
        <button className="btn btn-success" onClick={this.goPrev}>←</button>
        <button className="btn btn-success" onClick={this.goNext}>→</button> 
        <sutraimage volpage={this.state.volpage} recen={this.state.recen} />
      </div>
    );
  }
});
var corressutras = React.createClass({
  getInitialState: function() {
    return {};
  },
  renderItem: function(item) {
    return <recension recen={item.toRecen} line={item.corresLine}/>
  },
  render: function() {
    return (
      <div>
        {this.props.corres.map(this.renderItem)}
      </div>
    );
  }
});
module.exports=corressutras;
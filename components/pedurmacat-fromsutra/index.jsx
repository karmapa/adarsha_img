/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var utils=Require("utils"); 
var sutraimage=Require("sutraimage");
var controlBar = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return  (
      <div>
        <span className="recen">{this.props.fromRecen}</span> 
        {this.props.volpage}
        <button className="btn btn-success" onClick={this.props.prevpage}>←</button>
        <button className="btn btn-success" onClick={this.props.nextpage}>→</button>        
      </div>
    );
  }
});

var fromsutra = React.createClass({
  getInitialState: function() {
    return {recen:""};
  }, 
  render: function() {
    var volpage=utils.parseVolPage(this.props.volpage);
    return (
      <div>     
        <controlBar nextpage={this.props.nextpage} prevpage={this.props.prevpage} volpage={this.props.volpage} KJing={this.props.KJing} fromRecen={this.props.fromRecen} fromJing={this.props.fromJing} />
        <sutraimage volpage={volpage} recen={this.props.fromRecen} />
      </div>
    );
  }
});
module.exports=fromsutra;
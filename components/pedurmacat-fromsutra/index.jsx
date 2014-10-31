/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var utils=Require("utils"); 
var sutraimage=Require("sutraimage");
var sutraname = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    var vol=this.props.volpage?this.props.volpage.vol:1;
    var human_vol=utils.vol2human(vol)
    return  (
      <span>
        {human_vol[0]}/{human_vol[1]}
      </span>
    );
  }
});

var controlBar = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    
    return  (
      <div>
        <span className="recen">{this.props.fromRecen}</span> 
        <sutraname volpage={this.props.volpage}/> 
        <a href="#" onClick={this.props.prevpage}><img width="25" src="prev.png"/></a>
        <a href="#" onClick={this.props.nextpage}><img width="25" src="next.png"/></a>        
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
        
        <controlBar volpage={volpage} nextpage={this.props.nextpage} prevpage={this.props.prevpage} fromRecen={this.props.fromRecen} />
        <sutraimage volpage={volpage} recen={this.props.fromRecen} />
      </div>
    );
  }
});
module.exports=fromsutra;
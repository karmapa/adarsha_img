/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
var utils=Require("utils"); 
var sutraimage=Require("sutraimage");

var recension = React.createClass({
  getInitialState: function() {
    var c=utils.parseVolPage(this.props.line);
    var corresLine=this.snap2realpage(c);
    var realpage=corresLine.vol+"."+corresLine.page+corresLine.side;
    return {volpage_noPar:realpage,volpage:corresLine,recen:this.props.recen};
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
    this.setState({volpage_noPar:page,volpage:utils.parseVolPage(page),recen:this.props.recen});
  },
  goPrev: function() {    
    var p=this.refs.pg.getDOMNode().innerHTML;
    var page=p.replace(/(\d+).(\d+)([ab])/g,function(m,m1,m2,m3){//m1函 m2頁 m3面
      if(m3 == "a"){
        var newpage=m2-1;
        if(newpage <0) newpage=0;
        return m1+"."+newpage+"b";
      }
      if(m3 == "b"){
        return m1+"."+m2+"a";
      }
    });
    this.setState({volpage_noPar:page,volpage:utils.parseVolPage(page),recen:this.props.recen});
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
        return(
      <div>
        <span className="recen">{this.props.recen}</span>
        
        <a href="#" onClick={this.goPrev}><img width="25" src="prev.png"/></a>
        <span ref="pg">{this.state.volpage_noPar}</span>
        <a href="#" onClick={this.goNext}><img width="25" src="next.png"/></a> 
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
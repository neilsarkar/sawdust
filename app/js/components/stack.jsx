var Stack = React.createClass({
  getInitialState: function() {
    return {nodes: [{name: "cool"}, {name: "nice"}]} ;
  },

  push: function() {
    this.state.nodes.push({});
    this.setState({nodes: this.state.nodes});
  },

  pop: function() {
    this.state.nodes.pop();
    this.setState({nodes: this.state.nodes});
  },

  render: function() {
    var node = this.state.nodes.slice(-1)[0];
    if( node ) { node = <Node>{node.name}</Node> }
    return (
      <div className="stack">
        <i className="pop fa fa-long-arrow-up" onClick={this.pop}></i>
        {node}
        <i className="push fa fa-long-arrow-down" onClick={this.push}></i>
        <div className=""></div>
      </div>
    )
  }
})

var Stack = React.createClass({
  getInitialState: function() {
    return {
      nodes: [{}]
    };
  },

  push: function() {
    this.state.nodes.push({uuid: uuid.v1()});
    this.setState({nodes: this.state.nodes});
  },

  pop: function() {
    this.state.nodes.pop();
    this.setState({nodes: this.state.nodes});
  },

  update: function(properties) {
    _.extend(this.state.nodes[this.state.nodes.length-1], properties);
  },

  render: function() {
    var node = this.state.nodes.slice(-1)[0];
    if( node ) {
      node = <Node key={node.uuid} update={this.update}>{node.name}</Node>
    }
    return (
      <div className="stack">
        <i className="pop fa fa-long-arrow-up" onClick={this.pop}></i>
        {node}
        <i className="push fa fa-long-arrow-down" onClick={this.push}></i>
      </div>
    )
  }
})

var Stack = React.createClass({
  getInitialState: function() {
    return {nodes: [{name: "cool"}, {name: "nice"}]} ;
  },

  addNode: function(name) {
    this.state.nodes.push({name: name});
    this.setState({nodes: this.state.nodes});
  },

  render: function() {
    var node = this.state.nodes.slice(-1)[0];
    return (
      <div className="stack">
        <Node>
          {node.name}
        </Node>
      </div>
    )
  }
})

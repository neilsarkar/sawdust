var Stack = React.createClass({
  getInitialState: function() {
    var storedNodes = window.localStorage.getItem('stack');

    try {
      storedNodes = JSON.parse(storedNodes);
    } catch(err) {
      console.error(err);
      storedNodes = null;
    }

    return {
      nodes: storedNodes || [{}]
    };
  },

  componentDidMount: function() {
    Mousetrap.bind('down', this.push);
    Mousetrap.bind('up', this.pop);
  },

  componentWillUnmount: function() {
    Mousetrap.unbind('down');
    Mousetrap.unbind('up');
  },

  push: function() {
    this.state.nodes.push({uuid: uuid.v1()});
    this.setState({nodes: this.state.nodes});
    window.localStorage.setItem('stack', JSON.stringify(this.state.nodes));
  },

  pop: function() {
    this.state.nodes.pop();
    if( !this.state.nodes.length ) { this.push(); }
    this.setState({nodes: this.state.nodes});
    window.localStorage.setItem('stack', JSON.stringify(this.state.nodes));
  },

  update: function(properties) {
    _.extend(this.state.nodes[this.state.nodes.length-1], properties);
    this.setState({nodes: this.state.nodes});
    window.localStorage.setItem('stack', JSON.stringify(this.state.nodes));
  },

  render: function() {
    var node = _.last(this.state.nodes),
        goal = this.state.nodes.length > 2 && this.state.nodes[0],
        parent = this.state.nodes.slice(-2)[0],
        nodeView, goalView;

    if( parent.uuid == node.uuid ) { parent = null; }
    if( goal ) {
      goalView = <Goal key={goal.uuid} time={goal.time}>{goal.name}</Goal>
    }
    if( node ) {
      nodeView = <Node key={node.uuid} time={node.time} update={this.update}>{node.name}</Node>
    }

    return (
      <div className="stack">
        {goalView}
        <div style={{display: !!parent ? 'block' : 'none'}} className="pop stack-action" onClick={this.pop}>
          <i className="fa fa-long-arrow-up"></i>
          <br />
          {parent && parent.name}
        </div>
        {nodeView}
        <div style={{display: !!node.name ? 'block' : 'none'}} className="push stack-action" onClick={this.push}>
          <i className="fa fa-long-arrow-down" onClick={this.push}></i>
        </div>

        <Debug nodes={this.state.nodes}></Debug>
        <Sawdust></Sawdust>
      </div>
    )
  }
})

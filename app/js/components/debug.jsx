var Debug = React.createClass({
  render: function() {
    var tasks = this.props.nodes.map(function(node) {
      return <li>{node.name}</li>
    })

    return (
      <div className="debug" style={{position: 'absolute', bottom: 0, left: 0}}>
        <ul>
          {tasks}
        </ul>
      </div>
    )
  }
})

var Goal = React.createClass({
  render: function() {
    return (
      <div className="goal">
        <span className="name">
          {this.props.children}
        </span>
        {' '}
        <span className="time">
          ({this.props.time})
        </span>
      </div>
    )
  }
})

var Node = React.createClass({
  getInitialState: function() {
    var name = this.props.children;
    return({editing: !name, name: name, seconds: 0})
  },

  componentDidMount: function() {
    if( this.state.name ) { this.trackTime() };
  },

  componentWillUnmount: function() {
    if( this.timer ) { clearTimeout(this.timer); }
  },

  edit: function() {
    this.setState({editing: true}, function() {
      var input = this.refs.task.getDOMNode();
      input.value = this.state.name;
      input.focus();
      input.select();
    });
  },

  keyup: function(e) {
    if( e.key == 'Enter' ) {
      var name = this.refs.task.getDOMNode().value;
      this.setState({name: name, editing: false});
      this.props.update({name: name});
      this.trackTime();
    }
  },

  togglePause: function() {
    if( this.state.paused ) {
      this.trackTime();
    } else {
      clearTimeout(this.timer);
    }
    this.setState({paused: !this.state.paused});
  },

  trackTime: function() {
    this.timer && clearTimeout(this.timer);
    var now = +new Date;

    this.state.seconds++;
    this.setState({timeElapsed: window.utils.timeString(this.state.seconds)});
    this.props.update({time: this.state.seconds});
    this.timer = setTimeout(this.trackTime, 1000);
  },

  render: function() {
    if( this.state.editing ) {
      return(
        <div className="node s-editing">
          <input ref="task" onKeyUp={this.keyup} placeholder="What do you have to do first?" autofocus="cool"/>
        </div>
      )
    } else {
      var className = "node";
      className += this.state.paused ? ' paused' : '';
      return(
        <div className={className}>
          <div className="name" onClick={this.edit}>{this.state.name}</div>
          <div className="time">{this.state.timeElapsed}</div>
        </div>
      )
    }
  }
})

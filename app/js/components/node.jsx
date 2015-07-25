var Node = React.createClass({
  getInitialState: function() {
    return({editing: false, name: this.props.children, seconds: 0})
  },

  componentDidMount: function() {
    this.startTime = +new Date;
    this.trackTime();
  },

  componentWillUnmount: function() {
    if( this.timer ) { clearTimeout(this.timer); }
  },

  edit: function() {
    this.setState({editing: true, name: this.state.name})
  },

  keyup: function(e) {
    if( e.key == 'Enter' ) {
      var name = React.findDOMNode(this.refs.task).value;
      this.startTime = +new Date;
      this.trackTime();
      this.setState({name: name, editing: false});
    }
  },

  togglePause: function() {
    if( this.state.paused ) {
      this.startTime = +new Date;
      this.trackTime();
    } else {
      clearTimeout(this.timer);
    }
    this.setState({paused: !this.state.paused});
  },

  trackTime: function() {
    var now = +new Date;

    this.state.seconds += parseInt((now - this.startTime)/1000);
    this.setState({timeElapsed: window.utils.timeString(this.state.seconds)});
    this.startTime = now;
    this.timer = setTimeout(this.trackTime, 1000);
  },

  render: function() {
    if( this.state.editing ) {
      return(
        <div className="node s-editing">
          <input ref="task" onKeyUp={this.keyup} placeholder="What do you have to do first?" />
        </div>
      )
    } else {
      var className = "node";
      className += this.state.paused ? ' paused' : '';
      return(
        <div className={className}>
          <div className="name" onClick={this.edit}>{this.state.name}</div>
          <div className="time">{this.state.timeElapsed}</div>
          <a onClick={this.pushTask}>Push</a> {' '}
          <a onClick={this.togglePause}>{this.state.paused ? '|>' : '||'}</a>
        </div>
      )
    }
  }
})

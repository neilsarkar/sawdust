var Node = React.createClass({
  getInitialState: function() {
    var name = this.props.children;
    return({editing: !name, name: name, time: this.props.time || 0})
  },

  componentDidMount: function() {
    if( this.state.name ) { this.trackTime(); }
    else { this.focus() }
  },

  componentWillUnmount: function() {
    if( this.timer ) { clearTimeout(this.timer); }
  },

  edit: function() {
    this.setState({editing: true}, this.focus);
  },

  focus: function() {
    var input = this.refs.task.getDOMNode();
    input.value = this.state.name || '';
    input.focus();
    input.select();
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

    this.state.time++;
    this.setState({timeElapsed: window.utils.timeString(this.state.time)});
    this.props.update({time: this.state.time});
    this.timer = setTimeout(this.trackTime, 1000);
  },

  render: function() {
    if( this.state.editing ) {
      return(
        <div className="node s-editing">
          <input className="mousetrap" ref="task" onKeyUp={this.keyup} placeholder="What are you trying to do?" autofocus="cool"/>
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

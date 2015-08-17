var Sawdust = React.createClass({
  getInitialState: function() {
    var dust = window.localStorage.getItem('sawdust');

    return { dust: dust }
  },

  save: function(e) {
    this.setState({dust: e.target.value});
    window.localStorage.setItem('sawdust', e.target.value);
  },

  render: function() {
    return (
      <textarea onKeyUp={this.save} className="sawdust">{this.state.dust}</textarea>
    )
  }
})

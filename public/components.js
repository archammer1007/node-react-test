var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM

var HelloMessage = React.createClass({
  getInitialState: function () {
    return {
        test: "abc"
    }
  },

  loadServerData: function() {
    $.get('/name', function(result) {
      if (this.isMounted()) {
        this.setState({name: result})
      }
    }.bind(this))
  },

  componentDidMount: function () {
    this.setState({
        test: 'xyz'
    })
    this.intervalID = setInterval(this.loadServerData, 3000)
  },

  componentWillUnmount: function() {
    clearInterval(this.intervalID)
  },

  handleClick: function () {
    alert('You clicked!')
  },

  render: function() {
    var name = this.state.name ? this.state.name : this.props.name
    return (
        <div>
        <div>{this.state.test}</div>
        <div onClick={this.handleClick}>Hello {name}</div>
        </div>
    )
  }
})

if (isNode) {
  exports.HelloMessage = HelloMessage
} else {
  ReactDOM.render(<HelloMessage name="John" />, document.getElementById('react-root'))
}
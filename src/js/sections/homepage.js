var privateVar = "i am the homepage horstl";

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

export function init() {
 // console.log(privateVar);
 // React.render(<HelloMessage name="Peter Tilg" />, document.getElementById("main"));
}

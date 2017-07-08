import React from 'react';
import {Input,Button,Container} from 'semantic-ui-react';
export default class Login extends React.Component {
  constructor () {
		super();
    this.state={
message:'',
username:'',
password:'',
    }
			}
handleUsername(e)
{
    this.setState({username:e.target.value});
}

handlePassword(e)
{
    this.setState({password:e.target.value});
}
handleLogin()
{
  $.ajax(

  		{
  			url: '/login',
  			type:'POST',
        data:{username:this.state.username,password:this.state.password},
  			success: function(data)
  			{
  				//this.setState({mes});
          alert("logged in sucessfully");
  			}.bind(this),
  			error:function(err){
  					//this.setState({message:err})
            alert("logged in failure");

  			}.bind(this)

  		}
  	);
}

	render () {
    return (
<Container>
 <Input placeholder='Username' onClick={this.handleUsername.bind(this)}/>
 <Input placeholder='Password' onClick={this.handlePassword.bind(this)}/>
 <Button  onClick={this.handleLogin.bind(this)}>login</Button>
</Container>
		);
	}
}//end of class

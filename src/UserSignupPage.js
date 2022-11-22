import React from 'react';
import axios from 'axios';

class UserSignupPage extends React.Component {

    state = {
        username:null,
        displayname:null,
        password:null,
        passwordAgain:null,
        pendingApiCall:false

    } //state react componentten gelen bir özellik

    Onchange = event => {
        const {name , value} = event.target;
        this.setState({
            [name]:value
        }
        )
    } //Girilen değerleri almak için kullandığım fonksiyon

    OnClickSignup = event => {
        event.preventDefault(); //buttonun şuanki gönderdiği istekleri durdurmak için

        const body = {
            username: this.state.username ,
            displayname: this.state.displayname ,
            password : this.state.password

        }
        this.setState({pendingApiCall:true});

        axios.post("/api/1.0/users" , body)
        .then(response => this.setState({pendingApiCall:false})) 
        .catch(error => this.setState({pendingApiCall:false}))// backend tarafı ile bağlantı

    }
    
    render(){
        
        return(
            <div className='container'>
                <form>
                <h1 className='text-center'>Sign Up</h1>
                <div className='form-group'>
                <label>Username</label>
                <input className="form-control" name='username' onChange={this.Onchange} />
                </div>
                <div className='form-group'>
                <label>Display name</label>
                <input className="form-control" name='displayname' onChange={this.Onchange} />
                </div>
                <div className='form-group'>
                <label>Password</label>
                <input className="form-control" name="password" type="password" onChange={this.Onchange} />
                </div>
                <div className='form-group'>
                <label>Password Again</label>
                <input className="form-control" name="passwordAgain" type="password" onChange={this.Onchange} />
                </div>
                <div className='text-center'>
                <button className="btn btn-primary" onClick={this.OnClickSignup}
                disabled={this.state.pendingApiCall}>
                    {this.state.pendingApiCall ? <span className='spinner-border spinner-border-sm'></span> : " "}
                    Sign Up</button>
                </div>
                
                
            </form>
            </div>
        );
    }

}

export default UserSignupPage;
import React, { Component } from 'react';
import Layout from '../components/layout';
import Menu from '../components/menu';
import { auth, firebase } from '../src/firebase'
import { render } from 'react-dom';

class FacebookAuth extends Component {

    constructor() {
        super();
        let provider = new firebase.auth.FacebookAuthProvider();
        this.state = {
            provider: provider,
            photo:'',
            displayname: ''
        };
        this.initPage();
        this.signinFacebook = this.signinFacebook.bind(this);
        this.logoutFacebook = this.logoutFacebook.bind(this);
    }
    
    initPage(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                // const displayname = user.displayname;
                // const email = user.email;
                // const emailVerified = user.emailVerified;
                // const photoURL = user.photoURL;
                // const isAnonymous = user.isAnonymous;
                // const uid = user.uid;
                // const providerData = user.providerData;
                this.setState({
                    ... this.state,
                    photo: user.photoURL,
                    displayname: user.displayName
                });
            }else{

            }
        });
    }
    
    signinFacebook(){
        const current = this;
        firebase.auth().signInWithPopup(this.state.provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            current.setState({
                ... current.state,
                photo: result.user.photoURL,
                displayname: result.user.displayName
            });
        }).catch(function(error) {
        // Handle Errors here.
            console.log( error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
    }

    logoutFacebook(){
        const current = this;
        firebase.auth().signOut().then(function() {
            current.setState({
                ... current.state,
                photo: '',
                displayname: ''
            });
            console.log('Sign-out successful.');
        }).catch(function(error) {
        // An error happened.
            console.log(error);
        });
    }

    render(){
        return (
            <>
            <Menu />
                <Layout>
                    <h1>Firebase Facebook Auth</h1>
                    <div>{this.state.displayname}</div>
                    <div>
                        <img src={this.state.photo} ></img>
                    </div>
                    <div>
                        {this.state.displayname =='' && (
                            <button id="signin" name="signin" onClick={this.signinFacebook}>Sign In</button>
                        )}
                        <button id="logout" name="logout" onClick={this.logoutFacebook}>Log out</button>
                    </div>
                </Layout>
            </>
        );
    }
}
  
export default FacebookAuth
import Layout from '../../components/layout';
import Menu from '../../components/menu';
import { auth, firebase } from '../../src/firebase'

function GoogleAuth() {

    const provider = new firebase.auth.GoogleAuthProvider();    
    
    function signinGoogle(){
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
            const user = result.user;
            console.log(token);
            console.log(user);
        }).catch(function(error) {
        // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);
        });
    }

    function logoutGoogle(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('Sign-out successful.');
        }).catch(function(error) {
        // An error happened.
            console.log(error);
        });
    }

    return (
        <>
        <Menu />
        <Layout>
            <h1>Firebase Google Auth</h1>
            <div>
                <button id="signin" name="signin" onClick={signinGoogle}>Sign In</button>
                <button id="logout" name="logout" onClick={logoutGoogle}>Log out</button>
            </div>
        </Layout>
        </>
    );
}
  
export default GoogleAuth
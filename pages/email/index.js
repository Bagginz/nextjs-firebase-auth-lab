import Layout from '../../components/layout';
import Menu from '../../components/menu';
import { auth, firebase } from '../../src/firebase'

function EmailAuth() {

    const provider = new firebase.auth.FacebookAuthProvider();    
    
    function signinEmail(){

        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/wrong-password'){
                alert('The password is too weak.');
            }else{
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('signin').disabled = false;
        });
    }

    function logoutEmail(){
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
            <h1>Firebase Email Auth</h1>
            <div>
                <input type="text" id="email"></input>
            </div>
            <div>
                <input type="password" id="password"></input>
            </div>
            <div>
                <button id="signin" name="signin" onClick={signinEmail}>Sign In</button>
                <button id="logout" name="logout" onClick={logoutEmail}>Log out</button>
            </div>
        </Layout>
        </>
    );
}
  
export default EmailAuth
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');


const handleFailLogin = (message) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-danger alert-dismissible login-alert-danger animate__animated animate__bounceIn p-3" role="alert">
            <div class="d-flex align-item-center">
                <i><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                </svg></i>
                <span class='need-space-icon'> </span>
               ${message}
                
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        if(alertPlaceholder.lastChild){

            alertPlaceholder.removeChild(alertPlaceholder.lastChild);
        }
        alertPlaceholder.appendChild(wrapper);
        
};


const handleSuccess = (message) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-success alert-dismissible login-alert-success animate__animated animate__fadeIn p-3" role="alert">
            <div class="d-flex align-item-center">
               <div class="spinner-border  " role="status">
              </div>
                <span class='need-space-icon'> </span>
                ${message}
                
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        if(alertPlaceholder.lastChild){

            alertPlaceholder.removeChild(alertPlaceholder.lastChild);
        }       
         alertPlaceholder.appendChild(wrapper);
         setTimeout( ()=> {
            document.location.replace('/');
        }, 3 * 1000 );
};



function removeExtraNotification (){
    alertPlaceholder.removeChild(alertPlaceholder.lastChild)
}
const loginHandler = async (event) => {
    event.preventDefault();
    
const email = document.querySelector('#email').value.trim();
const password = document.querySelector('#password').value.trim();
    if(email && password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if(response.ok) {
            handleSuccess('Success, Please wait while we retrieve your information');
           
        } else {

            handleFailLogin(`Can't authorize user, try login again`);

        }   
    }    


};


const signUpHandler = async (event) => {
    event.preventDefault();
const email = document.querySelector('#emailSignup').value.trim();
const username = document.querySelector('#username').value.trim();
const password = document.querySelector('#passwordSignup').value.trim();
    if(email && password && username) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ 
                email: email, 
                username: username,  
                password:password, }), 
            headers: {'Content-Type': 'application/json'},
        })
        if(response.ok) {
            handleSuccess("Sign up Successful. Please wait we are setting up your profile")
        } else {
            handleFailLogin('Failed to sign up')
        }   
    }
}

const loginBox = document.querySelector('#login');
const signUp = document.querySelector('#signUp');
loginBox.addEventListener('submit', loginHandler);
signUp.addEventListener('submit', signUpHandler);


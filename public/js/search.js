const searchButton = $('#search-btn');
const searchInput = $('#searchByCategory')
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');


$(document).ready(()=> {
    searchButton.click(()=>{
        const value = searchInput.val()
        if(value.length > 1){
            handleNoFound('Please select a category')
        }
        else{
            window.location.href = `/category/${value}`

        }
        // console.log(`Selected Category Number: ${value}`);
    })
})


const handleNoFound = (message) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-danger alert-dismissible login-alert-danger animate__animated animate__bounceIn p-3" role="alert">
            <div class="d-flex align-items-center">
                <i><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
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



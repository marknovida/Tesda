
hasAccount();

function hasAccount(){

    // kapag si givenName na key sa localStorage is equal sya sa null
    if(localStorage.getItem('givenName') === null) {

        // when the user click the Sign Up
        document.querySelector("#user-profile-name").addEventListener('click', function(){
            // ito yung pinaka container sa HTML natin
            const mainContainer = document.querySelector("#main-container");

            // input fields
            const popUpMessage = `
                <label for="user-gname">First Name</label>
                <input type="text" placeholder="Type here .." id="user-gname"/>
                <label for="user-password">Last Name</label>
                <input type="text" placeholder="Type here .." id="user-password"/>
                <button type="submit">Create Account</button>
            `;
            
            
            // disable signup button
            document.querySelector("#user-profile-name").className = "disable-signup";

            // create form and append input fields
            const form = document.createElement("form");
            form.className = "sign-up-form";
            form.innerHTML = popUpMessage;

            mainContainer.appendChild(form);

            // call the function userData
            userData(form);
        });


        // when the user submit the data
        function userData(form){
            document.querySelector(".sign-up-form").addEventListener("submit", function(e){
                // prevent from loosing the data
                e.preventDefault();
        
                // my variables
                const gname = document.querySelector("#user-gname").value;                
                const password = document.querySelector("#user-password").value;
                

                // empty let variables
                let givenName, userpass;

                // if input fields is empty
                if(localStorage.getItem('givenName') === null && localStorage.getItem('userpass') === null){
                    const logout = document.querySelector('#sidebar-footer');
                    
                    // make the empty let an empty array
                    givenName = [];
                    userpass = [];
                    form.style.display = "inline-flex";
                } else {
                    // pag merong laman gagawin nyang key si givenName at userpass
                    // coconvert nya yung value into normal object kasi tinatanggap lang ng JSON is object hindi string
                    givenName = JSON.parse(localStorage.getItem('givenName'));
                    userpass = JSON.parse(localStorage.getItem('userpass'));
                    alert('Tasks Saved');
                }
                
                // pupush lang yung data na sinubmit ni user
                givenName.push(gname);
                userpass.push(password);
        
                // icoconvert nya yung normal object into a string 
                localStorage.setItem('givenName', JSON.stringify(givenName));
                localStorage.setItem('userpass', JSON.stringify(userpass));
        
                
                form.style.display = "none";
        
                // calling the setDataToElement
                setDataToElement(gname, password);

                // for checking if it is working
                givenName.forEach((name) => {
                    console.log(name);
                });
            });
        }


    } else {
        const myUsername = JSON.parse(localStorage.getItem('givenName'));
        const mySurname = JSON.parse(localStorage.getItem('userpass'));
        setDataToElement(myUsername, mySurname);
    }





    // this will make our data append to all the specific elements
    function setDataToElement(name, surname){
        // making a constant variables
        const setMyName = document.querySelector("#user-profile-name"); // name ng user
        const userName = document.querySelector("#user-name"); // ito yung may , + name ng user
        const userLogout = document.querySelector("#sidebar-footer"); // logout button appears


        setMyName.innerHTML = `${name} ${surname}`;// set the user name and make the first letter uppercase
        setMyName.style.textTransform = "capitalize";

        userName.innerHTML = ", " + name;
        userName.style.textTransform = "capitalize";

        userLogout.style.display = "block";
    }

}

document.querySelector("#user-logout").addEventListener('click', function(){
    localStorage.removeItem('givenName');
    localStorage.removeItem('userpass');
    hasAccount();
    
    const setMyName = document.querySelector("#user-profile-name").className = "";
    
    window.location.reload(true);
});


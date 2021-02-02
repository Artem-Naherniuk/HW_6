const FRM = document.forms['formOne'];

document.querySelector('body').addEventListener('keyup', function () {
    document.querySelector('#inpEmail').style.outline = '';
    if (FRM.fName.validity.patternMismatch) {
        document.querySelector('.alertFname').style.visibility = 'visible';
    } else if (FRM.fName.validity.valid) {
        document.querySelector('.alertFname').style.visibility = 'hidden';
    }

    if (FRM.lName.validity.patternMismatch) {
        document.querySelector('.alertLname').style.visibility = 'visible';
    } else if (FRM.lName.validity.valid) {
        document.querySelector('.alertLname').style.visibility = 'hidden';
    }

    if (FRM.email.validity.patternMismatch) {
        document.querySelector('.alertEmail').style.visibility = 'visible';
    } else if (FRM.email.validity.valid) {
        document.querySelector('.alertEmail').style.visibility = 'hidden';
    }
    if (FRM.password.validity.patternMismatch) {
        document.querySelector('.alertPassword').style.visibility = 'visible';
    } else if (FRM.password.validity.valid) {
        document.querySelector('.alertPassword').style.visibility = 'hidden';
    }
})

class User {
    constructor(fName, lName, email, password) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
    }
}

localStorage.removeItem('users');



FRM.signUp.addEventListener('click', function () {
    if (FRM.fName.validity.valid && FRM.lName.validity.valid && FRM.email.validity.valid && FRM.password.validity.valid) {
        let users = [];
        let newUser = new User(FRM.fName.value, FRM.lName.value, FRM.email.value.toLowerCase(), FRM.password.value);
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
            if (users.some(user => user.email === newUser.email)) {
                document.querySelector('.alertEmail').style.visibility = 'visible';
                document.querySelector('.alertEmail').textContent = 'This email exists'
                document.querySelector('#inpEmail').style.outline = '1px solid red';
            } else {
                users.push(newUser);
                document.querySelector('#inpEmail').style.outline = 'none';
                FRM.fName.value = '';
                FRM.lName.value = '';
                FRM.email.value = '';
                FRM.password.value = '';
            }
        } else {
            users.push(newUser);
            FRM.fName.value = '';
            FRM.lName.value = '';
            FRM.email.value = '';
            FRM.password.value = '';
        }
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        document.querySelector('.globalAlert').style.visibility = 'visible';
    }

})

document.querySelector('#signIn').addEventListener('click', () => {
    document.querySelector('.all').style.visibility = 'hidden';
    document.querySelector('.signIn').style.visibility = 'visible';
})

document.querySelector('#signUp').addEventListener('click', () => {
    document.querySelector('.all').style.visibility = 'visible';
    document.querySelector('.signIn').style.visibility = 'hidden';
    document.querySelector('.alertSignIn').style.visibility = 'hidden';
    FRM_TWO.checkEmail.value = '';
    FRM_TWO.checkPassword.value = '';
})

const FRM_TWO = document.forms['SignIn'];

FRM_TWO.check.addEventListener('click', () => {
    let user = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < user.length; i++) {
        if (user[i].email === FRM_TWO.checkEmail.value && user[i].password === FRM_TWO.checkPassword.value) {
            document.querySelector('.signIn').style.visibility = 'hidden';
            document.querySelector('#name').textContent = user[i].fName;
            document.querySelector('#lName').textContent = user[i].lName;
            document.querySelector('#infoE').textContent = user[i].email;
            document.querySelector('.userCabinet').style.visibility = 'visible';
            FRM_TWO.checkEmail.value = '';
            FRM_TWO.checkPassword.value = '';
        } else {
            document.querySelector('.alertSignIn').style.visibility = 'visible';
        }
    }
})

const SIGN_OUT = document.querySelector('#signOut');

SIGN_OUT.addEventListener('click', () => {
    document.querySelector('#name').textContent = '';
    document.querySelector('#lName').textContent = '';
    document.querySelector('#infoE').textContent = '';
    document.querySelector('.alertSignIn').style.visibility = 'hidden';
    document.querySelector('.userCabinet').style.visibility = 'hidden';
    document.querySelector('.signIn').style.visibility = 'visible';
})

document.querySelector('#ok').addEventListener('click', () => {
    document.querySelector('.globalAlert').style.visibility = 'hidden';
})
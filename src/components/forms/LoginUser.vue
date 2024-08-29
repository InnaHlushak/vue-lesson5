<template>
    <div class="container" >
        <h3>Login</h3>
        <v-sheet class="mx-auto" width="400" color="black">
            <p v-if="!isLoggedIn">Enter the following information to confirm your login:</p>
            <v-form @submit.prevent = "login">
                <div v-if="!isLoggedIn">
                    <v-text-field
                        v-model="forma.email"
                        placeholder="text@text.text"
                        label="E-mail"
                    ></v-text-field>
                    <span class="error">{{ errorEmail }}</span>

                    <v-text-field
                        v-model="forma.password"                     
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        @click:append="showpass = !showpass"
                        label="Password"
                    ></v-text-field>
                    <span class="error">{{ errorPassword }}</span>                
                </div> 
                <v-btn  v-if="isLoggedIn" class="mt-2" type="submit" block> Logout </v-btn>
                <v-btn v-else class="mt-2"  type="submit" block> Login </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script>
//імпортувати змінну стану аутентифікації користувача за допомогою Firebase
//імпортувати функції  
import {auth} from "@/main";
import {signInWithEmailAndPassword, signOut} from 'firebase/auth';

export default {
    name: 'LoginUser',        
    data() {
        return  {
            forma: {
                email: '',
                password: '',
            },
            errorEmail: '',
            errorPassword: '',
            showpass: false,
            isValidForm: false,
            isLoggedIn: false,
        }
    },
    methods: {
        validateForm() {   
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if(!emailRegex.test(this.forma.email)) {
                this.errorEmail = 'Must be a valid e-mail';
                return;
            }
            this.errorEmail= '';
            
            const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g; 
            if(!this.forma.password || !passwordRegex.test(this.forma.password)) {
                this.errorPassword = 'The password must contain at least 6 characters, at least one capital letter and at least one number';
                return;
            } 
            this.errorPassword= '';

            this.isValidForm = true;           
        },
        //повернення користувача збереженого в  Firebase Authentication
        //в https://console.firebase.google.com/project/study-project-43b9b/authentication/users
        async login() {
            this.validateForm();
            if (this.isValidForm) {
                //при виході користувача здійнюється вигрузка користувача із системи Firebase, якщо він там є
                if (this.isLoggedIn) {
                    try {
                        await signOut(auth);
                        this.isLoggedIn = false; 
                        //видалити accessToken користувача з LocalStorage
                        localStorage.removeItem('accessToken');                       
                        alert("You are out");
                    } catch(error) {
                        alert('Sorry! Error');
                    }    
                } else {
                //вхід користувача
                    signInWithEmailAndPassword(auth, this.forma.email, this.forma.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(auth.currentUser);
                        this.isLoggedIn = true;
                        //зберегти accessToken користувача в LocalStorage
                        localStorage.setItem('accessToken',JSON.stringify(auth.currentUser.accessToken));
                        alert('Login successfully');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                        alert('This user is not registered');
                        this.redirectToSignUpUser();
                    })
                }
            }
        },
        redirectToSignUpUser() {
            this.$router.push({path: '/sign-up-user'});
        }    
    },
    mounted() {
        // if (auth.currentUser) {
        if (!!localStorage.getItem('accessToken')) {
            this.isLoggedIn = true;
        }
    } 
}
</script>

<style scoped>
    .error {
        color:red;
    }  
</style>
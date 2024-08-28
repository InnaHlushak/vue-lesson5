<template>
    <div class="container" >
        <h3> Sign Up  </h3>
        <p>Please register by entering the following information:</p>
        <v-sheet class="mx-auto" width="400" color="black">
            <v-form @submit.prevent = "register">

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

                <div>
                    <input type="checkbox" id="checkbox" v-model="forma.checked" />
                    <label for="checkbox">I confirm that all data is correct</label>
                </div> 
                <span class="error">{{ errorChecked }}</span>

                <v-btn class="mt-2" :class="{gosubmit: isValidForm}" type="submit" block> {{ textSubmitButton }} </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script>
//імпортувати змінну стану аутентифікації користувача за допомогою Firebase
//імпортувати функції для реєстрації 
import {auth} from "@/main";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'SignUpUser',        
    data() {
        return  {
            forma: {
                email: '',
                password: '',
                checked:  false,
            },
            errorEmail: '',
            errorPassword: '',
            showpass: false,
            errorChecked: '',
            isValidForm: false,
            textSubmitButton: 'Sign up',
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

            this.errorChecked= '';
            if (!this.forma.checked){
                this.errorChecked= 'You have not confirmed';
                return;
            } else {
                this.isValidForm = true;
                this.textSubmitButton = "Registered";
                alert('Data saved and sent'); 
            }
        },
        //реєстрація користувача з використанням Firebase Authentication
        //в https://console.firebase.google.com/project/study-project-43b9b/authentication/users
        register() {
            this.validateForm();
            if(this.isValidForm) {
                createUserWithEmailAndPassword(auth, this.forma.email, this.forma.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(auth.currentUser);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                })
            }    
        }
    } ,
}
</script>

<style scoped>
    .error {
        color:red;
    }
    
    .gosubmit {
        background-color: rgba(0, 128, 0, 0.509);
        cursor: not-allowed;
        pointer-events: none;
    }     
</style>
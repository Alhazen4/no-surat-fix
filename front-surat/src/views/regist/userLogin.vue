<template>
    <div class="main_wrap">

            <div class="wrapper wrapper-login">
                <div class="form">
                    <div class="title">
                        <h2>Login</h2>
                    </div>

                    <div class="error_login" :style="{ display }">
                        <p>{{ error_login_text }}</p>
                    </div>

                    <b-form autoComplete="off" class="b-form">
                        <b-form-group
                            label="Username:"
                            label-for="input-username">

                            <b-form-input
                                id="input-username"
                                v-model="input_username"
                                type="text"
                                required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="Password:"
                            label-for="input-password">

                            <b-form-input
                                id="input-password"
                                v-model="input_password"
                                type="password"
                                required>
                            </b-form-input>
                        </b-form-group>
                    </b-form>
                    
                    <div>
                        <b-button class="custom-btn-login"   @click="login" variant="primary" type="submit">Login</b-button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>

import router from '@/router';
import apis from '../apis.js';
import store from '/src/store';

export default {
    // created() {
    //     console.log(store.state.id)
    //     console.log(store.state.role)
    // },
    name: "userLogin",
    data() {
        return {
            input_username: '',
            input_password: '',
            error_login_text: '',
            display: 'none'
        };
    },
    methods: {
        async login() {
            try {
                await apis.post
                (
                    '/signin', 
                    { 
                        username: this.input_username,
                        password: this.input_password
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then(response => {
                    store.dispatch('setIdAction', response.data.user_id )
                    store.dispatch('setRoleAction', response.data.role )
                    // console.log(response.data.user_id);
                    // console.log(response.data.role);
                    router.push('/homePage').catch(() => {});
                })
            } catch (error) {
                this.display = 'block'
                this.error_login_text = error.response.data.message
                console.log('Error');
            }
        },
    },
}
</script>

<style>

.wrapper {
    height: 100vh;
    width: 100%;
}

.error_login {
    color: white;
    background-color: brown;
    border-radius: 5px;
    padding: 7px;
    font: 20px;
    width: 100%;
    height: 40px;
}

.main_wrap {
    background-color: #202e47;
}

.wrap {
    float: left;
    width: 50%;
    height: 100vh;
}

.form {
    padding: 40px;
    border-radius: 10px;
    color: white;
}

.b-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.custom-btn-login {
    margin-top: 20px;
    width: 210px; 
}

</style>
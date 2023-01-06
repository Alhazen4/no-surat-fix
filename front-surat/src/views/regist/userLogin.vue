<template>
    <div class="main_wrap">
            <div class="wrapper wrapper-login">
                <div class="form">
                    <div class="title">
                        <h2 style="color: aliceblue;">Login</h2>
                    </div>

                    <div class="error_login" :style="{ display }">
                        <p>{{ error_login_text }}</p>
                    </div>

                    <b-form autoComplete="off" class="b-form">
                        <b-form-group
                            label="Username:"
                            label-for="input-username"
                            label-class="login-label">

                            <b-form-input
                                id="input-username"
                                v-model="input_username"
                                type="text"
                                required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="Password:"
                            label-for="input-password"
                            label-class="login-label">

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

                    <!-- <div class="">
                        <p>app v.0.0.4</p>
                    </div> -->
                    <customFooter class="footer-login"></customFooter>
                </div>
            </div>
    </div>
</template>

<script>

import customFooter from '../footer';

import router from '@/router';
import apis from '../apis.js';
import store from '/src/store';

export default {
    async created() {

            let cur_res
    
            try {
                await apis.post 
                (
                    '/users',
                    {
                        role: 'super_admin_check',
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                ).then(response => {cur_res = response.data})
            } catch (error) {
                console.log(error);
                if (error.code === 'ERR_NETWORK') {
                    this.error_login_text = 'Error Connecting to server!'
                }
            }

            if (cur_res.length === 0) {
                try {
                    await apis.post
                    (
                        '/signup', 
                        { 
                            idx: '',
                            nama: 'SuperAdmin',
                            unitOrWitel: 'REG4',
                            email: 'superadmin@gmail.com',
                            noTelp: 0,
                            role: 'super_admin',
                            username: 'superAdmin',
                            password: 'Telkom@REG4'
                        },
                        { headers: { 'Content-Type': 'application/json' } }
                    )
                    .then(response => {
                        console.log(response.data);
                    })
                    this.popUpActive = false
                    router.go(0)
                } catch (error) {
                    console.log(error)
                }
            }
    },

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
                    store.dispatch('setWitelAction', response.data.unitOrWitel )

                    router.push('/homePage').catch(() => {});
                })
            } catch (error) {
                this.display = 'block'
                this.error_login_text = error.response.data.message
                console.log('Error');
            }
        },
    },

    components: {
        customFooter
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

.login-label {
    color: white;
}

.main_wrap {
    background-color: #202e47;
}

.wrap {
    float: left;
    width: 50%;
    height: 100vh;
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

.footer-login {
    color: white;
    border: 0;
    background-color: #202e47;
}

</style>
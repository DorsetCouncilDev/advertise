<template>
<div>
<h2 class="display-4">Admin Log in</h2> 
<div class="row">
    <form class="form col-sm-6">
        <p v-if="loginError" class="text-danger">{{errorMessage}}</p>
        <div class="form-group" >
            <label for="username">Username</label>
            <input class="form-control" type="text" id="username" name="username" v-model="login.username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control"  type="password" id="password" name="password" v-model="login.password">
        </div>
        <button class="btn btn-success" @click.prevent="loginToAdmin">Login</button>
    </form>
</div>
</div>
</template>


<script>

    import Vue from 'vue'
    import Vuex from 'vuex'
    import SecurityService from '../../services/SecurityService'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)
    import { required, minLength, between } from 'vuelidate/lib/validators'
    
    export default {

        name: 'AdminLogin',
        data(){
            return {   
                login: {
                    username:"",
                    password:""
                },
                token: "",
                loginError: false
            }
        },
        methods:{
            loginToAdmin: async function(){
           
                await SecurityService.loginToAdmin(this.login).then((response)=>{
                    if(response.data != null && response.data != ""){
                        this.token =  response.data  
                        this.$store.commit('setSecurityToken',this.token)
                        this.$router.push('/admin/indexes')
                    }
                },(error)=>{
                    this.loginError = true
                    this.errorMessage = "An error occured"
                })
            }
        }
    }

</script>

<style scoped lang="scss">
    h2.display-4{
        font-size:32px;
    }

</style>

<template>
   <div>
        <p v-if="!signup.complete">We have lots more exciting opportunities to come. <a href="#">Sign up to be the first to know</a></p>
        <div id="signupCompleteMessage" v-else>Great you're signed up for updates on exciting new opportunities that come available</div>
    </div>
</template>

<script>
    export default {

        name: 'Signup',

        data() {
            return {
                signup: {
                    name: {
                        value: null,
                        error: null
                    },
                    company: {
                        value: null,
                        error: null
                    },
                    number: {
                        value: null,
                        error: null
                    },
                    email: {
                        value: null,
                        error: null
                    },
                    errors: [],
                    complete: false
                }
            }
        },

        methods: {
            signupForm: function() {
                this.checkForm();
                if (this.signup.errors.length == 0) {
                    $("#signupForm").modal("hide");
                    this.signup.complete = true;
                    // TODO Send form
                }
            },
            validemail: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            clearErrors: function() {
                this.signup.errros = [];
                this.signup.name.error = null;
                this.signup.company.error = null;
                this.signup.number.error = null;
                this.signup.email.error = null;
            },
            isEmpty: function(field) {
                if (field == null || field == "")
                    return true;
                return false;
            },
            checkForm: function(e) {
                this.clearErrors();
                this.signup.errors = [];
                if (this.signup.name.value && this.signup.company.value && this.signup.number.value && this.signup.email.value && this.validemail(this.signup.email.value)) return true;

                if (!this.signup.name.value) {
                    this.signup.errors.push("Name required.");
                    this.signup.name.error = "Name required.";
                }
                if (!this.signup.company.value) {
                    this.signup.errors.push("Company required.");
                    this.signup.company.error = "Company required.";
                }
                if (!this.signup.number.value) {
                    this.signup.errors.push("Number required.");
                    this.signup.number.error = "Number required.";
                }
                if (!this.signup.email.value) {
                    this.signup.errors.push("Email required.");
                    this.signup.email.error = "Email required.";
                } else if (!this.validemail(this.signup.email.value)) {
                    this.signup.errors.push("Email invalid.");
                    this.signup.email.error = "Email invalid.";
                }
            }
        }

    }

</script>

<style scoped lang="scss">
    p{
        font-size:14px;
    }

</style>

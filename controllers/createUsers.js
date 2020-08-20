const app = new Vue({
    el: '#app',
    data: {
        users: [],
        username: "",
        password: "",
        surname: "",
        othernames: "",
        phone: "",
        email: "",
        loading: false,
    },

    mounted() {
        // dashboard tour
        let enjoyhint_instance = new EnjoyHint({});

        enjoyhint_instance.set([
            {
                'click .addUser': '<text style="font-family: cursive; color: yellow">this is where to Add Users </text>'
            },
            {
                'next .userTable': '<text style="font-family: cursive; color: yellow">All added users will be listed out </text>'
            },
        ]);
        enjoyhint_instance.run();

        if (sessionStorage.getItem("accessToken") === null) {
            sessionStorage.removeItem('accessToken');
            window.location.href = 'login.html';
        } else {
            axios.get(Base_URL + createUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
                .then(response => {
                    data = response.data.data
                    this.users = data
                    console.log(data)

                   
                })
                .catch(error => {
                    console.error(error)
                    toast(toastr.error(error.response.data.detail));
                    if (error.response.status == 401 || 403) {
                        sessionStorage.removeItem('accessToken');
                        window.location.href = 'login.html';
                    }
                })
        }

    },

    methods: {
        createUser(e) {
            e.preventDefault();
            this.loading = true;
            if (this.username || this.password || this.surname || this.othernames || this.phone || this.email == null) {
                toast(toastr.error('Please fill in the details Properly'));
                this.loading = false
            } else {
                users = {
                    "username": this.username,
                    "password": this.password,
                    "surname": this.surname,
                    "other_names": this.othernames,
                    "phone": this.phone,
                    "email": this.email
                }
            }
            
            axios.post(Base_URL + createUser,
                users,
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
                .then(response => {
                    data = response.data.data
                    this.users = data
                    console.log(data)


                })
                .catch(error => {
                    console.error(error)
                    toast(toastr.error(error.response.data.detail));
                    if (error.response.status == 401 || 403) {
                        sessionStorage.removeItem('accessToken');
                        window.location.href = 'login.html';
                    }
                })
        }
    }

})
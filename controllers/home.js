const app = new Vue({
    el: '#app',
    data: {
        message: 'No Information Provided yet',
        showModal: false,
        date: '',
        fileDownload: '',
        address: '',
        download_file: '',
        email: 'No information Provided yet',
        wifi: 'No information Provided yet',
        firstname: 'No Information Provided Yet',
        lastname: 'No Information Provided Yet',
        surname: 'No Information Provide Yet',
        gender: 'No Information provided Yet',
        lastlogin: 'No Information Provided yet',
        number: '',
        natureWork: 'No Information Provided Yet',
        team: 'No Information Provided Yet',
        planExpire: 'No Information Provided Yet',
        plan: 'No Information Provided Yet',

    },

    mounted() {
        // dashboard tour
        // let enjoyhint_instance = new EnjoyHint({});

        // enjoyhint_instance.set([
        //     {
        //         'click .settings': '<text style="font-family: cursive; color: yellow">Click to see how to change your settings</text>'
        //     },
        //     {
        //         'next .navigation': '<text style="font-family: cursive; color: yellow">Navigation bars to navigate through the pages.</text>',
        //     },
        // ]);
        // enjoyhint_instance.run();

        if (sessionStorage.getItem("accessToken") === null) {
            sessionStorage.removeItem('accessToken');
            window.location.href = 'login.html';
        } else {
            axios.get(Base_URL + dashboard, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                profile = response.data.profile;
                console.log(profile)
                this.showModal = profile.plan == null ? true : false;
                this.date = moment(profile.date_joined).format('MMMM D, YYYY');
                toast(toastr.success(`Welcome ${profile.username}!`));
                this.message = profile.username;
                this.fileDownload = profile.agreement_link
                this.address = profile.address;
                this.email = profile.email;
                this.wifi = profile.wifi_password;
                this.firstname = profile.first_name;
                this.lastname = profile.last_name;
                this.gender = profile.gender;
                this.lastlogin = moment(profile.last_login).format('MMMM D, YYYY') ;
                this.number = profile.phone;
                this.natureWork = profile.work_nature;
                this.team = profile.team;
                this.planExpire = profile.plan_expiry;
                this.plan = profile.plan;
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
        downloadFile() {
            let blob = new Blob([profile.agreement_link], { "type": "pdf/plain" });
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = profile.agreement_link
            link.click()
        }
    },

})
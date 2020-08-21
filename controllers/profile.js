const app = new Vue({
    el: '#app',
    data: {
        users: [],
        surname: "",
        othernames: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        worknature: "",
        student: false,
        schoolname: "",
        schooladdress: "",
        studentcourse: "",
        studentlevel: "",
        team: 0,
        kinname: "",
        kinaddress: "",
        kinphone: "",
        plan: 0,
        wifipassword: "",
        instagramhandle: "",
        twitterhandle: "",
        facebookhandle: "",
        linkedinhandle: ""
        
    },

    mounted() {
        axios.get(Base_URL + usersList, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            console.log(data)
            data = response.data,
            this.users = data,
            this.surname = data.surname,
            this.othernames = data.other_names,
            this.gender = data.gender,
            this.phone = data.phone,
            this.email = data.email,
            this.address = data.address,
            this.worknature = data.work_nature,
            this.student = data.student,
            this.schoolname = data.school_name,
            this.schooladdress = data.shool_address,
            this.studentcourse = data.student_course,
            this.studentlevel = data.student_level,
            this.team = data.team,
            this.kinname = data.kin_name,
            this.kinaddress = data.kin_address,
            this.kinphone = data.kin_phone,
            this.plan = data.plan,
            this.wifipassword = data.wifi_password,
            this.instagramhandle = data.instagram_handle,
            this.twitterhandle = data.twitter_handle,
            this.facebookhandle = data.facebook_handle,
            this.linkedinhandle = data.linkedin_handle


        })
        .catch(error => {
            toast(toastr.error(error));
            // if (error.response.status == 401 || 403) {
            //     sessionStorage.removeItem('accessToken');
            //     window.location.href = 'login.html';
            // }
            console.log(error.response)
        })
    },

    methods: {
        
    }

})
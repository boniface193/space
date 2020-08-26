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
        linkedinhandle: "",

        is_superuser: JSON.parse(sessionStorage.getItem("is_superuser")),
        images: null,
        loading: false,

        customerUsername: '',
        customerDate: ''
        
    },

    mounted() {
        axios.get(Base_URL + usersList, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
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
                if (error.response.status == 401 || 403) {
                    sessionStorage.removeItem('accessToken');
                    window.location.href = 'login.html';
                }
            })
    },

    methods: {
        downloadCSV() {
            axios.get(Base_URL + userInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                },
            }).then(response => {
                downloadLink = response.data
                //const fileURL = window.URL.createObjectURL(new Blob([downloadLink]));
                const fileLink = document.createElement('a');
                fileLink.href = downloadLink['download_link'];
                fileLink.setAttribute('download', 'userInfo.csv');
                document.body.appendChild(fileLink);
                fileLink.click();

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                toast(toastr.error(errorData.data.detail));
            })
        },
        encodeImageFileAsURL: function (e) {
            let image = e.target.files[0]
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                let b64 = reader.result.replace(/^data:.+;base64,/, '');
                this.users.image = e.target.result
                this.images = b64;
            }
            reader.onerror = function (error) {
                toast(toastr.error(error));
            };

        },
        uploadImage() {
            this.loading = true;
            axios.post(Base_URL + imageUpload, {
                'image': this.images,

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            }).then(response => {
                // images = response.data.image
                this.loading = false
                success = response.data.image;
                toast(toastr.success('Upload Successful'));

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                toast(toastr.error(errorData.data.detail));
                this.loading = false
            })
        },
        saveCustomer() {
            this.loading = true;
            axios.post(Base_URL + customer_URL, {
                'username': this.customerUsername,
                'date': this.customerDate
                
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            }).then(response => {
                this.loading = false;
                this.customerUsername = '';
                this.customerDate = '';
                success = response.data;
                toast(toastr.success('Saved Successful'));

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                this.loading = false
            })
        },

        profileSubmit() {
            usersProfile = {
                "surname": this.surname,
                "other_names": this.othernames,
                "gender": this.gender,
                "phone": this.phone,
                "email": this.email,
                "address": this.address,
                "work_nature": this.worknature,
                "student": this.student,
                "school_name": this.schoolname,
                "school_address": this.schooladdress,
                "student_course": this.studentcourse,
                "student_level": this.studentlevel,
                "team": this.team,
                "kin_name": this.kinname,
                "kin_address": this.kinaddress,
                "kin_phone": this.kinphone,
                "plan": this.plan,
                "wifi_password": this.wifipassword,
                "instagram_handle": this.instagramhandle,
                "twitter_handle": this.twitterhandle,
                "facebook_handle": this.facebookhandle,
                "linkedin_handle": this.linkedinhandle
            }
            axios.put(Base_URL + usersList, {
                usersProfile

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            }).then(response => {
                success = response.data.image;
                toast(toastr.success('Saved successfully'));
                console.log(response.data);

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                toast(toastr.error(errorData.data.detail));
            })
        }
    }

})
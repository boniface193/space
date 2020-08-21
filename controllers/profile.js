const app = new Vue({
    el: '#app',
    data: {
        // users: [],
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
        images: false
        
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
            console.error(error)
            toast(toastr.error(error));
            // if (error.response.status == 401 || 403) {
            //     sessionStorage.removeItem('accessToken');
            //     window.location.href = 'login.html';
            // }
            console.log(error)
        })
    },

    methods: {
        downloadCSV() {
            axios.get(Base_URL + userInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                },
                // responseType: 'blob'
            }).then(response => {
                downloadLink = response.data
                console.log(downloadLink);
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
        encodeImageFileAsURL: function () {
                var element = document.getElementById("fileImage");
                var file = element.files[0];
                var reader = new FileReader();
                reader.onloadend = () => {
                var b64 = reader.result.replace(/^data:.+;base64,/, '');
                this.images = b64;
            }
            reader.readAsDataURL(file);
        },
        uploadImage() {
            axios.post(Base_URL + imageUpload, {
                'image': this.images,
                
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            },
            {
                onUploadProgress: uploadEvent => {
                    console.log('uploadProgress' + Math.round(uploadEvent.loaded / uploadEvent.total * 100 + '%'))
                }
            }).then(response => {
                // images = response.data.image
                success = response.data.image;
                toast(toastr.success('Upload Successful'));
                console.log(response.data);

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                toast(toastr.error(errorData.data.detail));
            })
        }   
    }

})
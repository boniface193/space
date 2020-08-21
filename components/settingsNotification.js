Vue.component('settings-notification', {
    data: function () {
        return {
            users: [],
            lastLogin: '',
        }
    },

    mounted: function () {
        axios.get(Base_URL + usersList, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            data = response.data
            this.users = data
            this.lastLogin = moment(data.last_login).format('MMMM D, YYYY')
        })
        .catch(error => {
            toast(toastr.error(error.response.data.detail));
            if (error.response.status == 401 || 403) {
                sessionStorage.removeItem('accessToken');
                window.location.href = 'login.html';
            }
        })
    },

    template: `
        <div class="sidebar-group">

            <!-- BEGIN: Settings -->
            <div class="sidebar" id="settings">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title d-flex justify-content-between">
                            Settings
                            <a class="btn-sidebar-close" href="#">
                                <i class="ti-close"></i>
                            </a>
                        </h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item pl-0 pr-0">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch1" checked>
                                    <label class="custom-control-label" for="customSwitch1">Allow notifications.</label>
                                </div>
                            </li>
                            <li class="list-group-item pl-0 pr-0">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch2">
                                    <label class="custom-control-label" for="customSwitch2">Hide user requests</label>
                                </div>
                            </li>
                            <li class="list-group-item pl-0 pr-0">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch3" checked>
                                    <label class="custom-control-label" for="customSwitch3">Speed up demands</label>
                                </div>
                            </li>
                            <li class="list-group-item pl-0 pr-0">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch4" checked>
                                    <label class="custom-control-label" for="customSwitch4">Hide menus</label>
                                </div>
                            </li>
                            <li class="list-group-item pl-0 pr-0">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch5">
                                    <label class="custom-control-label" for="customSwitch5">Remember next visits</label>
                                </div>
                            </li>
                            <li class="list-group-item pl-0 pr-0">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customSwitch6">
                                    <label class="custom-control-label" for="customSwitch6">Enable report
                                        generation.</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- END: Settings -->

            <!-- BEGIN: User List -->
            <div class="sidebar" id="chat-list">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title d-flex justify-content-between">
                            Users
                        </h6>
                        <div class="list-group list-group-flush">
                            <a class="list-group-item px-0 d-flex align-items-start">
                                <div class="pr-3">
                                    <div v-if="users.is_active == true" class="avatar avatar-state-success">
                                        <span class="avatar-title bg-success rounded-circle">F</span>
                                    </div>
                                    <div v-else class="avatar">
                                        <span class="avatar-title bg-success rounded-circle">F</span>
                                    </div>

                                </div>
                                <div>
                                    <h6 class="mb-1">{{users.username}}</h6>
                                    <span class="text-muted" v-if="users.is_superuser == true">Admin</span>
                                    <span class="text-muted" v-else>{{users.surname}}</span>
                                </div>
                                <div class="text-right ml-auto d-flex flex-column">
                                    <span class="small text-muted">{{lastLogin}}</span>
                                </div>
                            </a>
                            <a href="chat.html" class="list-group-item px-0 d-flex align-items-start">
                                <div class="pr-3">
                                    <div class="avatar avatar-state-success">
                                        <img src="public/assets/media/image/user/women_avatar1.jpg"
                                            class="rounded-circle" alt="image">
                                    </div>
                                </div>
                                <div>
                                    <h6 class="mb-1">Natale Janu</h6>
                                    <span class="text-muted">Hi!</span>
                                </div>
                                <div class="text-right ml-auto d-flex flex-column">
                                    <span class="badge badge-primary badge-pill ml-auto mb-2">3</span>
                                    <span class="small text-muted">08:27 PM</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: User List -->

        </div>`
})
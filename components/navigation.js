Vue.component('navigating-bar', {
    data: function () {
        return {
            currentPage: '',
            is_superuser: JSON.parse(sessionStorage.getItem("is_superuser")),
            navbars: [
                { active: true, link: 'index.html', icon: 'home', title: 'Dashboard', showForSuperuser: true },
                { active: false, link: 'createUsers.html', icon: 'user', title: 'Add Users', showForSuperuser: false },
                { active: false, link: 'announcement.html', icon: 'rss', title: 'Add Announcement', showForSuperuser: false },
                { active: false, link: 'profile.html', icon: 'folder-plus', title: 'Profile', showForSuperuser: true },
            ]
        };
    },

    mounted: function () {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        this.currentPage = page;
    },
    template: `<!-- begin::navigation -->
            <div class="navigation">
                <div class="navigation-header">
                    <span>Navigation</span>
                    <a href="#">
                        <i class="ti-close"></i>
                    </a>
                </div>
                <div class="navigation-menu-body">
                    <ul>
                        <li v-for="navbar in navbars">
                            <a v-if="is_superuser || navbar.showForSuperuser" :class="{'active' : navbar.link == currentPage}" :href="navbar.link">
                                <span class="nav-link-icon">
                                    <i :data-feather="navbar.icon"></i>
                                </span>
                                <span>{{navbar.title}}</span>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <!-- end::navigation -->`
})
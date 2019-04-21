
window.app = new Vue({
    el: "#app",
    data:
        {
            state: unlogined,
            currentWindow: 'signIn',
            token: '',
        },
    methods: {
        btnRegist: function (event) {
            username = document.getElementById("reg_login").value;
            password = document.getElementById("reg_password").value;

            axios.post(server + '/auth/register',
                {
                    username: username,
                    password: password,
                },
                {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        }
                }
            )
                .then(response => {})
                .catch(e => {
                    console.error(e.message);
                });
        },
        btnLogin: function (event) {
            username = document.getElementById("login").value;
            password = document.getElementById("password").value;

            axios.post(server + '/auth/login',
                {
                    username: username,
                    password: password,
                },
                {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        }
                }
            )
                .then(response => {
                    this.token = response.data.token;
                    this.state = loginedByUser;
                    this.currentWindow = 'setIndaction';
                })
                .catch(e => {
                    console.error(e.message);
                });
        },
        btnSetIndaction: function () {
            hotWater = document.getElementById("hotWater").value;
            coldWater = document.getElementById("coldWater").value;
            light = document.getElementById("light").value;

            axios.post(server + '/meters/send',
                {
                    hot_water: hotWater,
                    cold_water: coldWater,
                    electricity: light,
                },
                {
                    headers:
                        {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + this.token,
                        }
                }
            )
                .then(response => {
                })
                .catch(e => {
                    console.error(e.message);
                });
        }
    }});
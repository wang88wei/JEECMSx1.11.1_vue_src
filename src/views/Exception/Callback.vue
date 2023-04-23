<template>
  <div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'callback',
  methods: {
    ...mapActions('app', ['fetchSingleInfo']),
    getInfo () {
      const { authToken } = this.$route.query
      let ssoLogin = window.localStorage.getItem('ssoLogin')
      if (authToken) {
        this.fetchSingleInfo({ authToken, platform: ssoLogin === '1' }).then(res => {
          if (res.code === 200 && res.data.userType && ssoLogin === '1') {
            this.$router.replace('/workplace').catch(() => {})
            window.localStorage.setItem('ssoLogin', '2')
          } else {
            window.location.href = res.data.url + '?authToken=' + authToken
          }
        })
      }
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

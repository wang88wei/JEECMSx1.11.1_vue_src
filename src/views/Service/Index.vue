<template>
  <section class="service-index">
    <div>aaaaaaaaaaaaaaaaaaaaa</div>
    <iframe :src="url" width="100%" height="100%" allow="microphone; camera" >
      <!-- IE：你们都看我干吗，我现在也是支持的 -->
    </iframe>
  </section>
</template>
<script>
export default {
  name: 'serviceIndex',
  data () {
    return {
      name: '服务市场'
    }
  },
  computed: {
    url () {
      // const env = 'pro'
      const env = process.env.VUE_APP_ENV
      let host = this.$path || window.location.protocol + '//' + window.location.host
      let protocol = host.indexOf('https') > -1 ? 'https' : 'http'
      //   let orderUrl = protocol + '://192.168.0.200:9998'
      let orderUrl = protocol + (env === 'dev' ? '://order.yun.jeecms.com' : '://order.yun.jeecms.com')

      /* system-cms-prefix start */
      let prefix = 'cmsmanager'
      /* system-cms-prefix change let prefix = 'cmsadmin' system-cms-prefix change */
      /* system-cms-prefix end */

      let src =
        orderUrl +
        '/#/service/index?token=' +
        localStorage.getItem('JEECMS-Auth-Token') +
        '&url=' +
        host +
        '&prefix=' +
        prefix +
        '&siteId=' +
        localStorage.getItem('siteId') +
        '&siteName=' +
        localStorage.getItem('siteName') +
        '&userName=' +
        localStorage.getItem('userName')
      return src
    }
  }
}
</script>
<style>
.service-index {
  width: calc(100% + 60px) !important;
  height: 100%;

  margin: -30px 0 0 -30px;
}
</style>

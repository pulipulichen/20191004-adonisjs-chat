<div class="non-invasive-web-style-framework">
  <router-view v-bind:config="config"
               v-bind:status="status"
               v-bind:progress="progress"
               v-bind:lib="lib"></router-view>

  <auth v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        ref="auth"></auth>
</div>
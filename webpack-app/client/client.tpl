<div class="non-invasive-web-style-framework">

  <auth v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        ref="auth"></auth>
  
  <router-view v-bind:config="config"
               v-bind:status="status"
               v-bind:progress="progress"
               v-bind:lib="lib"></router-view>
  
  <keep-alive>
    <component v-bind:is="view"
        v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        v-bind:view="view"></component>
  </keep-alive>
</div>
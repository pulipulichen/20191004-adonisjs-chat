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
  
  {{ message }}
  
  <div>
    ?origin=URL: <br />
    <a v-bind:href="$route.query.origin" target="origin">
      {{ $route.query.origin }}
    </a>
  </div>
  
  <div class="ui list" v-for="user in users">
      {{ user.id }}: {{ user.username }}
  </div>
</div>
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons"],{

/***/ "./webpack-app/client/components.js":
/*!******************************************!*\
  !*** ./webpack-app/client/components.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/Loading/Loading.vue */ "./webpack-app/components/Loading/Loading.vue");
/* harmony import */ var _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/ErrorHandler/ErrorHandler.vue */ "./webpack-app/components/ErrorHandler/ErrorHandler.vue");
/* harmony import */ var _components_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Auth/Auth.vue */ "./webpack-app/client/components/Auth/Auth.vue");




let components = {
  Loading: _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  'error-handler': _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  Auth: _components_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  Login: () => __webpack_require__.e(/*! import() | client-components/Login */ "client-components/Login").then(__webpack_require__.bind(null, /*! ./components/Login/Login.vue */ "./webpack-app/client/components/Login/Login.vue")),
  Chat: () => __webpack_require__.e(/*! import() | client-components/Chat */ "client-components/Chat").then(__webpack_require__.bind(null, /*! ./components/Chat/Chat.vue */ "./webpack-app/client/components/Chat/Chat.vue")),
}
/* harmony default export */ __webpack_exports__["default"] = (components);

/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&":
/*!*************************************************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Auth.html?vue&type=template&id=206d1964& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?eb07":
/*!*****************************************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Auth.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?ecd4");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?ecd4":
/*!*****************************************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  mounted: async function () {
    if (typeof(this.config.username) !== 'string' 
            && typeof(this.config.usernameQueryURL) === 'string') {
      this.config.username = await this.loadUsernameFromURL()
    }
    
    let result = false
    if (typeof(this.config.username) === 'string') {
      result = await this.attemptLoginViaUsername(this.config.username)
    }
    
    if (result === false) {
      await this.checkLogin()
    }
  },
  methods: {
    loadUsernameFromURL: async function () {
      let result = await this.lib.AxiosHelper.getOther(this.config.usernameQueryURL)
      if (typeof(result) === 'string') {
        return result
      }
    },
    attemptLoginViaUsername: async function (username) {
      var result = await this.lib.AxiosHelper.get(`/client/user/attempt-login-via-username`, {
        username: username
      })
      if (typeof(result) === 'string') {
        this.status.username = result
        return true
      }
      else {
        return false
      }
    },
    checkLogin: async function () {
      var result = await this.lib.AxiosHelper.get(`/client/user/check-login`)
      this.status.username = result
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Auth);

/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.vue":
/*!*****************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth.html?vue&type=template&id=206d1964& */ "./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&");
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?eb07");
/* empty/unused harmony star reexport *//* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\runtime\\componentNormalizer.js");





/* normalize component */

var component = Object(_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/components/Auth/Auth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?9a23":
/*!**************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ErrorHandler = {
  props: ['config', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    showError: function () {
      return (typeof(this.error) === 'object' 
              || (typeof(this.error) === 'string' && this.error.trim() !== '') )
    }
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    close() {
      this.error = ''
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (ErrorHandler);

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?bc3b":
/*!**************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ErrorHandler.js?vue&type=script&lang=js& */ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?9a23");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/@kazupon/vue-i18n-loader/lib!./ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\@kazupon\\vue-i18n-loader\\lib\\index.js!./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader!C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\index.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.vue":
/*!**************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& */ "./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&");
/* harmony import */ var _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorHandler.js?vue&type=script&lang=js& */ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?bc3b");
/* empty/unused harmony star reexport *//* harmony import */ var _ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& */ "./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\runtime\\componentNormalizer.js");
/* harmony import */ var _ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue */ "./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue");






/* normalize component */

var component = Object(_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7536335c",
  null
  
)

/* custom blocks */

if (typeof _ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ErrorHandler/ErrorHandler.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Loading.html?vue&type=template&id=076bb14c&scoped=true& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?7d4a":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Loading.js?vue&type=script&lang=js& */ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?82b9");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?82b9":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Loading = {
  /*
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    
  } // methods
  */
}

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/@kazupon/vue-i18n-loader/lib!./Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\@kazupon\\vue-i18n-loader\\lib\\index.js!./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_pudding_AppData_Roaming_npm_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader!C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\index.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_style_loader_index_js_C_Users_pudding_AppData_Roaming_npm_node_modules_css_loader_dist_cjs_js_sourceMap_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_pudding_AppData_Roaming_npm_node_modules_less_loader_dist_cjs_js_sourceMap_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.vue":
/*!****************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loading.html?vue&type=template&id=076bb14c&scoped=true& */ "./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&");
/* harmony import */ var _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loading.js?vue&type=script&lang=js& */ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?7d4a");
/* empty/unused harmony star reexport *//* harmony import */ var _Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& */ "./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&");
/* harmony import */ var _C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\runtime\\componentNormalizer.js");
/* harmony import */ var _Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue */ "./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue");






/* normalize component */

var component = Object(_C_Users_pudding_AppData_Roaming_npm_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "076bb14c",
  null
  
)

/* custom blocks */

if (typeof _Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5C20191004_adonisjs_chat_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/Loading/Loading.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/config.js":
/*!*******************************!*\
  !*** ./webpack-app/config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  debug: {
  },
  
  locale: 'zh-TW',
  clientConfigName: 'CONFIG'
}


/***/ }),

/***/ "./webpack-app/helpers/AxiosHelper.js":
/*!********************************************!*\
  !*** ./webpack-app/helpers/AxiosHelper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\axios\\index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.withCredentials = true

let AxiosHelper = {
  baseURL: '',
  errorHandler: null,
  setBaseURL: function (baseURL) {
    if (baseURL.endsWith('/') === true) {
      baseURL = baseURL.slice(0, -1)
    }
    this.baseURL = baseURL
    return this
  },
  setErrorHandler: function (handler) {
    this.errorHandler = handler
  },
  handleError: function (error) {
    console.error(error)
    if (typeof(this.errorHandler) === 'function') {
      this.errorHandler(error)
    }
  },
  getURL: function (path) {
    if (path.startsWith('/') === false) {
      path = '/' + path
    }
    return this.baseURL + path
  },
  get: async function (path, data, errorHandler) {
    path = this.getURL(path)
    let result = await this.getOther(path, data, errorHandler)
    return result
  },
  getOther: async function (path, data, errorHandler) {
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(path, options)
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  },
  post: async function (path, data, errorHandler) {
    let options = {}
    if (typeof(data) === 'object') {
      options = data
    }
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.getURL(path), options)
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  },
  upload: async function (path, data, errorHandler) {
    if (typeof(data) !== 'object') {
      this.handleError('no data')
      return ''
    }
    
    //console.log(data)
    
    let formData = new FormData()
    for (let name in data) {
      let value = data[name]
      if (typeof(value.files) === 'object') {
        value = value.files[0]
      }
      formData.append(name, value)
    }
    
    //console.log(formData)
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.getURL(path), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AxiosHelper);

/***/ }),

/***/ "./webpack-app/helpers/DayJSHelper.js":
/*!********************************************!*\
  !*** ./webpack-app/helpers/DayJSHelper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\dayjs\\dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/relativeTime */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\dayjs\\plugin\\relativeTime.js");
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1__);


//import 'dayjs/locale/zh-tw' // load on demand
dayjs__WEBPACK_IMPORTED_MODULE_0___default.a.extend(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1___default.a)

// preload locales
__webpack_require__(/*! dayjs/locale/zh-tw */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\dayjs\\locale\\zh-tw.js").default

let DayJSHelper = {
  setLocale: function (dayjsLocale) {
    if (typeof(dayjsLocale) !== 'string') {
      return this
    }
    
    dayjsLocale = dayjsLocale.toLowerCase()
    
    try {
      //require(`dayjs/locale/${dayjsLocale}`).default // load on demand
      dayjs__WEBPACK_IMPORTED_MODULE_0___default.a.locale(dayjsLocale)
    }
    catch (e) {
      console.error(`dayjs locale is error: ${dayjsLocale}`)
    }
    return this
  },
  fromNow: function (timestamp) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(timestamp).fromNow()
  }
}

/* harmony default export */ __webpack_exports__["default"] = (DayJSHelper);

/***/ }),

/***/ "./webpack-app/helpers/StringHelper.js":
/*!*********************************************!*\
  !*** ./webpack-app/helpers/StringHelper.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let StringHelper = {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
}

/* harmony default export */ __webpack_exports__["default"] = (StringHelper);

/***/ }),

/***/ "./webpack-app/i18n/i18n-global.conf.js":
/*!**********************************************!*\
  !*** ./webpack-app/i18n/i18n-global.conf.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let i18nGlobal = {
  "en": {
    "Title": "Example Title"
  },
  "zh-TW": {
    "Title": "範例標題",
    "OK": "確認"
  }
}

/* harmony default export */ __webpack_exports__["default"] = (i18nGlobal);

/***/ }),

/***/ "./webpack-app/plugins/i18n.js":
/*!*************************************!*\
  !*** ./webpack-app/plugins/i18n.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-i18n */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-i18n\\dist\\vue-i18n.esm.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue\\dist\\vue.esm.js");
/* harmony import */ var _i18n_i18n_global_conf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../i18n/i18n-global.conf.js */ "./webpack-app/i18n/i18n-global.conf.js");


vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])



const i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_0__["default"]({
  locale: 'zh-TW', // set default locale
  messages: _i18n_i18n_global_conf_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  silentTranslationWarn: true
})

/* harmony default export */ __webpack_exports__["default"] = (i18n);

/***/ }),

/***/ "./webpack-app/plugins/plugins.js":
/*!****************************************!*\
  !*** ./webpack-app/plugins/plugins.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue\\dist\\vue.esm.js");
/* harmony import */ var _styles_global_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../styles/global.less */ "./webpack-app/styles/global.less");
/* harmony import */ var _styles_global_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_global_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_fragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-fragment */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-fragment\\dist\\vue-fragment.esm.js");

vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.devtools = false
vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.productionTip = false




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_fragment__WEBPACK_IMPORTED_MODULE_2__["default"].Plugin)


/***/ }),

/***/ "./webpack-app/plugins/semantic-ui.js":
/*!********************************************!*\
  !*** ./webpack-app/plugins/semantic-ui.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let $ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js")
window.jQuery = window.$ = $

// Use Semantic UI original version
//require('./../vendors/semantic-ui/semantic.min.css')
//require('./../vendors/semantic-ui/semantic.min.js')

// Use Semantic UI NIWSF version
let SemanticUINIWSF = () => Promise.all(/*! import() | vendors/semantic-ui-niwsf */[__webpack_require__.e("vendors"), __webpack_require__.e("vendors/semantic-ui-niwsf")]).then(__webpack_require__.t.bind(null, /*! ./../vendors/semantic-ui-niwsf/semantic-ui-niwsf-webpack.js */ "./webpack-app/vendors/semantic-ui-niwsf/semantic-ui-niwsf-webpack.js", 7))
SemanticUINIWSF()

/***/ }),

/***/ "./webpack-app/styles/global.less":
/*!****************************************!*\
  !*** ./webpack-app/styles/global.less ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./global.less */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/styles/global.less");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader/lib/addStylesClient.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\lib\\addStylesClient.js").default
var update = add("40473cf4", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\@kazupon\\vue-i18n-loader\\lib\\index.js!./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\@kazupon\\vue-i18n-loader\\lib\\index.js!./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5C20191004-adonisjs-chat%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/styles/global.less":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./webpack-app/styles/global.less ***!
  \***************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/runtime/api.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\runtime\\api.js")(true);
// Module
exports.push([module.i, "/*\nTo change this license header, choose License Headers in Project Properties.\nTo change this template file, choose Tools | Templates\nand open the template in the editor.\n*/\n/*\n    Created on : Oct 4, 2019, 5:33:39 PM\n    Author     : pudding\n*/\n", "",{"version":3,"sources":["global.less"],"names":[],"mappings":"AAAA;;;;CAIC;AACD;;;CAGC","file":"global.less"}]);


/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/runtime/api.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\runtime\\api.js")(true);
// Module
exports.push([module.i, ".message[data-v-7536335c] {\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["D:/xampp/htdocs/projects-nodejs/20191004-adonisjs-chat/webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&","ErrorHandler.less"],"names":[],"mappings":"AAAA;EACE,eAAA;ACCF","file":"ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&","sourcesContent":[".message {\n  cursor: pointer;\n}",".message {\n  cursor: pointer;\n}\n"]}]);


/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/runtime/api.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\runtime\\api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&"}]);


/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.showError
    ? _c(
        "div",
        {
          staticClass: "ui red floating message",
          attrs: { title: _vm.$t("Click to close") },
          on: { click: _vm.close }
        },
        [_c("pre", [_vm._v(_vm._s(_vm.error))])]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\templateLoader.js?!./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui segment" }, [
      _c("div", { staticClass: "ui active centered inline loader" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\index.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader!C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader/lib/addStylesClient.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\lib\\addStylesClient.js").default
var update = add("22303d3d", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\index.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader!C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !C:/Users/pudding/AppData/Roaming/npm/node_modules/css-loader/dist/cjs.js?sourceMap!C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-loader/lib/loaders/stylePostLoader.js!C:/Users/pudding/AppData/Roaming/npm/node_modules/less-loader/dist/cjs.js?sourceMap!./Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\css-loader\\dist\\cjs.js?sourceMap!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-loader\\lib\\loaders\\stylePostLoader.js!C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\less-loader\\dist\\cjs.js?sourceMap!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-style-loader/lib/addStylesClient.js */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-style-loader\\lib\\addStylesClient.js").default
var update = add("ad46c28e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ })

}]);
//# sourceMappingURL=commons.js.map
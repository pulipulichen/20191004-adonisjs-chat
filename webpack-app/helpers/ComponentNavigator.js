let ComponentNavigator = {
  mode: 'router',
  setMode: function (mode) {
    if (mode === 'router') {
      this.mode = 'router'
    }
    else {
      this.mode = 'component'
    }
  },
  switchComponent: function (view, componentName) {
    
  }
}

export default ComponentNavigator
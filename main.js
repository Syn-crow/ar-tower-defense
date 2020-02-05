var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue !'
  },
  computed:{
    listCube(){
      return [{"x1":0,"y1":0,"x2":4,"y2":0},{"x1":4,"y1":0,"x2":4,"y2":4},{"x1":4,"y1":4,"x2":6,"y2":4}]
    }
}
})
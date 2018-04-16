moment.lang('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
});

Vue.config.devtools = true

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init Page Components
Vue.component('page-about', {
  template: '#page-about'
})
Vue.component('page-form', {
  template: '#page-form'
})
Vue.component('page-dynamic-routing', {
  template: '#page-dynamic-routing'
})

// Handle device ready event
// Note: You may want to check out the vue-cordova package on npm for cordova specific handling with vue - https://www.npmjs.com/package/vue-cordova
document.addEventListener('deviceready', () => {
  console.log("DEVICE IS READY!");    
}, false)

// Init App
new Vue({
  el: '#app',
  data:{
    mensaje: "hola",
    datos: [],
    errores: [],
  },
  created() {
    //axios.get(`http://127.0.0.1:8000/actividades/listaActividadesAjax`)
    axios.get(`https://www.iddcielosabiertos.com/multimedia/public/actividades/listaActividadesAjax`)
    .then(response => {
      // JSON responses are automatically parsed.
      console.log(response);
      this.datos = response.data.actividades
    })
    .catch(e => {
      console.log(e);
      this.errores.push(e)
    })
  },
  filters: {
    formatFecha: function(fecha){
      console.log(fecha);
      return moment(String(fecha)).format('dddd D')
    },
    devolverMes: function(fecha){
      console.log(fecha);
      return moment(String(fecha)).format('MMMM')
    }
  },
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: [
      {
        path: '/about/',
        component: 'page-about'
      },
      {
        path: '/form/',
        component: 'page-form'
      },
      {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: 'page-dynamic-routing'
      }
    ],
  }

});




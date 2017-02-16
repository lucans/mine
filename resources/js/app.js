var app = angular.module('mine', ['ui.router','ngMask','720kb.datepicker','ngSanitize'])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("app/Home");
    $stateProvider        
        .state('menu', {
          url: "/app",
          templateUrl: "partials/menu.html",
          controller: "menuCtrl"
        })
        .state('menu.home', {
          url: "/Home",
          templateUrl: "views/home.html",
          controller: "homeCtrl"
        })   
        .state('menu.work', {
          url: "/Work",
          templateUrl: "views/work.html",
          controller: "homeCtrl"
        })            
        .state('menu.base', {
          url: "/Base",
          templateUrl: "views/base.html",
          controller: "homeCtrl"
        })           
        .state('menu.day', {
          url: "/Day",
          templateUrl: "views/day.html",
          controller: "dayCtrl"
        })             
        .state('land', {
          url: "/Land",
          templateUrl: "views/land.html",
          controller: "landCtrl"
        })              
        .state('menu.timeline', {
          url: "/Timeline",
          templateUrl: "views/timeline.html",
          controller: "timeCtrl"
        })           
        .state('menu.adm', {
          url: "/Adm",
          templateUrl: "views/adm.html",
          controller: "admCtrl"
        })          
        .state('menu.config', {
          url: "/Config",
          templateUrl: "partials/config.html",
          controller: "configCtrl"
        })        
        .state('login', {
          url: "/Login",
          templateUrl: "partials/login.html",
          controller: "userCtrl"
        })
}) 



.service("toast", function ($location) {

    this.showToast = function(message, color){

        toastr.options = {             
              "newestOnTop": true,
              "positionClass": "toast-top-right",
              "timeOut": 3000,
              "tapToDismiss": true
            }

        switch(color){
            case 'success':
                toastr.success(message);
                break;
            case 'warning':
                toastr.warning(message);        
                break;
            case 'error':
                toastr.error(message);
                break;
            default:
                toastr.info(message);
        }
    }

})

.service("user", function ($rootScope, route, $http) {

    this.verificaUserSession = function(){

      $rootScope.p = 'verificaUserSession';
      var classe = 'usuarios';
    
      $http.get("server/dao/redirect.php?p=" + $rootScope.p + "&c=" + classe).success(function(result){
          if (result[0]) {
            $rootScope.user = result[0];           
          } else{            
            route.goRota("/Login");
          }        
      });
  }    

})

.service("route", function ($location) {
    this.goRota = function(rota){
        if (rota) {     
            $location.path(rota); 
        }
    };

})

.service('DateProvider', function () {

    this.date = new Date();
    this.payment = new Date();
    
    this.today = function () {
        return this.date.getDate();
    }

    this.dayOfWeek = function () {
        return this.date.getDay();
    }

    this.getHour = function (){
        return this.date.getHours() + ':' + this.date.getMinutes();
    } 

    this.toPayDay = function (){
        var febDate  = new Date(2010, 1, 14); //Month is 0-11 in JavaScript
        febDate.setDate(30);
        return febDate.toDateString();
    };
})


app.controller("userCtrl", ['$scope', '$http', '$rootScope','$location','user','toast', function ($s, $http, $rs, $location, user, toast) {            
        

    $(".button-collapse").sideNav();
        
        
    $s.paciencia = 2;
    $s.showToast = function(message){  
        if ($s.paciencia <= 0) { message = message + ', seu Animal!'; }
        Materialize.toast(message, 3000);
        $s.paciencia--;
        console.log($s.paciencia);
    };

   $s.goRota = function(rota){ 
        if (rota) {
            $location.path(rota);
        }
    };

    $s.userAuth = function(oUser){          
        $s.p = 'userAuth';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oUser: oUser
        }).success(function(result){
            $rs.user = result;
            if ($rs.user) { 
                $s.goRota('/Home');
            } else {
                $s.showToast('Usuário ou senha inválidos');
            }
        });
    }

    // $s.verificaUserSession = function(){
    //     $s.p = 'verificaUserSession';
    //     $http.get("server/dao/redirect.php?p=" + $s.p).then(function (result) {  
    //         if (result.data != 'false') {                    
    //             $rs.user = result[0];
    //         } else {                
    //             $s.goRota('/Login');    
    //         }
    //     });
    // };

    $s.userLogout = function(){
        $s.p = 'userLogout';
        $http.post("server/dao/redirect.php?p=" + $s.p).success($s.goRota('/Login')); 
    }

    $s.sendUser = function(oUser){
        if (!oUser.email || !oUser.password) { 
            $s.showToast('Preencha todos os campos');
            return; 
        }

        $s.p = 'inputUser';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oUser: oUser
        }).success(function(result){
           $s.userAuth(result);
        });
    }  

    user.verificaUserSession();

}]);

app.controller("dayCtrl", ['$scope', '$http', '$rootScope','$location', function ($s, $http, $rs, $location) {
         
    $s.intervaloHoras = ['9h','10h','11h','12h','13h','14h','15h','16h','17h','18h'];
    
    $(document).ready(function(){
        $('.collapsible').collapsible({
          accordion : false
        });
    });

    $s.getHoras = function(){  
        $s.p = 'getHoras';
        $http.get("server/dao/redirect.php?p="+$s.p).success(function(result) {
            $s.horas = result;
        }); 
    }

    $s.getHoras();

}]);


app.controller("homeCtrl", ['$scope', '$http', '$rootScope','DateProvider','toast', function ($s, $http, $rs, Date, toast) {

    $(document).ready(function(){
        $('.collapsible').collapsible({
          accordion : false
        });
    });
        
    $s.paciencia = 2; 
    $s.showToast = function(message){  
        if ($s.paciencia <= 0) { message = message + ', imbecil!'; }
        Materialize.toast(message, 3000);
        $s.paciencia = $s.paciencia--;
        console.log($s.paciencia);
    };

   $s.goRota = function(rota){ 
        if (rota) {
            $location.path(rota);
        }
    };

    $s.getTotal = function(oDados){          
        $s.p = 'getTotal';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oDados: oDados
        }).success(function(result){
            return result;
        });
    }  

    $s.getBases = function(){  
        $s.p = 'getBases';
        $http.get("server/dao/redirect.php?p="+$s.p).success(function(result) {            
            $s.bases = result;
        });
    }   

    $s.getCustos = function(){  
        $s.p = 'getCustos';
        $http.get("server/dao/redirect.php?p="+$s.p).success(function(result) {
            $s.custos = result;
        });

        oDados = {};
        oDados.field = 'valor';
        oDados.table = 'custos';

        $rs.total_custo = $s.getTotal(oDados);
    }   

    $s.getTarefas = function(tipo){  
        $s.p = 'getTarefas';

        oParametros = {};
        oParametros.tipo = tipo;

        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oParametros: oParametros
        }).success(function(result){
            $s.tarefas = result.data;
        });
    }   

    $s.getHoras = function(){  
        $s.p = 'getHoras';
        $http.get("server/dao/redirect.php?p="+$s.p).success(function(result) {
            $s.horas = result;
        }); 
    }


    $s.sendBase = function(oBase){
        if (!oBase.nome || !oBase.descricao) { 
            $s.showToast('Preencha todos os campos');
            return; 
        }

        $s.p = 'inputBase';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oBase: oBase
        }).success(function(result){
            $s.getBases();
        });
        oBase = {};    

    }  

    $s.sendHora = function(oHora){    
        if (!oHora.dia || !oHora.descricao || !oHora.horas) { 
            $s.showToast('Preencha todos os campos');
            return; 
        }

        $s.p = 'inputHora';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oHora: oHora
        }).success(function(result){
            $s.getHoras();
            $s.oHora.descricao = '';        
            $s.oHora.horas = '';        
        });
    }

    $s.sendCusto = function(oCusto){
        if (!oCusto.valor || !oCusto.descricao) { 
            $s.showToast('Preencha todos os campos');
            return; 
        }

        $s.p = 'inputCusto';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oCusto: oCusto
        }).success(function(result){
            $s.getCustos();
            $s.oCusto = {};
        });
    }    

    $s.sendTarefa = function(oTarefa){
        if (!oTarefa.dia || !oTarefa.descricao) { 
            $s.showToast('Preencha todos os campos');
            return; 
        }

        $s.p = 'inputTarefa';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oTarefa: oTarefa
        }).success(function(result){
            $s.getTarefas(oTarefa.tipo);
            $s.oTarefa.descricao = '';
        });
    }     


    $s.deleteHora = function(codhora){
        $s.p = 'deleteHora';
        $http.post("server/dao/redirect.php?p=" + $s.p, codhora).success(function(result){
            $s.getHoras();
            toast.showToast("Hora Deletada!", "success");
        });
    }    

    $s.deleteCusto = function(codcusto){
        $s.p = 'deleteCusto';
        $http.post("server/dao/redirect.php?p=" + $s.p, codcusto).success(function(result){
            $s.getCustos();
            toast.showToast("Custo Deletada!", "success");
        });
    }    

    $s.deleteTarefa = function(codtarefa, tipo){
        $s.p = 'deleteTarefa';
        $http.post("server/dao/redirect.php?p=" + $s.p, codtarefa).success(function(result){
            $s.getTarefas(tipo);
            toast.showToast("Tarefa Deletada!", "success");
        });
    }         

    $s.deleteBase = function(codbase){
        $s.p = 'deleteBase';
        $http.post("server/dao/redirect.php?p=" + $s.p, codbase).success(function(result){
            $s.getBases();
            toast.showToast("Base Deletada!", "success");  
        });
    }     

    $s.changeTarefa = function(codtarefa, tipo){      
        $s.p = 'changeTarefa';
        $http.post("server/dao/redirect.php?p=" + $s.p, codtarefa).success(function(result){
            $s.getTarefas(tipo);
        });
    }

    $s.getAllHome = function (){
        $s.getTarefas('pessoal');
        $s.getCustos();
    }    

    $s.getAllWork = function (){
        $s.getTarefas('trabalho');
        $s.getHoras();
    }

}]);

app.controller("timeCtrl", ['$scope', '$http', '$rootScope','DateProvider', function ($s, $http, $rs, Date) {

    $s.sendContato = function(oContato){

        $s.p = 'inputContato';
        $http.post("server/dao/redirect.php?p=" + $s.p, {
            oContato: oContato
        }).success(function(result){
           $s.getContatos(result);
        });
    }  

    $s.getContatos = function(){  
        $s.p = 'getContatos';
        $http.get("server/dao/redirect.php?p="+$s.p).success(function(result) {            
            $s.contatos = result.data;
        });
    }   

    $s.deleteContato = function(codcontato){
        $s.p = 'deleteContato';
        $http.post("server/dao/redirect.php?p=" + $s.p, codcontato).success(function(result){
            $s.getContatos()
        }); 
    }    



}]);

app.controller("admCtrl", ['$scope', '$http', '$rootScope','DateProvider', function ($s, $http, $rs, Date) {

    $s.getHorasAll = function(){  
        $s.p = 'getHorasAll';
        $http.get("server/dao/redirect.php?p="+$s.p).success(function(result) {            
            $s.users_tarefas = result;
        });
    }   

}]);

app.controller("configCtrl", ['$scope', '$http', '$rootScope','DateProvider', function ($s, $http, $rs, Date) {



}]);

app.controller("menuCtrl", ['$scope', '$http', '$rootScope','$location', function ($s, $http, $rs, $location) {            


}]);



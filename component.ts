var app = angular.module('MyFirstApp', [])
    app.controller('formController', ['$scope', '$http', function ($scope, $http) {
        $scope.usuario = {
            ID_Cliente: 0,
           Nombre: "",
           Apellido: "",
           Direccion: "",
           Ciudad: "",
           Telefono: "",
           Email: "",
        }
        $scope.tipos = [];
        $scope.getTipos = function(){
            $http.get('http://localhost:5288/api/Clientes').then(function(resp){
                $scope.tipos = resp.data;
            });
        }
        
}]);
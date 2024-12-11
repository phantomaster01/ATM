var app = angular.module('MyFirstApp', []);
var url = 'http://localhost:5288/api/';
app.controller("PagosController", ['$scope','$http','$location',function($scope,$http,$location){
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Start Bank ";
    $scope.tarjeta = {};
    $scope.display = '';
    $scope.number = function(num) {
        $scope.display += num;
    };
    
    $scope.clear1 = function() {
        $scope.display = '';
    };
    $scope.tarjeta.cliente = {};
    $http.get(url+'Cuenta/'+$scope.id).then(function(x){
        $scope.tarjeta = x.data;
        $scope.tarjeta.cliente = {
            iD_Cliente: $scope.tarjeta.cliente.iD_Cliente,
            nombre: $scope.tarjeta.cliente.nombre,
            apellido: $scope.tarjeta.cliente.apellido,
            direccion: $scope.tarjeta.cliente.direccion,
            ciudad: $scope.tarjeta.cliente.ciudad,
            telefono: $scope.tarjeta.cliente.telefono,
            email: $scope.tarjeta.cliente.email
        };
        
    },function(){
        alert('Error del servidor');
    });
    $scope.CFE = function(){
        window.location.href="/PagodeServiciosCFE.html#!/?id="+$scope.tarjeta.iD_Cuenta;
    };
    $scope.Escolar = function(){
        window.location.href="/PagodeServiciosEscolar.html#!/?id="+$scope.tarjeta.iD_Cuenta;
    };
    $scope.izzi = function(){
        window.location.href="/PagodeServiciosIZZI.html#!/?id="+$scope.tarjeta.iD_Cuenta;
    };
    $scope.Telmex = function(){
        window.location.href="/PagodeServiciosTelmex.html#!/?id="+$scope.tarjeta.iD_Cuenta;
    };
    $scope.Menu2 = function(){
        window.location.href="/MenuPrincipal.html#!/?id="+$scope.tarjeta.iD_Cuenta;
    };
}]);


//---------------------------------------------------------------------------------------------------------------

app.controller("IzziController", ['$scope','$http','$location',function($scope,$http,$location){
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Start Bank ";
    $scope.tarjeta = {};
    $scope.Cliente ={};
    
    
    $scope.retirarSaldo = function() {
        var monto = parseFloat($scope.PagoServicios.monto);
        if (monto <= 0 || isNaN(monto)) {
            alert("Ingrese un monto válido.");
            return;
        }
    
        if (!$scope.tarjeta.iD_Cuenta) {
            alert("Error: No se ha podido cargar la información de la cuenta.");
            return;
        }
    
        if (monto > $scope.tarjeta.saldo) {
            alert("Fondos insuficientes.");
            return;
        }
       
            // Realiza una solicitud al servidor para actualizar el saldo
            $scope.tarjeta.saldo -= $scope.PagoServicios.monto;
            $http.put(url + 'Cuenta/', $scope.tarjeta)
                .then(function(response) {
                    alert("Saldo actualizado correctamente.");
                    window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
                })
                .catch(function(error) {
                    console.error('Error al actualizar saldo de la cuenta:', error);
                    alert('Error al actualizar saldo de la cuenta. Por favor, inténtelo de nuevo más tarde.');
                });       
             
    };
    
    $scope.clear1 = function() {
        $scope.display = '';
    };
    $scope.tarjeta.cliente = {};
    $http.get(url+'Cuenta/'+$scope.id).then(function(x){
        $scope.tarjeta = x.data;
        $scope.tarjeta.cliente = {
            iD_Cliente: $scope.tarjeta.cliente.iD_Cliente,
            nombre: $scope.tarjeta.cliente.nombre,
            apellido: $scope.tarjeta.cliente.apellido,
            direccion: $scope.tarjeta.cliente.direccion,
            ciudad: $scope.tarjeta.cliente.ciudad,
            telefono: $scope.tarjeta.cliente.telefono,
            email: $scope.tarjeta.cliente.email
           
        };
        
    },function(){
        alert('Error del servidor');
    });
    $scope.PagoServicios = {};
    $http.get(url+'PagoServicios/buscar/1').then(function(x){
        $scope.PagoServicios = x.data;
        $scope.PagoServicios = {
            iD_PagoServicio: $scope.PagoServicio.iD_PagoServicio,
            servicio: $scope.PagoServicios.servicio,
            monto: $scope.PagoServicios.monto,
            
        };
    },function(){
        alert('Error del servidor');
    });
    $scope.Menu2 = function(){
        window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Servicios = function () {
        window.location.href = "/PagodeServicios.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    
}]);
//---------------------------------------------------------------------------------

app.controller("TelmexController", ['$scope','$http','$location',function($scope,$http,$location){
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Start Bank ";
    $scope.tarjeta = {};
    $scope.Cliente ={};
    
    
    $scope.retirarSaldo = function() {
        var monto = parseFloat($scope.PagoServicios.monto);
        if (monto <= 0 || isNaN(monto)) {
            alert("Ingrese un monto válido.");
            return;
        }
    
        if (!$scope.tarjeta.iD_Cuenta) {
            alert("Error: No se ha podido cargar la información de la cuenta.");
            return;
        }
    
        if (monto > $scope.tarjeta.saldo) {
            alert("Fondos insuficientes.");
            return;
        }
       
            // Realiza una solicitud al servidor para actualizar el saldo
            $scope.tarjeta.saldo -= $scope.PagoServicios.monto;
            $http.put(url + 'Cuenta/', $scope.tarjeta)
                .then(function(response) {
                    alert("Saldo actualizado correctamente.");
                    window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
                })
                .catch(function(error) {
                    console.error('Error al actualizar saldo de la cuenta:', error);
                    alert('Error al actualizar saldo de la cuenta. Por favor, inténtelo de nuevo más tarde.');
                });       
             
    };
    
    $scope.clear1 = function() {
        $scope.display = '';
    };
    $scope.tarjeta.cliente = {};
    $http.get(url+'Cuenta/'+$scope.id).then(function(x){
        $scope.tarjeta = x.data;
        $scope.tarjeta.cliente = {
            iD_Cliente: $scope.tarjeta.cliente.iD_Cliente,
            nombre: $scope.tarjeta.cliente.nombre,
            apellido: $scope.tarjeta.cliente.apellido,
            direccion: $scope.tarjeta.cliente.direccion,
            ciudad: $scope.tarjeta.cliente.ciudad,
            telefono: $scope.tarjeta.cliente.telefono,
            email: $scope.tarjeta.cliente.email
           
        };
        
    },function(){
        alert('Error del servidor');
    });
    $scope.PagoServicios = {};
    $http.get(url+'PagoServicios/buscar/2').then(function(x){
        $scope.PagoServicios = x.data;
        $scope.PagoServicios = {
            servicio: $scope.PagoServicios.servicio,
            monto: $scope.PagoServicios.monto,
            
        };
    },function(){
        alert('Error del servidor');
    });
    $scope.Menu2 = function(){
        window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Servicios = function () {
        window.location.href = "/PagodeServicios.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    
}]);
//--------------------------------------------------------------------

app.controller("CFEController", ['$scope','$http','$location',function($scope,$http,$location){
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Start Bank ";
    $scope.tarjeta = {};
    $scope.Cliente ={};
    
    
    $scope.retirarSaldo = function() {
        var monto = parseFloat($scope.PagoServicios.monto);
        if (monto <= 0 || isNaN(monto)) {
            alert("Ingrese un monto válido.");
            return;
        }
    
        if (!$scope.tarjeta.iD_Cuenta) {
            alert("Error: No se ha podido cargar la información de la cuenta.");
            return;
        }
    
        if (monto > $scope.tarjeta.saldo) {
            alert("Fondos insuficientes.");
            return;
        }
       
            // Realiza una solicitud al servidor para actualizar el saldo
            $scope.tarjeta.saldo -= $scope.PagoServicios.monto;
            $http.put(url + 'Cuenta/', $scope.tarjeta)
                .then(function(response) {
                    alert("Saldo actualizado correctamente.");
                    window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
                })
                .catch(function(error) {
                    console.error('Error al actualizar saldo de la cuenta:', error);
                    alert('Error al actualizar saldo de la cuenta. Por favor, inténtelo de nuevo más tarde.');
                });       
             
    };
    
    $scope.clear1 = function() {
        $scope.display = '';
    };
    $scope.tarjeta.cliente = {};
    $http.get(url+'Cuenta/'+$scope.id).then(function(x){
        $scope.tarjeta = x.data;
        $scope.tarjeta.cliente = {
            iD_Cliente: $scope.tarjeta.cliente.iD_Cliente,
            nombre: $scope.tarjeta.cliente.nombre,
            apellido: $scope.tarjeta.cliente.apellido,
            direccion: $scope.tarjeta.cliente.direccion,
            ciudad: $scope.tarjeta.cliente.ciudad,
            telefono: $scope.tarjeta.cliente.telefono,
            email: $scope.tarjeta.cliente.email
           
        };
        
    },function(){
        alert('Error del servidor');
    });
    $scope.PagoServicios = {};
    $http.get(url+'PagoServicios/buscar/3').then(function(x){
        $scope.PagoServicios = x.data;
        $scope.PagoServicios = {
            servicio: $scope.PagoServicios.servicio,
            monto: $scope.PagoServicios.monto,
            
        };
    },function(){
        alert('Error del servidor');
    });
    $scope.Menu2 = function(){
        window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Servicios = function () {
        window.location.href = "/PagodeServicios.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    
}]);
//-----------------------------------------------------------------------------------------

app.controller("EscolarController", ['$scope','$http','$location',function($scope,$http,$location){
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Start Bank ";
    $scope.tarjeta = {};
    $scope.Cliente ={};
    
    // Función para obtener información del préstamo
    $scope.tarjetas = function () {
        $http.get(url + 'Prestamos/' + $scope.id)
            .then(function(response) {
                $scope.Prestamo = response.data;
                $scope.Prestamo = { 
                    plazoMeses: $scope.Prestamo.plazoMeses,
                    monto: $scope.Prestamo.monto,
                    fechaInicio: $scope.Prestamo.fechaInicio
                };
                if (!isNaN($scope.Prestamo.monto) && !isNaN($scope.Prestamo.plazoMeses) && $scope.Prestamo.plazoMeses !== 0) {
                    $scope.resultadoDivision = $scope.Prestamo.monto / $scope.Prestamo.plazoMeses;
                } else {
                    console.error("Error: Los valores de monto y plazoMeses deben ser números válidos y plazoMeses no puede ser cero.");
                }
            })
            .catch(function(error) {
                console.error('Error al obtener información del préstamo:', error);
                alert('Error al obtener información del préstamo. Por favor, inténtelo de nuevo más tarde.');
            });
    };
    $scope.tarjeta.cliente = {};
    $http.get(url+'Cuenta/'+$scope.id).then(function(x){
        $scope.tarjeta = x.data;
        $scope.tarjeta.cliente = {
            iD_Cliente: $scope.tarjeta.cliente.iD_Cliente,
            nombre: $scope.tarjeta.cliente.nombre,
            apellido: $scope.tarjeta.cliente.apellido,
            direccion: $scope.tarjeta.cliente.direccion,
            ciudad: $scope.tarjeta.cliente.ciudad,
            telefono: $scope.tarjeta.cliente.telefono,
            email: $scope.tarjeta.cliente.email
           
        };
        
    },function(){
        alert('Error del servidor');
    });

    // Llama a la función para obtener información del préstamo
    $scope.tarjetas();

    $scope.retirarSaldo = function() {
        var monto = parseFloat($scope.resultadoDivision);
        if (monto <= 0 || isNaN(monto)) {
            alert("Ingrese un monto válido.");
            return;
        }
        if (!$scope.tarjeta.iD_Cuenta) {
            alert("Error: No se ha podido cargar la información de la cuenta.");
            return;
        }
    
        if (monto > $scope.tarjeta.saldo) {
            alert("Fondos insuficientes.");
            return;
        }

        // Realiza una solicitud al servidor para actualizar el saldo
        $scope.tarjeta.saldo -= monto;
        $http.put(url + 'Cuenta/', $scope.tarjeta)
            .then(function(response) {
                alert("Saldo actualizado correctamente.");
                $scope.Prestamo.plazoMeses -= 1;
                $scope.Prestamo.monto -= monto;
                $http.put(url + 'Prestamos/buscar/', $scope.Prestamo)
                    .then(function(response) {
                        alert("Saldo actualizado correctamente.");
                    })
                    .catch(function(error) {
                        console.error('Error al actualizar saldo del préstamo:', error);
                        alert('Error al actualizar saldo del préstamo. Por favor, inténtelo de nuevo más tarde.');
                    });
            })
            .catch(function(error) {
                console.error('Error al actualizar saldo de la cuenta:', error);
                alert('Error al actualizar saldo de la cuenta. Por favor, inténtelo de nuevo más tarde.');
            });
    };

    $scope.Menu2 = function(){
        window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };

    $scope.ticket = function(){
        window.location.href = "/prestamoescolar.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Servicios = function () {
        window.location.href = "/PagodeServicios.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
}]);

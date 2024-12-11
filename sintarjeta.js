var app = angular.module('MyFirstApp', []);
app.controller("MenuController2", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Bienvenido a Start Bank ";


    $scope.Deposito = function () {
        window.location.href = "/depositosintarjeta.html";
    };
    $scope.sinterjetaS = function () {
        window.location.href = "/sinterjetamenu.html";
    };
    $scope.Servicios = function () {
        window.location.href = "/PagodeServicios.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
}]);

var url = 'http://localhost:5288/api/';
app.controller("Deposito2Controller", ["$scope", '$http', function ($scope, $http) {
    $scope.nombreBanco = "Start Bank ";
    $scope.continuar = true;
    $scope.NumeroTarjeta = "";
    $scope.validador_Tarjeta = false;
    $scope.tarjeta = {};
    $scope.display = '';
    $scope.number = function (num) {
        $scope.display += num;
    };

    $scope.retirarSaldo = function () {
        var monto = parseFloat($scope.display);
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

        $scope.tarjeta.saldo += monto;
        $http.put(url + 'Cuenta/', $scope.tarjeta)
            .then(function (response) {

                $scope.display = '';

                alert("Saldo actualizado correctamente.");
                window.location.href = "/depositosintarjeta2.html#!/?id=" + $scope.tarjeta.iD_Cuenta + '&retiro=' + monto;
            })
            .catch(function (error) {
                // Manejar errores de la solicitud
                console.error('Error al actualizar saldo:', error);
                alert('Error al actualizar saldo. Por favor, inténtelo de nuevo más tarde.');
            });
    };

    $scope.clear1 = function () {
        $scope.display = '';
    };


    $scope.tarjetas = function () {
        if ($scope.NumeroTarjeta.length === 16) {
            $http.get(url + 'Cuenta/buscar/' + $scope.NumeroTarjeta).then(function (resp) {
                $scope.validador_Tarjeta = true;
                $scope.tarjeta = resp.data;
                $scope.continuar = false;
            }, function () {

            })
        }
    }

    $http.get(url + 'Cuenta/' + $scope.id).then(function (x) {
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

    }, function () {
        alert('Error del servidor');
    });
    $scope.Menu2 = function () {
        window.location.href = "/Tramites.html";
    };

}]);

//-------------------------------------------------------------------------------------------------------------------
app.controller("Ticket2Controller", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.id = $location.search().id;
    $scope.retiro = $location.search().retiro;
    $scope.nombreBanco = "Bienvenido a Start Bank";
    $scope.tarjeta = {};
    $scope.montoRetirado = 0;

    // Función para realizar el retiro
    $scope.retirarSaldo = function () {
        var monto = parseFloat($scope.display);
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

        // Actualizar el saldo en el cliente
        $scope.tarjeta.saldo -= monto;
        $scope.montoRetirado = monto;

        // Redirigir a la página de ticket
        window.location.href = "/depositosintarjeta2.html#!/?id=" + $scope.tarjeta.iD_Cuenta + '&retiro=' + monto;
    };


    $scope.cargarInfoCuenta = function () {
        $http.get(url + 'Cuenta/' + $scope.id)
            .then(function (response) {
                $scope.tarjeta = response.data;
            })
            .catch(function (error) {
                console.error('Error al cargar la información de la cuenta:', error);
                alert('Error al cargar la información de la cuenta. Por favor, inténtelo de nuevo más tarde.');
            });
    };
    $http.get(url + 'Cuenta/' + $scope.id).then(function (x) {
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

    }, function () {
        alert('Error del servidor');
    });

    $scope.cargarInfoCuenta();
    $scope.Menu2 = function () {
        window.location.href = "/Tramites.html";
    };
}]);
//-------------------------------------------------------------------------------------------------------------------


app.controller("serviciosintarjeta", ['$scope', '$http', '$location', function ($scope, $http) {

    $scope.nombreBanco = "Bienvenido a Start Bank ";



    $scope.CFE = function () {
        window.location.href = "/sinterjetaCFE.html";
    };
    $scope.Deposito = function () {
        window.location.href = "/depositosintarjeta.html";
    };
    $scope.Menu2 = function () {
        window.location.href = "/Tramites.html";
    };
}]);




//---------------------------------------------------------------------------------------------------
app.controller("sinterjetaCFE", ['$scope', '$http', '$location', function ($scope, $http) {
    $scope.nombreBanco = "Bienvenido a Start Bank ";
    $scope.continuar = true;
    $scope.iD_PagoServicio = "";
    $scope.validador_Tarjeta = false;
    $scope.PagoServicios = {};
    $scope.retirarSaldo = function () {
        alert("Pago Exitoso");
        window.location.href = "/sinterjetamenu.html";
    }

    $scope.PagoServicio = function () {
        if ($scope.iD_PagoServicio.length === 5) {
        $http.get('http://localhost:5288/api/PagoServicios/buscar/' + $scope.iD_PagoServicio).then(function (resp) {
            $scope.validador_Tarjeta = true;
            $scope.PagoServicios = resp.data;
            $scope.continuar = false;
            $scope.PagoServicios.cliente = {
                iD_Cliente: $scope.PagoServicios.cliente.iD_Cliente,
                nombre: $scope.PagoServicios.cliente.nombre,
                apellido: $scope.PagoServicios.cliente.apellido,
                direccion: $scope.PagoServicios.cliente.direccion,
                ciudad: $scope.PagoServicios.cliente.ciudad,
                telefono: $scope.PagoServicios.cliente.telefono,
                email: $scope.PagoServicios.cliente.email
            };
        }, function () {
            alert('Error del servidor');
        });
    }
}

$scope.menu = function () {
    window.location.href = "/sinterjetamenu.html";
};

}]);

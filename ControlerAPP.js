var app = angular.module('MyFirstApp', []);
var url = 'http://localhost:5288/api/';

app.controller("FirstController", ["$scope", '$http', function ($scope, $http) {
    $scope.nombreBanco = "Bienvenido a Start Bank ";
    $scope.continuar = true;

    $scope.NumeroTarjeta = "";
    $scope.nip = "";
    $scope.validador_Tarjeta = false;
    $scope.tarjeta = {};
    $scope.validar = function () {
        if ($scope.tarjeta.nip == $scope.nip) {
            window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
        } else {
            alert("nip incorecto");
        }
    }
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
}]);


/*app.controller("GeneralController", ['$scope','$http','$location',function($scope,$http,$location){
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.tarjeta = {};
    $http.get(url+'Cuenta/'+$scope.id).then(function(x){
        $scope.tarjeta = x.data;
    },function(){
        alert('Error del servidor');
    });
}]); */
app.controller("MenuController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Bienvenido a Start Bank ";
    $scope.tarjeta = {};
    $scope.tarjeta.cliente = {}
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
    $scope.retiro = function () {
        window.location.href = "/Retiros.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Deposito = function () {
        window.location.href = "/Deposito.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Transferir = function () {
        window.location.href = "/Transferencia.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Servicios = function () {
        window.location.href = "/PagodeServicios.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
}]);

app.controller("RetiroController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Start Bank ";
    $scope.tarjeta = {};
    $scope.display = '';
    $scope.number = function (num) {
        $scope.display += num;
    };
    $scope.retirarSaldo = function () {
        var monto = parseFloat($scope.display);
        if (monto <= 99 || isNaN(monto)) {
            alert("Solo retiros apartir de $100");
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
        if (monto > 9000) {
            alert("No se puede hacer retiros mayores a 9000");
            return;
        }

        // Realizar una solicitud al servidor para actualizar el saldo
        $scope.tarjeta.saldo -= monto;
        $http.put(url + 'Cuenta/', $scope.tarjeta)
            .then(function (response) {
                // Si la actualización fue exitosa, actualiza el saldo en el cliente
                $scope.tarjeta.saldo -= monto;
                $scope.display = '';
                // También podrías redirigir a una página de confirmación aquí si es necesario
                alert("Retiro Exitoso.");
                var mensajeHTML = `
                <html lang="es">
                <head>
                    <meta charset="utf-8">
                    <title>StartBank</title>
                    
                    <style>
                        /* Estilos CSS para el cuerpo del mensaje de correo electrónico */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f2f2f2;
                            padding: 20px;
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                        .mensaje {
                            background-color: #fff;
                            border-radius: 5px;
                            padding: 20px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        .container-fluid2 {
                            color: aliceblue;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            max-width: 600px;
                            max-height: 600px; 
                            margin: 0 auto; 
                            background-image:  https://drive.google.com/file/d/1pHTByuWYQROT5wMSPY2MK1FbvB3r0YIA/view; /* URL de la imagen de fondo */
                            background-size: cover; /* Ajusta el tamaño de la imagen para cubrir todo el contenedor */
                            background-position: center;
                        }
                        .ticket {
                            color: rgb(209, 25, 230);
                        }
                        .menu {
                            color: rgb(209, 25, 230);
                        }
                        h2{
                            color: rgb(0, 0, 0);
                            text-align: center;
                        }
                        
                        .cuadro {
                            display: flex;
                            text-align: center;
                            background-position: center;
                            align-items: center;
                            justify-content: center;
                            height: 100vh; 
                            width: 100%; 
                            margin: 0 auto; 
                            background-size: cover;
                            background-repeat: no-repeat;
                        }
                    </style>
                </head>
                <body class="cuadro">
                    <div class="container-fluid2 main-container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="card text-center" style="padding: 20px;">
                                    <img class="left" src="https://url-de-tu-imagen.com/LOGO10.png" alt="" style="max-width: 100px; max-height: 100px;">
                                    <h2> Te informamos que se ha realizado un retiro exitoso en tu cuenta </h2>
                                    <h2> Si necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros Tel. 9999924371 </h2>
                                    <br>
                                    <h1>`+$scope.nombreBanco+`</h1>
                                    <h3 class="menu">Ticket Retiro</h3>
                                    <h2>Número de Tarjeta: `+$scope.tarjeta.numero_Tarjeta+`</h2>
                                    <h2>`+$scope.tarjeta.cliente.nombre+`  `+$scope.tarjeta.cliente.apellido+`</h2>
                                    <form class="Retirocss" name="retiroEfectivo" style="text-align: center;">
                                        <div>
                                            <h3 class="ticket">Monto Depositado: `+monto+`</h3>
                                            <h3 class="ticket">Saldo actual: $`+$scope.tarjeta.saldo +`</h3>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
                `;

                $http.post('http://localhost:5288/api/sendEmail', { destinatario: $scope.tarjeta.cliente.email, asunto: 'Retiro exitoso', mensaje: mensajeHTML })
                    .then(function (response) {
                        // Manejar la respuesta si es necesario
                        console.log('Correo enviado correctamente');
                    })
                    .catch(function (error) {
                        // Manejar errores si los hay
                        console.error('Error al enviar el correo', error);
                    });




                window.location.href = "/Retiros3.html#!/?id=" + $scope.tarjeta.iD_Cuenta + '&retiro=' + monto;
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
    $scope.tarjeta.cliente = {};
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
    $scope.retiro = function () {
        window.location.href = "/Retiros.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
}]);

//------------------------------------------------------------------------------------------------------------------------------------------

app.controller("RetiroController1", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.id = $location.search().id;
    console.log($scope.id);
    $scope.nombreBanco = "Start Bank ";
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
        if (monto > 9000) {
            alert("No se puede hacer retiros mayores a 9000");
            return;
        }

        // Realizar una solicitud al servidor para actualizar el saldo
        $scope.tarjeta.saldo -= monto;
        $http.put(url + 'Cuenta/', $scope.tarjeta)
            .then(function (response) {
                // Si la actualización fue exitosa, actualiza el saldo en el cliente
                $scope.tarjeta.saldo -= monto;
                $scope.display = '';
                // También podrías redirigir a una página de confirmación aquí si es necesario
                alert("Saldo actualizado correctamente.");

                // Enviar correo electrónico con formato HTML y estilos CSS
                var mensajeHTML = `
                <html lang="es">
                <head>
                    <meta charset="utf-8">
                    <title>StartBank</title>
                    
                    <style>
                        /* Estilos CSS para el cuerpo del mensaje de correo electrónico */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f2f2f2;
                            padding: 20px;
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                        .mensaje {
                            background-color: #fff;
                            border-radius: 5px;
                            padding: 20px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        .container-fluid2 {
                            color: aliceblue;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            max-width: 600px;
                            max-height: 600px; 
                            margin: 0 auto; 
                            background-image:  url('https://drive.google.com/file/d/1pHTByuWYQROT5wMSPY2MK1FbvB3r0YIA/view');
                            background-size: cover; /* Ajusta el tamaño de la imagen para cubrir todo el contenedor */
                            background-position: center;
                        }
                        .ticket {
                            color: rgb(209, 25, 230);
                        }
                        .menu {
                            color: rgb(209, 25, 230);
                        }
                        h2{
                            color: rgb(0, 0, 0);
                            text-align: center;
                        }
                        
                        .cuadro {
                            display: flex;
                            text-align: center;
                            background-position: center;
                            align-items: center;
                            justify-content: center;
                            height: 100vh; 
                            width: 100%; 
                            margin: 0 auto; 
                            background-size: cover;
                            background-repeat: no-repeat;
                        }
                    </style>
                </head>
                <body class="cuadro">
                    <div class="container-fluid2 main-container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="card text-center" style="padding: 20px;">
                                <form class="Retirocss" name="retiroEfectivo" style="text-align: center;">
                                    <img class="left" src="https://drive.google.com/file/d/1X56Zs_cTHYsWde01gt9bdYqrXk-50jtY/view" alt="" style="max-width: 100px; max-height: 100px;">
                                    <h2> Te informamos que se ha realizado un retiro exitoso en tu cuenta </h2>
                                    <h2> Si necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros Tel. 9999924371 </h2>
                                    <br>
                                    <h1>`+$scope.nombreBanco+`</h1>
                                    <h3 class="menu">Ticket Retiro</h3>                                    
                                    <h2>Número de Tarjeta: `+$scope.tarjeta.numero_Tarjeta+`</h2>
                                    <h2>`+$scope.tarjeta.cliente.nombre+`  `+$scope.tarjeta.cliente.apellido+`</h2>
                                   
                                        <div>
                                            <h3 class="ticket">Monto Retirado: `+monto+`</h3>
                                            <h3 class="ticket">Saldo actual: $`+$scope.tarjeta.saldo +`</h3>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
                `;

                $http.post('http://localhost:5288/api/sendEmail', { destinatario: $scope.tarjeta.cliente.email, asunto: 'Retiro exitoso', mensaje: mensajeHTML })
                    .then(function (response) {
                        // Manejar la respuesta si es necesario
                        console.log('Correo enviado correctamente');
                    })
                    .catch(function (error) {
                        // Manejar errores si los hay
                        console.error('Error al enviar el correo', error);
                    });

                window.location.href = "/Retiros3.html#!/?id=" + $scope.tarjeta.iD_Cuenta + '&retiro=' + monto;
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
    $scope.tarjeta.cliente = {};
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
    $scope.retiro = function () {
        window.location.href = "/Retiros2.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
    $scope.Menupr1 = function () {
        window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };

}]);




app.controller("TicketController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
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
        window.location.href = "/Retiros3.html#!/?id=" + $scope.tarjeta.iD_Cuenta + "&monto=" + monto;
    };

    // Función para cargar la información de la cuenta
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

    // Llamar a la función para cargar la información de la cuenta al cargar el controlador
    $scope.cargarInfoCuenta();

    // Función para regresar al menú principal
    $scope.Menupr = function () {
        window.location.href = "/MenuPrincipal.html#!/?id=" + $scope.tarjeta.iD_Cuenta;
    };
}]);



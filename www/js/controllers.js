angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup,$timeout,$cordovaSQLite) {
    $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
        title: 'Agenda' ,
        template: 'Datos guardados'
        
         });
    
    }
    


$scope.guardar = function(persona){
    
    $cordovaSQLite.execute(db, 'INSERT INTO agenda (nombre,apellido,telefono,email) VALUES (?,?,?,?)', [persona.nombre,persona.apellido,persona.telefono,persona.email])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado!";
        }, function(error) {
            $scope.statusMessage = "Error al guardar: " + error.message;
        })
    
    
    
    /*
    
    
    console.log("Nombre: "+persona.nombre);
    console.log("Apellido: "+persona.apellido);
    console.log("Telefono: "+persona.telefono);
    console.log("Email: "+persona.email);
*/
}
})


.controller('ChatsCtrl', function($scope, Chats,$cordovaSQLite) {
 

  $scope.chats = [];
  
  
  
        $cordovaSQLite.execute(db, 'SELECT * FROM agenda ORDER BY id DESC')
            .then(
                function(result) {

                    if (result.rows.length > 0) {
                         for(var i = 0; i < result.rows.lenght;i++)
                         {

                        $scope.chats.push({"nombre":result.rows.item(i).nombre,
                                     "apellido":result.rows.item(i).apellido,
                                      "telefono":result.rows.item(i).telefono,
                                       "email":result.rows.item(i).email});
                        }
                        
                     }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
            );
  
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

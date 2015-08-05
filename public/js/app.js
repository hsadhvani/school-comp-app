var app = angular.module('school-app', ['ngRoute']);


app.directive("contenteditable", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});

app.factory('Page', function(){
  var title = 'Introduction';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

// route information for ng view

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
      .when("", {
            templateUrl: "views/main_page.html",
            controller: "noCtrl"
        })
        .when("/", {
            templateUrl: "views/main_page.html",
            controller: "noCtrl"
        })
        .when("/software", {
            templateUrl: "views/software/common_view.html",
            controller: "softwareCtrl"
        })
        .when("/software/code", {
            templateUrl: "views/software/code.html",
            controller: "softwareCodeCtrl"
        })
        .when("/intro", {
            templateUrl: "views/intro/common_view.html",
            controller: "introCtrl"

        })
        .when("/hardware", {
            templateUrl: "views/hardware/common_view.html",
            controller: "hardwareCtrl"
        })
        .otherwise({redirectTo : "/" });
}]);


app.controller('MainCtrl',function($scope,Page){
    $scope.Page = Page;
     $scope.goToNextSlide = function(content){
        window.location.hash = content.next_page;
    };
});

app.controller('noCtrl',function($scope,Page){
    Page.setTitle("Introduction to Computing");
});


app.controller('introCtrl',function($scope, Page){
    Page.setTitle("Introduction to Computing");
    nextslide('.section1', '.main');
    $scope.content =  {
            "class" : "section1",
            "title" : "An Introduction to Computers",
            "sub_title" : "What is a computer?",
            "content" : ["At the most basic level, a computer simply takes some input and produces some output otherwise known as I/O.  You can think of a calculator as a computer.  It accepts numbers as input, does something with that input and produces an output.", " Computers can be quite large and very small depending on what they use them for. They can be the size of your finger, or the size of a car. (PICTURES – Intel Watson/Supercomputer)", "Almost everything in the world that you use today that uses electricity has some kind of computer inside of it.  Some examples of devices that depend on various types of computers that you may find in your everyday life include:"],
            "image" : "assets/computers.png",
            "list" : ["TV’s","Cellphones","Automobiles", "iPads/Tablets", "Calculators", "Wireless Routers", "Smart Watches"],
            "next_section" : "section2",
            "next_page" : "software"
        }
});

app.controller('softwareCtrl',function($scope, Page){
    Page.setTitle("Introduction to Software");
    nextslide('.main', '.section1');
    $scope.content =  {
            "class" : "section2",
            "title" : "Software",
            "sub-title" : "What is software?",
            "content" : "Lorem ipsum dolor sit amet, qui utinam corpora te, vel iriure suavitate in, pro zril cetero an. Eum an quodsi vulputate reformidans, ipsum simul omittam ne sed. Vel ne ancillae probatus. Cum suavitate adipiscing in, dico solum tation et ius, te ipsum novum iudico mel. Sea mazim ignota dissentias et. Volumus adolescens ea usu, essent dissentiunt his et. Ei insolens forensibus sea. In nec scripta feugait albucius, et nam purto utinam facete. An has elitr forensibus, vim alterum vivendum laboramus an. Mei no nemore diceret aliquid, scripta dolores sit ex. Ad lobortis delicata sit, ne quando volutpat erroribus vis. Delenit constituam ne per. Nibh congue detraxit cu vim, probatus intellegat est ut, te rebum graeci reprimique sea.",
            "image" : "assets/thecode.png",
            "list" : ["Something","Something else","Where's the After After Party?"],
            "next_section" : "section1",
            "next_page" : "hardware"
        };

});

app.controller('hardwareCtrl',function($scope, Page){
    Page.setTitle("Introduction to Hardware");
        $scope.content =  {
            "class" : "section1",
            "title" : "Hardware",
            "sub-title" : "What is hardware?",
            "content" : "Lorem ipsum dolor sit amet, qui utinam corpora te, vel iriure suavitate in, pro zril cetero an. Eum an quodsi vulputate reformidans, ipsum simul omittam ne sed. Vel ne ancillae probatus. Cum suavitate adipiscing in, dico solum tation et ius, te ipsum novum iudico mel. Sea mazim ignota dissentias et. Volumus adolescens ea usu, essent dissentiunt his et. Ei insolens forensibus sea. In nec scripta feugait albucius, et nam purto utinam facete. An has elitr forensibus, vim alterum vivendum laboramus an. Mei no nemore diceret aliquid, scripta dolores sit ex. Ad lobortis delicata sit, ne quando volutpat erroribus vis. Delenit constituam ne per. Nibh congue detraxit cu vim, probatus intellegat est ut, te rebum graeci reprimique sea.",
            "image" : "assets/thecode.png",
            "list" : ["Something","Something else","Where's the After After Party?"],
            "next_section" : "",
            "next_page" : ""
        };
});


app.controller('softwareCodeCtrl',function($scope,Page){
    Page.setTitle("Introduction to Software");
    $scope.functions = [
        {
            "name" : "updateColor",
            "callFunction" : "updateColor",
            "variableOne" : "newColor",
            "content" : ["var contentHeading = document.getElementById('contentHeading');", "contentHeading.style.color = color;"],
            "show" : false,
            "output" : "",
            "errorMessage" : { 
                "showErrorMessage" : false,
                "message" : ""
            }
        },
        {
            "name" : "addNumbers",
            "callFunction" : "addNumbers",
            "variableOne" : "numberOne",
            "variableTwo" : "numberTwo",
            "content" : [" return numberOne + numberTwo;"],
            "show" : false,
            "showOutput" : false,
            "output" : "",
            "errorMessage" : { 
                "showErrorMessage" : false,
                "message" : ""
            }
        }
    ];
    $scope.runFunction = function(what){
        console.log(what);
        if(what.variableOne && what.name == "updateColor"){
            if(!checkValidColor(what.variableOne)){
                what.errorMessage.showErrorMessage = true;
                what.errorMessage.message = "Children!! "+ what.variableOne +" is not valid color.";
            }
            else{
                what.errorMessage.showErrorMessage = false;
                window[what.callFunction](what.variableOne);
            }
        }
        else if(what.variableOne && what.variableTwo && what.name == "addNumbers"){
            if(isNaN(what.variableOne) || isNaN(what.variableTwo)){
                what.errorMessage.showErrorMessage = true;
                what.errorMessage.message = "Children numbers!! Not sentences :)";
            }
            else{
                what.showOutput = true; 
                what.errorMessage.showErrorMessage = false;
                what.output =  window[what.callFunction](parseInt(what.variableOne),parseInt(what.variableOne));
            }
           
        }

    };

});

function updateColor(newColor){
    var contentHeading = document.getElementById('contentHeading');
    contentHeading.style.color = newColor;
}

function addNumbers(numberOne, numberTwo){
    return numberOne + numberTwo;
}


function checkValidColor(myColor){
    var valid = $('#testColor').css('color');
    
    $('#testColor').css('color', myColor);
    
    if( valid== $('#testColor').css('color')) {
        return false;
    }
    else { 
        return true;
        $('#testColor').css('color', valid ); 
    }
}

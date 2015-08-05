var app = angular.module('school-app', ['ngRoute','ngAnimate', 'fmp-card']);

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
            "images" : ["assets/imac.png", "assets/tablet.png", "assets/macbook.png", "assets/chromecast.png", "assets/android.png","assets/amazon.png","assets/ipad.png","assets/tv.png","assets/calculator.png","assets/civic.png","assets/pc.png","assets/watch.png"],
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
            "name" : "updateBackgroundColor",
            "callFunction" : "updateBackgroundColor",
            "variableOne" : "newColor",
            "content" : ["document.body.style.backgroundColor = newColor;"],
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
        },

    ];
    $scope.runFunction = function(what){
        console.log(what);
        if(what.variableOne && (what.name == "updateColor" || what.name == "updateBackgroundColor")){
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
                what.output =  window[what.callFunction](parseInt(what.variableOne),parseInt(what.variableTwo));
            }
           
        }

    };

});

function updateColor(newColor){
    var contentHeading = document.getElementById('contentHeading');
    contentHeading.style.color = newColor;
}


function updateBackgroundColor(newColor){
    document.body.style.backgroundColor = newColor;
}

function addNumbers(numberOne, numberTwo){
    return numberOne + numberTwo;
}


function checkValidColor(myColor){
    if (checkHex(myColor) || colorNameToHex(myColor)) {
    return true;
    }
    else{
        return false;
    }
}

function colorNameToHex(color) {
    var colors = {
        "aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"
    };

    if (typeof colors[color.toLowerCase()] != 'undefined')
        return colors[color.toLowerCase()];

    return false;
}

function checkHex(color) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

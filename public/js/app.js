var app = angular.module('school-app', ['ngRoute']);

app.directive("contenteditable", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function () {
                scope.$apply(read);
            });
        }
    };
});
app.directive("flip", function(){
  
  function setDim(element, width, height){
    element.style.width = width;
    element.style.height = height;
  }
  
  var cssString =
    "<style> \
    .flip {float: left; overflow: hidden} \
    .flipBasic { \
    position: absolute; \
    -webkit-backface-visibility: hidden; \
    backface-visibility: hidden; \
    transition: -webkit-transform .5s; \
    transition: transform .5s; \
    -webkit-transform: perspective( 800px ) rotateY( 0deg ); \
    transform: perspective( 800px ) rotateY( 0deg ); \
    } \
    .flipHideBack { \
    -webkit-transform:  perspective(800px) rotateY( 180deg ); \
    transform:  perspective(800px) rotateY( 180deg ); \
    } \
    .flipHideFront { \
    -webkit-transform:  perspective(800px) rotateY( -180deg ); \
    transform:  perspective(800px) rotateY( -180deg ); \
    } \
    </style> \
    ";
    
  document.head.insertAdjacentHTML("beforeend", cssString);
  
  
  return {
    restrict : "E",
    controller: function($scope, $element, $attrs){
      
      var self = this;
      self.front = null,
      self.back = null;
      
      
      function showFront(){
        self.front.removeClass("flipHideFront");
        self.back.addClass("flipHideBack");
      }
      
      function showBack(){
        self.back.removeClass("flipHideBack");
        self.front.addClass("flipHideFront");
      }
      
      self.init = function(){
        self.front.addClass("flipBasic");
        self.back.addClass("flipBasic");
        
        showFront();
        self.front.on("click", showBack);
        self.back.on("click", showFront);
      }
    
    },
    
    link : function(scope,element,attrs, ctrl){
      
      var width = attrs.flipWidth || "100%",
        height =  attrs.flipHeight || "200px";
      
      element.addClass("flip");
      
      if(ctrl.front && ctrl.back){
        [element, ctrl.front, ctrl.back].forEach(function(el){
          setDim(el[0], width, height);
        });
        ctrl.init();
      } else {
        console.error("FLIP: 2 panels required.");
      }
    }
  }
  
});

app.directive("flipPanel", function(){
  return {
    restrict : "E",
    require : "^flip",
    //transclusion : true,
    link: function(scope, element, attrs, flipCtr){
      if(!flipCtr.front) {flipCtr.front = element;}
      else if(!flipCtr.back) {flipCtr.back = element;}
      else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});

app.factory('Page', function () {
    var title = 'Introduction';
    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle;
        }
    };
});

// route information for ng view

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
            templateUrl: "views/common_view.html",
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
            templateUrl: "views/common_view.html",
            controller: "hardwareCtrl"
        })
        .otherwise({redirectTo: "/"});
}]);


app.controller('MainCtrl', function ($scope, Page) {
    $scope.Page = Page;
    $scope.goToNextSlide = function (content) {
        window.location.href = "/"+content.next_page;
    };
});

app.controller('noCtrl', function ($scope, Page) {
    Page.setTitle("Introduction to Computing");

});


app.controller('introCtrl', function ($scope, Page) {
    Page.setTitle("Introduction to Computing");
    nextslide('.section1', '.main');
    $scope.content =  {
            "class" : "section1",
            "title" : "An Introduction to Computers",
            "sub_title" : "What is a computer?",
            "content" : ["At the most basic level, a computer simply takes some input and produces some output otherwise known as I/O.  You can think of a calculator as a computer.  It accepts numbers as input, does something with that input and produces an output.", " Computers can be quite large and very small depending on what they use them for. They can be the size of your finger, or the size of a car. (PICTURES – Intel Watson/Supercomputer)", "Almost everything in the world that you use today that uses electricity has some kind of computer inside of it. Click on the tiles to learn more!"],
            "cells1" : [{"pic" :"assets/imac.png",
                        "rel" : "jZ5n6sxZyEQ",
                        "logo": "assets/logo/imac.png"},
                        {"pic" : "assets/tablet.png",
                        "rel": "gLBuj69mOPg",
                        "logo": "assets/logo/experia.jpg"},
                        {"pic" : "assets/macbook.png",
                        "rel" : "mWX2S3c6cS0",
                        "logo": "assets/logo/macbookpro.png"},
                        {"pic" : "assets/chromecast.png",
                        "rel" : "5qZG3sJpHIo",
                        "logo": "assets/logo/chromecast.png"}], 
            "cells2" : [{"pic" : "assets/android.png",
                        "rel" : "PrOwlDxZUYg",
                        "logo": "assets/logo/nexus.png"},
                        {"pic": "assets/amazon.png",
                        "rel" : "quWFjS3Ci7A",
                        "logo": "assets/logo/amazon.png"},
                        {"pic": "assets/ipad.png",
                        "rel" : "vINuro58nng",
                        "logo": "assets/logo/ipad.png"},
                        {"pic": "assets/tv.png",
                        "rel" : "ARmROQpFCJc",
                        "logo": "assets/logo/samsung.jpg"},
                        {"pic": "assets/calculator.png",
                        "rel" : "HZrml020C0s",
                        "logo": "assets/logo/ti.png"},
                        {"pic": "assets/civic.png",
                        "rel" : "KhdBZxpKC-s",
                        "logo": "assets/logo/civic.jpg"},
                        {"pic": "assets/pc.png",
                        "rel" : "Qx4tE8JD71s",
                        "logo": "assets/logo/windows.png"},
                        {"pic": "assets/watch.png",
                        "rel" : "1Ql0Z8Il73s",
                        "logo": "assets/logo/watch.png"}],
            "list" : ["TV’s","Cellphones","Automobiles", "iPads/Tablets", "Calculators", "Wireless Routers", "Smart Watches"],
            "next_section" : "section2",
            "next_page" : "software",
            "buttonText" : "Next Section"
        }
});

app.controller('softwareCtrl', function ($scope, Page) {
    Page.setTitle("Introduction to Software");
    nextslide('.main', '.section1');
    $scope.content = {
        "class": "section2",
        "title": "Software",
        "sub-title": "What is software?",
        "content": "Lorem ipsum dolor sit amet, qui utinam corpora te, vel iriure suavitate in, pro zril cetero an. Eum an quodsi vulputate reformidans, ipsum simul omittam ne sed. Vel ne ancillae probatus. Cum suavitate adipiscing in, dico solum tation et ius, te ipsum novum iudico mel. Sea mazim ignota dissentias et. Volumus adolescens ea usu, essent dissentiunt his et. Ei insolens forensibus sea. In nec scripta feugait albucius, et nam purto utinam facete. An has elitr forensibus, vim alterum vivendum laboramus an. Mei no nemore diceret aliquid, scripta dolores sit ex. Ad lobortis delicata sit, ne quando volutpat erroribus vis. Delenit constituam ne per. Nibh congue detraxit cu vim, probatus intellegat est ut, te rebum graeci reprimique sea.",
        "image": "assets/thecode.png",
        "list": ["Something", "Something else", "Where's the After After Party?"],
        "next_section": "section1",
        "next_page": "software/code",
        "buttonText" : "Learn to Code"

    };

});

app.controller('hardwareCtrl', function ($scope, Page) {
    nextslide('.section2', '.main');
    Page.setTitle("Introduction to Hardware");
    $scope.content = {
        "class": "section1",
        "title": "Hardware",
        "sub-title": "What is hardware?",
        "content": "Lorem ipsum dolor sit amet, qui utinam corpora te, vel iriure suavitate in, pro zril cetero an. Eum an quodsi vulputate reformidans, ipsum simul omittam ne sed. Vel ne ancillae probatus. Cum suavitate adipiscing in, dico solum tation et ius, te ipsum novum iudico mel. Sea mazim ignota dissentias et. Volumus adolescens ea usu, essent dissentiunt his et. Ei insolens forensibus sea. In nec scripta feugait albucius, et nam purto utinam facete. An has elitr forensibus, vim alterum vivendum laboramus an. Mei no nemore diceret aliquid, scripta dolores sit ex. Ad lobortis delicata sit, ne quando volutpat erroribus vis. Delenit constituam ne per. Nibh congue detraxit cu vim, probatus intellegat est ut, te rebum graeci reprimique sea.",
        "image": "assets/thecode.png",
        "list": ["Something", "Something else", "Where's the After After Party?"],
        "next_section": "",
        "next_page": "",
        "buttonText" : "Next Section"

    };
});


app.controller('softwareCodeCtrl', function ($scope, Page) {
    Page.setTitle("Introduction to Software");
    $scope.functions = [
        {
            "name": "updateColor",
            "callFunction": "updateColor",
            "variableOne": {name: "newColor", tooltip: "A new color for the content"},
            "content": ["var contentHeading = document.getElementById('contentHeading');", "contentHeading.style.color = color;"],
            "show": false,
            "output": "",
            "errorMessage": {
                "showErrorMessage": false,
                "message": ""
            },
            "whatDoesItDo": "Click here to change color of content"
        },
        {
            "name": "updateBackgroundColor",
            "callFunction": "updateBackgroundColor",
            "variableOne": {name: "newColor", tooltip: "A new background color the page"},
            "content": ["document.body.style.backgroundColor = newColor;"],
            "show": false,
            "output": "",
            "errorMessage": {
                "showErrorMessage": false,
                "message": ""
            }, "whatDoesItDo": "Click here to change the background color of the page"

        },
        {
            "name": "addNumbers",
            "callFunction": "addNumbers",
            "variableOne": {name: "numberOne", tooltip: "A Number to add"},
            "variableTwo": {name: "numberTwo", tooltip: "A Number to add"},
            "content": [" return numberOne + numberTwo;"],
            "show": false,
            "showOutput": false,
            "output": "",
            "errorMessage": {
                "showErrorMessage": false,
                "message": ""
            }, "whatDoesItDo": "Click here to two add these two numbers"
        },

    ];
    $scope.runFunction = function (what) {
        if (what.variableOne && (what.name == "updateColor" || what.name == "updateBackgroundColor")) {
            if (!checkValidColor(what.variableOne.name)) {
                what.errorMessage.showErrorMessage = true;
                what.errorMessage.message = "Children!! " + what.variableOne.name + " is not valid color.";
            }
            else {
                what.errorMessage.showErrorMessage = false;
                window[what.callFunction](what.variableOne.name);
            }
        }
        else if (what.variableOne && what.variableTwo && what.name == "addNumbers") {
            if (isNaN(what.variableOne.name) || isNaN(what.variableTwo.name)) {
                what.errorMessage.showErrorMessage = true;
                what.errorMessage.message = "Children numbers!! Not sentences :)";
            }
            else {
                what.showOutput = true;
                what.errorMessage.showErrorMessage = false;
                what.output = window[what.callFunction](parseInt(what.variableOne.name), parseInt(what.variableTwo.name));
            }

        }

    };

});

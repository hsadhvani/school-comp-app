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
            templateUrl: "views/hardware/hardware_main.html",
            controller: "hardwareMainCtrl"
        })
        .when("/hardware/more", {
            templateUrl: "views/hardware/hardware_more.html",
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
        "subtitle": "What is software?",
        "content": ["When all of our Hardware puzzle pieces are in the right place, and the computer turns on, we need a way of making it do stuff.  This is why we need software to tell our hardware what to do.  Without the software telling the hardware what to do, our computer won’t be able to do any of the fun stuff like play games or surf the Internet.", "Software is really just a list of instructions that tell your computer what to do.  When your computer turns on, many different pieces of software or also referred to as “code” work together.  The MOST important software in any computer is its Operating System or also known as your “OS”.  In the background, your Operating System is constantly starting and ending pieces of code that keep your computer up and running.  Whenever you move your mouse, type on your keyboard, or connect to the Internet, there are multiple pieces of code that run and work together to get the job done.", "Development software is used to help programmers write and develop code.  Usually computer scientists or software engineers will use this type of software to write new pieces of code, fix existing code, or convert code that humans can read into code that only the hardware can run.", "Programmers can write code using their development software in many different languages.  Computer languages are just like languages that humans use to communicate like English, Spanish, French, etc…  Each language has its own format and words the same way that English is different from Spanish.  You can do the same thing in different programming languages even though the code may look a little different."],
        "image": "assets/thecode.png",
        "list": ["Something", "Something else", "Where's the After After Party?"],
        "next_section": "section1",
        "next_page": "software/code",
        "buttonText" : "Learn to Code"

    };

});

app.controller('hardwareCtrl', function ($scope, Page) {
    Page.setTitle("Introduction to Hardware");
});

app.controller('hardwareMainCtrl', function ($scope, Page) {
    Page.setTitle("Introduction to Hardware");
    $scope.hardwareComponents = [
            {
                "name" : "Motherboard",
                "image" : "assets/motherboard.png",
                "desc" : "Every piece of computer equipment is plugged into the motherboard so that each piece of equipment can communicate with each other." 
            },
            {
                "name":"RAM",
                "image" : "assets/ram.png",
                "desc" : "RAM (Random Access memory) type of memory is used to store the code of any applications currently running.  Since your processor performs tasks rapidly, it needs a speedy way of pulling and storing information.  "
            },
            {
                "name" : "CPU",
                "image" : "assets/proc.png",
                "desc" : "Known as the “Brain” or “CPU”.  Your computers processor will perform tasks like multiplying a number or converting 1’s and 0’s into numbers or words extremely quickly.  Every component of your computer requires the brain so without your processor, the computer would stop working completely! "
            },
            {
                "name" : "Storage",
                "image" : "assets/storage.png",
                "desc" : "When your computer is turned off, the information stored in this part of the computer will stay.  This is where all of your pictures, videos, and applications are stored until they are manually deleted by their owner."
            }
        ];
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

define(['commonModule'], function (commonModuleDefinition) {
  'use strict';

  commonModuleDefinition.directive('rfDropdown', function ($compile, $interval, dropDownService) {

      return {
        restrict  : 'A',
        scope     : {},
        controller: Controller,
        link      : {post: link}
      };

      function link(scope, dropdownContainer) {

        var closeCompleteWatcher;
        var openCompleteWatcher;
        var controller    = arguments[3];
        var dropdownPanel = angular.element(scope.contentHTML);

        dropdownContainer = angular.element(dropdownContainer);

        dropdownContainer.find('a').eq(0).on('click', controller.toggleOpen);

        addMouseEvents();

        scope.$watch(function () {
          return scope.open;
        }, function (newValue, oldValue) {

          if (newValue === oldValue) {
            return;
          }

          if (scope.open) {
            initialiseOpen();
          } else {
            initialiseClose();
          }
        });

        positionElementOffScreen();

        function initialiseOpen() {

          addOpenClasses();
          animate({marginTop: '-1px'});
          stopAllWatchers();
          openCompleteWatcher = createWatcherForOpenComplete();
        }

        function addMouseEvents() {
          dropdownContainer.on('mouseleave', handleMouseLeave);
          dropdownContainer.on('mouseenter', handleMouseEnter);
        }

        function initialiseClose() {

          sendToBack();
          animate({marginTop: getClosePosition() + 'px'});
          stopAllWatchers();
          dropdownPanel.removeClass('is-expanded');
          closeCompleteWatcher = createWatcherForCloseComplete();
        }

        function handleMouseLeave() {
          dropDownService.addDocumentClickListener();
        }

        function handleMouseEnter() {
          dropDownService.removeDocumentClickListener();
        }

        function getClosePosition() {

          var position = (dropdownPanel[0].clientHeight + 50) * -1;
          position     = (position === -50) ? -350 : position;
          return position;
        }

        function sendToBack() {
          dropdownContainer.css({zIndex: 1000});
        }

        function stopAllWatchers() {

          if (openCompleteWatcher) {
            openCompleteWatcher.cancel();
          }

          if (closeCompleteWatcher) {
            closeCompleteWatcher.cancel();
          }
        }

        function addOpenClasses() {

          dropdownContainer.addClass('is-selected');
          dropdownPanel.addClass('is-expanded');
        }

        function animate(animationPropertyValue) {
          dropdownPanel.css(animationPropertyValue);
          dropdownPanel.css('transition', '.6s cubic-bezier(0.000, 0.000, 0.580, 1.000) margin-top');
        }

        function positionElementOffScreen() {

          var offScreenPosition = getClosePosition();
          dropdownPanel.css({marginTop: offScreenPosition + 'px'});
        }

        function createWatcherForOpenComplete() {
          openCompleteWatcher = createAnimationEventWatcher(onOpen);
        }

        function createWatcherForCloseComplete() {
          closeCompleteWatcher = createAnimationEventWatcher(onClose);
        }

        function onClose() {
          dropdownContainer.removeClass('is-selected');
        }

        function onOpen() {
          dropdownContainer.css({zIndex: 1001});
        }

        function createAnimationEventWatcher(completeCallBack) {

          var previousPropertyValue;

          var interval = $interval(execute, 40);

          function execute() {

            if (scope.contentHTML[0].offsetTop !== previousPropertyValue) {
              previousPropertyValue = scope.contentHTML[0].offsetTop;
            }
            else {
              animationComplete();
            }
          }

          function animationComplete() {

            $interval.cancel(interval);
            previousPropertyValue = undefined;
            completeCallBack();
          }

          function cancel() {
            $interval.cancel(interval);
          }

          return {
            cancel: cancel
          };
        }
      }

      function Controller($scope, dropDownService) {

        $scope.open     = false;
        this.toggleOpen = toggleOpen;

        this.setContentHTML = setContentHTML;

        function setContentHTML(html) {
          $scope.contentHTML = html;
        }

        function toggleOpen() {
          dropDownService.toggleState($scope);
        }
      }
    })

    //////////////////////////////////////////////////////////////////////
    //
    // DROP_DOWN CONTENT
    //
    //////////////////////////////////////////////////////////////////////

    .directive('rfDropdownContent', function () {

      return {
        restrict: 'A',
        require : '^rfDropdown',
        link    : createLinkObject()
      };

      function createLinkObject() {

        return {pre: pre};

        function pre() {

          var element            = arguments[1];
          var dropdownController = arguments[3];

          element.removeAttr('rf-dropdown-content');

          var newElement = angular.element(element).wrap('<div class="dropdown__panel-wrapper"></div>');

          dropdownController.setContentHTML(newElement);

        }
      }
    })

    //////////////////////////////////////////////////////////////////////
    //
    // DROP_DOWN SERVICE
    //
    //////////////////////////////////////////////////////////////////////

    Service('dropDownService', function ($document) {

      var activeDropdown = {open: false, $digest: angular.noop};

      return {
        toggleState                : toggleState,
        closeCurrentDropdown       : closeDropdownCommand,
        addDocumentClickListener   : addDocumentClickListener,
        removeDocumentClickListener: removeDocumentClickListener

      };

      function toggleState($scope) {

        if ($scope === activeDropdown) {
          closeDropdownCommand();
        } else {
          openDropdownCommand($scope);
        }
      }

      function closeDropdownCommand() {
        closeDropdown(activeDropdown);
      }

      function openDropdownCommand($scope) {

        closeDropdownCommand();
        openDropdown($scope);
      }

      function openDropdown($scope) {

        $scope.open = true;
        $scope.$digest();
        activeDropdown = $scope;
      }

      function closeDropdown($scope) {
        $scope.open = false;
        $scope.$digest();
        activeDropdown = {open: false, $digest: angular.noop};

      }

      function removeDocumentClickListener() {
        $document.off('click', handleDocumentClick);
      }

      function addDocumentClickListener() {
        $document.on('click', handleDocumentClick);
      }

      function handleDocumentClick() {

        closeDropdown(activeDropdown);
        activeDropdown.$digest();
        removeDocumentClickListener();
        activeDropdown = {open: false, $digest: angular.noop};
      }

    });
});
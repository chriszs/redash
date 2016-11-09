import { Paginator } from '../../utils';
import template from './list.html';

function GroupsCtrl($scope, $location, $uibModal, toastr, currentUser, Events, Group) {
  Events.record(currentUser, 'view', 'page', 'groups');
  // $scope.$parent.pageTitle = 'Groups';

  $scope.currentUser = currentUser;
  $scope.groups = new Paginator([], { itemsPerPage: 20 });
  Group.query((groups) => {
    $scope.groups.updateRows(groups);
  });

  $scope.newGroup = () => {
    $uibModal.open({
      component: 'editGroupDialog',
      size: 'sm',
      resolve: {
        group() {
          return new Group({});
        },
      },
    });
  };
}

export default function (ngModule) {
    // $routeProvider.when('/groups', {
    //   templateUrl: '/views/groups/list.html',
    //   controller: 'GroupsCtrl'
    // });
  ngModule.controller('GroupsCtrl', GroupsCtrl);
  return {
    '/groups': {
      template,
      controller: 'GroupsCtrl',
    },
  };
}

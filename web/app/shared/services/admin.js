App.factory('Admin', function($http) {
	return {
		isAdmin: function (){
			return $http({
				method: 'GET',
				url: "http://planpassive.com/adminData"
			});
		}
	}
});
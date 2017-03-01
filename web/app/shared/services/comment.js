App.factory('Comments', function($http) {
	return {
/*		getComments: function (blogKey){
			return $http({
				method: 'GET',
				url: "/comments/" + blogKey
			});
		},*/
		postComment: function (data){
			return $http({
				method: 'POST',
				url: "http://planpassive.com/comments",
				data: data
			})
		}

	}
});
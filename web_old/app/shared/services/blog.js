App.factory('Blog', function($http) {
	return {
		getBlogs: function (){
			return $http({
				method: 'GET',
				url: "http://planpassive.com/blogData"
			});
		},
		deleteBlog: function (blogKey){
			return $http({
				method: 'DELETE',
				url: "http://planpassive.com/blogData/" + blogKey
			});
		},
		editBlog: function (data){
			return $http({
				method: 'PUT',
				url: "http://planpassive.com/blogData",
				data: data
			});
		},
		postBlog: function (data){
			return $http({
				method: 'POST',
				url: "http://planpassive.com/blogData",
				data: data,
			});
		}
	}
});
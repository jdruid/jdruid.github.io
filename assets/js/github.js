jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);    
     
        var list = $('<div class="row" />');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                list.append('<article class="4u 12u$(xsmall) work-item"><a class="image fit thumb" href="'+ (this.homepage?this.homepage:this.html_url) +'"><img src="http://lorempixel.com/348/204/technics?id='+Math.random()+'" /></a><h4>'+this.name+'</h4><p><em>'+(this.language?('('+this.language+')'):'')+'</em>'+this.description+'</p></article>');
               
            }
        });      
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};
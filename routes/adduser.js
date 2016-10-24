
/*
 * move to Admin page.
 */

mysql = require('mysql');
db = require('./routes/commondao')


exports.addusersc = function(req, res){
  res.render('adduser', { title: 'Adduser' });
};


exports.adduser = function(req, res){
	  res.render('login', { title: 'Adduser' });
	  
		var connection = db.dbinit();
		
		connection.connect(function(err) {
			  if (err) {
			    console.error('error connecting: ' + err.stack);
			    return;
			  }
			  console.log('connected as id ' + connection.threadId);
			});
		
		var sql = "insert into crawler.user(userid,name,password) values('";
		sql += req.body.userid + "','" + req.body.username + "','"	+ req.body.userpassword + "')";	
		
		connection.beginTransaction(function(err,result){
			if(err){
				console.log("begin:" + err);
				res.redirect('/');
				return;
			}else{
		var query = connection.query(sql, function (err, rows) {
			if (err) {
				console.log(err);
				connection.rollback();
			} else 
				connection.commit();
				res.redirect('/');	
				});
			}});
		
		db.dbend();
	    
	};
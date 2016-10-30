
/*
 * move to Admin page.
 */

mysql = require('mysql');
db = require('./commondao');

//【ユーザ情報取得ファンクション】
exports.showuser = function(req, res){
	
//DB接続	  
		var connection = db.dbinit();		
		connection.connect(function(err) {
			  if (err) {
			    console.error('error connecting: ' + err.stack);
			    return;
			  }
			  console.log('connected as id ' + connection.threadId);
			});

//SQL準備		
		var sql = "select * from crawler.user";
//		var set;
//SQL実行	
//		var query = function(sql) {
//			return new Promise(function(resolve,reject){
//				connection.query(sql, function (err, rows) {
//					success:{
//						console.log(err);
//						connection.rollback();
//					},fail:
//						console.log(rows);
//					}
//					}
//			}
		
		var coll = function(err, rows){
				if (err) {
					console.log(err);	
					connection.rollback();
				} else{
					console.log(rows);
					return rows;
				}
		}
	
		function query(sql) {connection.query(sql,coll)
			return coll;
		}; 
		
		
//		function query(sql) {connection.query(sql,function(err, rows){
//			if (err) {
//				console.log(err);	
//				connection.rollback();
//			} else{
//				var set = rows;
//				console.log('in ' + set);
//				console.log('in ' + rows);	
//				}
//				})
//		}; 
		
		var a;
		function waitforcoll(sql){
				a = query(sql);
				if(a === undefined){
				    setTimeout( function() {
					    console.log('sleep ' + a);
					}, 10000);
				  }
		}
		
//		query(sql);
		waitforcoll(sql);
		return 	a;
		
//			function query(sql) {
//				connection.query(sql, function (err, rows) {
//					if (err) {
//						console.log(err);	
//						connection.rollback();
//					} else{
//						console.log(rows);
//						a = rows;
//						//						return rows;
//					}
//				})};  
//				query(sql);
//				console.log('sleep less ' + a);
//				setTimeout( function() {
//				    return a;
//				}, 100000 );
//				console.log(query(sql));

//DB切断		
		db.dbend(); 
}
	
	
//【ユーザ情報追加ファンクション】
	exports.adduser = function(req, res){
	//DB接続	  
	var connection = db.dbinit();		
	connection.connect(function(err) {
		  if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		  }
		  console.log('connected as id ' + connection.threadId);
		});

//SQL準備		
	var sql1 = "insert into crawler.user(name,password) values('";
	sql1 += req.body.username + "','"	+ req.body.userpassword + "')";	
	
/*		connection.beginTransaction(function(err,result){
		if(err){
			console.log("begin:" + err);
			res.redirect('/');
			return;
		}else{
*/
//SQL実行	
//userテーブルへのユーザデータのインサート
	var query1 = connection.query(sql1, function (err, rows) {
		if (err) {
			console.log(err);
			connection.rollback();
		} else 
			connection.commit();
			});
	
//DB切断		
	db.dbend();  
}
	
	
	
//【ユーザ情報取得ファンクション】
exports.login = function(req, res){
		
	//DB接続	  
	var connection = db.dbinit();		
	connection.connect(function(err) {
		  if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		  }
		  console.log('connected as id ' + connection.threadId);
		});

//SQL準備		
	var sql = "select * from crawler.user where user.userid = ? and user.password = ?";
	var data = 0;
//SQL実行	
	var query = connection.query(sql, [req.body.userid, req.body.userpassword
	                                   ],function (err, rows) {
		if (err) {
			console.log(err);
			connection.rollback();
		} else 
			data = rows;
	db.dbend();
		});
	return data;
}

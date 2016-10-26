
/*
 * move to Admin page.
 */

mysql = require('mysql');
db = require('./commondao')

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
		
//SQL実行		
		var query = connection.query(sql, function (err, rows) {
			if (err) {
				console.log(err);
				connection.rollback();
			} else 
				datas : rows;
				return datas;
				});
//DB切断		
		db.dbend();    
	};
	
	
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
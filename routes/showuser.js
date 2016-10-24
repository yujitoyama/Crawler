
/*
 * move to Admin page.
 */

mysql = require('mysql');
db = require('./commondao')

//【ユーザ表示画面遷移アクション/ユーザ表示アクション】
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
				res.render('showuser', { 
					title: 'Adduser' ,
					datas : rows		
				});
				});
//DB切断		
		db.dbend();    
	};
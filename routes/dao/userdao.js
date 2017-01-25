
/*
 * dao class of user talble.
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

//SQL実行			
		function query(sql,res) {connection.query(sql,function(err, rows){
			if (err) {
				console.log(err);	
				connection.rollback();
			} else{
				res.render('showuser', { 
					title: 'showuser' ,
					datas : rows
				});		
			}
		})}; 
		query(sql,res);
		
//DB切断		
		db.dbend(); 
		return 	;
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
	var sql = "insert into crawler.user(name,password) values('";
	sql += req.body.username + "','"	+ req.body.userpassword + "')";	

//SQL実行	
//userテーブルへのユーザデータのインサート
	function query(sql) {connection.query(sql, function (err, rows) {
		if (err) {
			console.log(err);
			connection.rollback();
		} else 
			connection.commit();
			})};
			query(sql);
			
//DB切断		
	db.dbend(); 
	return ;
}
	
	
//【ログインファンクション】
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
	var sql1 = "select * from crawler.crawrel where userid = ?"
	var sql2 = "select * from crawler.user where user.userid = ? and user.password = ?";
	
	
//SQL実行	
	//ログインユーザに紐づくcrawidの取得
	function query1(sql1,req,res) {connection.query(sql1, [req.body.userid
	               	                                   ],function (err, rows) {
	               					if (err) {
	               						console.log(err);
	               						connection.rollback();
	               					} else 
	               						//セッションにユーザidに紐づくcrawidを設定
	               						if(rows === undefined){
	               						req.session.crawid = 'not registerd';
	               						}
	               						req.session.crawid = rows;
	               					})
	               					};

	//ログインユーザ情報の取得
	function query2(sql2,req,res) {connection.query(sql2, [req.body.userid, req.body.userpassword
	                                   ],function (err, rows) {
					if (err) {
						console.log(err);
						connection.rollback();
					} else 
						data = rows;
						if(rows.length!=1){
							res.render('loginerr',{	
								title: 'loginerr'
							})	};
							res.render('top', { 
								title: 'top',
								datas: rows,	
								func1: 'Add crawler',
								pyout: 'none',
								crawids: req.session.crawid
							});
					})
					};
				
				query1(sql1,req,res);
				query2(sql2,req,res);

//DB切断
		db.dbend();
		return ;
}

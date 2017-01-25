/*
 * dao class of user talble.
 */

mysql = require('mysql');
db = require('./commondao');


//【crawler登録ファンクション】 //書きかけ
exports.regcrawler = function(req, res){

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
		var sql = "insert into crawrel";

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
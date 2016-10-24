
/*
 * login home page.
 */

//【トップ画面遷移機能/ログインチェック機能】
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
	var sql = "select * from crawler.user where userid = ? and password = ?";
	
//SQL実行		
	var query = connection.query(sql, [req.body.userid, req.body.userpassword
	                                   ],function (err, rows) {
		if (err) {
			console.log(err);
			connection.rollback();
		} else 
			if(rows.length==1){
			res.render('top', { 
				title: 'top' 	
			})}
			else{
			res.render('loginerr',{
				title: 'loginerr'
			})	
			};
			});
//DB切断		
	db.dbend();   
};

/*
 * move to Admin page.
 */

mysql = require('mysql');
userdao = require('../dao/userdao')

//【ユーザ表示画面遷移アクション/ユーザ表示アクション】
exports.showuser = function(req, res){
	
	userdao.showuser(req,res);
 
	};

/*
 * move to Admin page.
 */

mysql = require('mysql');
userdao = require('../dao/userdao')


//【ユーザ追加画面遷移アクション】
exports.addusersc = function(req, res){
  res.render('adduser', { title: 'Adduser' });
};

//【ユーザ追加アクション/初期クローラー追加アクション】
exports.adduser = function(req, res){
	usedao.adduser();
	res.render('index', { title: 'Adduser' });
 
	};
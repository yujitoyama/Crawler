
/*
 * login home page.
 */

mysql = require('mysql');
userdao = require('../dao/userdao')

//【トップ画面遷移機能/ログインチェック機能】
exports.login = function(req, res){
	
		userdao.login(req,res);

//			if(rows.length!=1){
//			res.render('loginerr',{
//				title: 'loginerr'
//			})	
//			};
//			res.render('top', { 
//				title: 'top',
//				datas: rows,
//				func1: 'Add crawler'
//			});
};
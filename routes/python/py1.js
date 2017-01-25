
/*
 * call py1.
 */

//【py1 call 機能】
exports.callpy1 = function(req, res){
	
	var exec = require('child_process').exec;
	exec('./p1.py', function(err, stdout, stderr){
	  if (err) { console.log(err); }
	  console.log(stdout);
	  
	  res.render('top', { 
			title: 'top',
			crawids: req.session.crawid,
			pyout: stdout
		});
	  
	});
	
};
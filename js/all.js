	mongo
	show dbs
	use itrack
	show tables
	{ 
		time: { '$gt': 1490630400000, '$lt': 1490716799999},                                                                                                       
		'meta.tags': { '$in': [ 'vip_fabu' ] },                                                                                                                     
	  	'$or':[ { 'meta.userId': '194582916' },{ 'meta.trackId': '194582916' } ] 
  	} 

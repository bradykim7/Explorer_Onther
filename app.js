const http = require('http');
const Web3 = require('web3');

// my local ganache blockcahin network
const web3 = new Web3("ws://localhost:8545");

async function queryBlock(index){
	let json = await web3.eth.getBlock(index);
	return json;
}

// just See block information.
let server = http.createServer( (req, res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');

	let blocks = [];

	// the number of blocks
	web3.eth.getBlockNumber().then( function(){
		console.log("the nubmer of blocks");

		// the nubmer of blocks you want to show
		let numBlock = 10;
		for(let i=0;i <numBlock;i++){
			blocks.push(queryBlock(i));
		};
		Promise.all(blocks).then(
			function(value){
				res.end(JSON.stringify(value));
			}
		)
	})
})

server.listen(8080, () =>{
	console.log('listening on 8080')
});

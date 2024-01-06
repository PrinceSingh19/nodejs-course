const { Worker, workerData, isMainThread } = require("worker_threads");

if (isMainThread) {
	console.log("I am main thhread");
	new Worker(__filename, {
		workerData: [7, 2, 4, 5, 6],
	});
	new Worker(__filename, {
		workerData: [10, 25, 56, 78, 56],
	});
} else {
	console.log("I am worker thread");
	console.log(`Worker thread with id ${process.pid} ${workerData.sort((a, b) => a - b)}`);
}

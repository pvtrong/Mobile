
// IIFEs can also be used to create variables that are inaccessible from the global
// scope
const counter = (function () {
	let count = 0;

	return {
		inc: function () {
			count = count + 1;
		},
		get: function () {
			console.log(count);
		},
	};
})();

counter.get();
counter.inc();
counter.get();

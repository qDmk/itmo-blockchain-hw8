import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

	ipfsAddress: "/ip4/127.0.0.1/tcp/5001",
	mappingContractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};

export default config;

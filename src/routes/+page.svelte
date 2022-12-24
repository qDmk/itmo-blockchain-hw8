<script>
    import {create} from 'ipfs-http-client'
    import {ethers} from "ethers";

    import {onMount} from "svelte";
    import Upload from "$lib/Upload.svelte";
    import Fetch from "$lib/Fetch.svelte";
    import IPFSMapping from "../../artifacts/contracts/IPFSMapping.sol/IPFSMapping.json";
    import config from "../../svelte.config.js";


    let ipfsClient
    let provider

    let contract

    onMount(async () => {
        ipfsClient = create(config.ipfsAddress)

        provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);

        contract = new ethers.Contract(config.mappingContractAddress, IPFSMapping.abi, provider.getSigner())
    })
    // await provider.send("eth_requestAccounts", []);
    // let signer = provider.getSigner()
</script>


<div class="main">
    <div class="upload">
        <Upload ipfs={ipfsClient} contract={contract}></Upload>
    </div>

    <div class="fetch">
        <Fetch ipfs={ipfsClient} contract={contract}></Fetch>
    </div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: row;
    }

    .upload {
        flex: 1;
    }

    .fetch {
        flex: 1;
    }
</style>
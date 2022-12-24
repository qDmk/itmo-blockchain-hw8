<script>
    import all from 'it-all'
    import {ethers} from "ethers";
    import {binary_to_base58} from "base58-js";

    export let ipfs
    export let contract

    let input
    let imageData

    async function download(path) {
        const arrays = await all(ipfs.cat(path))
        const data = arrays.reduce((acc, arr) => new Uint8Array([...acc, ...arr]))
        return String.fromCharCode.apply(null, data)
    }

    async function fetch(address) {
        if (!ethers.utils.isAddress(address)) {
            alert("Invalid address")
            return
        }
        console.log(address)
        try {
            const res = await contract.data(address)
            if (ethers.utils.hexStripZeros(res) === "0x") {
                alert("No image")
                return
            }
            const bin = ethers.utils.arrayify(ethers.utils.hexConcat(["0x1220", res]))
            const path = binary_to_base58(bin)
            $: imageData = await download(path)
        } catch (e) {
            console.log(e)
            alert("Could not download image")
        }
    }

    async function getMyImage() {
        await fetch(await contract.signer.getAddress())
    }

    async function imageByEthAddress() {
        await fetch(input)
    }
</script>


<div class="fetch">
    <div class="text">
        <b>Get image</b>
    </div>

    <div class="button">
        <input type="button" on:click={getMyImage} value="Get my image">
    </div>

    <div class="input">
        Or enter any other account address:

        <input type="text" bind:value={input}>
    </div>
    {#if input}
        <div class="button">
            <input type="button" on:click={imageByEthAddress} value="Get address image">
        </div>
    {/if}

    {#if imageData}
        <div class="image">
            <img src="{imageData}" alt="Downloaded image">
        </div>
    {/if}

</div>

<style>
    .fetch {
        width: 100%;

        display: flex;
        flex-direction: column;
        flex: min-content;
        gap: 1rem;
    }

    .button > input {
        min-width: 5rem;
    }

    .image > img {
        max-width: 20rem;
    }
</style>

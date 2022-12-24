<script>
    import {base58_to_binary} from "base58-js";

    export let ipfs
    export let contract

    let image = undefined

    function onFileSelect(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
            image = e.target.result
        };
    }

    async function upload() {
        ipfs.add(image).then(async r => {
            const binHash = base58_to_binary(r.path).slice(2)

            console.log(binHash.length)

            contract.set(binHash).then(async r => {
                await r.wait()
            }).catch(e => {
                alert("Could not exec transaction")
            })


            alert("Uploaded!")
        }).catch(e => {
            alert("Could not upload to IPFS :-(")
        })
    }
</script>

<div class="upload">
    <div class="text">
        <b>Upload image</b>
    </div>
    <div class="file">
        <input type="file" accept="image/jpeg, image/png" on:change={onFileSelect}>
    </div>

    {#if image}
        <div class="preview">
            <img src="{image}" alt="Uploaded image">
        </div>

        <div class="button">
            <input type="button" on:click={upload} value="Upload">
        </div>
    {/if}
</div>


<style>
    .upload {
        width: 100%;


        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .preview img {
        max-width: 20rem;
    }
</style>
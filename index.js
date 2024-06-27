import axios from 'axios';
const fetchData = async (addresses) => {
    try {

        const promises = addresses.map(async (address) => {
            return await axios.post('https://mainnet.infura.io/v3/6791c3ee8046408b88480e3227e4a1fe', {
                jsonrpc: "2.0",
                method: "eth_getBalance",
                params: [address, "latest"],
                id: 1
            })
        })

        const res = await Promise.all(promises)
        const data = res.map((item) => {
            return {
                ...item.data,
                result: parseInt(item.data.result, 16) / 1e18,
            }
        })
        console.log(data)

    } catch (error) {
        console.log(error)
    }
}
const addresses = [
    "0xA50B5Cc2340b4bb4A6B761AbC53B428a959F139E",
    "0x9D4C02f8aFB040CD2571f2EFDc075e22bFBD45d3",
    "0xdf54deCB25844F4d766F8b0A20e98eC86705f3DC",
    "0x57B7f4Da4Ff03e6287F761EEEf27e0A3dC82e0e5",
    "0x8dEC71F702037fF1DE70778Aa21299b051Ff4998",
    "0x7a16ff8270133f063aab6c9977183d9e72835428"
]
fetchData(addresses)
import fs from 'fs'

fs.readFile(process.cwd() + "/data.json", (err, data) => {
    const productList = JSON.parse(data)

    console.log("productList:",productList.length)
})
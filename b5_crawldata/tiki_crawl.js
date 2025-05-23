/* 
TODO: TIKI WEB SCRAPING

1. Khi vào web -> chọn giúp mình 1 danh mục (category)
2. Inspect web -> chọn tab Network -> tìm file listings -> copy request url
3. 

! LƯU Ý:
- file listings tìm k thấy -> reload trang web trong chế độ inspect
- network để chế độ "no throlling" (k chặn băng thông)

? QUERY STRING:
- limit: số lượng sản phẩm tối đa lấy đc
- page: số trang
- category: danh mục

*/

// C1: fetch (node-fetch)
import fs from 'fs'
import UserAgent from 'user-agents'

// const categories = [8322, 1883, 1815, 1789, 1846]

const categories = [1882, 8322, 1833, 1789, 2549, 1815, 1520, 8594, 931, 4384, 1975, 915, 17166, 1846, 1686, 4221, 1703, 1801, 27498, 44792, 8371, 6000, 11312, 976, 27616]

const fetchTikiData = async () => {
    const productList = []

    // setTimeout()
    for (let categoryId of categories) {
        let fetchPromises = []

        const userAgent = new UserAgent({ deviceCategory: 'desktop' })
        // console.log(userAgent.toString())

        for (let page = 0; page <= 30; page++) {
            const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=20&page=${page}&category=${categoryId}`

            fetchPromises.push(
                fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36'
                    }
            }))
        }

        try {
            console.log(categoryId)

            const responses = await Promise.all(fetchPromises)

            for (let res of responses) {
                if (!res.ok) {
                    throw Error(`Network issue at ${res.url}`)
                }

                const result = await res.json()

                if (!result.data || result.data.length == 0) {
                    throw Error(`No data found at ${res.url}`)
                }

                result.data.forEach(product => {
                    // console.log(product)

                    const productObject = {
                        id: product.id,
                        name: product.name,
                        image: product.thumbnail_url,
                        price: product.price,
                        brand: product.brand_name,
                    }
        
                    productList.push(productObject)
                })
            }

        } catch(err) {
            console.error(err)
        }
    }

    return productList
}

fetchTikiData().then((productList) => {
    // đổ vào file json
    console.log("productList:", productList.length)

    fs.writeFile(process.cwd() + "/data.json", JSON.stringify(productList), () => {})
})


// for (let categoryId of categories) {
//     const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=50&page=1&category=${categoryId}`

//     fetch(url, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//             'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36'
//         }
//     }).then(async (response) => {
//         const result = await response.json()
    
//         // console.log(result.data.length) 
//         const data = result.data

//         data.forEach(product => {
//             // console.log(product)

//             const productObject = {
//                 id: product.id,
//                 name: product.name,
//                 image: product.thumbnail_url,
//                 price: product.price,
//                 brand: product.brand_name,
//                 quantity_sold: product.quantity_sold.value
//             }

//             productList.push(product)
//         })

//     }).catch((err) => {
//         console.log(err)
//     })
// }
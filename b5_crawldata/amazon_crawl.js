/* 
TODO: AMAZON WEB SCRAPING

B1: Chọn 1 danh mục -> chọn 1 sản phẩm trong danh mục
!LƯU Ý: phải có chữ "other sellers" tại trang sản phẩm đó

B2: Sau khi pick đc 1 sản phẩm -> Inspect -> Nhấn vào "Other Seller" -> Chọn file bắt đầu bằng chữ "ref"

B3: DOM Tree -> lấy thuộc tính của sản phẩm theo id hoặc class của thẻ html

B4: Sau khi làm xong 1 sản phẩm -> mình tự tìm và copy productId trên thanh url

getElementById, getElementByClassName, querySelector (# - id, . - class, ), querySelectorAll
*/

// commonjs vs modulejs
import fs from 'fs'
import UserAgent from 'user-agents'
import { JSDOM } from 'jsdom'
import axios from 'axios'

const productList = []
const products = ["B0D1S99TD7", "B0D1S99TD7", "B0B7NTY2S6", "B07JP4WYHY"]

const fetchAmazonData = async () => {

    for (let productId of products) {

        const url = `https://www.amazon.com/gp/product/ajax/ref=dp_aod_pn?asin=${productId}&m=&qid=1748007566&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-2&pc=dp&experienceId=aodAjaxMain`

        const userAgent = new UserAgent({ deviceCategory: 'desktop' })

        const response = await axios.get(url, {
            headers: {
                Accept: 'text/html,*/*',
                Host: 'www.amazon.com',
                'User-Agent': userAgent,
            }
        })

        // console.log(response.data)

        if (!response.data) {
            throw Error("404 - Data not found")
        }

        try {
            const dom = new JSDOM(response.data)

            let name = dom.window.document.querySelector("#aod-asin-title-text").innerHTML

            let price = dom.window.document.querySelector(".a-section.a-spacing-none.aok-align-center.aok-relative .aok-offscreen").innerHTML

            console.log("Product Name:", name)

            console.log("Product Price:", price)

            const productObject = {
                name,
                price
            }

            productList.push(productObject)
        } catch(err) {
            console.error(err)
        }
        
    }
}

// B0D1S99TD7

fetchAmazonData().then(() => {
    console.log(productList)

    // đổ data vào json
    fs.writeFile(process.cwd() + "/data.json", JSON.stringify(productList), () => {})
})  














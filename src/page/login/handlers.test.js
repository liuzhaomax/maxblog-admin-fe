import { getPuk } from "./handlers"
import axios from "axios"

jest.mock("axios")

test("测试获取puk", done => {
    const response = new Promise((resolve, reject) => {
        resolve(1)
        reject(0)
    })
    axios.get.mockResolvedValue(response)
    const result = getPuk()
    expect(result).resolves.toBe(1)
    done()
})
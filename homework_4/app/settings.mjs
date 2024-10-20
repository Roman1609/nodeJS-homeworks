import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('__dirname')
console.log(__dirname)
const filePath = path.join(__dirname, '/data/jobData.json')
console.log("filePath")
console.log(filePath)

export default {
    dataPath: filePath
}
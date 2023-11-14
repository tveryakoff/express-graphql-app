import fs from 'fs/promises'

const deleteFile = async (filePath) => {
    try {
        await fs.unlink(path.join(process.cwd(), filePath))
        return true
    } catch (e) {
        return false
    }
}

export default deleteFile

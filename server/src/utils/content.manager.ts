import fs from 'fs'
import path from 'path'

class ContentManager {
    private _dirname = path.resolve()
    private _contentFilePath = path.join(this._dirname, './src/data/content.json')

    private _cachedContent: any = null

    private _readContentFile = () => {
        if (!this._cachedContent) {
            const content = fs.readFileSync(this._contentFilePath, 'utf8')
            this._cachedContent = JSON.parse(content)
        }

        return this._cachedContent
    }

    public getContentForPage = (pageName: string) => {
        try { 
            const content = this._readContentFile() 
            const pageContent = content[pageName]
    
            return pageContent ? pageContent : (console.log('No content found for page : ', pageName), {})
        } catch (error: any) {
            console.log('Error reading content : ', error.message)
        }
    }
    
    public addContentForPage = (pageName: string, sectionName: string, newContent: any) => {
        try {
            const content = this._readContentFile() 
            const pageContent = content[pageName]
    
            if (pageContent) {
                if (!pageContent[sectionName]) {
                    pageContent[sectionName] = {}
                }
                if (newContent.id) {
                    console.log('New content cannot have an id')
                    return
                }
    
                const existingIDs = Object.keys(pageContent[sectionName]).map(Number)
                const maxID = existingIDs.length > 0 ? Math.max(...existingIDs) : 0
    
                const newID = maxID + 1 
                pageContent[sectionName][newID] = newContent 
    
                fs.writeFileSync(this._contentFilePath, JSON.stringify(content, null, 2), 'utf8')
                this._cachedContent = content
    
                console.log('Content added successfully')
            } else {
                console.log('No page with name: ', pageName)
            }
    
            return pageContent
        } catch (error: any) {
            console.log('Error adding content : ', error.message)
        }
    }
    
    public updateContentForPage = (pageName: string, sectionName: string, contentID: string, newContent: any) => {
        try {
            const content = this._readContentFile()
            const pageContent = content[pageName]
    
            if (pageContent && pageContent[sectionName] && pageContent[sectionName][contentID]) {
                pageContent[sectionName][contentID] = { ...pageContent[sectionName][contentID], ...newContent }
    
                fs.writeFileSync(this._contentFilePath, JSON.stringify(content, null, 2), 'utf8')
                this._cachedContent = content 
    
                console.log('Content updated successfully')
            } else {
                console.log('No content with id: ', contentID + 1)
            }
    
            return pageContent
        } catch (error: any) {
            console.log('Error updating content : ', error.message)
        }
    }
    
    public deleteContentForPage = (pageName: string, sectionName: string, contentID: string) => {
        try {
            const content = this._readContentFile() 
            const pageContent = content[pageName]
    
            if (pageContent && pageContent[sectionName] && pageContent[sectionName][contentID]) {
                const idToRemove: number = parseInt(contentID, 10)
                pageContent[sectionName].splice(idToRemove, 1)
    
                fs.writeFileSync(this._contentFilePath, JSON.stringify(content, null, 2), 'utf8')
                this._cachedContent = content
    
                console.log('Content deleted successfully')
            } else {
                console.log('No content with id: ', contentID + 1)
            }
    
            return pageContent
        } catch (error: any) {
            console.log('Error deleting content : ', error.message)
        }
    }
}

export default new ContentManager() 
import fs from 'fs'
import path from 'path'

/**
 * Represents a content manager that reads, writes, updates, and deletes content from a JSON file.
 * 
 * @class ContentManager
 * @property {string} _dirname - The directory name of the current module.
 * @property {string} _contentFilePath - The path to the content JSON file.
 * @property {any} _cachedContent - The cached content from the JSON file.
 */
export default class ContentManager {
    private _dirname: string = path.resolve()
    private _contentFilePath: string = path.join(this._dirname, './src/data/content.json')

    private _cachedContent: any = null 

    /**
     * Reads the content JSON file and returns the content as an object.
     * 
     * @method _readContentFile
     * @memberof ContentManager
     * @returns {any} - The content object.
     */
    private _readContentFile = (): any => {
        if (!this._cachedContent) {
            const content: string = fs.readFileSync(this._contentFilePath, 'utf8')
            this._cachedContent = JSON.parse(content)
        }

        return this._cachedContent
    }

    /**
     * Deep merges two objects.
     * 
     * @method deepMerge
     * @memberof ContentManager
     * @param {any} target - The target object.
     * @param {any} source - The source object.
     * @returns {any} - The merged object.
     */
    public deepMerge = (target: any, source: any): any => {
        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                Object.assign(source[key], this.deepMerge(target[key], source[key]))
            }
        }
                
        Object.assign(target || {}, source)
        return target
    }

    /**
     * Returns the content for a specified page.
     * 
     * @method getContentForPage
     * @memberof ContentManager
     * @param {string} pageName - The name of the page.
     * @throws {Error} - If an error occurs while reading the content file.
     * @returns {any} - The content for the page.
     */
    public getContentForPage(pageName: string): any {
        try { 
            const content: any = this._readContentFile() 
            const pageContent: any = content[pageName]
    
            return pageContent ? pageContent : (console.error('No content found for page : ', pageName), {})
        } catch (error: any) {
            console.error('Error reading content : ', error.message)
            throw new Error(error)
        }
    }
    
    /**
     * Add content for a specified page section.
     * 
     * @method addContentForPage
     * @memberof ContentManager
     * @param {string} pageName - The name of the page.
     * @param {string} sectionName - The name of the section.
     * @param {any} newContent - The new content to add.
     * @throws {Error} - If an error occurs while reading the content file.
     * @returns {any} - The updated content for the page section.
     */
    public addContentForPage(pageName: string, sectionName: string, newContent: any): any {
        try {
            const content: any = this._readContentFile() 
            const pageContent: any = content[pageName]
    
            if (pageContent) {
                if (!pageContent[sectionName]) {
                    pageContent[sectionName] = {}
                }
                if (newContent.id) {
                    console.error('New content cannot have an id')
                    throw new Error('New content cannot have an id')
                }
    
                const existingIDs: number[] = Object.keys(pageContent[sectionName]).map(Number)
                const maxID: number = existingIDs.length > 0 ? Math.max(...existingIDs) : 0
    
                const newID: number = maxID + 1 
                pageContent[sectionName][newID] = newContent 
    
                fs.writeFileSync(this._contentFilePath, JSON.stringify(content, null, 2), 'utf8')
                this._cachedContent = content
    
                console.log('Content added successfully')
            } else {
                console.error('No page with name: ', pageName)
                throw new Error('No page with name: ' + pageName)
            }
    
            return pageContent
        } catch (error: any) {
            console.error('Error adding content : ', error.message)
            throw new Error(error)
        }
    }
           
    /**
     * Updates the content for a specified page section.
     * 
     * @method updatePageContent
     * @memberof ContentManager
     * @param {string} pageName - The name of the page.
     * @param {any} newContent - The new content to update.
     * @throws {Error} - If an error occurs while reading the content file.
     * @returns {any} - The updated content for the page section.
     */
    public updatePageContent(pageName: string, newContent: any): any {
        try {
            const content: any = this._readContentFile()
            const pageContent: any = content[pageName]

            if (pageContent) {
                content[pageName] = this.deepMerge(pageContent, newContent)
                fs.writeFileSync(this._contentFilePath, JSON.stringify(content, null, 2), 'utf8')
                this._cachedContent = content
            } else {
                console.error('No page with name: ', pageName)
                throw new Error('No page with name: ' + pageName)
            }

            return pageContent
        } catch (error: any) {
            console.error('Error updating content : ', error.message)
            throw new Error(error)
        }
    }
    
    /**
     * Deletes the content for a specified page section.
     * 
     * @method deleteContentForPage
     * @memberof ContentManager
     * @param {string} pageName - The name of the page.
     * @param {string} sectionName - The name of the section.
     * @param {string} contentID - The ID of the content.
     * @throws {Error} - If an error occurs while reading the content file.
     * @returns {any} - The updated content for the page section.
     */
    public deleteContentForPage(pageName: string, sectionName: string, contentID: string): any {
        try {
            const content: any = this._readContentFile() 
            const pageContent: any = content[pageName]
    
            if (pageContent && pageContent[sectionName] && pageContent[sectionName][contentID]) {
                const idToRemove: number = parseInt(contentID, 10)
                pageContent[sectionName].splice(idToRemove, 1)
    
                fs.writeFileSync(this._contentFilePath, JSON.stringify(content, null, 2), 'utf8')
                this._cachedContent = content
    
                console.log('Content deleted successfully')
            } else {
                console.error('No content with id: ', contentID + 1)
                throw new Error('No content with id: ' + contentID)
            }
    
            return pageContent
        } catch (error: any) {
            console.error('Error deleting content : ', error.message)
            throw new Error(error)
        }
    }
}
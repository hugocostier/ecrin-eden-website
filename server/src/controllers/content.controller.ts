import { NextFunction, Request, Response } from 'express'
import { createCustomError } from '../errors/custom-errors.js'
import asyncHandler from '../middlewares/async.js'
import contentManager from '../utils/content.manager.js'

class ContentController {
    // Get all content
    public getContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName } = req.params 
        const content = contentManager.getContentForPage(pageName)
    
        if (!content) {
            return next(createCustomError(`No content for page: ${pageName}`, 404))
        }
        res.status(200).json({ content })
    })
    
    // Add content 
    public addContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName, section: sectionName } = req.params
        const content = contentManager.addContentForPage(pageName, sectionName, req.body) 
    
        if (!content) {
            return next(createCustomError(`No content for page: ${pageName}`, 404)) 
        }
        res.status(201).json({ msg: 'Content added', content })
    })
    
    // Update content 
    public updateContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName, section: sectionName, id: contentID } = req.params
        const content = contentManager.updateContentForPage(pageName, sectionName, contentID, req.body)
    
        if (!content) {
            return next(createCustomError(`No content with id: ${contentID}`, 404))
        }
        res.status(200).json({ msg: `Content ${contentID} updated`, content })
    })
    
    // Delete content 
    public deleteContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName, section: sectionName, id: contentID } = req.params
        const content = contentManager.deleteContentForPage(pageName, sectionName, contentID) 
    
        if (!content) {
            return next(createCustomError(`No content with id: ${contentID}`, 404))
        }
        res.status(200).json({ msg: `Content ${contentID} deleted`, content })
    })
}

export default new ContentController()  

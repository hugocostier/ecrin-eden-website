import { NextFunction, Request, Response } from 'express'
import { createCustomError } from '../errors/custom-errors.js'
import asyncHandler from '../middlewares/async.js'
import ContentManager from '../utils/content.manager.js'

/**
 * Controller for content
 * 
 * @class ContentController
 */
export default class ContentController {
    private _contentManager: ContentManager = new ContentManager() 

    /**
     * Get content for a page
     * 
     * @method getContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @param {NextFunction} next - Next function
     * @returns {Promise<void>} A promise that resolves when the content is returned.
     */
    public getContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName } = req.params 
        const content: any = this._contentManager.getContentForPage(pageName)
    
        if (!content) {
            return next(createCustomError(`No content for page: ${pageName}`, 404))
        }
        res.status(200).json({ content })
    })
    
    /**
     * Add content for a page
     * 
     * @method addContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @param {NextFunction} next - Next function
     * @returns {Promise<void>} A promise that resolves when the content is added.
     */
    public addContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName, section: sectionName } = req.params
        const content: any = this._contentManager.addContentForPage(pageName, sectionName, req.body) 
    
        if (!content) {
            return next(createCustomError(`No content for page: ${pageName}`, 404)) 
        }
        res.status(201).json({ msg: 'Content added', content })
    })
    
    /**
     * Update content
     * 
     * @method updateContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @param {NextFunction} next - Next function
     * @returns {Promise<void>} A promise that resolves when the content is updated.
     */
    public updateContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName, section: sectionName, id: contentID } = req.params
        const content: any = this._contentManager.updateContentForPage(pageName, sectionName, contentID, req.body)
    
        if (!content) {
            return next(createCustomError(`No content with id: ${contentID}`, 404))
        }
        res.status(200).json({ msg: `Content ${contentID} updated`, content })
    })
    
    /**
     * Delete content 
     * 
     * @method deleteContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @param {NextFunction} next - Next function
     * @returns {Promise<void>} A promise that resolves when the content is deleted.
     */
    public deleteContent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page: pageName, section: sectionName, id: contentID } = req.params
        const content: any = this._contentManager.deleteContentForPage(pageName, sectionName, contentID) 
    
        if (!content) {
            return next(createCustomError(`No content with id: ${contentID}`, 404))
        }
        res.status(200).json({ msg: `Content ${contentID} deleted`, content })
    })
}
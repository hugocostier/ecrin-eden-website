import { Request, Response } from 'express'
import { createCustomError } from '../errors/custom-errors.js'
import ContentManager from '../utils/content.manager.js'
import BaseController from './base.controller.js'

/**
 * Controller for content
 * 
 * @class ContentController
 * @extends BaseController
 */
export default class ContentController extends BaseController {
    private _contentManager: ContentManager = new ContentManager() 

    /**
     * Get content for a page
     * 
     * @method getContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the content is returned.
     */
    public getContent = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { page: pageName } = req.params 
            const content: any = this._contentManager.getContentForPage(pageName)
        
            if (!content) {
                throw createCustomError(`No content for page: ${pageName}`, 404)
            }
            return content
        })
    }
    
    /**
     * Add content for a page
     * 
     * @method addContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the content is added.
     */
    public addContent = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { page: pageName, section: sectionName } = req.params
            const content: any = this._contentManager.addContentForPage(pageName, sectionName, req.body)
        
            if (!content) {
                throw createCustomError(`No content for page: ${pageName}`, 404)
            }
            return content
        }, 'Content added successfully')
    }
    
    /**
     * Update content
     * 
     * @method updateContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the content is updated.
     */
    public updateContent = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { page: pageName } = req.params
            const content: any = this._contentManager.updatePageContent(pageName, req.body)
        
            if (!content) {
                throw createCustomError(`No content for page: ${pageName}`, 404)
            }
            return content
        }, 'Content updated successfully')
    }
    
    /**
     * Delete content 
     * 
     * @method deleteContent
     * @memberof ContentController
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} A promise that resolves when the content is deleted.
     */
    public deleteContent = async (req: Request, res: Response): Promise<void> => {
        await this.handleRequest(req, res, async () => {
            const { page: pageName, section: sectionName, id: contentID } = req.params
            const content: any = this._contentManager.deleteContentForPage(pageName, sectionName, contentID)
        
            if (!content) {
                throw createCustomError(`No content with id: ${contentID}`, 404)
            }
            return content
        }, 'Content deleted successfully')
    }
}
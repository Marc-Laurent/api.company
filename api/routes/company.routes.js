import { Router } from 'express'
import findPhoneNumber  from '../company/controller'

let router = Router()

router.get("/company/search", findPhoneNumber)

export default router
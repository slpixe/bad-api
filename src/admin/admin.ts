import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const createAdminRouter = ({ config }) => {
export const createAdminRouter = () => {
    const adminRouter = express.Router();

    adminRouter.use('/', express.static(path.join(__dirname, '../admin-page')));

    adminRouter.get('/aaa', (req, res) => {
        res.status(200).send('Admin!');
    });

    return adminRouter
}
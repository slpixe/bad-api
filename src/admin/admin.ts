import express from "express";

// const createAdminRouter = ({ config }) => {
export const createAdminRouter = () => {
    const adminRouter = express.Router();

    adminRouter.use('/', express.static('admin-page'))

    adminRouter.get('/aaa', (req, res) => {
        res.status(200).send('Admin!');
    });

    return adminRouter
}
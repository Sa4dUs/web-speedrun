import express from "express";
import { getTeams } from "../service/teamService.js";

const router = express.Router();

router.get("/", (req, res) => {
    const [err, teams] = getTeams();

    if (err)
        return res.render('error', { message: 'Error al obtener la lista de equipos' });

    res.render("index", { teams });
});

export default router;

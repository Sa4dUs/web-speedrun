import express from "express";
import { body, validationResult } from "express-validator";
import {
    getTeams,
    getTeamFromID,
    submitTeam,
    deleteTeam,
    addTeamFeedback,
} from "../service/teamService.js";

const router = express.Router();

router.get("/details/:id", (req, res) => {
    const { id } = req.params;
    const [err, team] = getTeamFromID(id);

    if (err || !team) return res.render("error", { message: "Team not found" });

    team["index"] = id;
    return res.render("team", team);
});

router.get("/add", (req, res) => {
    return res.render("form-team");
});

router.get("/edit/:id", (req, res) => {
    const { id } = req.params;
    const [err, team] = getTeamFromID(id);

    if (err || !team) return res.render("error", { message: "Team not found" });

    team["index"] = id;
    return res.render("form-team", team);
});

router.post(
    "/submit/:id?",
    [
        body("name")
            .notEmpty()
            .withMessage("Name is required")
            .trim()
            .isString()
            .withMessage("Name must be a string"),

        body("country")
            .notEmpty()
            .withMessage("Country is required")
            .trim()
            .isString()
            .withMessage("Country must be a string"),

        body("team_principal")
            .notEmpty()
            .withMessage("Team Principal is required")
            .trim()
            .isString()
            .withMessage("Team Principal must be a string"),

        body("championships")
            .notEmpty()
            .withMessage("Championships is required")
            .isInt()
            .withMessage("Championships must be a number"),

        body("image")
            .notEmpty()
            .withMessage("Image URL is required")
            .isURL()
            .withMessage("Image must be a valid URL"),

        body("description")
            .notEmpty()
            .withMessage("Description is required")
            .trim()
            .isString()
            .withMessage("Description must be a string"),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessage = errors
                .array()
                .map((error) => error.msg)
                .join(", ");
            return res.render("error", { message: errorMessage });
        }

        const { id } = req.params;
        const {
            name,
            country,
            team_principal,
            championships,
            image,
            description,
        } = req.body;

        const [err, data] = submitTeam(id, {
            name,
            country,
            team_principal,
            championships,
            image,
            description,
        });

        if (err || !data)
            return res.render("error", {
                message: "Error while submiting the team",
            });

        return res.redirect(`/teams/details/${id ?? data["index"]}`);
    }
);

router.post("/remove/:id", (req, res) => {
    const { id } = req.params;
    const [err] = deleteTeam(id);

    if (err) return res.render("error", { message: "Error deleting the team" });

    return res.redirect("/");
});

router.post(
    "/add-feedback/:id",
    [body("subject").notEmpty(), body("message").notEmpty()],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { subject, message } = req.body;

        const [err] = addTeamFeedback(id, { subject, message });

        if (err)
            return res.render("error", {
                message: "Error adding team feedback",
            });

        return res.redirect(`/teams/details/${id}`);
    }
);

export default router;

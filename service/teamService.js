const teams = {
    0: {
        name: "Mercedes",
        country: "Germany",
        team_principal: "Toto Wolff",
        championships: 8,
        image: "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/mercedes.jpg",
        feedback: [
            {
                subject: "This car is trash!",
                message: "I think you should improve the aerodynamics guys."
            }
        ],
        description: "Mercedes-AMG Petronas Formula One Team, also known as Mercedes-AMG Petronas F1 Team, is a British-German Formula One racing team and constructor, created by the merger of Mercedes-Benz's motorsport division and McLaren's Formula One team in 2009. The team has achieved great success in recent years, dominating the sport with their exceptional engineering and talented drivers."
    },
    1: {
        name: "Ferrari",
        country: "Italy",
        team_principal: "Mattia Binotto",
        championships: 16,
        image: "https://media.formula1.com/content/dam/fom-website/teams/Ferrari/logo-ferrari-18%20.jpg",
        description: "Scuderia Ferrari is the oldest surviving and most successful Formula One team, having competed in every world championship since 1950. The team's legacy, passion, and iconic red livery make it one of the most recognizable and respected teams in the history of motorsport."
    },
    2: {
        name: "Red Bull Racing",
        country: "Austria",
        team_principal: "Christian Horner",
        championships: 4,
        image: "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/red%20bull.jpg",
        description: "Red Bull Racing is an Austrian Formula One racing team and constructor, owned by beverage company Red Bull GmbH. The team has been highly competitive since its debut and has won multiple championships with its aggressive and innovative approach to racing."
    },
    3: {
        name: "McLaren",
        country: "United Kingdom",
        team_principal: "Andreas Seidl",
        championships: 8,
        image: "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/mclaren.jpg",
        description: "McLaren Racing Limited is a British motor racing team and part of the McLaren Group. The team has a rich history in Formula One, having won multiple championships and produced legendary drivers. McLaren continues to strive for excellence in the sport."
    },
    4: {
        name: "Alpine",
        country: "France",
        team_principal: "Davide Brivio",
        championships: 2,
        image: "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/team%20logos/alpine.jpg",
        description: "Alpine F1 Team, previously known as Renault F1 Team, is a French racing team competing in Formula One. Renault has a storied history in motorsport, having achieved success in various racing series. Alpine continues this legacy with its competitive spirit and commitment to innovation."
    }
};

let currentIndex = Object.entries(teams).length;

const getTeams = () => {
    try {
        let output = [];

        for (const [key, value] of Object.entries(teams)) {
            value['index'] = key;
            output.push(value);
        }

        return [null, output];
    } catch (err) {
        return [err, null];
    }
};

const getTeamFromID = (id) => {
    try {
        const team = teams[id];
        return team ? [null, team] : ['Team not found', null];
    } catch (err) {
        return [err, null];
    }
};

const submitTeam = (id, team) => {
    try {
        if (!id) {
            id = currentIndex.toString();
            currentIndex++;
        }

        const existingFeedback = teams?.[id]?.feedback || [];

        teams[id] = {
            ...team,
            feedback: existingFeedback,
        };
        
        return [null, {...teams[id], index: id}];
    } catch (err) {
        return [err, null];
    }
};


const deleteTeam = (id) => {
    try {
        if (teams[id]) {
            delete teams[id];
            return [null, 'Team deleted successfully'];
        } else {
            return ['Team not found', null];
        }
    } catch (err) {
        return [err, null];
    }
};

const addTeamFeedback = (id, feedback) => {
    try {
        if (teams[id]) {
            teams[id]['feedback'] = teams[id]['feedback'] ? [...teams[id]['feedback'], feedback] : [feedback];
            return [null, 'Feedback added successfully'];
        } else {
            return ['Team not found', null];
        }
    } catch (err) {
        return [err, null];
    }
};

export { getTeams, getTeamFromID, submitTeam, deleteTeam, addTeamFeedback };

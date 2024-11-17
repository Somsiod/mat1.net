import express from 'express';  
import bodyParser from 'body-parser';  

const app = express();  
app.use(bodyParser.json());  

const SubscriptionLevels = {  
    FREE: 'Free',  
    OMNIA: 'Omnia',  
    ULTIMATE: 'Ultimate',  
    PRO: 'Pro',  
};  

// Mock user data structure  
const users = {  
    'user1': { id: 'user1', subscriptionLevel: SubscriptionLevels.FREE },  
    'user2': { id: 'user2', subscriptionLevel: SubscriptionLevels.OMNIA },  
    'user3': { id: 'user3', subscriptionLevel: SubscriptionLevels.ULTIMATE },  
    'user4': { id: 'user4', subscriptionLevel: SubscriptionLevels.PRO },  
};  

// Subscription check middleware  
function checkSubscriptionLevel(requiredPlan) {  
    return (req, res, next) => {  
        const { userId } = req.body;   
        const user = users[userId];  

        if (!user) {  
            return res.status(404).json({ message: 'User not found' });  
        }  

        const userLevel = user.subscriptionLevel;  
        const levels = Object.values(SubscriptionLevels);  
        const userPlanIndex = levels.indexOf(userLevel);  
        const requiredPlanIndex = levels.indexOf(requiredPlan);  

        if (userPlanIndex >= requiredPlanIndex) {  
            return next();  
        }  

        return res.status(403).json({ message: 'Insufficient subscription level' });  
    };  
}  

// Routes using the checkSubscriptionLevel middleware  
app.post('/premium-feature', checkSubscriptionLevel(SubscriptionLevels.OMNIA), (req, res) => {  
    res.json({ message: 'Accessed premium feature!' });  
});  

app.post('/ultimate-feature', checkSubscriptionLevel(SubscriptionLevels.ULTIMATE), (req, res) => {  
    res.json({ message: 'Accessed ultimate feature!' });  
});  

app.post('/pro-feature', checkSubscriptionLevel(SubscriptionLevels.PRO), (req, res) => {  
    res.json({ message: 'Accessed pro feature!' });  
});  

// Start the server  
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});  

export default app; // Exporting the app for testing
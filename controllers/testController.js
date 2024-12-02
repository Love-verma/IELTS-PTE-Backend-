import Test from '../models/Test.js';

// Schedule a test with frequency checks
export const scheduleTest = async (req, res) => {
    try {
        const { userId, testType } = req.body;

        if (testType === 'Seasonal') {
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            const endOfWeek = new Date();
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const seasonalTestsCount = await Test.countDocuments({
                userId,
                testType: 'Seasonal',
                testDate: { $gte: startOfWeek, $lte: endOfWeek },
            });

            if (seasonalTestsCount >= 2) {
                return res.status(400).json({ message: 'You can only take 2 seasonal tests per week.' });
            }
        }

        const test = new Test({ userId, testType });
        await test.save();

        res.status(201).json({ message: 'Test scheduled successfully!', test });
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling test', error });
    }
};


export default { scheduleTest };


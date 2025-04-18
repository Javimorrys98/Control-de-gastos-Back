import Gasto from '../models/Gasto.js';

const createExpense = async (req, res) => {
    const expense = req.body;
    expense.date = new Date();

    try {
        const newExpense = new Gasto(expense);
        const result = await newExpense.save();

        res.json({
            msg: result,
        })
    } catch (error) {
        console.log(error);
    }
}

const updateExpense = async (req, res) => {
    const { id } = req.params;

    // Validar un object id
    if (validateObjectId(id, res)) return;
}

const deleteExpense = async (req, res) => {

}


export {
    createExpense,
    updateExpense,
    deleteExpense,
};
import Balance from "../models/Balance.js";
import Expense from "../models/Expense.js";

const addExpense=async (req,res)=>{
    const {amount,desc,balanceId}=req.body;

    if(!amount || !desc || !balanceId){
        return res.json({success:false,message:"All fields are required"}); 
    }

     try {
        const balance = await Balance.findById(balanceId);
        if (!balance) {
            return res.json({success:false,message:"Balance not found"});
        }
        if(balance.state < amount){
            return res.json({success:false,message:"Insufficient balance"});
        }

        const newExpense = new Expense({
            amount,
            desc
        });
        await newExpense.save();

        balance.Expenses.push(newExpense._id);
        balance.state -= amount;
        await balance.save();
        res.json({success:true,message:"Expense added successfully"});

     } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
     }
} 

const addBalance=async(req,res)=>{
    const {amount}=req.body;

    if(!amount){
        return res.json({success:false,message:"Amount is required"});
    }

    try {
        const Lastbalance=await Balance.findOne().sort({ createdAt: -1 });
        let newState=0;

        if(Lastbalance){
          newState=Lastbalance.state;
          Lastbalance.amount-=newState;
          Lastbalance.state=0;
          await Lastbalance.save();
        }

        const newamount=parseInt(amount)+newState;

        const newBalance = new Balance({
            amount:newamount,
            state:newamount
        });

        await newBalance.save();


        res.json({success:true,message:"Balance added successfully"});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }

}


const getData = async (req, res) => {
  try {
    const balances = await Balance.find()
      .populate("Expenses")
      .lean();

    const formattedBalances = balances.map(balance => {
      const totalExpenses = balance.Expenses.reduce(
        (sum, exp) => sum + exp.amount,
        0
      );

      return {
        _id: balance._id,
        amount: balance.amount,
        state: balance.state,
        totalExpenses,
        remainingBalance: balance.state,
        expenses: balance.Expenses.map(exp => ({
          _id: exp._id,
          amount: exp.amount,
          desc: exp.desc,
          date: new Date(exp.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })
        })),
        createdAt: new Date(balance.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      };
    });

    res.json({ success: true, data: formattedBalances });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getLastBalanceId = async (req, res) => {
  try {
    const balance = await Balance.findOne().sort({ createdAt: -1 });

    if (!balance) {
      return res.json({ success: false, message: "No balance found" });
    }

    // console.log(balance);

    res.json({ success: true, data: balance._id });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getState = async (req, res) => {
  const { balanceId } = req.body;
  try {
    const balance = await Balance.findById(balanceId);

    if (!balance) {
      return res.json({ success: false, message: "Balance not found" });
    }
    // console.log("getState controller: ",balance.state);
    res.json({ success: true, data: balance.state });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getMonthlyBalance = async (req, res) => {
  try {
    const balances = await Balance.find();

    const grouped = {};

    balances.forEach(balance => {
      const date = new Date(balance.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const key = `${year}-${month}`;

      if (!grouped[key]) {
        grouped[key] = { year, month, totalBalance: 0 };
      }

      grouped[key].totalBalance += balance.amount;
    });

    res.json({ success: true, data: Object.values(grouped) });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export { addExpense, addBalance, getData, getLastBalanceId, getState , getMonthlyBalance};
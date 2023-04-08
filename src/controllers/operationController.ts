import Operation from '../models/operation';
import User from '../models/user';
import Record from '../models/record';

export const FindAllOperation = async (req, res) => {
	await Operation.find()
		.then((operations) => {
			res.json(operations);
		})
		.catch((err) => {
			res.status(404).json({
				message: err.message || 'Can not find the operations',
			});
		});
};

export const findOperation = async (req, res) => {
        try {          
        const operation = await Operation.findById(req.params.id);
        // validar si existe la tarea
            if (!operation) 
            return res
            .status(404)
            .json({message: 'The operation doesn´t exist'});
             res.json(operation);
             // mensaje de error por error interno
      } catch (error) {
        res.status(500).json({
          message: `Error find operation by Id `
        });
      }
      };


export const veriRecord = async (req, res) => {
      console.log(req.params.num, req.params.type)
      const userData = await User.findOne({ userName: req.body.userName })
      const recordData= await Record.find({user_id: userData?._id}).sort({$natural: -1}).limit(1)
      console.log(recordData, 'recordate')
      if(recordData){
            let totalOperation = await operations(recordData[0], req.params.type, req.params.num)
            if(totalOperation < 0){
                  res.status(200).json({msg: 'enough to cover the request'})
                  
            }else{
                  
                  const dateNow = Date.now();
                  const newRecord = new Record({
                      user_id: recordData[0].user_id,
                      amount: recordData[0].amount,
                      operation_response: totalOperation, 
                      user_balance: totalOperation,
                      date: dateNow
                });
                const operationSaved = await newRecord.save();
                res.status(200).json({msg: 'Operation correct'})
                }  
            
            }
}



const operations = async (record, typeOperation, valueUser) => {
      var result
      console.log(record, 'record')
      switch(typeOperation){
            case '1':
            result = await add(record.user_balance, valueUser);
            break;

            case '2':
            result = await subtract(record.user_balance, valueUser);
            break;

            case '3':
            result =await multiply(record.user_balance, valueUser);
            break;

            case '4':
            result =await divide(record.user_balance, valueUser);
            break;

            case '5':
            result =await square_root(record.user_balance, valueUser);
            break;

            case '6':
            result =await random(record.user_balance, valueUser);
            break;      

            default:
            result = "Sorry, please enter a valid operator!"
      } 
console.log(result)
return result  
}

const add = async (amount, value) => {
      
return Number(amount) + Number(value)
          
}

      
const subtract = async (amount, value) => {
      
return Number(amount) - Number(value)
                
}

const multiply = async (amount, value) => {
      
return Number(amount) * Number(value)
          
}

const divide = async (amount, value) => {
      
return Number(amount) / Number(value)
                
}
const square_root = async (amount, value) => {
      
return Number(amount) + Number(value)
                
}

const random = async (amount, value) => {
      
return Number(amount) + Number(value)
                      
}    


import Operation from '../models/operation';
import User from '../models/user';
import Record from '../models/record';
import RandomOrg from 'random-org'

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

export const createOperation = async (req , res) => {

      if (req.body.type) {

const newOperation = new Operation({
      type: req.body.type
});
const userSaved = await newOperation.save();
res.status(200).json({msg: 'The type of operation was added'})

      }else{
      res.status(400).json({msg: 'Please add type of operation'})
      }
}

/*export const findOperation = async (req, res) => {
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
      };*/

export const veriRecord = async (req, res) => {
      console.log(req.params.num, req.params.type)
      const userData = await User.findOne({ userName: req.body.userName })
      const recordData= await Record.find({user_id: userData?._id}).sort({$natural: -1}).limit(1)
      console.log(recordData, 'recordate')
      if(recordData[0] != undefined){
            let totalOperation = await operations(recordData[0], req.params.type, req.params.num)
            if(totalOperation < 0){
                  res.status(200).json({msg: 'enough to cover the request'})
                  
            }else{
                  const dateNow = Date.now();
                  const newRecord = new Record({
                      user_id: recordData[0].user_id,
                      amount: recordData[0].amount,
                      operation_response: totalOperation, 
                      user_balance: totalOperation != Number ? 0 : totalOperation,
                      date: dateNow
                });
                const operationSaved = await newRecord.save();
                res.status(200).json({msg: 'Operation correct'})
                }  
            
            }else{
             res.status(400).json({msg: 'The user must login '})     
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
            result =await square_root(record.user_balance);
            break;

            case '6':
            result =await randomInteger(valueUser);
            break;      

            default:
            result = "Sorry, please enter a valid operator!"
      } 
console.log(result, 'resultado operation')
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
const square_root = async (value) => {
      
return Math.sqrt(value)
                
}

const randomInteger = async (value) => {
      
      let random = new RandomOrg({ apiKey: '1f84e5d7-6c21-4cca-8c8a-770240cf3773' });
      const valueFinal = await random.generateStrings({ n: value, length: 10, characters: 'string' })
        .then(function(result) {
            return result.random.data;
        });        
        console.log(valueFinal[0])
        return valueFinal[0]
              
}    


import Operation from '../models/operation';


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

export const OperationAdd = (req, res) => {

      }
export const OperationSub = (req, res) => {
        
      }
export const OperationMult = (req, res) => {
        
      }
export const OperationDiv = (req, res) => {
        
      }
export const OperationSqua = (req, res) => {
        
      }
export const OperationRandom = (req, res) => {
        
      }     
import { json } from 'express';
import Record from '../models/record'

export const FindAllRecords = async (req, res) => {
	await Record.find()
		.then((records) => {
			res.json(records);
		})
		.catch((err) => {
			res.status(404).json({
				message: err.message || 'Can not find the records',
			});
		});
};

export const findRecord = async (req, res) => {
        try {          
        const record = await Record.findById(req.params.id);
            if (!record) 
            return res
            .status(404)
            .json({message: 'El record don´t existe'});
             res.json(record);
      } catch (error) {
        res.status(500).json({
          message: `Error find record by id `
        });
      }
      };
      
      
export const deleteAllRecord = async (req, res) => {
        try {
          await Record.deleteMany();
          res.status(200).json({msg: 'All Data successfully deleted'});
        } catch (err) {
          res.status(400).json({msg: err});
        }
};
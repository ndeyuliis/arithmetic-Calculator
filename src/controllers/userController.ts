import User from '../models/user';


export const FindAllUsers = async (req, res) => {
	await User.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(404).json({
				message: err.message || 'Can not find the Users',
			});
		});
};

export const findUser = async (req, res) => {
        console.log(req.params.id)
        try {          
        const task = await User.findById(req.params.id);
        console.log(task, 'usuario')
        // validar si existe la tarea
            if (!task) 
            return res
            .status(404)
            .json({message: 'El usuario no existe'});
             res.json(task);
             // mensaje de error por error interno
      } catch (error) {
        res.status(500).json({
          message: `Error devolviendo un usuario `
        });
      }
      };
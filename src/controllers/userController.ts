import Users from '../models/user';


export const FindAllUsers = async (req, res) => {
	await Users.find()
		.then((usersFind) => {
			res.json(usersFind);
		})
		.catch((err) => {
			res.status(404).json({
				message: err.message || 'Can not find the Users',
			});
		});
};

export const findUser = async (req, res) => {
        try {          
        const userFind = await Users.findById(req.params.id);
        // validar si existe la tarea
            if (!userFind) 
            return res
            .status(404)
            .json({message: 'El usuario no existe'});
             res.json(userFind);
             // mensaje de error por error interno
      } catch (error) {
        res.status(500).json({
          message: `Error devolviendo un usuario `
        });
      }
      };
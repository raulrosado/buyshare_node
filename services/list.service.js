const ListModel = require('../Models/List.model')
const TaskService = require('./task.service');
const UserService = require('./users.service');
const taskService = new TaskService();
const userService = new UserService();

class ListService {
    constructor() {}
    // async AddUser(user){
    //     const hash = await hashPasswordFunction.hashPassword(user.password);
    //     const newUser = {
    //         ...user,
    //         password:hash
    //     }
    //     const newUserCreate = new UserModel(newUser)
    //     return await newUserCreate.save()
    // }

    async find(){
        return ListModel.find().exec();
    }

    async findByIdUser(idUser){
        const query = ListModel.find({ 'id_user': idUser });
        let lists = await query.exec();
        let newLists = [];
        let newListsAvatar = [];
        for (const [index, element] of lists.entries()) {
            //cantidad de tareas en la lista
            const cant = await taskService.getCantByIdList(element.id);
            const course = {...element._doc,'cant':cant};
            newLists.push(course);

            //buscar los avatares de los usuarios de la lista
            let listaId = [];
            const avatar = await userService.findAvatarById(element.id_user);
            listaId.push(avatar);

            const listaUsuariosByIdList = await ListModel.find({'referencia':element.id}).exec();
            for (const [index, usuario] of listaUsuariosByIdList.entries()) {
                const avatar = await userService.findAvatarById(usuario.id_user);
                listaId.push(avatar);
            }
            newListsAvatar.push(listaId);
            // console.log('---------------------------------------');
        }
        // console.log(newListsAvatar);Add:
        newLists.push(newListsAvatar);
        return newLists;
    }
}

module.exports = ListService;
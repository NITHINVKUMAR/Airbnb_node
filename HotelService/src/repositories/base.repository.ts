// We are creating this base repository so that we can use the same methods for all the models
// and we don't have to write the same code again and again for each model
// This is a generic class which takes a model as a parameter and provides basic CRUD operations
// We can extend this class in other repositories and use the methods provided by this class
// This will help us to reduce the code duplication and make our code more maintainable
import { CreationAttributes, Model, ModelStatic, WhereOptions } from 'sequelize';

// Here T is generic type which will be replaced by the model class when we extend this base repository 
// It extends Model class of sequelize which means it can be any model class like Hotel, Room, Booking etc
abstract class BaseRepository<T extends Model> {
    // ModelStatic is a type provided by sequelize which represents the static side of the model class
    // It has all the static methods like findByPk, findAll, create, update etc
    // We are using protected access modifier so that we can access this property only by the derived classes
    protected model:ModelStatic<T>;
    constructor(model:ModelStatic<T>){
        this.model = model;
    }
    async findById(id: number): Promise<T | null> {
        const record = await this.model.findByPk(id);
        if(!record){
            return null;
        }
        return record;
    }
    async findAll(): Promise<T[]> {
        const records = await this.model.findAll();
        if(!records){
            return [];
        }
        return records;
    }
    // here id can be present or not in the model so we are using whereOptions to find the record
    async delete(whereOptions: WhereOptions<T>): Promise<void> {
        const reccord = await this.model.destroy({
            where:{
                ...whereOptions
            }
        })
        if(!reccord){
            throw new Error("Record not found");
        }
        return;
    }
    async create(data: CreationAttributes<T>): Promise<T> {
        const record = await this.model.create(data);
        return record;
    }
    async update(id: number,data: Partial<T>): Promise<T | null> {
        const record = await this.model.findByPk(id);
        if(!record){
            return null;
        }
        Object.assign(record, data);
        await record.save();
        return record;
    }
}

export default BaseRepository;
import { CreationOptional, InferAttributes, InferCreationAttributes,Model } from "sequelize";
import sequelize from "./sequelize"; // Import the sequelize instance
// inferAttributes and inferCreationAttributes are generic types provided by sequelize to infer the attributes and creation attributes of a model
class Hotel extends Model<InferAttributes<Hotel>,InferCreationAttributes<Hotel>>{
    // delcare is the keyword in typescript which tells typescript compiler that these are the attributes of the model 
    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
    declare location: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare rating?: number;
    declare rating_count?: number;
}
// These are the set of rules which will be imposed on TypseScript model. but in migrations those are the 
// set of rules which will be imposed on the database table
// Init function will tell that what table should Hotel model map to and to map all the attributes(columns) to the table
Hotel.init({
    id: {
        type: "INTEGER",
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: "STRING",
        allowNull: false
    },
    address: {
        type: "STRING",
        allowNull: false
    },
    location: {
        type: "STRING",
        allowNull: false
    },
    createdAt: {
        type: "DATE",
        defaultValue: new Date(),
    },
    updatedAt: {
        type: "DATE",
        defaultValue: new Date(),
    },
    rating: {
        type: "FLOAT",
        defaultValue: null,
    },
    rating_count: {
        type: "INTEGER",
        defaultValue: null,
    }
}, {
    sequelize:sequelize,
    underscored: true, // This will convert camelCase to snake_case like createdAt to created_at
    timestamps: true, // This will add createdAt and updatedAt fields for every new creation of Hotels
});

export default Hotel;
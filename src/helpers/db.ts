import mysql from "mysql2/promise";
import { Model, Sequelize } from "sequelize";

type ModelCtor<M extends Model<any, any>> = {
  new (): M;
};
interface Db {
  User: ModelCtor<any>;
  RefreshToken: ModelCtor<any>;
  Organization: ModelCtor<any>;
  UserOrganization: ModelCtor<any>;
  Invite: ModelCtor<any>;
  Event: ModelCtor<any>;
  EventOrganizer: ModelCtor<any>;
  FundPackage: ModelCtor<any>;
  FundField: ModelCtor<any>;
  Donor: ModelCtor<any>;
}

const db: Partial<Db> = {}; // Default DB Name: rbac_db

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const connection = await mysql.createConnection({
    host: process.env.database_host!,
    port: parseInt(process.env.database_port!),
    user: process.env.database_user!,
    password: process.env.database_user_password!,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.database}\`;`
  );

  // connect to db
  const sequelize = new Sequelize(
    process.env.database!,
    process.env.database_user!,
    process.env.database_user_password!,
    {
      dialect: "mysql",
      logging: true,
    }
  );

  // init models and add them to the exported db object
  db.User = require("../models/user.model")(sequelize);
  db.RefreshToken = require("../models/refresh-token.model")(sequelize);
  db.Organization = require("../models/organization.model")(sequelize);
  db.UserOrganization = require("../models/user-organization.model")(sequelize);
  db.Invite = require("../models/invite.model")(sequelize);
  db.Event = require("../models/event.model")(sequelize);
  db.EventOrganizer = require("../models/event-organizer.model")(sequelize);
  db.FundPackage = require("../models/fund-package.model")(sequelize);
  db.FundField = require("../models/fund-field.model")(sequelize);
  db.Donor = require("../models/donor.model")(sequelize);

  // define relationships
  db.User.hasMany(db.RefreshToken, { onDelete: "CASCADE" });
  db.RefreshToken.belongsTo(db.User);

  db.User.hasMany(db.Organization, { foreignKey: "created_by" });
  db.Organization.belongsTo(db.User, { foreignKey: "created_by" });

  db.User.hasMany(db.UserOrganization, { foreignKey: "user_id" });
  db.UserOrganization.belongsTo(db.User, { foreignKey: "user_id" });

  db.Organization.hasMany(db.UserOrganization, { foreignKey: "org_id" });

  db.User.hasMany(db.Invite, { foreignKey: "invited_user_id" });
  db.Invite.belongsTo(db.User, { foreignKey: "invited_user_id" });

  db.User.hasMany(db.Invite, { foreignKey: "sender_id" });
  db.Invite.belongsTo(db.User, { foreignKey: "sender_id" });

  db.Organization.hasMany(db.Invite, { foreignKey: "org_id" });
  db.Invite.belongsTo(db.Organization, { foreignKey: "org_id" });

  db.Organization.hasMany(db.Event, { foreignKey: "org_id" });
  db.Event.belongsTo(db.Organization, { foreignKey: "org_id" });

  db.Event.hasMany(db.EventOrganizer, { foreignKey: "event_id" });
  db.EventOrganizer.belongsTo(db.Event, { foreignKey: "event_id" });

  db.User.hasMany(db.EventOrganizer, { foreignKey: "user_id" });
  db.EventOrganizer.belongsTo(db.User, { foreignKey: "user_id" });

  db.Event.hasMany(db.FundPackage, { foreignKey: "event_id" });
  db.FundPackage.belongsTo(db.Event, { foreignKey: "event_id" });

  db.Event.hasMany(db.FundField, { foreignKey: "event_id" });
  db.FundField.belongsTo(db.Event, { foreignKey: "event_id" });

  db.Event.hasMany(db.Donor, { foreignKey: "event_id" });
  db.Donor.belongsTo(db.Event, { foreignKey: "event_id" });

  // sync all models with database
  // await sequelize.sync();
}

export default db;

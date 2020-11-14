import { Sequelize } from 'sequelize'
import User, { initUserModel } from './models/User'
import Image, { initImageModel } from './models/Image'
import createAssociations from './models/_associations'

const db = new Sequelize("postgres://kdtsftcp:ZHqD8gkxt1yp6P4vp-FONRKPr1D5ircG@hattie.db.elephantsql.com:5432/kdtsftcp");

export const initDB = () => new Promise((resolve) => {
  db
    .authenticate()
    .then(() => {
      initImageModel(db)
      initUserModel(db)
      User.sync()
        .then(() => Image.sync())
        .then(() => createAssociations())
        .then(() => resolve())
    }).catch(err => console.log(err))
})

export default db

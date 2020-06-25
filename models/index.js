const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});


const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: Sequelize.ENUM('open', 'closed')
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
})


function generateSlug(Page) {
    let slug = Page.title
    return slug.replace(/\s+/g, '_').replace(/\W/g, '');
  }

Page.beforeValidate((Page) => {
    Page.slug = generateSlug(Page);
})

module.exports = { db, Page, User}
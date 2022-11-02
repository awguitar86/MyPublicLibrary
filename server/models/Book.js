module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('Books', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
    },
    checkedOut: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Book;
};

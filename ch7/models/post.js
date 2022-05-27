module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        // id가 기본적으로 들어있다.
        content: {},
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb_general_ci',
    });
    Post.associate = (db) => {};
};


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        user_id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        }
    },
        {
            timestamps: false,
        })
}
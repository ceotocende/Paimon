module.exports = (sequelize, DataTypes) => {
    return sequelize.define('usersMessages', {
        user_id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        user_message: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        user_message_timely: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
        {
            timestamps: false,
        })
}
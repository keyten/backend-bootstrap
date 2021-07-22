import md5 from 'md5';
import {Model, Op, DataTypes} from 'sequelize';
import {sequelize} from './init-sequelize';

export const userProviders = {
	0: 'local'
};

function whereCondition(login: string) {
	return {
		where: {
			[Op.or]: [{
				username: login
			}, {
				email: login
			}]
		}
	}
}

class User extends Model {
	static async isUserExist(login: string){
		const response = await User.findOne({
			...whereCondition(login),
			attributes: ['id']
		});
		return response !== null;
	}

	static findUser(login: string) {
		return User.findOne({
			...whereCondition(login),
			attributes: [
				'id',
				'username',
				'password',
				'provider',
				'avatar',
				'email'
			]
		});
	}

	static findById(id: number | string) {
		return User.findOne({
			where: { id },
			attributes: [
				'id',
				'username',
				'avatar',
				'password'
			]
		})
	}

	static async checkLogin(login: string, password: string) {
		const user = await User.findOne({
			...whereCondition(login),
			attributes: [
				'id',
				'username',
				'avatar',
				'password'
			]
		});

		if (!user) {
			return null;
		}

		const dataValues = (user as any).dataValues;//.getDataValue();

		if (!dataValues) {
			return null;
		}

		if (md5(password) === dataValues.password) {
			delete dataValues.password;
			return dataValues;
		}

		return null;
	}
}

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
// https://habr.com/ru/company/ruvds/blog/335434/

User.init({
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	provider: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	avatar: DataTypes.STRING,
	email: DataTypes.STRING
}, {
	indexes: [{
		unique: true,
		fields: ['username']
	}, {
		unique: true,
		fields: ['email']
	}],
	sequelize
});

// User.sync({force: true})

export default User;

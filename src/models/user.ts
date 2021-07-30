import md5 from 'md5';
import {Model, Op, DataTypes} from 'sequelize';
import {sequelize} from './init-sequelize';
import { AUTH_PROVIDER } from '../auth/providers';

interface UserAttributes {
	id?: number;
	username: string;
	password?: string;
	avatar?: string;
	email?: string;
	provider: AUTH_PROVIDER;
	providerId?: string;
}

const attributes = [
	'id',
	'username',
	'password',
	'avatar',
	'email'
];

class User extends Model<UserAttributes, UserAttributes> {
	public id!: number;
	public username!: string;
	public password?: string;
	public avatar?: string;
	public email?: string;
	public provider!: AUTH_PROVIDER;
	public providerId?: string;

	static async isExistByUsernameOrEmail(login: string) {
		const response = await User.findOne({
			attributes: ['id'],
			where: {
				[Op.or]: [{ username: login }, { email: login }]
			},
		});
		return response !== null;
	}

	static async isExistByUsername(username: string) {
		const response = await User.findOne({
			attributes: ['id'],
			where: {
				[Op.or]: [{ username }]
			},
		});
		return response !== null;
	}

	static findByLoginOrEmail(login: string) {
		return User.findOne({
			attributes,
			where: {
				[Op.or]: [{ username: login }, { email: login }]
			},
		});
	}

	static findById(id: number) {
		return User.findOne({
			attributes,
			where: { id }
		})
	}

	static async getUserByLoginAndPassword(login: string, password: string) {
		const user = await User.findOne({
			attributes,
			where: {
				[Op.or]: [{ username: login }, { email: login }]
			}
		});

		if (!user) {
			return null;
		}

		// user.password бывает '' для социальных юзеров
		if (user.password !== '' && md5(password) === user.password) {
			const { password, ...data } = user.toJSON() as any;
			return data;
		}

		return null;
	}

	static async findByGoogleData(email: string, providerId: string) {
		return User.findOne({
			attributes,
			where: {
				[Op.or]: [{
					email
				}, {
					provider: AUTH_PROVIDER.GOOGLE,
					providerId
				}]
			},
		});
	}
}

User.init({
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	// password бывает null для соц. юзеров
	password: DataTypes.STRING,
	avatar: DataTypes.STRING,
	email: DataTypes.STRING,

	provider: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	providerId: DataTypes.STRING
}, {
	indexes: [{
		unique: true,
		fields: ['username']
	}, {
		unique: true,
		fields: ['email']
	}, {
		unique: true,
		fields: ['provider', 'providerId']
	}],
	sequelize
});

// todo: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
// todo: https://habr.com/ru/company/ruvds/blog/335434/

export default User;

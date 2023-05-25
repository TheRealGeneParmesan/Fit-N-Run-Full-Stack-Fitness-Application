const { Cardio, Strength, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async ( parent, args, context ) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).select('-__v -password').populate('fithub')
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)');
        },
    },

    Mutation: {
        login: async ( parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email (=ಠᆽಠ=)')
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials ┌╏ º □ º ╏┐')
            }
            const token = signToken(user);
            return { token, user };
        },
        
        addUser: async ( parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        addCardio: async ( parent, { cardio})
    }
}
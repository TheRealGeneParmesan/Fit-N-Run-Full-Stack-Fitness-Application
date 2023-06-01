const { Cardio, Strength, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_51NDIR4JJLHCDOShGXKl6t9qqixtopCzRRs9PvobEwWNtEfsHNKxCaPNF0L6R1rOUR7egj0KfXLENcCt8pkNQq5EN00a03JIq4r')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).select('-__v -password').populate('fithub')
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)');
        },
        donationSession: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: 'price_1NDIWPJJLHCDOShGaz9nTpQU',
                        quantity: 1
                    }
                ],
                mode: 'payment',
                success_url: `${url}/success`,
                cancel_url: `${url}/cancel`
            });
            return JSON.stringify({
                url: session.url
            });
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
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

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        saveCardio: async (parent, { input }, context) => {
            if (context.user) {
                const { name, distance, duration, date } = input;
                return Cardio.create({ name, distance, duration, date, userId: context.user._id })
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)')
        },

        saveStrength: async (parent, { input }, context) => {
            if (context.user) {
                const { name, weight, sets, reps, date } = input;
                return Strength.create({ name, weight, sets, reps, date, userId: context.user._id })
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)')
        },

        removeCardio: async (parent, { cardioId }, context) => {
            if (context.user) {
                return Cardio.findOneAndDelete({ _id: cardioId })
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)')
        },

        removeStrength: async (parent, { strengthId }, context) => {
            if (context.user) {
                return Strength.findOneAndDelete({ _id: strengthId })
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)')
        },
    },
};

module.exports = resolvers;
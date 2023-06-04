const { Cardio, Strength, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_51NDIR4JJLHCDOShGXKl6t9qqixtopCzRRs9PvobEwWNtEfsHNKxCaPNF0L6R1rOUR7egj0KfXLENcCt8pkNQq5EN00a03JIq4r')
// const fetch = import('node-fetch');
const request = require("request");
const { promisify } = require("util");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('cardio')
                    .populate('strength');
                return user;
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)');
        },


        getExercises: async (_, { muscle }) => {
            const apiKey = 'oxUb58VwcktN4kAQNBgke6OzLcgFnUr0TR7sr02q';
            const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

            const promisifiedRequest = promisify(request.get);

            try {
                const response = await promisifiedRequest({
                    url,
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                });

                const body = JSON.parse(response.body);
                return body;
            } catch (error) {
                console.error('Request failed:', error);
                throw new Error('Failed to retrieve exercises');
            }
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
        },

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
                const cardio = await Cardio.create({ name, distance, duration, date, userId: context.user._id });
                const user = await User.findByIdAndUpdate(context.user._id, { $push: { cardio: cardio._id } }, { new: true });
                return cardio;
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)');
        },

        saveStrength: async (parent, { input }, context) => {
            if (context.user) {
                const { name, weight, sets, reps, date } = input;
                const strength = await Strength.create({ name, weight, sets, reps, date, userId: context.user._id });
                await User.findByIdAndUpdate(context.user._id, { $push: { strength: strength._id } });
                return strength;
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)');
        },

        removeCardio: async (parent, { cardioId }, context) => {
            if (context.user) {
                await Cardio.findOneAndDelete({ _id: cardioId });
                const user = await User.findByIdAndUpdate(context.user._id, { $pull: { cardio: cardioId } }, { new: true });
                return user;
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)');
        },
        removeStrength: async (parent, { strengthId }, context) => {
            if (context.user) {
                await Cardio.findOneAndDelete({ _id: strengthId });
                const user = await User.findByIdAndUpdate(context.user._id, { $pull: { strength: strengthId } }, { new: true });
                return user;
            }
            throw new AuthenticationError('You are not logged in (ㆆ _ ㆆ)')
        },
    },
};

module.exports = resolvers;
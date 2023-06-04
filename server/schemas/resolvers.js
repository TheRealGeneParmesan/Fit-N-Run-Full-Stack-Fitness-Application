const { Cardio, Strength, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_51NDIR4JJLHCDOShGXKl6t9qqixtopCzRRs9PvobEwWNtEfsHNKxCaPNF0L6R1rOUR7egj0KfXLENcCt8pkNQq5EN00a03JIq4r')
const fetch = require('node-fetch');

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

        nutritionAPI: async (parent, { query }, context) => {
            try {
                if (context.user) {
                    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "x-app-id": "2c5cddf1",
                            "x-app-key": "b91c7832d47b05c118bc18725f8b7111",
                        },
                        body: JSON.stringify({
                            "query": query,
                            "timezone": "US/Eastern"
                        })
                    });
                    const data = await response.json();
                    console.log(data)
                    return data.hits;
                }

            } catch (error) {
                console.log(error)
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
        nutritionAPI: async (parent, {query}, context) => {
            try {
                if(context.user) {
                    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "x-app-id": "e606f177",
                            "x-app-key": "cd709e0fbe0ce1eb752eff9c963777d1",
                            "x-remote-user-id": "0",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(query)
                    });
                    const data = await response.json();
                    return data;
                }
            }
            catch (error) {
                throw new Error('Connection error')
            }
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
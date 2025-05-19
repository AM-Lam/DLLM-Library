"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const userService_1 = require("./userService");
const itemService_1 = require("./itemService");
const userService = new userService_1.UserService();
const itemService = new itemService_1.ItemService(userService);
exports.resolvers = {
    Query: {
        me: async (_, __, { loginUser }) => {
            return userService.me(loginUser);
        },
        itemsByLocation: async (_, { latitude, longitude, radiusKm, category, status, keyword, limit = 20, offset = 0, }, { loginUser }) => {
            return itemService.itemsByLocation(loginUser, latitude, longitude, radiusKm, category, status, keyword, limit, offset);
        },
        itemsByUser: async (_, { userId, category, status, keyword, limit = 20, offset = 0 }, { loginUser }) => {
            return itemService.itemsByUser(loginUser, userId, category, status, keyword, limit, offset);
        },
        item: async (_, { id }, { loginUser }) => {
            return itemService.itemById(loginUser, id);
        },
        user: async (_, { id }, { loginUser }) => {
            return userService.userById(loginUser, id);
        },
    },
    Mutation: {
        createUser: async (_, { nickname, address }, { loginUser }) => {
            return userService.createUser(loginUser, nickname, address);
        },
        updateUser: async (_, { nickname, contactMethods, address }, { loginUser }) => {
            return userService.updateUser(loginUser, nickname, address, contactMethods);
        },
        createItem: async (_, args, { loginUser }) => {
            return itemService.createItem(loginUser, args.name, args.description, args.condition, args.category, args.status, args.images, args.publishedYear, args.language);
        }
    },
};

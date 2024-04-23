"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserUrl = exports.handleRedirect = exports.handleGenerateNewShortURL = void 0;
const shortid_1 = __importDefault(require("shortid"));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const handleGenerateNewShortURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body.url;
    const email = req.body.email;
    let shortId;
    while (true) {
        shortId = (0, shortid_1.default)();
        const response = yield prisma.url.findUnique({
            where: {
                shortUrl: shortId
            },
        });
        if (response == null)
            break;
    }
    yield prisma.url.create({
        data: {
            shortUrl: shortId,
            mainUrl: url,
            email: email
        },
    });
    return res.json({ url: `http://localhost:8080/${shortId}` });
});
exports.handleGenerateNewShortURL = handleGenerateNewShortURL;
const handleRedirect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.params.shortId;
    const response = yield prisma.url.findUnique({
        where: {
            shortUrl: url
        },
    });
    if (response) {
        return res.redirect(response.mainUrl.toString());
    }
    else {
        res.status(404).send("URL not found");
    }
});
exports.handleRedirect = handleRedirect;
const handleUserUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const response = yield prisma.url.findMany({
        where: {
            email: email
        },
    });
    return res.json(response);
});
exports.handleUserUrl = handleUserUrl;

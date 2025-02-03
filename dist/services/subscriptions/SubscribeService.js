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
exports.SubscribeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const prisma_1 = __importDefault(require("../../prisma"));
class SubscribeService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            const stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
                apiVersion: '2025-01-27.acacia',
                appInfo: {
                    name: 'barberpro-web.vercel.app',
                    version: '1'
                }
            });
            const findUser = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id,
                }
            });
            let customerId = findUser.stripe_customer_id;
            if (!customerId) {
                const stripeCusmoter = yield stripe.customers.create({
                    email: findUser.email,
                });
                yield prisma_1.default.user.update({
                    where: {
                        id: user_id
                    },
                    data: {
                        stripe_customer_id: stripeCusmoter.id,
                    }
                });
                customerId = stripeCusmoter.id;
            }
            const stripeCheckoutSession = yield stripe.checkout.sessions.create({
                customer: customerId,
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                line_items: [
                    { price: process.env.STRIPE_PRICE, quantity: 1 }
                ],
                mode: 'subscription',
                allow_promotion_codes: true,
                success_url: process.env.STRIPE_SUCCESS_URL,
                cancel_url: process.env.STRIPE_CANCEL_URL
            });
            return { sessionId: stripeCheckoutSession.id };
        });
    }
}
exports.SubscribeService = SubscribeService;

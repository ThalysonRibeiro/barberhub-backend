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
exports.FinishScheduleService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class FinishScheduleService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ schedule_id, user_id }) {
            if (schedule_id === "" || user_id === "") {
                throw new Error("Error finshSchedule.");
            }
            try {
                const belongsToUser = yield prisma_1.default.service.findFirst({
                    where: {
                        id: schedule_id,
                        user_id: user_id,
                    }
                });
                if (!belongsToUser) {
                    throw new Error("Not authorized");
                }
                yield prisma_1.default.service.delete({
                    where: {
                        id: schedule_id,
                    }
                });
                return { message: "Finalizado com sucesso!" };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.FinishScheduleService = FinishScheduleService;

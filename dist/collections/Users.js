"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<p>Click to verify email</p>";
            }
        },
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
    },
    fields: [
        {
            name: "role",
            required: true,
            defaultValue: "user",
            // admin: {
            //   condition: () => false,
            // },
            type: "select",
            options: [
                { label: "Admin", value: "admin", },
                { label: "User", value: "user", },
            ],
        },
    ],
};

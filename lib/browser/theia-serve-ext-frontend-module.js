"use strict";
/**
 * Generated using theia-extension-generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
var theia_serve_ext_contribution_1 = require("./theia-serve-ext-contribution");
var common_1 = require("@theia/core/lib/common");
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
exports.default = new inversify_1.ContainerModule(function (bind) {
    // add your contribution bindings here
    bind(theia_serve_ext_contribution_1.TheiaServeExtCommandContribution).toSelf().inSingletonScope();
    [common_1.CommandContribution, browser_1.KeybindingContribution, common_1.MenuContribution].forEach(function (serviceIdentifier) {
        return bind(serviceIdentifier).toDynamicValue(function (ctx) { return ctx.container.get(theia_serve_ext_contribution_1.TheiaServeExtCommandContribution); }).inSingletonScope();
    });
});
//# sourceMappingURL=theia-serve-ext-frontend-module.js.map